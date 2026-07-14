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
    ],
    newsSources: [
      { name: "Google News", url: "https://news.google.com/topstories?hl=ko&gl=KR&ceid=KR:ko" },
      { name: "정책브리핑", url: "https://www.korea.kr/news/policyNewsList.do" },
      { name: "AP News", url: "https://apnews.com/" },
      { name: "The Guardian", url: "https://www.theguardian.com/international" },
      { name: "arXiv", url: "https://arxiv.org/" }
    ]
  },
  articles: [
    {
      category: "업무/관심 분야",
      source: "AP News",
      publishedAt: "2026-06-29",
      cleanTitle: "삼성·SK하이닉스의 대규모 AI 반도체 허브 계획",
      originalTitle: "South Korean tech giants to build a $518 billion chipmaking hub to serve soaring AI demand",
      facts: "삼성전자와 SK하이닉스가 AI 수요에 대응하기 위해 한국 남서부에 대규모 반도체 제조 허브 투자를 발표했다.",
      interpretation: "AI 데이터센터와 산업용 AI 확산이 반도체, 전력, 용수, 인력, 지역 인프라 계획을 함께 움직이는 흐름으로 읽힌다.",
      otherView: "투자 규모가 크더라도 부지, 전력, 물, 숙련 인력 확보가 늦어지면 실제 생산 능력 확대로 이어지는 시점은 밀릴 수 있다.",
      implication: "전기·건설·설비·공공 인허가 업무에는 반도체 인프라 주변 수요와 일정 리스크를 함께 봐야 한다.",
      question: "이런 대규모 인프라 투자가 내 업무의 견적, 자재, 일정 판단에 영향을 줄 지점은 어디인가?",
      opportunity: "AI 인프라 관련 전력·설비·건설 이슈를 별도 뉴스 묶음으로 추적할 가치가 있다.",
      url: "https://apnews.com/article/22352d95c7a821c5f4548b2d1a4ebde8"
    },
    {
      category: "경제/사회",
      source: "The Guardian",
      publishedAt: "2026-07-05",
      cleanTitle: "데이터센터 전기요금 부담을 둘러싼 미국 소비자 보호 논쟁",
      originalTitle: "Bipartisan bill fails to protect US consumers from datacenters' true costs, critics warn",
      facts: "AI 데이터센터 확산으로 전력망·요금·환경 부담이 커진다는 비판과, 소비자 보호 법안의 실효성 논쟁이 이어지고 있다.",
      interpretation: "데이터센터는 단순 IT 시설이 아니라 지역 전력망과 공공 비용을 바꾸는 대형 부하로 봐야 한다.",
      otherView: "데이터센터 투자는 일자리와 세수, 디지털 인프라 효과도 만들 수 있어 비용과 편익을 나눠 봐야 한다.",
      implication: "대형 부하가 생기는 지역에서는 전력 인입, 수전 설비, 공사 일정, 민원 리스크가 함께 커질 수 있다.",
      question: "내가 보는 현장이나 거래처 중 전력 증설 이슈가 생길 가능성이 있는 곳은 어디인가?",
      opportunity: "전력 사용량이 큰 시설 뉴스는 설비·자재·공사 수요의 선행 신호로 볼 수 있다.",
      url: "https://www.theguardian.com/us-news/2026/jul/05/ratepayer-protection-act-datacenters"
    },
    {
      category: "기술/과학",
      source: "AP News",
      publishedAt: "2025-11-04",
      country: "미국/한국",
      language: "영어",
      topic: "한국 AI 정책",
      cleanTitle: "한국의 AI 예산 확대가 산업 현장에 던지는 신호",
      originalTitle: "South Korean president calls for aggressive AI spending in budget speech",
      originalExcerpt: "The article reports that South Korea is pushing more aggressive public spending on artificial intelligence and related infrastructure.",
      plainSummary: "한국 정부의 AI 예산 확대 방향은 제조, 반도체, 자동화, 공공 발주 흐름과 연결될 수 있다.",
      context: "정책 발표는 바로 일감이 되지는 않지만, 몇 달 뒤 지원사업, 장비 투자, 교육 수요로 이어질 수 있어 추적 가치가 있다.",
      facts: "한국 정부가 AI 인프라와 제조 역량 강화를 위해 AI 관련 예산 확대 방향을 제시했다.",
      interpretation: "반도체, 자동차, 조선, 로봇 같은 제조 기반 산업에 AI 투자가 연결될 가능성이 크다.",
      otherView: "예산 발표가 바로 현장 수요로 바뀌지는 않으며, 국회 심의와 실제 사업 공고를 확인해야 한다.",
      implication: "공공 발주, 설비 투자, 데이터센터, 자동화 장비 관련 뉴스를 꾸준히 확인할 필요가 있다.",
      question: "AI 예산 확대가 내 업무 자동화 아이디어나 고객 문제와 연결되는 지점은 무엇인가?",
      opportunity: "정책 발표를 실제 발주·지원사업·교육 수요로 이어지는 체크리스트로 바꿀 수 있다.",
      url: "https://apnews.com/article/80db48ff3d6cdaabd10b79518d56dc0f"
    },
    {
      category: "경제/사회",
      source: "정책브리핑",
      publishedAt: "2026-07-08",
      country: "한국",
      language: "한국어",
      topic: "에너지 안보와 조달",
      cleanTitle: "한·미·일 SMR 협력각서가 에너지·조달 업무에 주는 신호",
      originalTitle: "한·미·일, 인태지역 소형모듈원자로 배치 협력각서 체결",
      originalExcerpt: "정책브리핑은 한국·미국·일본이 인도·태평양 지역을 시작으로 소형모듈원자로 배치를 위한 협력각서를 체결했다고 전했다.",
      translation: "한국어 기사입니다. 핵심은 세 나라가 SMR 배치 협력의 틀을 만들고, 에너지 안보 수요와 민간 원자력 업계 협력 기회를 함께 보겠다는 점입니다.",
      plainSummary: "SMR 협력은 에너지 안보, 원전 공급망, 인허가, 조달 시장과 이어질 수 있어 전력·설비·공공 발주 흐름을 볼 때 참고할 만하다.",
      context: "AI 데이터센터와 제조 대형 부하가 커질수록 안정적인 전력 공급과 소형 원전 같은 에너지 대안 논의가 함께 커진다.",
      facts: "한국·미국·일본이 인도·태평양 지역의 SMR 배치 협력을 위한 협력각서를 체결했다.",
      interpretation: "에너지 안보와 원전 기술 협력은 장기적으로 전력 인프라, 기자재, 안전 기준, 조달 기회를 함께 움직일 수 있다.",
      otherView: "협력각서는 바로 사업 발주를 뜻하지 않으며, 실제 사업 개발과 인허가, 민간 투자 과정은 별도 확인이 필요하다.",
      implication: "전력·설비·공공조달 업무에서는 SMR, 원전 공급망, 안전 기준, 해외 협력 사업을 추적할 가치가 있다.",
      question: "에너지 안보 이슈가 내 업무의 전력 설비, 공공 입찰, 안전 서류 판단과 연결되는 지점은 무엇인가?",
      opportunity: "해외 원전·SMR 협력 기사를 전력 인프라와 조달 기회 신호로 묶어 볼 수 있다.",
      selectionReason: "국내 정책 기사 샘플 · 전력 인프라와 조달 업무 연결 · 외신 AI 전력 이슈와 비교 가능",
      url: "https://www.korea.kr/news/policyNewsList.do"
    }
  ],
  schedule: [{ time: "09:20", title: "오늘 핵심 업무와 일정 1개 확정", type: "확인", reminderBefore: 5 }],
  tasks: [{ title: "오늘 가장 중요한 일 하나 정하기", priority: "핵심", status: "today", firstAction: "해야 할 결과물을 한 문장으로 쓰기" }]
};

const state = {
  data: fallbackData,
  schedule: [],
  tasks: [],
  customArticles: [],
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
    engine: "browser",
    voiceURI: "",
    rate: 1,
    scriptVisible: false,
    endpoint: ""
  },
  weather: {
    status: "idle",
    summary: "",
    detail: "",
    locationName: "",
    daySummary: "",
    risk: "",
    source: "",
    latitude: null,
    longitude: null,
    updatedAt: ""
  },
  notifications: {
    popup: true,
    sound: false,
    vibration: false,
    openOnClick: true,
    leadMinutes: 5,
    enabled: false,
    permission: "default"
  },
  meta: {
    schemaVersion: 1,
    updatedAt: "",
    deviceLabel: ""
  },
  focus: {
    sessionsToday: 0,
    completedToday: 0,
    skippedToday: 0,
    lastStartedAt: "",
    lastCompletedAt: "",
    activeTaskTitle: ""
  },
  settings: null
};

let storageWriteVersion = 0;
let checkinStateChosen = false;
let checkinStage = "intro";
let checkinQuestionIndex = 0;
let speechRecognizer = null;
let voiceAdvanceEnabled = false;
let voiceAdvancePaused = false;
let voiceAdvanceRestartTimer = 0;
const sentNotifications = new Set();
let focusTimerId = 0;
let focusTimerEndsAt = 0;

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];
const VOICE_ADVANCE_KEY = "morningdesk.voiceAdvance.enabled";
const voiceAdvanceCommands = ["다음", "넘어", "넘겨", "확인", "시작", "계속"];

const assistantPrompts = {
  conversation: "지금 대화할 힘이 어느 정도인지 먼저 알려주세요.",
  choice: "선택만 해도 괜찮습니다. 답은 제가 무난하게 이어서 정리해둘게요.",
  quick: "오늘은 짧게 잡겠습니다. 핵심 하나만 정하고 바로 브리핑으로 넘어갈게요.",
  off: "오늘은 최소 모드입니다. 급한 것만 남기고 나머지는 내일로 넘길게요."
};

const assistantTones = {
  soft: "상태를 고르면 얇은 레이어처럼 다음 질문을 올리겠습니다.",
  focus: "피곤한 날입니다. 한 질문씩만, 천천히 묻겠습니다.",
  clear: "짧고 선명하게 줄여서 브리핑으로 넘기겠습니다."
};

const checkinStateMap = {
  charged: {
    label: "충전됨",
    mode: "conversation",
    energy: "good",
    dayMode: "normal",
    title: "오늘은 조금 더 넓게 봐도 좋겠습니다",
    prompt: "오늘 넓게 봐야 할 주제나 일을 하나만 잡아볼까요?",
    stepTitle: "A형 레이어로 확장합니다.",
    stepDetail: "상태가 괜찮으니 핵심 일, 실수, 오늘 기준을 차례로 얇게 올립니다."
  },
  steady: {
    label: "보통",
    mode: "conversation",
    energy: "normal",
    dayMode: "normal",
    title: "오늘을 너무 크게 만들지 않겠습니다",
    prompt: "지금 머릿속에 가장 먼저 걸리는 일 하나만 잡아볼까요?",
    stepTitle: "A형 레이어로 정리합니다.",
    stepDetail: "답을 쓰면 다음 질문이 부드럽게 올라오고, 마지막에 브리핑으로 이어집니다."
  },
  light: {
    label: "가볍게",
    mode: "quick",
    energy: "normal",
    dayMode: "light",
    title: "짧게 잡고 바로 넘어가겠습니다",
    prompt: "오늘 끝났다고 말할 기준 하나만 정할까요?",
    stepTitle: "A형을 짧게 줄입니다.",
    stepDetail: "질문을 줄이고, 핵심 하나를 첫 10분 행동으로 바꿉니다."
  },
  tired: {
    label: "피곤함",
    mode: "choice",
    energy: "tired",
    dayMode: "light",
    title: "오늘은 한 질문씩만 묻겠습니다",
    prompt: "지금 가능한 가장 작은 시작은 무엇일까요?",
    stepTitle: "D형 집중 시트로 유지합니다.",
    stepDetail: "피곤한 날에는 정보량을 숨기고, 한 질문씩 얇은 시트처럼 올립니다."
  },
  off: {
    label: "오늘 오프",
    mode: "off",
    energy: "tired",
    dayMode: "off",
    title: "오늘은 최소 모드로 둡니다",
    prompt: "급하게 확인해야 할 것만 남길까요?",
    stepTitle: "D형 최소 모드입니다.",
    stepDetail: "쉬는 날을 실패로 기록하지 않고, 급한 일정과 내일 이어갈 기록만 남깁니다."
  }
};

const checkinStepMessages = {
  conversation: {
    title: "오늘 체크인은 3단계입니다.",
    detail: "핵심 일 하나, 피하고 싶은 실수 하나, 오늘의 기준 하나만 정리합니다."
  },
  choice: {
    title: "선택지만 골라도 충분합니다.",
    detail: "답을 길게 쓰지 않아도 오늘의 기본값을 제가 채워둡니다."
  },
  quick: {
    title: "짧게 시작합니다.",
    detail: "오늘 가장 중요한 일 하나만 잡고 바로 브리핑으로 이동합니다."
  },
  off: {
    title: "오늘은 최소 모드입니다.",
    detail: "쉬는 날을 실패로 기록하지 않고, 급한 일정과 최소 정보만 남깁니다."
  }
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
  state.customArticles = Array.isArray(parsed.customArticles) ? parsed.customArticles : state.customArticles;
  state.reflections = parsed.reflections || state.reflections;
  state.feedback = parsed.feedback || state.feedback;
  state.checkin = normalizeCheckin(parsed.checkin || state.checkin);
  state.voice = normalizeVoice(parsed.voice || state.voice);
  state.notifications = normalizeNotifications(parsed.notifications || state.notifications);
  state.focus = normalizeFocus(parsed.focus || state.focus);
  state.meta = normalizeMeta(parsed.meta || parsed.__meta || state.meta);
  state.settings = normalizeSettings(parsed.settings || state.settings);
}

function snapshotState() {
  return {
    meta: state.meta,
    schedule: state.schedule,
    tasks: state.tasks,
    customArticles: state.customArticles,
    reflections: state.reflections,
    feedback: state.feedback,
    checkin: state.checkin,
    voice: state.voice,
    notifications: state.notifications,
    focus: state.focus,
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
  const profileLabel = profileId === "default" ? "미설정" : `${profileId.slice(0, 8)}…`;
  const deviceLabel = config?.deviceLabel || defaultDeviceLabel();

  if (!result) {
    return "아직 저장 상태를 확인하지 못했습니다.";
  }
  if (result.mode === "supabase" && result.online) {
    return `온라인 동기화 사용 중 · 프로필 ${profileLabel} · 기기 ${deviceLabel}`;
  }
  if (result.mode === "supabase" && !result.online) {
    return "온라인 연결에 실패했습니다. 입력한 URL, anon key, 테이블 설정을 확인하세요.";
  }
  return "현재는 이 브라우저에만 저장합니다.";
}

function setSyncStatus(message, tone = "neutral") {
  const status = qs("#syncConfigStatus");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function syncFormConfig() {
  return {
    storageMode: qs("#syncMode").value,
    profileId: qs("#syncProfileId").value.trim() || "default",
    deviceLabel: qs("#syncDeviceLabel").value.trim() || defaultDeviceLabel(),
    supabase: {
      url: qs("#supabaseUrl").value.trim(),
      anonKey: qs("#supabaseAnonKey").value.trim(),
      table: "morningdesk_state"
    }
  };
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
  setSyncStatus(syncStatusMessage(result), result?.mode === "supabase" && result.online ? "success" : "neutral");
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
  state.customArticles = Array.isArray(imported.customArticles) ? imported.customArticles : state.customArticles;
  state.reflections = Array.isArray(imported.reflections) ? imported.reflections : state.reflections;
  state.feedback = imported.feedback && typeof imported.feedback === "object" ? imported.feedback : state.feedback;
  state.checkin = imported.checkin && typeof imported.checkin === "object" ? normalizeCheckin(imported.checkin) : state.checkin;
  state.voice = imported.voice && typeof imported.voice === "object" ? normalizeVoice(imported.voice) : state.voice;
  state.notifications = imported.notifications && typeof imported.notifications === "object" ? normalizeNotifications(imported.notifications) : state.notifications;
  state.focus = imported.focus && typeof imported.focus === "object" ? normalizeFocus(imported.focus) : state.focus;
  state.settings = imported.settings && typeof imported.settings === "object" ? normalizeSettings(imported.settings) : state.settings;
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
    engine: voice.engine || "browser",
    voiceURI: voice.voiceURI || "",
    rate: Number(voice.rate || 1),
    scriptVisible: Boolean(voice.scriptVisible),
    endpoint: voice.endpoint || defaultVoiceEndpoint(voice.engine || "browser")
  };
}

function normalizeNotifications(notifications = {}) {
  return {
    popup: notifications.popup !== false,
    sound: Boolean(notifications.sound),
    vibration: Boolean(notifications.vibration),
    openOnClick: notifications.openOnClick !== false,
    leadMinutes: Number(notifications.leadMinutes || 5),
    enabled: Boolean(notifications.enabled),
    permission: notifications.permission || notificationPermission()
  };
}

function normalizeFocus(focus = {}) {
  return {
    sessionsToday: Number(focus.sessionsToday || 0),
    completedToday: Number(focus.completedToday || 0),
    skippedToday: Number(focus.skippedToday || 0),
    lastStartedAt: focus.lastStartedAt || "",
    lastCompletedAt: focus.lastCompletedAt || "",
    activeTaskTitle: focus.activeTaskTitle || ""
  };
}

function normalizeSettings(settings = {}) {
  const base = fallbackData.settings;
  return {
    dailyNewsCount: Number(settings.dailyNewsCount || base.dailyNewsCount),
    excludedCategories: Array.isArray(settings.excludedCategories) ? settings.excludedCategories : [...base.excludedCategories],
    categoryWeights: Array.isArray(settings.categoryWeights) ? settings.categoryWeights : [...base.categoryWeights],
    newsSources: Array.isArray(settings.newsSources) && settings.newsSources.length ? settings.newsSources : [...base.newsSources]
  };
}

function defaultVoiceEndpoint(engine) {
  if (engine === "kokoro") return "http://127.0.0.1:7860/speak";
  if (engine === "melo") return "http://127.0.0.1:7861/speak";
  if (engine === "sherpa") return "http://127.0.0.1:7862/speak";
  return "";
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

function generateProfileId() {
  const bytes = new Uint8Array(16);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  return `md-${Array.from(bytes).map((value) => value.toString(16).padStart(2, "0")).join("")}`;
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

function activeTasks() {
  return state.tasks.filter((task) => !["deferred", "hold", "done"].includes(task.status));
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function scheduleDateTime(item, baseDate = new Date()) {
  if (!item?.time) return null;
  const [hour, minute] = String(item.time).split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  const date = new Date(baseDate);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function scheduleStatus(item, now = new Date()) {
  const dateTime = scheduleDateTime(item, now);
  if (!dateTime) {
    return { key: "unscheduled", label: "시간 미정", note: "시간을 넣으면 알림 후보가 됩니다." };
  }
  const diff = dateTime.getTime() - now.getTime();
  if (diff < -60 * 1000) {
    return { key: "past", label: "지남", note: "시간이 지난 일정이라 흐리게 둡니다. 필요하면 완료 처리만 남기세요." };
  }
  if (diff <= 30 * 60 * 1000) {
    const minutes = Math.max(0, Math.ceil(diff / 60000));
    return { key: "soon", label: "곧", note: minutes ? `${minutes}분 안에 확인할 일정입니다.` : "지금 확인할 일정입니다." };
  }
  return { key: "upcoming", label: "예정", note: `${item.reminderBefore || state.notifications.leadMinutes || 5}분 전 알림 후보입니다.` };
}

function nextScheduleItem() {
  const now = new Date();
  return state.schedule
    .filter((item) => item.time)
    .map((item) => ({ ...item, dateTime: scheduleDateTime(item, now) }))
    .filter((item) => item.dateTime >= now)
    .sort((a, b) => a.dateTime - b.dateTime)[0];
}

function dashboardTone(checkin = state.checkin) {
  const normalized = normalizeCheckin(checkin);
  if (normalized.dayMode === "off" || normalized.mode === "off" || normalized.energy === "tired") return "minimal";
  if (normalized.dayMode === "light") return "light";
  if (normalized.energy === "good") return "full";
  return "steady";
}

function dashboardToneConfig(tone) {
  const configs = {
    minimal: {
      badge: "최소 모드",
      title: "오늘은 꼭 필요한 것만 남깁니다",
      guide: "핵심 행동 하나, 다음 일정, 기사 한 개만 보여드립니다. 나머지는 숨겨두고 회복을 우선합니다.",
      articleLimit: 1,
      taskLimit: 1,
      scheduleLimit: 1
    },
    light: {
      badge: "가벼운 모드",
      title: "오늘은 작게 시작하고 빨리 줄입니다",
      guide: "할 일은 두 개 이하로 보고, 기사는 업무에 바로 이어질 것만 남깁니다.",
      articleLimit: 2,
      taskLimit: 2,
      scheduleLimit: 2
    },
    full: {
      badge: "확장 모드",
      title: "오늘은 넓게 봐도 괜찮습니다",
      guide: "업무 신호, 일정, 미룬 일, 동기화까지 열어두고 하루 운영판처럼 씁니다.",
      articleLimit: 5,
      taskLimit: 5,
      scheduleLimit: 4
    },
    steady: {
      badge: "균형 모드",
      title: "오늘은 중요한 것부터 차분히 봅니다",
      guide: "핵심 업무와 다음 일정, 선별 기사 몇 개만 먼저 보고 나머지는 필요할 때 펼칩니다.",
      articleLimit: 3,
      taskLimit: 3,
      scheduleLimit: 3
    }
  };
  return configs[tone] || configs.steady;
}

function displayLimit(kind) {
  const config = dashboardToneConfig(dashboardTone());
  if (kind === "article") return Math.min(config.articleLimit, state.data.settings.dailyNewsCount);
  if (kind === "task") return config.taskLimit;
  if (kind === "schedule") return config.scheduleLimit;
  return 3;
}

function sameKoreanDate(value) {
  if (!value) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  return localDateString(parsed) === localDateString();
}

function normalizeDailyFocus() {
  state.focus = normalizeFocus(state.focus);
  if (!sameKoreanDate(state.focus.lastStartedAt) && !sameKoreanDate(state.focus.lastCompletedAt)) {
    state.focus.sessionsToday = 0;
    state.focus.completedToday = 0;
    state.focus.skippedToday = 0;
    state.focus.activeTaskTitle = "";
  }
}

function articleCountry(article) {
  if (article.country) return article.country;
  const host = articleHost(article.url || "");
  if (host.includes("korea.kr")) return "한국";
  if (host.includes("apnews")) return "미국/국제";
  if (host.includes("theguardian")) return "영국";
  if (host.includes("arxiv")) return "국제 연구";
  return "출처 확인";
}

function articleLanguage(article) {
  if (article.language) return article.language;
  return article.source === "정책브리핑" || articleCountry(article) === "한국" ? "한국어" : "영어";
}

function articleTopic(article) {
  return article.topic || article.category || "오늘 브리핑";
}

function articleTranslation(article) {
  return article.translation || `${article.cleanTitle}. ${article.facts} ${article.interpretation} ${article.implication}`;
}

function articlePlainSummary(article) {
  return article.plainSummary || `${article.facts} ${article.implication}`;
}

function articleOriginalExcerpt(article) {
  return article.originalExcerpt
    || article.originalSummary
    || article.excerpt
    || article.facts
    || articlePlainSummary(article);
}

function articleSelectionReason(article) {
  if (article.selectionReason) return article.selectionReason;
  const weight = state.data.settings.categoryWeights.find((item) => item.name === article.category)?.weight;
  const parts = [];
  if (weight) parts.push(`${article.category} 비중 ${weight}%에 해당`);
  if (article.implication) parts.push("오늘 업무 판단으로 이어짐");
  if (articleComparison(article).length) parts.push("같은 주제의 다른 출처와 비교 가능");
  if (articleLanguage(article) !== "한국어") parts.push("국내 기사와 다른 관점 보강");
  if (state.feedback[article.cleanTitle] === "useful") parts.push("이전에 유익하다고 표시한 흐름과 가까움");
  return parts.slice(0, 3).join(" · ") || "오늘 생각 질문으로 이어질 만한 기사라 먼저 보여줍니다.";
}

function articleSentences(article) {
  if (Array.isArray(article.sentenceStudy) && article.sentenceStudy.length) return article.sentenceStudy;
  return [
    {
      original: article.originalTitle || article.cleanTitle,
      translated: article.cleanTitle,
      note: "제목은 원문의 뉘앙스를 줄이고, 아침에 판단하기 쉽게 정제해 보여줍니다."
    }
  ];
}

function articleComparison(article) {
  const topic = articleTopic(article);
  return allArticles()
    .filter((item) => item !== article && articleTopic(item) === topic)
    .slice(0, 3);
}

function articleSelectionScore(article, index) {
  const category = state.data.settings.categoryWeights.find((item) => item.name === article.category);
  const categoryWeight = Number(category?.weight || 10);
  const feedback = state.feedback[article.cleanTitle];
  const feedbackBonus = feedback === "useful" ? 8 : feedback === "low" ? -10 : 0;
  const sourceBonus = article.url ? 6 : 0;
  const domesticBonus = articleLanguage(article) === "한국어" ? 10 : 0;
  return Math.max(0, Math.min(100, 52 + categoryWeight / 2 + sourceBonus + domesticBonus + feedbackBonus - index * 2));
}

function priorityClass(priority = "보통") {
  if (priority.includes("핵심")) return "priority-core";
  if (priority.includes("가볍")) return "priority-light";
  if (priority.includes("쪼개")) return "priority-split";
  return "priority-normal";
}

function priorityHelp(priority = "보통") {
  if (priority.includes("핵심")) return "오늘 반드시 먼저 볼 일";
  if (priority.includes("가볍")) return "컨디션이 낮아도 처리 가능한 일";
  if (priority.includes("쪼개")) return "아직 크니 첫 행동만 남긴 일";
  return "해야 하지만 핵심 1순위는 아닌 일";
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
  updateCheckinInterface();
}

function setEnergy(energy) {
  setChoice("[data-energy]", energy, "#energyLevel");
  if (energy === "tired" && qs("#dayMode").value === "normal") {
    setChoice("[data-day-mode]", "light", "#dayMode");
  }
  updateCheckinInterface();
}

function setDayMode(dayMode) {
  setChoice("[data-day-mode]", dayMode, "#dayMode");
  if (dayMode === "off") {
    setChoice("[data-mode]", "off", "#checkinMode");
  } else if (qs("#checkinMode").value === "off") {
    setChoice("[data-mode]", "choice", "#checkinMode");
  }
  updateCheckinInterface();
}

function currentCheckinState() {
  const mode = qs("#checkinMode").value || "conversation";
  const energy = qs("#energyLevel").value || "normal";
  const dayMode = qs("#dayMode").value || "normal";
  if (mode === "off" || dayMode === "off") return "off";
  if (energy === "tired") return "tired";
  if (mode === "quick" || dayMode === "light") return "light";
  if (energy === "good") return "charged";
  return "steady";
}

function setCheckinState(stateName, chosen = true) {
  const config = checkinStateMap[stateName] || checkinStateMap.steady;
  checkinStateChosen = chosen;
  qs("#checkinMode").value = config.mode;
  qs("#energyLevel").value = config.energy;
  qs("#dayMode").value = config.dayMode;
  checkinQuestionIndex = Math.min(checkinQuestionIndex, maxQuestionIndex());
  document.querySelectorAll("[data-state]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.state === stateName);
  });
  updateCheckinInterface();
}

function applyPlaceholderDefaults() {
  const defaults = assistantDefaults(qs("#checkinMode").value, qs("#energyLevel").value, qs("#dayMode").value);
  qs("#mainTask").placeholder = defaults.mainTask;
  qs("#avoidMistake").placeholder = defaults.avoidMistake;
  qs("#intention").placeholder = defaults.intention;
}

function checkinTone(mode, energy, dayMode) {
  if (mode === "off" || dayMode === "off") return "focus";
  if (energy === "tired") return "focus";
  if (mode === "quick") return "clear";
  return "soft";
}

function setVoiceAdvanceStatus(message) {
  const status = qs("#voiceAdvanceStatus");
  if (status) status.textContent = message;
}

function setVoiceAdvanceButtons() {
  ["#introVoiceAdvance", "#checkinVoiceAdvance"].forEach((selector) => {
    const button = qs(selector);
    if (!button) return;
    const label = button.querySelector(".toggle-label");
    if (label) label.textContent = voiceAdvanceEnabled ? "음성 넘김 켜짐" : "음성 넘김";
    button.setAttribute("aria-pressed", String(voiceAdvanceEnabled));
    button.classList.toggle("is-listening", voiceAdvanceEnabled);
  });
  qs("#voiceAdvanceStatus")?.classList.toggle("is-listening", voiceAdvanceEnabled);
}

function voiceAdvanceSupported() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function saveVoiceAdvancePreference(enabled) {
  try {
    localStorage.setItem(VOICE_ADVANCE_KEY, enabled ? "1" : "0");
  } catch {
    // localStorage can be unavailable in private or restricted browser modes.
  }
}

function savedVoiceAdvancePreference() {
  try {
    return localStorage.getItem(VOICE_ADVANCE_KEY) === "1";
  } catch {
    return false;
  }
}

function setCheckinStage(stage) {
  checkinStage = stage;
  document.body.dataset.checkinStage = stage;

  if (stage === "state") {
    checkinStateChosen = false;
    checkinQuestionIndex = 0;
    updateCheckinInterface();
  }

  if (stage === "questions") {
    checkinStateChosen = true;
    checkinQuestionIndex = Math.min(checkinQuestionIndex, maxQuestionIndex());
    updateCheckinInterface();
    window.setTimeout(() => currentQuestionInput()?.focus(), 320);
  }

  if (stage === "intro") {
    setVoiceAdvanceStatus(voiceAdvanceEnabled
      ? "음성 넘김 대기 중입니다. 다음, 넘어가, 확인이라고 말해보세요."
      : "음성 넘김을 한 번 켜면 체크인 동안 말로 넘길 수 있습니다.");
  } else if (stage === "state") {
    setVoiceAdvanceStatus(voiceAdvanceEnabled
      ? "컨디션을 고른 뒤 다음이라고 말하면 질문 카드로 넘어갑니다."
      : "컨디션을 고른 뒤 확인하거나, 음성 넘김을 켤 수 있습니다.");
  } else {
    setVoiceAdvanceStatus(voiceAdvanceEnabled
      ? "답을 적고 다음이라고 말하면 필요한 질문으로 넘어갑니다."
      : "답을 적고 브리핑 시작을 누르면 됩니다.");
  }
}

function checkinQuestionKeys() {
  const stateName = currentCheckinState();
  if (stateName === "off" || stateName === "tired") return ["main"];
  if (stateName === "light") return ["main", "mistake"];
  return ["main", "mistake", "intention"];
}

function maxQuestionIndex() {
  return checkinQuestionKeys().length - 1;
}

function currentQuestionInput() {
  const key = checkinQuestionKeys()[checkinQuestionIndex] || "main";
  if (key === "mistake") return qs("#avoidMistake");
  if (key === "intention") return qs("#intention");
  return qs("#mainTask");
}

function advanceQuestionCard() {
  const input = currentQuestionInput();

  if (!input.value.trim()) {
    input.focus();
    return;
  }

  if (checkinQuestionIndex < maxQuestionIndex()) {
    checkinQuestionIndex += 1;
    updateCheckinInterface();
    window.setTimeout(() => currentQuestionInput()?.focus(), 240);
    return;
  }

  qs("#checkinForm").requestSubmit();
}

function advanceCheckin() {
  if (checkinStage === "intro") {
    setCheckinStage("state");
    return;
  }

  if (checkinStage === "state") {
    setCheckinState(currentCheckinState(), true);
    setCheckinStage("questions");
    return;
  }

  advanceQuestionCard();
}

function goBackCheckin() {
  if (checkinStage === "questions" && checkinQuestionIndex > 0) {
    checkinQuestionIndex -= 1;
    updateCheckinInterface();
    window.setTimeout(() => currentQuestionInput()?.focus(), 200);
    return;
  }
  if (checkinStage === "questions") {
    setCheckinStage("state");
    return;
  }
  if (checkinStage === "state") {
    setCheckinStage("intro");
  }
}

function stopVoiceAdvanceListening({ keepEnabled = false } = {}) {
  window.clearTimeout(voiceAdvanceRestartTimer);
  voiceAdvanceRestartTimer = 0;
  voiceAdvancePaused = keepEnabled;
  if (!keepEnabled) {
    voiceAdvanceEnabled = false;
    saveVoiceAdvancePreference(false);
    setVoiceAdvanceButtons();
  }
  if (speechRecognizer) {
    const recognizer = speechRecognizer;
    speechRecognizer = null;
    recognizer.stop();
  }
}

function startVoiceAdvanceListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceAdvanceEnabled = false;
    setVoiceAdvanceButtons();
    setVoiceAdvanceStatus("이 브라우저에서는 음성 넘김을 지원하지 않습니다. 버튼으로 넘겨주세요.");
    return;
  }

  if (speechRecognizer) {
    return;
  }

  const recognizer = new SpeechRecognition();
  speechRecognizer = recognizer;
  recognizer.lang = "ko-KR";
  recognizer.continuous = true;
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;
  recognizer.addEventListener("start", () => {
    setVoiceAdvanceButtons();
    setVoiceAdvanceStatus("음성 넘김 대기 중입니다. 다음, 넘어가, 확인이라고 말해보세요.");
  });
  recognizer.addEventListener("result", (event) => {
    const lastResult = event.results?.[event.results.length - 1];
    const transcript = String(lastResult?.[0]?.transcript || "").trim();
    const command = transcript.replace(/\s+/g, "");
    const canAdvance = voiceAdvanceCommands.some((word) => command.includes(word));
    if (canAdvance) {
      setVoiceAdvanceStatus(`${transcript}이라고 들었어요. 다음 카드로 넘어갑니다.`);
      advanceCheckin();
      return;
    }
    setVoiceAdvanceStatus(`${transcript || "잘 들리지 않았어요"}. 다음, 넘어가, 확인 중 하나로 말하면 넘어갑니다.`);
  });
  recognizer.addEventListener("error", (event) => {
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
      stopVoiceAdvanceListening();
      setVoiceAdvanceStatus("마이크 권한이 막혀 있습니다. 브라우저 권한을 허용하면 음성 넘김을 쓸 수 있습니다.");
      return;
    }
    setVoiceAdvanceStatus("잠깐 듣지 못했습니다. 음성 넘김을 다시 대기 상태로 돌립니다.");
  });
  recognizer.addEventListener("end", () => {
    if (speechRecognizer === recognizer) speechRecognizer = null;
    if (!voiceAdvanceEnabled || voiceAdvancePaused) return;
    voiceAdvanceRestartTimer = window.setTimeout(startVoiceAdvanceListening, 350);
  });
  recognizer.start();
}

function enableVoiceAdvance({ persist = true } = {}) {
  if (!voiceAdvanceSupported()) {
    setVoiceAdvanceStatus("이 브라우저에서는 음성 넘김을 지원하지 않습니다. 버튼으로 넘겨주세요.");
    return;
  }
  voiceAdvanceEnabled = true;
  voiceAdvancePaused = false;
  if (persist) saveVoiceAdvancePreference(true);
  setVoiceAdvanceButtons();
  startVoiceAdvanceListening();
}

function toggleVoiceAdvance() {
  if (voiceAdvanceEnabled) {
    stopVoiceAdvanceListening();
    setVoiceAdvanceStatus("음성 넘김을 껐습니다. 버튼으로 넘길 수 있습니다.");
    return;
  }
  enableVoiceAdvance();
}

async function resumeVoiceAdvanceIfAllowed() {
  if (!savedVoiceAdvancePreference() || !voiceAdvanceSupported()) return;
  if (!navigator.permissions?.query) return;
  try {
    const permission = await navigator.permissions.query({ name: "microphone" });
    if (permission.state === "granted") {
      enableVoiceAdvance({ persist: false });
    }
  } catch {
    // Some browsers do not expose microphone permission state to pages.
  }
}

function updateCheckinInterface() {
  const mode = qs("#checkinMode").value || "conversation";
  const energy = qs("#energyLevel").value || "normal";
  const dayMode = qs("#dayMode").value || "normal";
  const tone = checkinTone(mode, energy, dayMode);
  const stateName = currentCheckinState();
  const stateConfig = checkinStateMap[stateName] || checkinStateMap.steady;
  const hasAnyAnswer = [qs("#mainTask").value, qs("#avoidMistake").value, qs("#intention").value]
    .some((value) => value.trim());
  const waitingForState = (checkinStage === "state" && !checkinStateChosen) || (!checkinStateChosen && !hasAnyAnswer);
  const step = waitingForState ? {
    title: "먼저 오늘 상태를 고릅니다.",
    detail: "상태를 누르는 순간 화면 톤과 질문량이 바뀌고, 다음 질문이 얇은 레이어로 올라옵니다."
  } : {
    title: checkinStage === "questions"
      ? `${checkinQuestionIndex + 1}/${checkinQuestionKeys().length} · ${stateConfig.stepTitle || checkinStepMessages[mode]?.title}`
      : stateConfig.stepTitle || checkinStepMessages[mode]?.title,
    detail: checkinStage === "questions"
      ? "이전으로 돌아가 고칠 수 있고, 컨디션이 낮으면 남은 질문은 자동으로 줄입니다."
      : stateConfig.stepDetail || checkinStepMessages[mode]?.detail
  };

  document.body.dataset.checkinTone = tone;
  qs(".assistant-card h2").textContent = waitingForState ? "오늘 컨디션부터 맞춰볼게요" : stateConfig.title;
  qs("#assistantPrompt").textContent = waitingForState
    ? "지금 상태가 어디에 가장 가까운가요?"
    : stateConfig.prompt || assistantPrompts[mode] || assistantPrompts.conversation;
  qs("#assistantTone").textContent = waitingForState
    ? "상태를 고르면 화면 분위기가 먼저 부드럽게 바뀝니다."
    : assistantTones[tone];
  qs("#checkinStep").innerHTML = `<strong>${escapeHtml(step.title)}</strong><span>${escapeHtml(step.detail)}</span>`;
  qs("#cardNext").textContent = checkinStage === "questions" && checkinQuestionIndex >= maxQuestionIndex()
    ? "브리핑 시작"
    : "다음";
  document.querySelectorAll("[data-state]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.state === stateName);
  });
  document.querySelectorAll(".checkin-progress span").forEach((item, index) => {
    const stageBase = checkinStage === "intro" ? 1 : checkinStage === "state" ? 2 : 3 + checkinQuestionIndex;
    const activeCount = Math.min(5, stageBase);
    item.classList.toggle("is-active", index < activeCount);
  });
  applyPlaceholderDefaults();
  updateCheckinLayers();
}

function updateCheckinLayers() {
  const questionsOpen = checkinStage === "questions";
  const visibleKey = checkinQuestionKeys()[checkinQuestionIndex] || "main";

  document.querySelectorAll(".checkin-layer").forEach((layer) => {
    const visible = questionsOpen && layer.dataset.layer === visibleKey;
    layer.classList.toggle("is-visible", visible);
    layer.classList.toggle("is-waiting", !visible);
  });
}

async function loadBriefing() {
  if (location.protocol === "file:") {
    state.data = fallbackData;
    state.schedule = state.schedule.length ? state.schedule : [...state.data.schedule];
    state.tasks = state.tasks.length ? state.tasks : [...state.data.tasks];
    state.settings = normalizeSettings(state.settings || state.data.settings);
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
  state.settings = normalizeSettings(state.settings || state.data.settings);
  state.data.settings = state.settings;
}

function renderArticles() {
  const articles = visibleArticles();
  qs("#newsCount").textContent = dashboardTone() === "minimal" ? `최소 · ${articles.length}개` : `${articles.length}개`;
  qs("#selectionRule").textContent = selectionRuleText();
  qs("#articleList").innerHTML = articles.map((article) => `
    <article class="article-card" data-topic="${escapeHtml(articleTopic(article))}">
      <div class="meta-row">
        <span class="tag">${escapeHtml(article.category)}</span>
        <span class="source">${escapeHtml(article.source)} · ${escapeHtml(articleCountry(article))} · ${escapeHtml(articleLanguage(article))} · ${escapeHtml(article.publishedAt)}</span>
      </div>
      <h4>${escapeHtml(article.cleanTitle)}</h4>
      <p class="article-brief">${escapeHtml(articlePlainSummary(article))}</p>
      <div class="selection-reason">
        <span>선정 이유</span>
        <p>${escapeHtml(articleSelectionReason(article))}</p>
      </div>
      <div class="article-grid article-grid--reader">
        ${detail("핵심 사실", article.facts, "primary")}
        ${detail("맥락", article.context || article.interpretation, "primary")}
        ${detail("오늘 볼 이유", article.implication, "primary")}
        ${detail("생각 질문", article.question, "primary")}
      </div>
      <details class="reading-lab">
        <summary>원문·번역 같이 보기</summary>
        <div class="reading-columns">
          <div>
            <span>원문 제목</span>
            <p>${escapeHtml(article.originalTitle || article.cleanTitle)}</p>
          </div>
          <div>
            <span>한국어 제목</span>
            <p>${escapeHtml(article.cleanTitle)}</p>
          </div>
          <div>
            <span>${articleLanguage(article) === "한국어" ? "한국어 원문 요지" : "원문 내용 요지"}</span>
            <p>${escapeHtml(articleOriginalExcerpt(article))}</p>
          </div>
          <div>
            <span>${articleLanguage(article) === "한국어" ? "쉬운 한국어 정리" : "한국어 번역"}</span>
            <p>${escapeHtml(articleTranslation(article))}</p>
          </div>
        </div>
        <div class="sentence-study">
          ${articleSentences(article).map((item) => `
            <div class="sentence-row">
              <p><strong>원문</strong>${escapeHtml(item.original)}</p>
              <p><strong>${articleLanguage(article) === "한국어" ? "정리" : "해석"}</strong>${escapeHtml(item.translated)}</p>
              <small>${escapeHtml(item.note || "원문과 한국어 정리를 나란히 두고 의미만 빠르게 확인합니다.")}</small>
            </div>
          `).join("")}
        </div>
      </details>
      ${comparisonBlock(article)}
      <div class="article-actions">
        ${article.url && article.url !== "#" ? `<a class="small-link" href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">원문 보기</a>` : `<span class="feedback-state">원문 링크 대기</span>`}
        <button class="small-button" type="button" data-article-read="translation" data-article-title="${escapeHtml(article.cleanTitle)}">번역 듣기</button>
        <button class="small-button" type="button" data-article-read="original" data-article-title="${escapeHtml(article.cleanTitle)}">원문 듣기</button>
        <button class="small-button" type="button" data-article-coach="${escapeHtml(article.cleanTitle)}">이 기사 왜?</button>
        <button class="small-button" type="button" data-feedback="useful" data-article-title="${escapeHtml(article.cleanTitle)}">유익함</button>
        <button class="small-button" type="button" data-feedback="later" data-article-title="${escapeHtml(article.cleanTitle)}">나중에 보기</button>
        <button class="small-button" type="button" data-feedback="low" data-article-title="${escapeHtml(article.cleanTitle)}">관심 낮음</button>
        <span class="feedback-state">${escapeHtml(feedbackLabel(state.feedback[article.cleanTitle]))}</span>
      </div>
    </article>
  `).join("");
  renderMoodDashboard();
}

function selectionRuleText() {
  const tone = dashboardTone();
  const config = dashboardToneConfig(tone);
  return `추천 기준: 조회수보다 업무 연결성, 오늘 판단에 필요한 맥락, 출처 다양성, 사용자의 피드백을 먼저 봅니다. ${config.badge}에서는 최대 ${config.articleLimit}개만 보여줍니다.`;
}

function comparisonBlock(article) {
  const peers = articleComparison(article);
  if (!peers.length) return "";
  return `
    <div class="topic-compare">
      <span>같은 주제 비교</span>
      <p>${escapeHtml(articleTopic(article))} 주제로 ${peers.length + 1}개 출처가 묶였습니다.</p>
      <div>
        ${peers.map((item) => `<small>${escapeHtml(item.source)} · ${escapeHtml(articleCountry(item))} · ${escapeHtml(item.cleanTitle)}</small>`).join("")}
      </div>
    </div>
  `;
}

function visibleArticles() {
  const limit = displayLimit("article");

  return allArticles()
    .filter((article) => !articleMatchesExclusion(article))
    .filter((article) => state.feedback[article.cleanTitle] !== "low")
    .sort((a, b) => articleSelectionScore(b, 0) - articleSelectionScore(a, 0))
    .slice(0, limit);
}

function articleMatchesExclusion(article) {
  const excluded = state.data.settings.excludedCategories || [];
  if (!excluded.length) return false;
  const haystack = [
    article.category,
    articleTopic(article),
    article.cleanTitle,
    article.originalTitle,
    article.source,
    articleCountry(article)
  ].filter(Boolean).join(" ").toLowerCase();
  return excluded.some((word) => haystack.includes(String(word).trim().toLowerCase()));
}

function findArticleByTitle(title) {
  return allArticles().find((article) => article.cleanTitle === title);
}

function feedbackLabel(value) {
  if (value === "useful") return "저장됨: 유익함";
  if (value === "later") return "저장됨: 나중에 보기";
  if (value === "low") return "저장됨: 관심 낮음";
  return "피드백 없음";
}

function detail(label, text, weight = "extra") {
  return `
    <div class="article-detail article-detail--${escapeHtml(weight)}">
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function allArticles() {
  return [...state.customArticles, ...state.data.articles];
}

function articleHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "원문";
  }
}

function renderMoodDashboard() {
  normalizeDailyFocus();
  const checkin = normalizeCheckin(state.checkin);
  const defaults = assistantDefaults(checkin.mode, checkin.energy, checkin.dayMode);
  const tone = dashboardTone(checkin);
  const config = dashboardToneConfig(tone);
  const tasks = activeTasks();
  const firstTask = tasks[0];
  const heroTask = checkin.mainTask || firstTask?.title || defaults.mainTask;
  const heroTaskNote = checkin.mainTask && checkin.mainTask !== firstTask?.title
    ? "첫 행동: 10분 안에 시작할 수 있게 작게 자릅니다."
    : firstTask?.firstAction || "첫 행동: 10분 안에 시작할 수 있게 작게 자릅니다.";
  const nextSchedule = nextScheduleItem();
  const firstArticle = visibleArticles()[0];
  const dashboard = qs("#dashboard");

  document.body.dataset.dashboardTone = tone;
  if (dashboard) dashboard.dataset.tone = tone;
  qs("#modeBadge").textContent = config.badge;
  qs("#dashboardMoodTitle").textContent = config.title;
  qs("#dashboardMoodGuide").textContent = config.guide;
  qs("#heroNow").textContent = heroTask;
  qs("#heroFirstAction").textContent = heroTaskNote;
  qs("#heroSchedule").textContent = nextSchedule ? `${nextSchedule.time} · ${nextSchedule.title}` : "다음 일정 없음";
  qs("#heroScheduleNote").textContent = nextSchedule
    ? `${nextSchedule.type || "일정"} · ${nextSchedule.reminderBefore || state.notifications.leadMinutes || 5}분 전 알림 후보`
    : "시간이 있는 일만 일정에 넣으면 알림이 정확해집니다.";
  qs("#heroArticle").textContent = firstArticle?.cleanTitle || "오늘 볼 기사 없음";
  qs("#heroArticleNote").textContent = firstArticle
    ? `${firstArticle.source} · ${articleCountry(firstArticle)} · ${firstArticle.category}`
    : "업무와 연결되는 원문 URL을 추가할 수 있습니다.";
  renderFocusState();
}

function updateFocusTimer() {
  const status = qs("#focusTimerStatus");
  if (!status || !focusTimerEndsAt) return;
  const remainingMs = Math.max(0, focusTimerEndsAt - Date.now());
  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.ceil((remainingMs % 60000) / 1000);
  const clock = qs("#focusTimerClock");
  if (clock) clock.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
  status.textContent = remainingMs > 0
    ? `첫 행동 진행 중 · 완료하면 오늘 집중 기록이 1회 올라갑니다. ${minutes}:${String(seconds).padStart(2, "0")} 남음`
    : "10분이 끝났습니다. 방금 한 일을 완료하거나 다음 첫 행동을 다시 잡아주세요.";
  status.classList.toggle("is-running", remainingMs > 0);
  qs("#focusOrbit")?.classList.toggle("is-running", remainingMs > 0);
  if (remainingMs <= 0) {
    window.clearInterval(focusTimerId);
    focusTimerId = 0;
    focusTimerEndsAt = 0;
  }
}

function startFocusTimer() {
  normalizeDailyFocus();
  window.clearInterval(focusTimerId);
  const firstTask = activeTasks()[0];
  state.focus.sessionsToday += 1;
  state.focus.lastStartedAt = new Date().toISOString();
  state.focus.activeTaskTitle = state.checkin.mainTask || firstTask?.title || "";
  focusTimerEndsAt = Date.now() + 10 * 60 * 1000;
  saveState();
  renderFocusState();
  updateFocusTimer();
  focusTimerId = window.setInterval(updateFocusTimer, 1000);
}

function renderFocusState() {
  normalizeDailyFocus();
  qs("#focusReward").textContent = `오늘 집중 ${state.focus.completedToday}회 · 시도 ${state.focus.sessionsToday}회`;
  if (!focusTimerEndsAt) {
    qs("#focusTimerClock").textContent = "10:00";
    qs("#focusOrbit")?.classList.remove("is-running");
  }
}

function completeFocusSession() {
  normalizeDailyFocus();
  state.focus.completedToday += 1;
  state.focus.lastCompletedAt = new Date().toISOString();
  const activeTitle = state.focus.activeTaskTitle || state.checkin.mainTask || activeTasks()[0]?.title;
  const task = state.tasks.find((item) => item.title === activeTitle && !["done", "hold"].includes(item.status));
  if (task) {
    task.status = "done";
    task.completedAt = new Date().toISOString();
  }
  window.clearInterval(focusTimerId);
  focusTimerId = 0;
  focusTimerEndsAt = 0;
  qs("#focusTimerStatus").textContent = "좋습니다. 10분 실행을 오늘 기록에 남겼습니다. 다음 일은 무리하지 말고 하나만 더 고르세요.";
  saveState();
  renderAll();
}

function shrinkFocusAction() {
  normalizeDailyFocus();
  state.focus.skippedToday += 1;
  const task = activeTasks()[0];
  if (task) {
    task.priority = "쪼개기";
    task.firstAction = "파일 열기, 제목 쓰기, 첫 줄 보기처럼 2분 안에 가능한 행동으로 줄이기";
  }
  qs("#focusTimerStatus").textContent = "벌점 대신 일을 더 작게 줄였습니다. 지금은 '시작 준비'만 해도 성공으로 봅니다.";
  saveState();
  renderAll();
}

function renderPlan() {
  const checkin = normalizeCheckin(state.checkin);
  const defaults = assistantDefaults(checkin.mode, checkin.energy, checkin.dayMode);
  const tasks = activeTasks();
  const nextSchedule = nextScheduleItem();
  const firstTask = tasks[0];
  const heroTask = checkin.mainTask || firstTask?.title || defaults.mainTask;
  const heroTaskNote = checkin.mainTask && checkin.mainTask !== firstTask?.title
    ? "첫 10분 행동을 정하면 바로 움직일 수 있습니다."
    : firstTask?.firstAction || "첫 10분 행동을 정하면 바로 움직일 수 있습니다.";
  const firstArticle = visibleArticles()[0];
  const deferredCount = state.tasks.filter((task) => task.status === "deferred").length;
  const loadMessage = tasks.length > 3
    ? "오늘 목록이 많습니다. 하나는 미루거나 10분짜리로 줄이는 게 좋습니다."
    : tasks.length === 0
      ? "아직 오늘 할 일이 없습니다. 핵심 업무를 할 일로 옮기면 시작점이 생깁니다."
      : "오늘 목록은 감당 가능한 범위입니다.";
  const scheduleState = nextSchedule ? scheduleStatus(nextSchedule) : null;

  renderDaySteps({ checkin, heroTask, nextSchedule, firstArticle, tasks });
  qs("#planBoard").innerHTML = [
    {
      label: "지금 할 행동",
      value: heroTask,
      note: heroTaskNote
    },
    {
      label: "다음 시간표",
      value: nextSchedule ? `${nextSchedule.time} · ${nextSchedule.title}` : "등록된 다음 일정 없음",
      note: nextSchedule ? `${scheduleState.label} · ${scheduleState.note}` : "시간이 있는 일만 시간표에 넣습니다."
    },
    {
      label: "오늘 목록 상태",
      value: deferredCount ? `미룬 일 ${deferredCount}개` : (tasks.length > 3 ? `${tasks.length}개 · 줄이기 필요` : `${tasks.length}개`),
      note: deferredCount ? "아래에서 오늘 처리, 10분으로 쪼개기, 보류 중 하나만 고릅니다." : loadMessage
    }
  ].map((item) => `
    <article class="plan-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <small>${escapeHtml(item.note)}</small>
    </article>
  `).join("");
  renderMoodDashboard();
}

function renderDaySteps({ checkin, heroTask, nextSchedule, firstArticle, tasks }) {
  const steps = [
    { label: "체크인", value: checkin.mainTask ? "완료" : "대기", detail: checkin.mainTask || "오늘 핵심을 먼저 적습니다." },
    { label: "날씨·일정", value: nextSchedule ? nextSchedule.time : "확인", detail: nextSchedule?.title || state.weather.daySummary || "외출 전 날씨와 시간표를 봅니다." },
    { label: "첫 10분", value: state.focus.completedToday ? `${state.focus.completedToday}회` : "대기", detail: heroTask },
    { label: "기사 판단", value: firstArticle ? `${visibleArticles().length}개` : "대기", detail: firstArticle?.cleanTitle || "업무에 연결되는 기사만 읽습니다." },
    { label: "마무리", value: tasks.length > 3 ? "줄이기" : "가볍게", detail: tasks.length > 3 ? "오늘 할 일을 덜어내야 합니다." : "다음 행동이나 회고만 남깁니다." }
  ];
  qs("#dayMapStatus").textContent = `${dashboardToneConfig(dashboardTone()).badge} · 5단계`;
  qs("#daySteps").innerHTML = steps.map((step, index) => `
    <article class="day-step ${index === 2 ? "is-current" : ""}">
      <span>${index + 1}</span>
      <div>
        <strong>${escapeHtml(step.label)}</strong>
        <em>${escapeHtml(step.value)}</em>
        <small>${escapeHtml(step.detail)}</small>
      </div>
    </article>
  `).join("");
}

function renderSchedule() {
  const orderedSchedule = [...state.schedule].sort((a, b) => {
    const left = scheduleDateTime(a)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const right = scheduleDateTime(b)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return left - right;
  });
  const visibleSchedule = orderedSchedule.slice(0, displayLimit("schedule"));
  const hiddenCount = Math.max(0, orderedSchedule.length - visibleSchedule.length);
  const list = visibleSchedule.length ? visibleSchedule.map((item) => {
    const status = scheduleStatus(item);
    return `
    <li class="schedule-item schedule-${escapeHtml(status.key)}">
      <div>
        <span class="schedule-status">${escapeHtml(status.label)}</span>
        <strong>${escapeHtml(item.time || "시간 미정")} · ${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.type || "직접 입력")} · ${escapeHtml(item.reminderBefore || state.notifications.leadMinutes || 5)}분 전 알림</small>
        <small>${escapeHtml(status.note)}</small>
      </div>
    </li>
    `;
  }).join("") : `<li class="empty-state">시간이 정해진 일정이 없습니다.</li>`;
  qs("#scheduleList").innerHTML = `${list}${hiddenCount ? `<li class="hidden-summary">컨디션 모드 때문에 ${hiddenCount}개를 접어두었습니다. 설정이나 컨디션을 바꾸면 더 보입니다.</li>` : ""}`;
}

function renderTasks() {
  const todayTasks = activeTasks();
  const deferredTasks = state.tasks.filter((task) => task.status === "deferred");
  const visibleTasks = todayTasks.slice(0, displayLimit("task"));
  const hiddenCount = Math.max(0, todayTasks.length - visibleTasks.length);
  qs("#taskLoad").textContent = state.checkin.dayMode === "off"
    ? "오프"
    : todayTasks.length > 3 ? "과적" : `${todayTasks.length}/3`;
  const taskList = visibleTasks.length ? visibleTasks.map((task) => `
    <li class="task-item ${priorityClass(task.priority)}">
      <div>
        <span class="priority-chip">${escapeHtml(task.priority || "보통")}</span>
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(priorityHelp(task.priority))}</small>
        <small>첫 10분 행동: ${escapeHtml(task.firstAction || "바로 시작할 가장 작은 행동 정하기")}</small>
      </div>
      <div class="task-actions">
        <button class="small-button" type="button" data-task-action="done" data-title="${escapeHtml(task.title)}">완료</button>
        <button class="small-button" type="button" data-task-action="defer" data-title="${escapeHtml(task.title)}">미루기</button>
        <button class="small-button" type="button" data-task-action="split" data-title="${escapeHtml(task.title)}">더 작게</button>
        <button class="small-button" type="button" data-task-action="delete" data-title="${escapeHtml(task.title)}">삭제</button>
      </div>
    </li>
  `).join("") : `<li class="empty-state">오늘 할 일이 없습니다. 체크인 핵심 업무를 할 일로 옮겨 시작점을 만들 수 있습니다.</li>`;
  qs("#taskList").innerHTML = `${taskList}${hiddenCount ? `<li class="hidden-summary">컨디션 모드 때문에 ${hiddenCount}개를 접어두었습니다. 오늘은 보이는 것부터 처리하세요.</li>` : ""}`;

  qs("#deferredList").innerHTML = deferredTasks.length
    ? deferredTasks.map((task) => `
      <div class="deferred-item">
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(task.daysDeferred || 1)}일 미룸 · 이유: ${escapeHtml(task.deferReason || "정하지 않음")}</small>
        <small>처리 방향을 하나만 고르면 오늘 목록이 덜 복잡해집니다.</small>
        <div class="deferred-actions">
          <button class="small-button" type="button" data-action="today" data-title="${escapeHtml(task.title)}">오늘 처리</button>
          <button class="small-button" type="button" data-action="split" data-title="${escapeHtml(task.title)}">10분으로 쪼개기</button>
          <button class="small-button" type="button" data-action="date" data-title="${escapeHtml(task.title)}">내일 다시</button>
          <button class="small-button" type="button" data-action="hold" data-title="${escapeHtml(task.title)}">보류</button>
          <button class="small-button" type="button" data-action="delete" data-title="${escapeHtml(task.title)}">삭제</button>
        </div>
      </div>
    `).join("")
    : `<p class="empty-state">미룬 일이 없습니다.</p>`;
}

function setBoardTab(tabName) {
  const nextTab = ["tasks", "schedule", "deferred"].includes(tabName) ? tabName : "tasks";
  qs(".action-lanes").dataset.activeBoardTab = nextTab;
  qsa("[data-board-tab]").forEach((button) => {
    const isActive = button.dataset.boardTab === nextTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function totalCategoryWeight() {
  return state.data.settings.categoryWeights.reduce((sum, item) => sum + Number(item.weight || 0), 0);
}

function setCategoryWeight(index, nextValue) {
  const weights = state.data.settings.categoryWeights;
  if (!weights[index]) return;
  weights[index].weight = Math.max(0, Math.min(100, Math.round(Number(nextValue || 0) / 5) * 5));
  let overflow = totalCategoryWeight() - 100;
  if (overflow <= 0) return;

  weights.forEach((item, itemIndex) => {
    if (itemIndex === index || overflow <= 0) return;
    const current = Number(item.weight || 0);
    const reduction = Math.min(current, overflow);
    item.weight = current - reduction;
    overflow -= reduction;
  });

  if (overflow > 0) {
    weights[index].weight = Math.max(0, Number(weights[index].weight || 0) - overflow);
  }
}

function uniqueTopics(values) {
  return [...new Set(values.map((item) => String(item).trim()).filter(Boolean))];
}

function renderWeights() {
  const total = totalCategoryWeight();
  const weightTotal = qs("#weightTotal");
  weightTotal.textContent = total > 100 ? `합계 ${total}% · 조정 필요` : `합계 ${total}%`;
  weightTotal.classList.toggle("is-warning", total > 100);
  qs("#dailyNewsCount").value = state.data.settings.dailyNewsCount;
  state.data.settings.excludedCategories = uniqueTopics(state.data.settings.excludedCategories || []);
  qs("#excludedCategories").value = state.data.settings.excludedCategories.join(", ");
  qs("#excludedChipList").innerHTML = state.data.settings.excludedCategories.length
    ? state.data.settings.excludedCategories.map((item) => `
      <button class="topic-chip" type="button" data-excluded-delete="${escapeHtml(item)}">
        #${escapeHtml(item)}
        <span aria-hidden="true">×</span>
      </button>
    `).join("")
    : `<span class="empty-state">제외 주제가 없습니다.</span>`;
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
  qs("#sourceList").innerHTML = (state.data.settings.newsSources || []).map((source, index) => `
    <div class="source-row">
      <div>
        <strong>${escapeHtml(source.name)}</strong>
        <small>${escapeHtml(source.url)}</small>
      </div>
      <a class="small-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">열기</a>
      <button class="small-button" type="button" data-source-delete="${index}">삭제</button>
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

  qs("#voiceEngine").value = state.voice.engine || "browser";
  qs("#voiceEndpoint").value = state.voice.endpoint || defaultVoiceEndpoint(state.voice.engine);
  voiceRate.value = state.voice.rate || 1;
  qs("#briefingScriptPreview").classList.toggle("is-hidden", !state.voice.scriptVisible);
  updateScriptPreview();
}

function notificationPermission() {
  return typeof Notification === "undefined" ? "unsupported" : Notification.permission;
}

function isStandalonePwa() {
  return Boolean(
    window.matchMedia?.("(display-mode: standalone)")?.matches
    || window.navigator.standalone
  );
}

function yesNo(value) {
  return value ? "가능" : "확인 필요";
}

function setPushStatus(message, tone = "neutral") {
  const status = qs("#pushConfigStatus");
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function pushConfig() {
  const config = window.MorningDeskStorage?.getConfig?.() || {};
  const url = config.supabase?.url?.replace(/\/$/, "") || "";
  const anonKey = config.supabase?.anonKey || "";
  const profileId = config.profileId || "";
  if (!url || !anonKey || !profileId || profileId === "default") return null;
  return {
    endpoint: `${url}/functions/v1/morningdesk-push`,
    anonKey,
    profileId,
    deviceLabel: config.deviceLabel || "device"
  };
}

function base64UrlToUint8Array(value) {
  const padding = "=".repeat((4 - value.length % 4) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
}

async function pushRequest(action, payload = {}, method = "POST") {
  const config = pushConfig();
  if (!config) throw new Error("먼저 PC·휴대폰 온라인 동기화를 연결해주세요.");
  const response = await fetch(config.endpoint, {
    method,
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json"
    },
    body: method === "GET" ? undefined : JSON.stringify({
      action,
      profileKey: config.profileId,
      deviceLabel: config.deviceLabel,
      ...payload
    })
  });
  let result = {};
  try {
    result = await response.json();
  } catch {
    result = {};
  }
  if (!response.ok) {
    if (response.status === 404) throw new Error("Supabase 백그라운드 알림 서버를 먼저 배포해야 합니다.");
    throw new Error(result.error || "백그라운드 알림 서버에 연결하지 못했습니다.");
  }
  return result;
}

async function enableBackgroundPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("이 기기는 백그라운드 Web Push를 지원하지 않습니다.");
  }
  if (!isStandalonePwa()) {
    throw new Error("아이폰에서는 홈 화면에 추가한 모닝데스크 앱으로 실행해주세요.");
  }
  const permission = notificationPermission() === "granted"
    ? "granted"
    : await Notification.requestPermission();
  if (permission !== "granted") throw new Error("알림 권한을 허용해야 연결할 수 있습니다.");

  const config = pushConfig();
  if (!config) throw new Error("먼저 PC·휴대폰 온라인 동기화를 연결해주세요.");
  const keyResult = await pushRequest("public-key", {}, "GET");
  if (!keyResult.publicKey) throw new Error("푸시 공개 키가 준비되지 않았습니다.");
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64UrlToUint8Array(keyResult.publicKey)
    });
  }
  await pushRequest("subscribe", { subscription: subscription.toJSON() });
  return subscription;
}

function notificationDiagnostics() {
  const serviceWorkerSupported = "serviceWorker" in navigator;
  const pushSupported = "PushManager" in window;
  const notificationSupported = typeof Notification !== "undefined";
  const vibrationSupported = typeof navigator.vibrate === "function";
  const secure = window.isSecureContext || ["https:", "http:"].includes(location.protocol) && ["localhost", "127.0.0.1"].includes(location.hostname);
  return [
    {
      label: "공개 HTTPS",
      value: secure ? "OK" : "필요",
      detail: secure ? "알림과 PWA 설치에 필요한 보안 조건입니다." : "GitHub Pages 같은 HTTPS 주소로 열어야 합니다.",
      ok: secure
    },
    {
      label: "홈 화면 앱",
      value: isStandalonePwa() ? "앱 모드" : "브라우저",
      detail: isStandalonePwa() ? "홈 화면에서 실행 중입니다." : "iPhone은 공유 버튼에서 홈 화면에 추가한 뒤 알림을 확인하세요.",
      ok: isStandalonePwa()
    },
    {
      label: "알림 API",
      value: notificationSupported ? notificationPermission() : "미지원",
      detail: notificationSupported ? "권한 버튼을 누르면 현재 기기의 알림 권한을 요청합니다." : "이 브라우저는 웹 알림을 지원하지 않습니다.",
      ok: notificationSupported && notificationPermission() === "granted"
    },
    {
      label: "서비스워커",
      value: yesNo(serviceWorkerSupported),
      detail: serviceWorkerSupported ? "앱 캐시와 알림 클릭 처리가 가능합니다." : "서비스워커가 없으면 PWA 기능이 제한됩니다.",
      ok: serviceWorkerSupported
    },
    {
      label: "진동 요청",
      value: vibrationSupported ? "직접 지원" : "OS 제어",
      detail: vibrationSupported
        ? "알림과 함께 짧은 진동 패턴을 요청할 수 있습니다."
        : "iPhone은 웹이 진동 패턴을 직접 강제하지 못하며 iOS 알림 설정과 집중 모드가 결정합니다.",
      ok: vibrationSupported || isStandalonePwa()
    },
    {
      label: "백그라운드 Push",
      value: yesNo(pushSupported),
      detail: pushSupported ? "서버 Web Push를 붙이면 앱이 닫혀도 알림을 보낼 수 있습니다." : "현재는 앱이 열려 있을 때의 일정 알림만 안정적으로 검증합니다.",
      ok: pushSupported
    }
  ];
}

function renderNotificationSettings() {
  state.notifications = normalizeNotifications(state.notifications);
  qs("#notificationLead").value = String(state.notifications.leadMinutes || 5);
  qs("#notifyPopup").checked = state.notifications.popup;
  qs("#notifySound").checked = state.notifications.sound;
  qs("#notifyVibration").checked = state.notifications.vibration;
  qs("#notifyOpenOnClick").checked = state.notifications.openOnClick;
  const permission = notificationPermission();
  const label = permission === "granted" && state.notifications.enabled
    ? "알림 켜짐"
    : permission === "denied"
      ? "권한 차단"
      : permission === "unsupported"
        ? "미지원"
        : "권한 필요";
  qs("#notificationState").textContent = label;
  const diagnostics = qs("#notificationDiagnostics");
  if (diagnostics) {
    diagnostics.innerHTML = notificationDiagnostics().map((item) => `
      <div class="diagnostic-item ${item.ok ? "is-ok" : "is-waiting"}">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
        <small>${escapeHtml(item.detail)}</small>
      </div>
    `).join("");
  }
  if (!pushConfig()) {
    setPushStatus("온라인 동기화를 연결하면 앱이 닫힌 상태의 알림을 설정할 수 있습니다.", "neutral");
  } else if (!("PushManager" in window)) {
    setPushStatus("현재 실행 환경은 백그라운드 Web Push를 지원하지 않습니다.", "warning");
  } else {
    setPushStatus("Supabase 알림 서버 배포가 끝나면 이 기기를 연결할 수 있습니다.", "neutral");
  }
}

function playNotificationSound() {
  if (!state.notifications.sound) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 660;
    gain.gain.value = 0.04;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    window.setTimeout(() => {
      oscillator.stop();
      context.close();
    }, 180);
  } catch {
    // Sound is optional and can be blocked until the user interacts with the page.
  }
}

function requestNotificationVibration() {
  if (!state.notifications.vibration || typeof navigator.vibrate !== "function") return;
  navigator.vibrate([160, 80, 160]);
}

async function showMorningNotification(title, body, tag) {
  if (!state.notifications.enabled || !state.notifications.popup || notificationPermission() !== "granted") return;
  playNotificationSound();
  requestNotificationVibration();
  const options = {
    body,
    tag,
    badge: "./icons/morningdesk-icon.svg",
    icon: "./icons/morningdesk-icon.svg",
    data: { url: location.href }
  };
  if (state.notifications.vibration) options.vibrate = [160, 80, 160];

  if (navigator.serviceWorker?.ready) {
    try {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, options);
      return;
    } catch {
      // Fall back to direct notification below.
    }
  }

  const notification = new Notification(title, options);
  notification.onclick = () => {
    if (state.notifications.openOnClick) window.focus();
  };
}

function checkScheduleNotifications() {
  if (!state.notifications.enabled || notificationPermission() !== "granted") return;
  const now = new Date();
  state.schedule.forEach((item, index) => {
    const date = scheduleDateTime(item);
    if (!date) return;
    const diffMinutes = Math.round((date - now) / 60000);
    const lead = Number(item.reminderBefore || state.notifications.leadMinutes || 5);
    [
      { at: lead, label: `${lead}분 전` },
      { at: 1, label: "1분 전" },
      { at: 0, label: "지금" }
    ].forEach((reminder) => {
      const key = `${todayText()}-${index}-${item.time}-${reminder.at}`;
      if (sentNotifications.has(key)) return;
      if (diffMinutes <= reminder.at && diffMinutes > reminder.at - 1) {
        sentNotifications.add(key);
        showMorningNotification("모닝데스크 일정 알림", `${reminder.label} · ${item.title}`, key);
      }
    });
  });
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
  const todayTasks = state.tasks.filter((task) => !["deferred", "hold", "done"].includes(task.status));
  const taskText = todayTasks.length
    ? todayTasks.slice(0, 3).map((task) => task.title).join(". ")
    : "등록된 할 일은 없습니다";
  const articles = visibleArticles();
  const articleText = articles.length
    ? articles.map((article, index) => `${index + 1}번 기사. ${article.cleanTitle}. 선정 이유는 ${articleSelectionReason(article)}. 생각 질문은, ${article.question}`).join(". ")
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

async function speakWithLocalEngine(script) {
  const endpoint = (state.voice.endpoint || "").trim();
  if (!endpoint) {
    updateVoiceStatus("로컬 TTS 주소가 없습니다. PC에서 엔진을 켠 뒤 주소를 입력해주세요.");
    return;
  }

  updateVoiceStatus(`${engineLabel(state.voice.engine)}에 읽기를 요청하는 중입니다.`);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: script,
        lang: "ko-KR",
        rate: Number(state.voice.rate || 1),
        engine: state.voice.engine
      })
    });
    if (!response.ok) throw new Error("local voice engine failed");
    updateVoiceStatus(`${engineLabel(state.voice.engine)}로 브리핑을 보냈습니다.`);
  } catch {
    updateVoiceStatus("로컬 TTS에 연결하지 못했습니다. 엔진 실행 상태와 주소를 확인해주세요.");
  }
}

function engineLabel(engine) {
  if (engine === "kokoro") return "Kokoro";
  if (engine === "melo") return "MeloTTS";
  if (engine === "sherpa") return "sherpa-onnx";
  return "브라우저 기본 음성";
}

function speakText(script, { lang = "ko-KR", label = "브리핑" } = {}) {
  if (state.voice.engine && state.voice.engine !== "browser") {
    speakWithLocalEngine(script);
    return;
  }

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    updateVoiceStatus("이 브라우저에서는 읽어주기를 지원하지 않습니다.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(script);
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.voiceURI === state.voice.voiceURI);
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = lang;
  utterance.rate = Number(state.voice.rate || qs("#voiceRate").value || 1);
  utterance.pitch = 1;
  utterance.onstart = () => updateVoiceStatus(`${label}을 읽는 중입니다.`);
  utterance.onend = () => updateVoiceStatus("읽기를 마쳤습니다.");
  utterance.onerror = () => updateVoiceStatus("읽는 중 문제가 생겼습니다. 브라우저 음성 설정을 확인해주세요.");
  window.speechSynthesis.speak(utterance);
}

function readBriefing() {
  speakText(buildBriefingScript(), { label: "브리핑" });
}

function renderAll() {
  renderSummary();
  renderDateWeather();
  renderPlan();
  renderArticles();
  renderSchedule();
  renderTasks();
  renderWeights();
  renderReflections();
  renderVoiceSettings();
  renderNotificationSettings();
}

function weatherText(code) {
  const weatherCodes = {
    0: "맑음",
    1: "대체로 맑음",
    2: "구름 조금",
    3: "흐림",
    45: "안개",
    48: "서리 안개",
    51: "가벼운 이슬비",
    53: "이슬비",
    55: "강한 이슬비",
    61: "약한 비",
    63: "비",
    65: "강한 비",
    71: "약한 눈",
    73: "눈",
    75: "강한 눈",
    80: "소나기",
    81: "소나기",
    82: "강한 소나기",
    95: "뇌우"
  };
  return weatherCodes[code] || "날씨 확인";
}

function renderDateWeather() {
  const dateCard = qs("#dateCard");
  const weatherSummary = qs("#weatherSummary");
  const weatherDetail = qs("#weatherDetail");
  const weatherLocation = qs("#weatherLocation");
  const weatherDay = qs("#weatherDay");
  const weatherRisk = qs("#weatherRisk");
  if (dateCard) dateCard.textContent = todayText();
  if (!weatherSummary || !weatherDetail) return;

  weatherSummary.textContent = state.weather.summary || "위치 기반 날씨 대기 중";
  weatherDetail.textContent = state.weather.detail || "위치 권한을 허용하면 현재 지역 날씨를 보여드립니다.";
  if (weatherLocation) weatherLocation.textContent = state.weather.locationName || "현재 위치 확인 전";
  if (weatherDay) weatherDay.textContent = state.weather.daySummary || "오늘 하루 예보와 특보 후보를 함께 봅니다.";
  if (weatherRisk) weatherRisk.textContent = state.weather.risk || "특보: 위치 확인 후 표시";
}

async function fetchWeatherByLocation(position) {
  const { latitude, longitude } = position.coords;
  state.weather = {
    ...state.weather,
    status: "loading",
    latitude,
    longitude,
    summary: "날씨 가져오는 중",
    detail: "현재 위치 기준으로 확인하고 있습니다.",
    locationName: `현재 위치 ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
    source: "Open-Meteo 실시간 · 기상청 특보 직접 연동 전"
  };
  renderDateWeather();

  try {
    const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
    endpoint.searchParams.set("latitude", latitude.toFixed(4));
    endpoint.searchParams.set("longitude", longitude.toFixed(4));
    endpoint.searchParams.set("current", "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m");
    endpoint.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max");
    endpoint.searchParams.set("timezone", "auto");
    const response = await fetch(endpoint.toString());
    if (!response.ok) throw new Error("weather unavailable");
    const data = await response.json();
    const current = data.current || {};
    const temp = Math.round(Number(current.temperature_2m));
    const feel = Math.round(Number(current.apparent_temperature));
    const humidity = Math.round(Number(current.relative_humidity_2m));
    const wind = Math.round(Number(current.wind_speed_10m));
    const daily = data.daily || {};
    const maxTemp = Math.round(Number(daily.temperature_2m_max?.[0]));
    const minTemp = Math.round(Number(daily.temperature_2m_min?.[0]));
    const rainChance = Math.round(Number(daily.precipitation_probability_max?.[0] || 0));
    const maxWind = Math.round(Number(daily.wind_speed_10m_max?.[0] || wind));
    const weatherRisk = rainChance >= 60
      ? `주의: 비 가능성 ${rainChance}% · 우산 확인`
      : maxWind >= 35
        ? `주의: 바람 강함 ${maxWind}km/h`
        : "특보: 기상청 특보 직접 연동 전 · 큰 위험 신호 없음";
    state.weather = {
      ...state.weather,
      status: "ready",
      summary: `${weatherText(current.weather_code)} · ${temp}°C`,
      detail: `체감 ${feel}°C · 습도 ${humidity}% · 바람 ${wind}km/h`,
      daySummary: `오늘 ${minTemp}~${maxTemp}°C · 비 가능성 ${rainChance}% · 최대 바람 ${maxWind}km/h`,
      risk: weatherRisk,
      locationName: `현재 위치 ${latitude.toFixed(3)}, ${longitude.toFixed(3)} · 기상청 기준은 다음 연동 후보`,
      updatedAt: new Date().toISOString()
    };
  } catch {
    state.weather = {
      ...state.weather,
      status: "error",
      summary: "날씨 연결 실패",
      detail: "인터넷 연결이나 위치 권한을 확인해주세요.",
      daySummary: "하루 예보를 가져오지 못했습니다.",
      risk: "특보: 확인 실패"
    };
  }
  renderDateWeather();
}

function requestWeather() {
  if (!("geolocation" in navigator)) {
    state.weather = {
      ...state.weather,
      status: "unsupported",
      summary: "위치 확인 불가",
      detail: "이 브라우저에서는 위치 기반 날씨를 지원하지 않습니다.",
      locationName: "현재 위치 확인 불가",
      risk: "특보: 위치 확인 필요"
    };
    renderDateWeather();
    return;
  }

  state.weather = {
    ...state.weather,
    status: "permission",
    summary: "위치 권한 확인 중",
    detail: "브라우저가 위치 사용 허용을 요청할 수 있습니다.",
    locationName: "현재 위치 권한 대기 중",
    daySummary: "오늘 하루 예보를 불러올 준비 중입니다.",
    risk: "특보: 위치 확인 후 표시"
  };
  renderDateWeather();
  navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, () => {
    state.weather = {
      ...state.weather,
      status: "blocked",
      summary: "날씨 권한 필요",
      detail: "위치 권한을 허용하면 현재 지역 날씨를 표시합니다.",
      locationName: "현재 위치 권한이 꺼져 있습니다.",
      daySummary: "날씨는 외출 판단용이므로 권한 허용 뒤 다시 확인해주세요.",
      risk: "특보: 위치 권한 필요"
    };
    renderDateWeather();
  }, {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 1000 * 60 * 30
  });
}

function showDashboard() {
  stopVoiceAdvanceListening({ keepEnabled: true });
  qs("#threshold").classList.add("is-hidden");
  qs("#dashboard").classList.remove("is-hidden");
  renderAll();
}

function showThreshold() {
  qs("#threshold").classList.remove("is-hidden");
  qs("#dashboard").classList.add("is-hidden");
  setCheckinStage("intro");
  if (voiceAdvanceEnabled) {
    voiceAdvancePaused = false;
    startVoiceAdvanceListening();
  }
}

function bindEvents() {
  document.querySelectorAll("[data-state]").forEach((button) => {
    button.addEventListener("click", () => setCheckinState(button.dataset.state));
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setCheckinMode(button.dataset.mode));
  });

  document.querySelectorAll("[data-energy]").forEach((button) => {
    button.addEventListener("click", () => setEnergy(button.dataset.energy));
  });

  document.querySelectorAll("[data-day-mode]").forEach((button) => {
    button.addEventListener("click", () => setDayMode(button.dataset.dayMode));
  });

  ["#mainTask", "#avoidMistake", "#intention"].forEach((selector) => {
    qs(selector).addEventListener("input", updateCheckinInterface);
  });

  qs("#checkinForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.checkin = readCheckinFromForm();
    saveState();
    showDashboard();
  });

  qs("#introNext").addEventListener("click", advanceCheckin);
  qs("#cardNext").addEventListener("click", advanceCheckin);
  qs("#checkinBack").addEventListener("click", goBackCheckin);
  qs("#introVoiceAdvance").addEventListener("click", toggleVoiceAdvance);
  qs("#checkinVoiceAdvance").addEventListener("click", toggleVoiceAdvance);

  qs("#quickStart").addEventListener("click", () => {
    setCheckinState("light");
    state.checkin = readCheckinFromForm();
    saveState();
    showDashboard();
  });

  qs("#offDay").addEventListener("click", () => {
    setCheckinState("off");
    state.checkin = readCheckinFromForm();
    saveState();
    showDashboard();
  });

  qs("#resetCheckin").addEventListener("click", showThreshold);
  qs("#openSettings").addEventListener("click", () => {
    qs("#settingsDrawer").classList.add("is-open");
    qs("#settingsDrawer").setAttribute("aria-hidden", "false");
  });
  qs("#closeSettings").addEventListener("click", () => {
    qs("#settingsDrawer").classList.remove("is-open");
    qs("#settingsDrawer").setAttribute("aria-hidden", "true");
  });
  qs("#readBriefingHero").addEventListener("click", readBriefing);
  qs("#startFocusTimer").addEventListener("click", startFocusTimer);
  qs("#completeFocus").addEventListener("click", completeFocusSession);
  qs("#shrinkFocus").addEventListener("click", shrinkFocusAction);
  qs("#readBriefing").addEventListener("click", readBriefing);
  qs("#stopReading").addEventListener("click", stopReading);
  qs("#refreshWeather").addEventListener("click", requestWeather);
  qs("#addCheckinTask").addEventListener("click", () => {
    const checkin = normalizeCheckin(state.checkin);
    const defaults = assistantDefaults(checkin.mode, checkin.energy, checkin.dayMode);
    const title = checkin.mainTask || defaults.mainTask;
    if (state.tasks.some((task) => task.title === title && !["done", "hold"].includes(task.status))) return;
    state.tasks.unshift({
      title,
      priority: "핵심",
      status: "today",
      firstAction: "첫 10분 행동 정하기",
      createdAt: new Date().toISOString()
    });
    saveState();
    renderTasks();
    renderPlan();
  });
  qs("#voiceEngine").addEventListener("change", () => {
    state.voice.engine = qs("#voiceEngine").value;
    state.voice.endpoint = state.voice.endpoint || defaultVoiceEndpoint(state.voice.engine);
    if (state.voice.engine !== "browser" && !qs("#voiceEndpoint").value) {
      state.voice.endpoint = defaultVoiceEndpoint(state.voice.engine);
    }
    renderVoiceSettings();
    saveState();
    updateVoiceStatus(`${engineLabel(state.voice.engine)} 모드로 바꿨습니다.`);
  });
  qs("#voiceEndpoint").addEventListener("change", () => {
    state.voice.endpoint = qs("#voiceEndpoint").value.trim();
    saveState();
    updateVoiceStatus("로컬 TTS 주소를 저장했습니다.");
  });
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
      notifications: state.notifications,
      focus: state.focus,
      settings: state.data.settings,
      schedule: state.schedule,
      tasks: state.tasks,
      customArticles: state.customArticles,
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
    const reminderBefore = Number(qs("#scheduleReminder").value || state.notifications.leadMinutes || 5);
    if (!title) return;
    state.schedule.push({ time, title, type: "직접 입력", reminderBefore });
    qs("#scheduleTitle").value = "";
    saveState();
    renderSchedule();
    renderPlan();
  });

  qs("#articleCaptureForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const url = qs("#articleUrl").value.trim();
    const title = qs("#articleTitle").value.trim();
    if (!url) return;
    state.customArticles.unshift({
      category: "직접 추가",
      source: articleHost(url),
      publishedAt: "직접 추가",
      cleanTitle: title || articleHost(url),
      originalTitle: title || "원문 링크 직접 추가",
      originalExcerpt: "원문 링크를 직접 추가했습니다. 본문 요약은 AI 요약 단계에서 보강할 수 있습니다.",
      translation: "직접 추가한 원문입니다. 지금은 링크와 제목을 보관하고, 나중에 요약을 붙이는 후보로 둡니다.",
      facts: "사용자가 원문 확인을 위해 직접 추가한 기사입니다.",
      interpretation: "요약이 필요하면 나중에 AI 요약 단계에서 보강합니다.",
      otherView: "원문을 직접 열어 세부 맥락과 수치를 확인합니다.",
      implication: "오늘 브리핑에서 다시 확인할 정보 후보로 둡니다.",
      question: "이 원문에서 오늘 내가 확인해야 할 핵심은 무엇인가?",
      opportunity: "중요한 링크를 브리핑 안에 보관할 수 있습니다.",
      url,
      addedAt: new Date().toISOString()
    });
    qs("#articleUrl").value = "";
    qs("#articleTitle").value = "";
    saveState();
    renderArticles();
    updateScriptPreview();
  });

  qs("#articleList").addEventListener("click", (event) => {
    const readButton = event.target.closest("button[data-article-read]");
    if (readButton) {
      const article = findArticleByTitle(readButton.dataset.articleTitle);
      if (!article) return;
      if (readButton.dataset.articleRead === "original") {
        speakText(`${article.originalTitle || article.cleanTitle}. ${articleOriginalExcerpt(article)}`, { lang: articleLanguage(article) === "영어" ? "en-US" : "ko-KR", label: "원문" });
        return;
      }
      speakText(`${article.cleanTitle}. ${articleTranslation(article)}`, { lang: "ko-KR", label: "번역본" });
      return;
    }

    const coachButton = event.target.closest("button[data-article-coach]");
    if (coachButton) {
      const article = findArticleByTitle(coachButton.dataset.articleCoach);
      if (!article) return;
      qs("#articleCoach").innerHTML = `
        <strong>${escapeHtml(article.cleanTitle)}</strong>
        <span>${escapeHtml(articleSelectionReason(article))}</span>
        <small>업무 연결: ${escapeHtml(article.implication || articlePlainSummary(article))}</small>
        <small>확인 질문: ${escapeHtml(article.question || "이 기사에서 오늘 확인할 수치나 사람은 무엇인가?")}</small>
      `;
      return;
    }

    const button = event.target.closest("button[data-feedback]");
    if (!button) return;
    state.feedback[button.dataset.articleTitle] = button.dataset.feedback;
    saveState();
    renderArticles();
  });

  qs("#taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = qs("#taskTitle").value.trim();
    const firstAction = qs("#taskFirstAction").value.trim() || "첫 10분 행동 정하기";
    const priority = qs("#taskPriority").value || "보통";
    if (!title) return;
    state.tasks.unshift({ title, priority, status: "today", firstAction, createdAt: new Date().toISOString() });
    qs("#taskTitle").value = "";
    qs("#taskFirstAction").value = "";
    saveState();
    renderTasks();
    renderPlan();
  });

  qs("#settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (totalCategoryWeight() > 100) {
      qs("#weightTotal").textContent = "합계가 100%를 넘었습니다.";
      qs("#weightTotal").classList.add("is-warning");
      return;
    }
    state.data.settings.dailyNewsCount = Number(qs("#dailyNewsCount").value || 3);
    state.data.settings.excludedCategories = uniqueTopics(qs("#excludedCategories").value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean));
    state.settings = state.data.settings;
    saveState();
    renderArticles();
    renderWeights();
  });

  qs("#sourceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = qs("#sourceName").value.trim();
    const url = qs("#sourceUrl").value.trim();
    if (!name || !url) return;
    state.data.settings.newsSources = [...(state.data.settings.newsSources || []), { name, url }];
    state.settings = state.data.settings;
    qs("#sourceName").value = "";
    qs("#sourceUrl").value = "";
    saveState();
    renderWeights();
  });

  qs("#sourceList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-source-delete]");
    if (!button) return;
    const index = Number(button.dataset.sourceDelete);
    state.data.settings.newsSources = (state.data.settings.newsSources || []).filter((_, itemIndex) => itemIndex !== index);
    state.settings = state.data.settings;
    saveState();
    renderWeights();
  });

  qs("#applyRecommendedSettings").addEventListener("click", () => {
    state.data.settings.dailyNewsCount = 5;
    state.data.settings.excludedCategories = ["스포츠", "연예", "가십", "단순 사건사고"];
    state.data.settings.categoryWeights = [
      { name: "업무/관심 분야", weight: 40 },
      { name: "경제/사회", weight: 20 },
      { name: "기술/과학", weight: 15 },
      { name: "국제 뉴스", weight: 15 },
      { name: "시야 확장", weight: 10 }
    ];
    state.settings = state.data.settings;
    saveState();
    renderWeights();
    renderArticles();
  });

  qs("#enableNotifications").addEventListener("click", async () => {
    if (typeof Notification === "undefined") {
      state.notifications.enabled = false;
      state.notifications.permission = "unsupported";
      renderNotificationSettings();
      return;
    }
    const permission = await Notification.requestPermission();
    state.notifications.permission = permission;
    state.notifications.enabled = permission === "granted";
    saveState();
    renderNotificationSettings();
    if (permission === "granted") {
      showMorningNotification("모닝데스크 알림", "알림이 켜졌습니다. 일정 시간에 맞춰 알려드릴게요.", "notification-test");
    }
  });

  qs("#testNotification").addEventListener("click", async () => {
    if (typeof Notification === "undefined") {
      qs("#notificationState").textContent = "미지원";
      renderNotificationSettings();
      return;
    }
    if (notificationPermission() !== "granted") {
      const permission = await Notification.requestPermission();
      state.notifications.permission = permission;
      state.notifications.enabled = permission === "granted";
    } else {
      state.notifications.enabled = true;
    }
    state.notifications.sound = qs("#notifySound").checked;
    state.notifications.vibration = qs("#notifyVibration").checked;
    saveState();
    renderNotificationSettings();
    if (notificationPermission() === "granted") {
      showMorningNotification("모닝데스크 테스트", "이 알림이 보이면 현재 기기에서 기본 알림 표시가 됩니다.", `notification-test-${Date.now()}`);
    }
  });

  qs("#notificationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.notifications = normalizeNotifications({
      ...state.notifications,
      leadMinutes: Number(qs("#notificationLead").value || 5),
      popup: qs("#notifyPopup").checked,
      sound: qs("#notifySound").checked,
      vibration: qs("#notifyVibration").checked,
      openOnClick: qs("#notifyOpenOnClick").checked,
      permission: notificationPermission()
    });
    saveState();
    renderNotificationSettings();
    renderSchedule();
    renderPlan();
  });

  qs("#enableBackgroundPush").addEventListener("click", async () => {
    setPushStatus("이 기기를 백그라운드 알림에 연결하고 있습니다.", "neutral");
    try {
      await enableBackgroundPush();
      setPushStatus("연결됐습니다. 앱을 닫은 뒤 백그라운드 테스트를 눌러 확인하세요.", "success");
    } catch (error) {
      setPushStatus(error.message || "백그라운드 알림 연결에 실패했습니다.", "error");
    }
  });

  qs("#testBackgroundPush").addEventListener("click", async () => {
    setPushStatus("서버에서 이 기기로 테스트 알림을 보내고 있습니다.", "neutral");
    try {
      const result = await pushRequest("test", {
        vibration: qs("#notifyVibration").checked
      });
      const sent = Number(result.sent || 0);
      setPushStatus(sent
        ? `${sent}개 기기로 테스트 알림을 보냈습니다.`
        : "연결된 기기가 없습니다. 먼저 이 기기의 백그라운드 알림을 연결해주세요.", sent ? "success" : "warning");
    } catch (error) {
      setPushStatus(error.message || "백그라운드 테스트에 실패했습니다.", "error");
    }
  });

  qs("#syncForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nextConfig = syncFormConfig();
    if (nextConfig.storageMode === "supabase" && nextConfig.profileId === "default") {
      setSyncStatus("온라인 동기화는 기본값 대신 안전한 프로필 키를 먼저 만들어주세요.", "warning");
      return;
    }
    window.MorningDeskStorage.saveConfig(nextConfig);
    const writeVersion = ++storageWriteVersion;
    qs("#storageStatus").textContent = nextConfig.storageMode === "supabase" ? "온라인 확인 중" : "로컬 저장";
    setSyncStatus(nextConfig.storageMode === "supabase"
      ? "온라인 저장소에 연결을 시도합니다."
      : "이 브라우저에만 저장하도록 바꿨습니다.", "neutral");
    const result = nextConfig.storageMode === "supabase"
      ? await window.MorningDeskStorage.load({ preferRemote: true })
      : await window.MorningDeskStorage.save(snapshotState());
    if (writeVersion !== storageWriteVersion) return;
    if (result.state) {
      applySavedState(result.state);
      renderAll();
    }
    updateStorageStatus(result);
    const connectedMessage = result.source === "remote"
      ? "기존 온라인 데이터를 이 기기로 가져왔습니다."
      : result.source === "local"
        ? "온라인 공간이 비어 있어 이 기기 데이터를 처음 올렸습니다."
        : "동기화 설정을 저장했습니다. 아직 저장된 데이터는 없습니다.";
    setSyncStatus(result.mode === "supabase" && result.online
      ? connectedMessage
      : syncStatusMessage(result), result.mode === "supabase" && result.online ? "success" : "warning");
  });

  qs("#syncConnectionTest").addEventListener("click", async () => {
    const candidate = syncFormConfig();
    candidate.storageMode = "supabase";
    setSyncStatus("Supabase 연결과 RLS 정책을 확인하고 있습니다.", "neutral");
    const result = await window.MorningDeskStorage.testConnection(candidate);
    if (result.ok) {
      setSyncStatus(result.rowExists
        ? "연결 성공 · 이 프로필의 온라인 데이터가 확인됐습니다. 설정 저장 후 동기화할 수 있습니다."
        : "연결 성공 · 테이블과 RLS가 정상입니다. 아직 이 프로필의 온라인 데이터는 없습니다.", "success");
      return;
    }
    setSyncStatus(result.message || "연결을 확인하지 못했습니다.", result.code === "missing" || result.code === "profile" ? "warning" : "error");
  });

  qs("#syncNow").addEventListener("click", async () => {
    setSyncStatus("동기화 중입니다.", "neutral");
    await reloadFromStorage();
  });

  qs("#generateProfileId").addEventListener("click", () => {
    qs("#syncProfileId").value = generateProfileId();
    setSyncStatus("새 프로필 키를 만들었습니다. 휴대폰과 PC에 같은 키를 넣으면 같은 데이터를 봅니다.", "success");
  });

  qs("#copyProfileId").addEventListener("click", async () => {
    const input = qs("#syncProfileId");
    const profileId = input.value.trim();
    if (!profileId || profileId === "default") {
      setSyncStatus("먼저 안전한 프로필 키를 만들어주세요.", "warning");
      return;
    }
    try {
      await navigator.clipboard.writeText(profileId);
      setSyncStatus("프로필 키를 복사했습니다. 다른 기기의 같은 입력란에 붙여 넣으세요.", "success");
    } catch {
      input.focus();
      input.select();
      setSyncStatus("프로필 키를 선택했습니다. 브라우저의 복사 기능을 사용해주세요.", "warning");
    }
  });

  qs("#weightEditor").addEventListener("input", (event) => {
    const rangeIndex = event.target.dataset.weightIndex;
    const numberIndex = event.target.dataset.weightNumber;
    const index = rangeIndex ?? numberIndex;
    if (index === undefined) return;
    const nextValue = Number(event.target.value || 0);
    setCategoryWeight(Number(index), nextValue);
    renderWeights();
  });

  qs("#addExcludedTopic").addEventListener("click", () => {
    const input = qs("#excludedTopicInput");
    const topic = input.value.trim();
    if (!topic) return;
    state.data.settings.excludedCategories = uniqueTopics([...(state.data.settings.excludedCategories || []), topic]);
    input.value = "";
    state.settings = state.data.settings;
    saveState();
    renderWeights();
    renderArticles();
  });

  qs("#excludedTopicInput").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    qs("#addExcludedTopic").click();
  });

  qs("#excludedChipList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-excluded-delete]");
    if (!button) return;
    state.data.settings.excludedCategories = uniqueTopics((state.data.settings.excludedCategories || [])
      .filter((item) => item !== button.dataset.excludedDelete));
    state.settings = state.data.settings;
    saveState();
    renderWeights();
    renderArticles();
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
      task.firstAction = "첫 10분 행동만 정하기";
      task.priority = "쪼개기";
    }
    if (action === "date") {
      task.status = "deferred";
      task.deferUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      task.deferReason = "내일 다시 보기";
    }
    if (action === "hold") task.status = "hold";
    if (action === "delete") state.tasks = state.tasks.filter((item) => item !== task);

    saveState();
    renderTasks();
    renderPlan();
  });

  qs("#taskList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-task-action]");
    if (!button) return;
    const { taskAction, title } = button.dataset;
    const task = state.tasks.find((item) => item.title === title);
    if (!task) return;

    if (taskAction === "done") {
      task.status = "done";
      task.completedAt = new Date().toISOString();
    }
    if (taskAction === "defer") {
      task.status = "deferred";
      task.daysDeferred = Number(task.daysDeferred || 0) + 1;
      task.deferReason = task.deferReason || "오늘 목록에서 덜어냄";
    }
    if (taskAction === "split") {
      task.firstAction = "첫 10분 행동만 정하기";
      task.priority = "쪼개기";
    }
    if (taskAction === "delete") {
      state.tasks = state.tasks.filter((item) => item !== task);
    }

    saveState();
    renderTasks();
    renderPlan();
    updateScriptPreview();
  });

  qsa("[data-board-tab]").forEach((button) => {
    button.addEventListener("click", () => setBoardTab(button.dataset.boardTab));
  });

  qs("#jumpToArticles").addEventListener("click", () => {
    qs(".article-workbench").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function init() {
  qs("#todayLabel").textContent = `${todayText()} · 짧게 정리하고 바로 시작합니다.`;
  renderDateWeather();
  await loadSavedState();
  await loadBriefing();
  bindEvents();

  qs("#mainTask").value = state.checkin.mainTask || "";
  qs("#avoidMistake").value = state.checkin.avoidMistake || "";
  qs("#intention").value = state.checkin.intention || "";
  setCheckinMode(state.checkin.mode || "conversation");
  setEnergy(state.checkin.energy || "normal");
  setDayMode(state.checkin.dayMode || "normal");
  setCheckinState(currentCheckinState(), Boolean(state.checkin.createdAt));
  setCheckinStage("intro");
  setVoiceAdvanceButtons();
  resumeVoiceAdvanceIfAllowed();
  renderVoiceSettings();
  renderSyncSettings();
  renderNotificationSettings();
  loadVoiceOptions();
  window.setInterval(checkScheduleNotifications, 30000);
  checkScheduleNotifications();
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
