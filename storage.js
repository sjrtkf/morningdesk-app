(function () {
  const storageKey = "morningdesk.v1";
  const config = window.MORNINGDESK_CONFIG || { storageMode: "local" };

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

  async function loadSupabaseState() {
    const { url, anonKey, table } = config.supabase;
    const profileId = config.profileId || "default";
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/${table}?id=eq.${encodeURIComponent(profileId)}&select=state,updated_at`;
    const response = await fetch(endpoint, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`
      }
    });

    if (!response.ok) throw new Error("Supabase load failed");
    const rows = await response.json();
    return rows[0] || null;
  }

  async function saveSupabaseState(state) {
    const { url, anonKey, table } = config.supabase;
    const profileId = config.profileId || "default";
    const endpoint = `${url.replace(/\/$/, "")}/rest/v1/${table}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates"
      },
      body: JSON.stringify({
        id: profileId,
        state,
        updated_at: new Date().toISOString()
      })
    });

    if (!response.ok) throw new Error("Supabase save failed");
  }

  async function load() {
    const mode = currentMode();
    if (mode === "supabase") {
      const local = getLocalState();
      try {
        const remoteRow = await loadSupabaseState();
        const remote = remoteRow?.state || null;
        const selected = newerState(local, remote, remoteRow?.updated_at);
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

  window.MorningDeskStorage = {
    load,
    save,
    describe,
    describeDetail,
    mode: currentMode
  };
})();
