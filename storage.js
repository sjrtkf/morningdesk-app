(function () {
  const storageKey = "morningdesk.v1";
  const configKey = "morningdesk.config.v1";

  function mergeConfig(base, override) {
    return {
      ...base,
      ...override,
      supabase: {
        ...(base.supabase || {}),
        ...(override.supabase || {})
      }
    };
  }

  function getStoredConfig() {
    try {
      return JSON.parse(localStorage.getItem(configKey) || "{}");
    } catch {
      localStorage.removeItem(configKey);
      return {};
    }
  }

  const config = mergeConfig(window.MORNINGDESK_CONFIG || { storageMode: "local" }, getStoredConfig());
  window.MORNINGDESK_CONFIG = config;

  function currentMode() {
    if (
      config.storageMode === "supabase" &&
      config.supabase &&
      config.supabase.url &&
      config.supabase.anonKey
    ) {
      return "supabase";
    }
    return "local";
  }

  function getLocalState() {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(storageKey);
      return null;
    }
  }

  function setLocalState(state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function stateUpdatedAt(state, fallback = "") {
    return state?.meta?.updatedAt || state?.__meta?.updatedAt || fallback || "";
  }

  function newerState(localState, remoteState, remoteUpdatedAt) {
    if (!localState) return remoteState || null;
    if (!remoteState) return localState;

    const localTime = Date.parse(stateUpdatedAt(localState)) || 0;
    const remoteTime = Date.parse(stateUpdatedAt(remoteState, remoteUpdatedAt)) || 0;
    return localTime > remoteTime ? localState : remoteState;
  }

  function fetchWithTimeout(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    return fetch(endpoint, {
      ...options,
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
  }

  function normalizeTargetConfig(targetConfig = config) {
    return mergeConfig(config, targetConfig || {});
  }

  function validateSupabaseConfig(targetConfig) {
    const target = normalizeTargetConfig(targetConfig);
    const url = target.supabase?.url?.trim() || "";
    const anonKey = target.supabase?.anonKey?.trim() || "";
    const profileId = target.profileId?.trim() || "";

    if (!url || !anonKey || !profileId) {
      return { ok: false, code: "missing", message: "URL, anon/public key, 프로필 키를 모두 입력하세요." };
    }
    if (profileId === "default" || profileId.length < 20) {
      return { ok: false, code: "profile", message: "안전한 프로필 키 만들기를 눌러 20자 이상의 키를 사용하세요." };
    }
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") {
        return { ok: false, code: "url", message: "Supabase URL은 https:// 주소여야 합니다." };
      }
    } catch {
      return { ok: false, code: "url", message: "Supabase 프로젝트 URL 형식을 확인하세요." };
    }
    return { ok: true, target };
  }

  function supabaseHeaders(target, includeJson = false) {
    const headers = {
      apikey: target.supabase.anonKey,
      Authorization: `Bearer ${target.supabase.anonKey}`
    };
    if (includeJson) headers["Content-Type"] = "application/json";
    return headers;
  }

  async function supabaseError(response, action) {
    let detail = "";
    try {
      const payload = await response.json();
      detail = payload?.message || payload?.hint || payload?.code || "";
    } catch {
      detail = "";
    }
    const error = new Error(detail || `Supabase ${action} failed`);
    error.status = response.status;
    return error;
  }

  async function loadSupabaseStateFor(targetConfig) {
    const target = normalizeTargetConfig(targetConfig);
    const { url } = target.supabase;
    const profileId = target.profileId || "default";
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/rpc/morningdesk_load`;
    const response = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: supabaseHeaders(target, true),
      body: JSON.stringify({ profile_key: profileId })
    });

    if (!response.ok) throw await supabaseError(response, "load");
    const rows = await response.json();
    return rows[0] || null;
  }

  async function loadSupabaseState() {
    return loadSupabaseStateFor(config);
  }

  async function saveSupabaseState(state) {
    const { url } = config.supabase;
    const profileId = config.profileId || "default";
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/rpc/morningdesk_save`;
    const response = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: supabaseHeaders(config, true),
      body: JSON.stringify({
        profile_key: profileId,
        next_state: state
      })
    });

    if (!response.ok) throw await supabaseError(response, "save");
  }

  async function testConnection(targetConfig) {
    const validation = validateSupabaseConfig(targetConfig);
    if (!validation.ok) return validation;

    try {
      const row = await loadSupabaseStateFor(validation.target);
      return {
        ok: true,
        code: row ? "connected" : "empty",
        rowExists: Boolean(row),
        updatedAt: row?.updated_at || ""
      };
    } catch (error) {
      const status = Number(error?.status || 0);
      if (status === 401) return { ok: false, code: "key", status, message: "anon/public key가 올바르지 않습니다." };
      if (status === 403) return { ok: false, code: "policy", status, message: "RLS 정책이 연결을 거부했습니다. 최신 SQL을 다시 적용하세요." };
      if (status === 404) return { ok: false, code: "table", status, message: "동기화 함수를 찾지 못했습니다. 최신 설정 SQL을 먼저 실행하세요." };
      return { ok: false, code: "network", status, message: "Supabase에 연결하지 못했습니다. URL과 인터넷 연결을 확인하세요." };
    }
  }

  async function load(options = {}) {
    const mode = currentMode();
    if (mode === "supabase") {
      const local = getLocalState();
      try {
        const remoteRow = await loadSupabaseState();
        const remote = remoteRow?.state || null;
        const selected = options.preferRemote && remote
          ? remote
          : newerState(local, remote, remoteRow?.updated_at);
        if (selected) {
          setLocalState(selected);
          if (selected === local) {
            await saveSupabaseState(local);
          }
          return {
            state: selected,
            mode: "supabase",
            online: true,
            source: selected === remote ? "remote" : "local",
            updatedAt: stateUpdatedAt(selected, remoteRow?.updated_at)
          };
        }
        return { state: null, mode: "supabase", online: true, source: "empty", updatedAt: "" };
      } catch {
        return {
          state: local,
          mode: "supabase",
          online: false,
          source: "local",
          updatedAt: stateUpdatedAt(local)
        };
      }
    }

    const local = getLocalState();
    return { state: local, mode: "local", online: true, source: "local", updatedAt: stateUpdatedAt(local) };
  }

  async function save(state) {
    setLocalState(state);

    if (currentMode() === "supabase") {
      try {
        await saveSupabaseState(state);
        return { mode: "supabase", online: true, source: "local", updatedAt: stateUpdatedAt(state) };
      } catch {
        return { mode: "supabase", online: false, source: "local", updatedAt: stateUpdatedAt(state) };
      }
    }

    return { mode: "local", online: true, source: "local", updatedAt: stateUpdatedAt(state) };
  }

  function describe(result) {
    if (!result) return "로컬 저장";
    if (result.mode === "supabase" && result.online) return "온라인 동기화";
    if (result.mode === "supabase" && !result.online) return "오프라인 저장";
    return "로컬 저장";
  }

  function describeDetail(result) {
    if (!result) return "브라우저 로컬 저장소를 사용합니다.";
    const savedAt = result.updatedAt
      ? new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "short",
        timeStyle: "short"
      }).format(new Date(result.updatedAt))
      : "저장 시간 없음";
    const source = result.source === "remote" ? "온라인 데이터" : "현재 기기 데이터";

    if (result.mode === "supabase" && result.online) {
      return `온라인 동기화 사용 중 · 기준: ${source} · 마지막 변경: ${savedAt}`;
    }
    if (result.mode === "supabase" && !result.online) {
      return `온라인 연결 실패 · 로컬에 보관 중 · 마지막 변경: ${savedAt}`;
    }
    return `로컬 저장 사용 중 · 마지막 변경: ${savedAt}`;
  }

  function getConfig() {
    return JSON.parse(JSON.stringify(config));
  }

  function saveConfig(nextConfig) {
    const merged = mergeConfig(config, nextConfig || {});
    Object.assign(config, merged);
    config.supabase = merged.supabase;
    localStorage.setItem(configKey, JSON.stringify({
      storageMode: config.storageMode || "local",
      profileId: config.profileId || "default",
      deviceLabel: config.deviceLabel || "",
      supabase: {
        url: config.supabase?.url || "",
        anonKey: config.supabase?.anonKey || "",
        table: config.supabase?.table || "morningdesk_state"
      }
    }));
    return getConfig();
  }

  window.MorningDeskStorage = {
    load,
    save,
    describe,
    describeDetail,
    getConfig,
    saveConfig,
    testConnection,
    mode: currentMode
  };
})();
