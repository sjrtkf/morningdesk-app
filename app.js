const fallbackData = {
  settings: {
    dailyNewsCount: 3,
    excludedCategories: ["스포츠", "연예", "가십", "단순 사건사고"],
    categoryWeights: [
      { name: "업무/관심 분야", weight: 40 },
      { name: "경제/사회", weight: 20 },
      { name: "기술/과학", weight: 15 },
      { name: "국제 뉴스", weight: 15 },
      { name: "시야 확장", weight: 10 }
    ]
  },
  articles: [
    {
      category: "업무/관심 분야",
      source: "샘플",
      publishedAt: "오늘",
      cleanTitle: "하루 시작 루틴이 업무 집중도에 미치는 영향",
      originalTitle: "개인 생산성 도구 관심 증가",
      facts: "아침에 일정, 할 일, 읽을 정보를 한 번에 확인하려는 수요가 늘고 있다.",
      interpretation: "하루의 첫 화면이 단순할수록 중요한 일에 더 빨리 들어갈 수 있다는 해석이다.",
      otherView: "정보를 너무 많이 보여주면 오히려 시작이 늦어질 수 있다.",
      implication: "핵심 업무 하나, 주의할 점 하나, 읽을 정보 몇 개로 시작 화면을 제한할 수 있다.",
      question: "오늘 가장 먼저 확인해야 할 정보는 무엇인가?",
      opportunity: "반복해서 보는 항목을 아침 체크리스트로 만들 수 있다.",
      url: "#"
    },
    {
      category: "경제/사회",
      source: "샘플 정책뉴스",
      publishedAt: "오늘 08:05",
      cleanTitle: "디지털 알림과 일정 관리가 개인 루틴에 주는 변화",
      originalTitle: "디지털 일정 관리 확산",
      facts: "온라인 일정, 알림, 전자문서 사용이 늘면서 개인이 확인해야 할 정보도 여러 곳에 흩어지고 있다.",
      interpretation: "중요한 알림을 한곳에 모으는 도구가 필요하다는 해석이다.",
      otherView: "모든 알림을 모으면 다시 과부하가 생길 수 있어 선별 기준이 필요하다.",
      implication: "오늘 꼭 확인할 일정과 나중에 봐도 되는 정보를 나눠 보여줄 수 있다.",
      question: "오늘 놓치면 안 되는 일정이나 알림은 무엇인가?",
      opportunity: "일정과 할 일을 아침 브리핑에 함께 넣으면 시작 부담을 줄일 수 있다.",
      url: "#"
    },
    {
      category: "기술/과학",
      source: "샘플 기술매체",
      publishedAt: "어제 18:40",
      cleanTitle: "반복 업무 자동화가 개인 시간을 아끼는 방식",
      originalTitle: "자동화 도구 활용 증가",
      facts: "문서 정리, 할 일 분류, 정보 요약 같은 반복 작업에 자동화 도구를 쓰는 사례가 늘고 있다.",
      interpretation: "작은 반복 작업부터 줄이면 하루의 집중 시간을 확보할 수 있다는 해석이다.",
      otherView: "자동화할 항목을 잘못 고르면 설정 시간이 더 오래 걸릴 수 있다.",
      implication: "매일 반복해서 적는 일, 확인하는 정보, 미루는 일을 먼저 자동화 후보로 볼 수 있다.",
      question: "오늘 10분이라도 줄이고 싶은 반복 작업은 무엇인가?",
      opportunity: "작은 체크리스트와 기본값만으로도 시작 부담을 줄일 수 있다.",
      url: "#"
    }
  ],
  schedule: [{ time: "09:30", title: "오늘 일정 입력", type: "확인" }],
  tasks: [{ title: "모닝데스크 첫 화면 확인", priority: "핵심", status: "today" }]
};

const state = {
  data: fallbackData,
  schedule: [],
  tasks: [],
  reflections: [],
  feedback: {},
  checkin: {
    mainTask: "",
    avoidMistake: "",
    intention: "",
    mode: "conversation",
    energy: "normal",
    dayMode: "normal"
  },
  voice: {
    voiceURI: "",
    rate: 1,
    scriptVisible: false
  },
  meta: {
    schemaVersion: 1,
    updatedAt: "",
    deviceLabel: ""
  },
  settings: null
};

let storageWriteVersion = 0;

const qs = (selector) => document.querySelector(selector);

const assistantPrompts = {
  conversation: "몇 가지만 답하면 제가 오늘의 시작점을 정리해둘게요.",
  choice: "말하기 싫은 날이면 선택지만 골라도 됩니다. 빈칸은 제가 무난하게 채워둘게요.",
  quick: "오늘은 길게 붙잡지 않겠습니다. 핵심 하나만 잡고 바로 넘어갈게요.",
  off: "오늘은 오프 모드입니다. 급한 일정만 확인하고 쉬는 쪽으로 정리할게요."
};

const modeLabels = {
  conversation: "대화형",
  choice: "선택형",
  quick: "짧게 시작",
  off: "오프"
};

const energyLabels = {
  good: "괜찮음",
  normal: "보통",
  tired: "피곤함"
};

const dayModeLabels = {
  normal: "일반",
  light: "가볍게",
  off: "하루 오프"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function todayText() {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full",
    timeZone: "Asia/Seoul"
  }).format(new Date());
}

function applySavedState(parsed) {
  if (!parsed) return;
  state.schedule = parsed.schedule || state.schedule;
  state.tasks = parsed.tasks || state.tasks;
  state.reflections = parsed.reflections || state.reflections;
  state.feedback = parsed.feedback || state.feedback;
  state.checkin = normalizeCheckin(parsed.checkin || state.checkin);
  state.voice = normalizeVoice(parsed.voice || state.voice);
  state.meta = normalizeMeta(parsed.meta || parsed.__meta || state.meta);
  state.settings = parsed.settings || state.settings;
}

function snapshotState() {
  return {
    meta: state.meta,
    schedule: state.schedule,
    tasks: state.tasks,
    reflections: state.reflections,
    feedback: state.feedback,
    checkin: state.checkin,
    voice: state.voice,
    settings: state.settings
  };
}

async function loadSavedState() {
  const result = await window.MorningDeskStorage.load();
  applySavedState(result.state);
  updateStorageStatus(result);
}

function saveState() {
  state.meta = {
    ...normalizeMeta(state.meta),
    updatedAt: new Date().toISOString()
  };
  const writeVersion = ++storageWriteVersion;
  return window.MorningDeskStorage.save(snapshotState()).then((result) => {
    if (writeVersion === storageWriteVersion) {
      updateStorageStatus(result);
    }
    return result;
  });
}

function updateStorageStatus(result) {
  const status = qs("#storageStatus");
  if (!status) return;
  status.textContent = window.MorningDeskStorage.describe(result);
  status.title = window.MorningDeskStorage.describeDetail
    ? window.MorningDeskStorage.describeDetail(result)
    : status.textContent;
  renderSyncSettings(result);
}

function syncStatusMessage(result) {
  const config = window.MorningDeskStorage.getConfig ? window.MorningDeskStorage.getConfig() : window.MORNINGDESK_CONFIG;
  const profileId = config?.profileId || "default";
  const deviceLabel = config?.deviceLabel || defaultDeviceLabel();

  if (!result) {
    return "아직 저장 상태를 확인하지 못했습니다.";
  }
  if (result.mode === "supabase" && result.online) {
    return `온라인 동기화 사용 중 · 프로필 ${profileId} · 기기 ${deviceLabel}`;
  }
  if (result.mode === "supabase" && !result.online) {
    return "온라인 연결에 실패했습니다. 입력한 URL, anon key, 테이블 설정을 확인하세요.";
  }
  return "현재는 이 브라우저에만 저장합니다.";
}

function renderSyncSettings(result) {
  if (!window.MorningDeskStorage.getConfig) return;
  const config = window.MorningDeskStorage.getConfig();
  const syncMode = qs("#syncMode");
  if (!syncMode) return;

  syncMode.value = config.storageMode || "local";
  qs("#supabaseUrl").value = config.supabase?.url || "";
  qs("#supabaseAnonKey").value = config.supabase?.anonKey || "";
  qs("#syncProfileId").value = config.profileId || "default";
  qs("#syncDeviceLabel").value = config.deviceLabel || defaultDeviceLabel();
  qs("#syncConfigStatus").textContent = syncStatusMessage(result);
}

async function reloadFromStorage() {
  const result = await window.MorningDeskStorage.load();
  applySavedState(result.state);
  updateStorageStatus(result);
  renderAll();
  return result;
}

function applyImportedData(imported) {
  state.meta = normalizeMeta(imported.meta || imported.__meta || state.meta);
  state.schedule = Array.isArray(imported.schedule) ? imported.schedule : state.schedule;
  state.tasks = Array.isArray(imported.tasks) ? imported.tasks : state.tasks;
  state.reflections = Array.isArray(imported.reflections) ? imported.reflections : state.reflections;
  state.feedback = imported.feedback && typeof imported.feedback === "object" ? imported.feedback : state.feedback;
  state.checkin = imported.checkin && typeof imported.checkin === "object" ? normalizeCheckin(imported.checkin) : state.checkin;
  state.voice = imported.voice && typeof imported.voice === "object" ? normalizeVoice(imported.voice) : state.voice;
  state.settings = imported.settings && typeof imported.settings === "object" ? imported.settings : state.settings;
  state.data.settings = state.settings || state.data.settings;
  saveState();
  renderAll();
}

function normalizeCheckin(checkin = {}) {
  return {
    mainTask: checkin.mainTask || "",
    avoidMistake: checkin.avoidMistake || "",
    intention: checkin.intention || "",
    mode: checkin.mode || "conversation",
    energy: checkin.energy || "normal",
    dayMode: checkin.dayMode || "normal",
    createdAt: checkin.createdAt || ""
  };
}

function normalizeVoice(voice = {}) {
  return {
    voiceURI: voice.voiceURI || "",
    rate: Number(voice.rate || 1),
    scriptVisible: Boolean(voice.scriptVisible)
  };
}

function normalizeMeta(meta = {}) {
  return {
    schemaVersion: Number(meta.schemaVersion || 1),
    updatedAt: meta.updatedAt || "",
    deviceLabel: meta.deviceLabel || defaultDeviceLabel()
  };
}

function defaultDeviceLabel() {
  if (window.MORNINGDESK_CONFIG?.deviceLabel) return window.MORNINGDESK_CONFIG.deviceLabel;
  const platform = navigator.platform || "browser";
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ? "mobile" : "desktop";
  return `${coarse}-${platform}`;
}

function assistantDefaults(mode, energy, dayMode) {
  if (mode === "off" || dayMode === "off") {
    return {
      mainTask: "오늘은 회복을 우선한다",
      avoidMistake: "쉬는 날에 일을 억지로 끌고 오지 않는다",
      intention: "급한 것만 확인하고 충분히 쉰다"
    };
  }

  if (energy === "tired" || dayMode === "light") {
    return {
      mainTask: "가장 부담이 작은 핵심 1개만 고른다",
      avoidMistake: "컨디션을 무시하고 할 일을 늘리지 않는다",
      intention: "작게 시작하고 일찍 줄인다"
    };
  }

  if (mode === "choice" || mode === "quick") {
    return {
      mainTask: "오늘 가장 중요한 일 1개 고르기",
      avoidMistake: "확인 없이 넘기기",
      intention: "작게 시작한다"
    };
  }

  return {
    mainTask: "오늘 가장 중요한 일을 정한다",
    avoidMistake: "확인하지 않은 것을 확신하지 않는다",
    intention: "중요한 일부터 작게 시작한다"
  };
}

function readCheckinFromForm() {
  const mode = qs("#checkinMode").value || "conversation";
  const energy = qs("#energyLevel").value || "normal";
  const dayMode = qs("#dayMode").value || "normal";
  const defaults = assistantDefaults(mode, energy, dayMode);

  return {
    mainTask: qs("#mainTask").value.trim() || defaults.mainTask,
    avoidMistake: qs("#avoidMistake").value.trim() || defaults.avoidMistake,
    intention: qs("#intention").value.trim() || defaults.intention,
    mode,
    energy,
    dayMode,
    createdAt: new Date().toISOString()
  };
}

function setChoice(selector, value, inputSelector) {
  document.querySelectorAll(selector).forEach((button) => {
    const selected = Object.values(button.dataset).includes(value);
    button.classList.toggle("is-selected", selected);
  });
  qs(inputSelector).value = value;
}

function setCheckinMode(mode) {
  setChoice("[data-mode]", mode, "#checkinMode");
  if (mode === "off") setDayMode("off");
  if (mode === "quick" && qs("#dayMode").value === "normal") setDayMode("light");
  qs("#assistantPrompt").textContent = assistantPrompts[mode] || assistantPrompts.conversation;
  applyPlaceholderDefaults();
}

function setEnergy(energy) {
  setChoice("[data-energy]", energy, "#energyLevel");
  applyPlaceholderDefaults();
}

function setDayMode(dayMode) {
  setChoice("[data-day-mode]", dayMode, "#dayMode");
  if (dayMode === "off") {
    setChoice("[data-mode]", "off", "#checkinMode");
    qs("#assistantPrompt").textContent = assistantPrompts.off;
  } else if (qs("#checkinMode").value === "off") {
    setChoice("[data-mode]", "choice", "#checkinMode");
    qs("#assistantPrompt").textContent = assistantPrompts.choice;
  }
  applyPlaceholderDefaults();
}

function applyPlaceholderDefaults() {
  const defaults = assistantDefaults(qs("#checkinMode").value, qs("#energyLevel").value, qs("#dayMode").value);
  qs("#mainTask").placeholder = defaults.mainTask;
  qs("#avoidMistake").placeholder = defaults.avoidMistake;
  qs("#intention").placeholder = defaults.intention;
}

async function loadBriefing() {
  if (location.protocol === "file:") {
    state.data = fallbackData;
    state.schedule = state.schedule.length ? state.schedule : [...state.data.schedule];
    state.tasks = state.tasks.length ? state.tasks : [...state.data.tasks];
    state.settings = state.settings || JSON.parse(JSON.stringify(state.data.settings));
    state.data.settings = state.settings;
    return;
  }

  try {
    const response = await fetch("./data/sample-briefing.json");
    if (!response.ok) throw new Error("sample data unavailable");
    state.data = await response.json();
  } catch {
    state.data = fallbackData;
  }

  state.schedule = state.schedule.length ? state.schedule : [...state.data.schedule];
  state.tasks = state.tasks.length ? state.tasks : [...state.data.tasks];
  state.settings = state.settings || JSON.parse(JSON.stringify(state.data.settings));
  state.data.settings = state.settings;
}

function renderArticles() {
  const articles = visibleArticles();
  qs("#newsCount").textContent = state.checkin.dayMode === "off" ? `오프 · ${articles.length}개` : `${articles.length}개`;
  qs("#articleList").innerHTML = articles.map((article) => `
    <article class="article-card">
      <div class="meta-row">
        <span class="tag">${escapeHtml(article.category)}</span>
        <span class="source">${escapeHtml(article.source)} · ${escapeHtml(article.publishedAt)}</span>
      </div>
      <h4>${escapeHtml(article.cleanTitle)}</h4>
      <div class="source">원문 제목: ${escapeHtml(article.originalTitle)}</div>
      <div class="article-grid">
        ${detail("핵심 사실", article.facts)}
        ${detail("해석", article.interpretation)}
        ${detail("다른 관점", article.otherView)}
        ${detail("시사점", article.implication)}
        ${detail("생각 질문", article.question)}
        ${detail("업무 기회", article.opportunity)}
      </div>
      <div class="article-actions">
        <button class="small-button" type="button" data-feedback="useful" data-article-title="${escapeHtml(article.cleanTitle)}">유익함</button>
        <button class="small-button" type="button" data-feedback="later" data-article-title="${escapeHtml(article.cleanTitle)}">나중에 보기</button>
        <button class="small-button" type="button" data-feedback="low" data-article-title="${escapeHtml(article.cleanTitle)}">관심 낮음</button>
        <span class="feedback-state">${escapeHtml(feedbackLabel(state.feedback[article.cleanTitle]))}</span>
      </div>
    </article>
  `).join("");
}

function visibleArticles() {
  const limit = state.checkin.dayMode === "off"
    ? Math.min(1, state.data.settings.dailyNewsCount)
    : state.data.settings.dailyNewsCount;

  return state.data.articles
    .filter((article) => !state.data.settings.excludedCategories.includes(article.category))
    .slice(0, limit);
}

function feedbackLabel(value) {
  if (value === "useful") return "저장됨: 유익함";
  if (value === "later") return "저장됨: 나중에 보기";
  if (value === "low") return "저장됨: 관심 낮음";
  return "피드백 없음";
}

function detail(label, text) {
  return `
    <div class="article-detail">
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function renderSchedule() {
  qs("#scheduleList").innerHTML = state.schedule.map((item) => `
    <li>
      <strong>${escapeHtml(item.time || "시간 미정")} · ${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.type || "일정")}</small>
    </li>
  `).join("");
}

function renderTasks() {
  const todayTasks = state.tasks.filter((task) => !["deferred", "hold"].includes(task.status));
  const deferredTasks = state.tasks.filter((task) => task.status === "deferred");
  qs("#taskLoad").textContent = state.checkin.dayMode === "off"
    ? "오프"
    : todayTasks.length > 3 ? "과적" : `${todayTasks.length}/3`;
  qs("#taskList").innerHTML = todayTasks.map((task) => `
    <li>
      <strong>${escapeHtml(task.title)}</strong>
      <small>${escapeHtml(task.priority || "보통")}</small>
    </li>
  `).join("");

  qs("#deferredList").innerHTML = deferredTasks.length
    ? deferredTasks.map((task) => `
      <div class="deferred-item">
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(task.daysDeferred || 1)}일 미룸</small>
        <div class="deferred-actions">
          <button class="small-button" type="button" data-action="today" data-title="${escapeHtml(task.title)}">오늘 처리</button>
          <button class="small-button" type="button" data-action="split" data-title="${escapeHtml(task.title)}">10분으로 쪼개기</button>
          <button class="small-button" type="button" data-action="hold" data-title="${escapeHtml(task.title)}">보류</button>
          <button class="small-button" type="button" data-action="delete" data-title="${escapeHtml(task.title)}">삭제</button>
        </div>
      </div>
    `).join("")
    : `<p class="empty-state">미룬 일이 없습니다.</p>`;
}

function renderWeights() {
  const total = state.data.settings.categoryWeights.reduce((sum, item) => sum + Number(item.weight || 0), 0);
  qs("#weightTotal").textContent = `합계 ${total}%`;
  qs("#dailyNewsCount").value = state.data.settings.dailyNewsCount;
  qs("#excludedCategories").value = state.data.settings.excludedCategories.join(", ");
  qs("#weightEditor").innerHTML = state.data.settings.categoryWeights.map((item, index) => `
    <div class="weight-control">
      <label>
        ${escapeHtml(item.name)}
        <input type="range" min="0" max="100" step="5" value="${escapeHtml(item.weight)}" data-weight-index="${index}">
      </label>
      <input type="number" min="0" max="100" step="5" value="${escapeHtml(item.weight)}" data-weight-number="${index}" aria-label="${escapeHtml(item.name)} 비중">
    </div>
  `).join("");
  qs("#weightList").innerHTML = state.data.settings.categoryWeights.map((item) => `
    <div class="weight-row">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <div class="bar"><span style="width: ${escapeHtml(item.weight)}%"></span></div>
      </div>
      <span>${escapeHtml(item.weight)}%</span>
    </div>
  `).join("");
}

function renderSummary() {
  qs("#dashboardTitle").textContent = `${todayText()} 브리핑`;
  const checkin = normalizeCheckin(state.checkin);
  const defaults = assistantDefaults(checkin.mode, checkin.energy, checkin.dayMode);
  const brief = checkin.dayMode === "off"
    ? "오늘은 쉬는 날로 둡니다. 급한 일정만 확인하고 나머지는 압박하지 않습니다."
    : `${modeLabels[checkin.mode]} · 컨디션 ${energyLabels[checkin.energy]} · 강도 ${dayModeLabels[checkin.dayMode]}`;
  qs("#assistantBrief").textContent = brief;
  qs("#summaryMainTask").textContent = checkin.mainTask || defaults.mainTask;
  qs("#summaryMistake").textContent = checkin.avoidMistake || defaults.avoidMistake;
  qs("#summaryIntention").textContent = checkin.intention || defaults.intention;
}

function renderReflections() {
  qs("#reflectionList").innerHTML = state.reflections.length
    ? state.reflections.slice(-5).reverse().map((item) => `
      <li>
        <strong>${escapeHtml(item.text)}</strong>
        <small>${escapeHtml(item.date)}</small>
      </li>
    `).join("")
    : `<li><small>아직 저장된 회고가 없습니다.</small></li>`;
}

function renderVoiceSettings() {
  const voiceSelect = qs("#voiceSelect");
  const voiceRate = qs("#voiceRate");
  if (!voiceSelect || !voiceRate) return;

  voiceRate.value = state.voice.rate || 1;
  qs("#briefingScriptPreview").classList.toggle("is-hidden", !state.voice.scriptVisible);
  updateScriptPreview();
}

function loadVoiceOptions() {
  const voiceSelect = qs("#voiceSelect");
  if (!voiceSelect || !("speechSynthesis" in window)) return;

  const voices = window.speechSynthesis.getVoices();
  const currentValue = state.voice.voiceURI || voiceSelect.value;
  voiceSelect.innerHTML = `<option value="">기본 음성</option>${voices.map((voice) => `
    <option value="${escapeHtml(voice.voiceURI)}">${escapeHtml(voice.name)} · ${escapeHtml(voice.lang)}</option>
  `).join("")}`;
  voiceSelect.value = voices.some((voice) => voice.voiceURI === currentValue) ? currentValue : "";
}

function buildBriefingScript() {
  const checkin = normalizeCheckin(state.checkin);
  const defaults = assistantDefaults(checkin.mode, checkin.energy, checkin.dayMode);
  const mainTask = checkin.mainTask || defaults.mainTask;
  const mistake = checkin.avoidMistake || defaults.avoidMistake;
  const intention = checkin.intention || defaults.intention;
  const scheduleText = state.schedule.length
    ? state.schedule.slice(0, 3).map((item) => `${item.time || "시간 미정"} ${item.title}`).join(". ")
    : "등록된 일정은 없습니다";
  const todayTasks = state.tasks.filter((task) => !["deferred", "hold"].includes(task.status));
  const taskText = todayTasks.length
    ? todayTasks.slice(0, 3).map((task) => task.title).join(". ")
    : "등록된 할 일은 없습니다";
  const articles = visibleArticles();
  const articleText = articles.length
    ? articles.map((article, index) => `${index + 1}번 기사. ${article.cleanTitle}. 생각 질문은, ${article.question}`).join(". ")
    : "오늘 읽을 기사는 없습니다";

  if (checkin.dayMode === "off") {
    return `오늘은 오프 모드입니다. ${mainTask}. 주의할 점은 ${mistake}. ${intention}. 급한 일정만 확인합니다. 일정은 ${scheduleText}. 참고할 기사는 ${articleText}.`;
  }

  return `좋은 아침입니다. 오늘의 핵심 업무는 ${mainTask}. 피하고 싶은 실수는 ${mistake}. 오늘의 기준은 ${intention}. 일정은 ${scheduleText}. 할 일은 ${taskText}. 주요 브리핑입니다. ${articleText}.`;
}

function updateScriptPreview() {
  const preview = qs("#briefingScriptPreview");
  if (!preview) return;
  preview.value = buildBriefingScript();
}

function updateVoiceStatus(message) {
  const status = qs("#voiceStatus");
  if (status) status.textContent = message;
}

function stopReading() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  updateVoiceStatus("읽기를 멈췄습니다.");
}

function readBriefing() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    updateVoiceStatus("이 브라우저에서는 읽어주기를 지원하지 않습니다.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(buildBriefingScript());
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.voiceURI === state.voice.voiceURI);
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = "ko-KR";
  utterance.rate = Number(state.voice.rate || qs("#voiceRate").value || 1);
  utterance.pitch = 1;
  utterance.onstart = () => updateVoiceStatus("브리핑을 읽는 중입니다.");
  utterance.onend = () => updateVoiceStatus("읽기를 마쳤습니다.");
  utterance.onerror = () => updateVoiceStatus("읽는 중 문제가 생겼습니다. 브라우저 음성 설정을 확인해주세요.");
  window.speechSynthesis.speak(utterance);
}

function renderAll() {
  renderSummary();
  renderArticles();
  renderSchedule();
  renderTasks();
  renderWeights();
  renderReflections();
  renderVoiceSettings();
}

function showDashboard() {
  qs("#threshold").classList.add("is-hidden");
  qs("#dashboard").classList.remove("is-hidden");
  renderAll();
}

function showThreshold() {
  qs("#threshold").classList.remove("is-hidden");
  qs("#dashboard").classList.add("is-hidden");
}

function bindEvents() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setCheckinMode(button.dataset.mode));
  });

  document.querySelectorAll("[data-energy]").forEach((button) => {
    button.addEventListener("click", () => setEnergy(button.dataset.energy));
  });

  document.querySelectorAll("[data-day-mode]").forEach((button) => {
    button.addEventListener("click", () => setDayMode(button.dataset.dayMode));
  });

  qs("#checkinForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.checkin = readCheckinFromForm();
    saveState();
    showDashboard();
  });

  qs("#quickStart").addEventListener("click", () => {
    setCheckinMode("quick");
    state.checkin = readCheckinFromForm();
    saveState();
    showDashboard();
  });

  qs("#offDay").addEventListener("click", () => {
    setCheckinMode("off");
    setDayMode("off");
    state.checkin = readCheckinFromForm();
    saveState();
    showDashboard();
  });

  qs("#resetCheckin").addEventListener("click", showThreshold);
  qs("#readBriefing").addEventListener("click", readBriefing);
  qs("#stopReading").addEventListener("click", stopReading);
  qs("#voiceSelect").addEventListener("change", () => {
    state.voice.voiceURI = qs("#voiceSelect").value;
    saveState();
    updateVoiceStatus("목소리 설정을 저장했습니다.");
  });
  qs("#voiceRate").addEventListener("input", () => {
    state.voice.rate = Number(qs("#voiceRate").value || 1);
    saveState();
    updateScriptPreview();
  });
  qs("#toggleScript").addEventListener("click", () => {
    state.voice.scriptVisible = !state.voice.scriptVisible;
    qs("#briefingScriptPreview").classList.toggle("is-hidden", !state.voice.scriptVisible);
    updateScriptPreview();
    saveState();
  });

  qs("#exportData").addEventListener("click", () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      meta: state.meta,
      checkin: state.checkin,
      voice: state.voice,
      settings: state.data.settings,
      schedule: state.schedule,
      tasks: state.tasks,
      reflections: state.reflections,
      feedback: state.feedback
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `morningdesk-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  });

  qs("#importData").addEventListener("click", () => {
    qs("#importFile").click();
  });

  qs("#importFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        const imported = JSON.parse(String(reader.result || "{}"));
        applyImportedData(imported);
      } catch {
        alert("백업 파일을 읽지 못했습니다. JSON 파일인지 확인해주세요.");
      } finally {
        event.target.value = "";
      }
    });
    reader.readAsText(file, "utf-8");
  });

  qs("#scheduleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const time = qs("#scheduleTime").value;
    const title = qs("#scheduleTitle").value.trim();
    if (!title) return;
    state.schedule.push({ time, title, type: "직접 입력" });
    qs("#scheduleTitle").value = "";
    saveState();
    renderSchedule();
  });

  qs("#articleList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-feedback]");
    if (!button) return;
    state.feedback[button.dataset.articleTitle] = button.dataset.feedback;
    saveState();
    renderArticles();
  });

  qs("#taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = qs("#taskTitle").value.trim();
    if (!title) return;
    state.tasks.push({ title, priority: "보통", status: "today" });
    qs("#taskTitle").value = "";
    saveState();
    renderTasks();
  });

  qs("#settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.data.settings.dailyNewsCount = Number(qs("#dailyNewsCount").value || 3);
    state.data.settings.excludedCategories = qs("#excludedCategories").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    state.settings = state.data.settings;
    saveState();
    renderArticles();
    renderWeights();
  });

  qs("#syncForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nextConfig = {
      storageMode: qs("#syncMode").value,
      profileId: qs("#syncProfileId").value.trim() || "default",
      deviceLabel: qs("#syncDeviceLabel").value.trim() || defaultDeviceLabel(),
      supabase: {
        url: qs("#supabaseUrl").value.trim(),
        anonKey: qs("#supabaseAnonKey").value.trim(),
        table: "morningdesk_state"
      }
    };
    window.MorningDeskStorage.saveConfig(nextConfig);
    const writeVersion = ++storageWriteVersion;
    qs("#storageStatus").textContent = nextConfig.storageMode === "supabase" ? "온라인 확인 중" : "로컬 저장";
    qs("#syncConfigStatus").textContent = nextConfig.storageMode === "supabase"
      ? "온라인 저장소에 연결을 시도합니다."
      : "이 브라우저에만 저장하도록 바꿨습니다.";
    const result = await window.MorningDeskStorage.save(snapshotState());
    if (writeVersion !== storageWriteVersion) return;
    updateStorageStatus(result);
    qs("#syncConfigStatus").textContent = result.mode === "supabase" && result.online
      ? "동기화 설정을 저장하고 현재 데이터를 온라인에 올렸습니다."
      : syncStatusMessage(result);
  });

  qs("#syncNow").addEventListener("click", async () => {
    qs("#syncConfigStatus").textContent = "동기화 중입니다.";
    await reloadFromStorage();
  });

  qs("#weightEditor").addEventListener("input", (event) => {
    const rangeIndex = event.target.dataset.weightIndex;
    const numberIndex = event.target.dataset.weightNumber;
    const index = rangeIndex ?? numberIndex;
    if (index === undefined) return;
    const nextValue = Number(event.target.value || 0);
    state.data.settings.categoryWeights[Number(index)].weight = nextValue;
    renderWeights();
  });

  qs("#reflectionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = qs("#reflectionText").value.trim();
    if (!text) return;
    state.reflections.push({ text, date: todayText() });
    qs("#reflectionText").value = "";
    saveState();
    renderReflections();
  });

  qs("#deferredList").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const { action, title } = button.dataset;
    const task = state.tasks.find((item) => item.title === title);
    if (!task) return;

    if (action === "today") task.status = "today";
    if (action === "split") {
      task.status = "today";
      task.title = `${task.title} - 첫 10분 행동 정하기`;
    }
    if (action === "hold") task.status = "hold";
    if (action === "delete") state.tasks = state.tasks.filter((item) => item !== task);

    saveState();
    renderTasks();
  });
}

async function init() {
  qs("#todayLabel").textContent = `${todayText()} · 짧게 정리하고 바로 시작합니다.`;
  await loadSavedState();
  await loadBriefing();
  bindEvents();

  qs("#mainTask").value = state.checkin.mainTask || "";
  qs("#avoidMistake").value = state.checkin.avoidMistake || "";
  qs("#intention").value = state.checkin.intention || "";
  setCheckinMode(state.checkin.mode || "conversation");
  setEnergy(state.checkin.energy || "normal");
  setDayMode(state.checkin.dayMode || "normal");
  renderVoiceSettings();
  renderSyncSettings();
  loadVoiceOptions();
  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", loadVoiceOptions);
  }
}

init();

if ("serviceWorker" in navigator && ["https:", "http:"].includes(location.protocol)) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Service worker registration is optional for local file usage.
    });
  });
}
