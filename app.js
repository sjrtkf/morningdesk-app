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
    latitude: null,
    longitude: null,
    updatedAt: ""
  },
  meta: {
    schemaVersion: 1,
    updatedAt: "",
    deviceLabel: ""
  },
  settings: null
};

let storageWriteVersion = 0;
let checkinStateChosen = false;
let checkinStage = "intro";
let speechRecognizer = null;

const qs = (selector) => document.querySelector(selector);

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
    engine: voice.engine || "browser",
    voiceURI: voice.voiceURI || "",
    rate: Number(voice.rate || 1),
    scriptVisible: Boolean(voice.scriptVisible),
    endpoint: voice.endpoint || defaultVoiceEndpoint(voice.engine || "browser")
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

function setCheckinStage(stage) {
  checkinStage = stage;
  document.body.dataset.checkinStage = stage;

  if (stage === "state") {
    checkinStateChosen = false;
    updateCheckinInterface();
  }

  if (stage === "questions") {
    checkinStateChosen = true;
    updateCheckinInterface();
    window.setTimeout(() => qs("#mainTask")?.focus(), 260);
  }

  if (stage === "intro") {
    setVoiceAdvanceStatus('"다음", "넘어가", "확인"이라고 말하면 다음 카드로 넘어갑니다.');
  } else if (stage === "state") {
    setVoiceAdvanceStatus("컨디션을 고른 뒤 확인하거나, 다시 말로 넘길 수 있습니다.");
  } else {
    setVoiceAdvanceStatus("답을 적고 다음이라고 말하면 필요한 질문으로 넘어갑니다.");
  }
}

function visibleLayerNeedsInput(selector) {
  const layer = document.querySelector(selector);
  return layer?.classList.contains("is-visible") && !layer.classList.contains("is-waiting");
}

function advanceQuestionCard() {
  const mainTask = qs("#mainTask");
  const avoidMistake = qs("#avoidMistake");
  const intention = qs("#intention");

  if (!mainTask.value.trim()) {
    mainTask.focus();
    return;
  }
  if (visibleLayerNeedsInput('[data-layer="mistake"]') && !avoidMistake.value.trim()) {
    avoidMistake.focus();
    return;
  }
  if (visibleLayerNeedsInput('[data-layer="intention"]') && !intention.value.trim()) {
    intention.focus();
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

function startVoiceAdvance() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setVoiceAdvanceStatus("이 브라우저에서는 음성 넘김을 지원하지 않습니다. 버튼으로 넘겨주세요.");
    return;
  }

  if (speechRecognizer) {
    speechRecognizer.stop();
    speechRecognizer = null;
  }

  const recognizer = new SpeechRecognition();
  speechRecognizer = recognizer;
  recognizer.lang = "ko-KR";
  recognizer.interimResults = false;
  recognizer.maxAlternatives = 1;
  recognizer.addEventListener("start", () => {
    setVoiceAdvanceStatus('"다음", "넘어가", "확인" 중 하나를 말해주세요.');
  });
  recognizer.addEventListener("result", (event) => {
    const transcript = String(event.results?.[0]?.[0]?.transcript || "").trim();
    const command = transcript.replace(/\s+/g, "");
    const canAdvance = ["다음", "넘어", "넘겨", "확인", "시작", "계속"].some((word) => command.includes(word));
    if (canAdvance) {
      setVoiceAdvanceStatus(`${transcript}이라고 들었어요. 다음 카드로 넘어갑니다.`);
      advanceCheckin();
      return;
    }
    setVoiceAdvanceStatus(`${transcript || "잘 들리지 않았어요"}. "다음"이라고 말하면 넘어갑니다.`);
  });
  recognizer.addEventListener("error", () => {
    setVoiceAdvanceStatus("음성을 듣지 못했습니다. 마이크 권한을 확인하거나 버튼으로 넘겨주세요.");
  });
  recognizer.addEventListener("end", () => {
    if (speechRecognizer === recognizer) speechRecognizer = null;
  });
  recognizer.start();
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
    title: stateConfig.stepTitle || checkinStepMessages[mode]?.title,
    detail: stateConfig.stepDetail || checkinStepMessages[mode]?.detail
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
  document.querySelectorAll("[data-state]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.state === stateName);
  });
  document.querySelectorAll(".checkin-progress span").forEach((item, index) => {
    const filledCount = [qs("#mainTask").value, qs("#avoidMistake").value, qs("#intention").value]
      .filter((value) => value.trim()).length;
    const activeCount = Math.min(4, 1 + filledCount);
    item.classList.toggle("is-active", index < activeCount);
  });
  applyPlaceholderDefaults();
  updateCheckinLayers();
}

function updateCheckinLayers() {
  const mainFilled = Boolean(qs("#mainTask").value.trim());
  const mistakeFilled = Boolean(qs("#avoidMistake").value.trim());
  const stateName = currentCheckinState();
  const reduced = stateName === "off";
  const questionsOpen = checkinStage === "questions";

  document.querySelector('[data-layer="main"]').classList.toggle("is-visible", questionsOpen);
  document.querySelector('[data-layer="main"]').classList.toggle("is-waiting", !questionsOpen || (!checkinStateChosen && !mainFilled));
  document.querySelector('[data-layer="mistake"]').classList.toggle("is-visible", questionsOpen && mainFilled && !reduced);
  document.querySelector('[data-layer="intention"]').classList.toggle("is-visible", questionsOpen && mainFilled && mistakeFilled && !reduced);
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
        ${article.url && article.url !== "#" ? `<a class="small-link" href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">원문 보기</a>` : `<span class="feedback-state">원문 링크 대기</span>`}
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
  const todayTasks = state.tasks.filter((task) => !["deferred", "hold", "done"].includes(task.status));
  const deferredTasks = state.tasks.filter((task) => task.status === "deferred");
  qs("#taskLoad").textContent = state.checkin.dayMode === "off"
    ? "오프"
    : todayTasks.length > 3 ? "과적" : `${todayTasks.length}/3`;
  qs("#taskList").innerHTML = todayTasks.map((task) => `
    <li class="task-item">
      <div>
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(task.priority || "보통")} · ${escapeHtml(task.firstAction || "첫 행동 미정")}</small>
      </div>
      <div class="task-actions">
        <button class="small-button" type="button" data-task-action="done" data-title="${escapeHtml(task.title)}">완료</button>
        <button class="small-button" type="button" data-task-action="defer" data-title="${escapeHtml(task.title)}">미루기</button>
        <button class="small-button" type="button" data-task-action="split" data-title="${escapeHtml(task.title)}">10분으로</button>
        <button class="small-button" type="button" data-task-action="delete" data-title="${escapeHtml(task.title)}">삭제</button>
      </div>
    </li>
  `).join("");

  qs("#deferredList").innerHTML = deferredTasks.length
    ? deferredTasks.map((task) => `
      <div class="deferred-item">
        <strong>${escapeHtml(task.title)}</strong>
        <small>${escapeHtml(task.daysDeferred || 1)}일 미룸 · 이유: ${escapeHtml(task.deferReason || "정하지 않음")}</small>
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

  qs("#voiceEngine").value = state.voice.engine || "browser";
  qs("#voiceEndpoint").value = state.voice.endpoint || defaultVoiceEndpoint(state.voice.engine);
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
  const todayTasks = state.tasks.filter((task) => !["deferred", "hold", "done"].includes(task.status));
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

function readBriefing() {
  const script = buildBriefingScript();
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
  renderDateWeather();
  renderArticles();
  renderSchedule();
  renderTasks();
  renderWeights();
  renderReflections();
  renderVoiceSettings();
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
  if (dateCard) dateCard.textContent = todayText();
  if (!weatherSummary || !weatherDetail) return;

  weatherSummary.textContent = state.weather.summary || "위치 기반 날씨 대기 중";
  weatherDetail.textContent = state.weather.detail || "위치 권한을 허용하면 현재 지역 날씨를 보여드립니다.";
}

async function fetchWeatherByLocation(position) {
  const { latitude, longitude } = position.coords;
  state.weather = {
    ...state.weather,
    status: "loading",
    latitude,
    longitude,
    summary: "날씨 가져오는 중",
    detail: "현재 위치 기준으로 확인하고 있습니다."
  };
  renderDateWeather();

  try {
    const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
    endpoint.searchParams.set("latitude", latitude.toFixed(4));
    endpoint.searchParams.set("longitude", longitude.toFixed(4));
    endpoint.searchParams.set("current", "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m");
    endpoint.searchParams.set("timezone", "auto");
    const response = await fetch(endpoint.toString());
    if (!response.ok) throw new Error("weather unavailable");
    const data = await response.json();
    const current = data.current || {};
    const temp = Math.round(Number(current.temperature_2m));
    const feel = Math.round(Number(current.apparent_temperature));
    const humidity = Math.round(Number(current.relative_humidity_2m));
    const wind = Math.round(Number(current.wind_speed_10m));
    state.weather = {
      ...state.weather,
      status: "ready",
      summary: `${weatherText(current.weather_code)} · ${temp}°C`,
      detail: `체감 ${feel}°C · 습도 ${humidity}% · 바람 ${wind}km/h`,
      updatedAt: new Date().toISOString()
    };
  } catch {
    state.weather = {
      ...state.weather,
      status: "error",
      summary: "날씨 연결 실패",
      detail: "인터넷 연결이나 위치 권한을 확인해주세요."
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
      detail: "이 브라우저에서는 위치 기반 날씨를 지원하지 않습니다."
    };
    renderDateWeather();
    return;
  }

  state.weather = {
    ...state.weather,
    status: "permission",
    summary: "위치 권한 확인 중",
    detail: "브라우저가 위치 사용 허용을 요청할 수 있습니다."
  };
  renderDateWeather();
  navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, () => {
    state.weather = {
      ...state.weather,
      status: "blocked",
      summary: "날씨 권한 필요",
      detail: "위치 권한을 허용하면 현재 지역 날씨를 표시합니다."
    };
    renderDateWeather();
  }, {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 1000 * 60 * 30
  });
}

function showDashboard() {
  qs("#threshold").classList.add("is-hidden");
  qs("#dashboard").classList.remove("is-hidden");
  renderAll();
}

function showThreshold() {
  qs("#threshold").classList.remove("is-hidden");
  qs("#dashboard").classList.add("is-hidden");
  setCheckinStage("intro");
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
  qs("#introVoiceAdvance").addEventListener("click", startVoiceAdvance);
  qs("#checkinVoiceAdvance").addEventListener("click", startVoiceAdvance);

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
  qs("#readBriefing").addEventListener("click", readBriefing);
  qs("#stopReading").addEventListener("click", stopReading);
  qs("#refreshWeather").addEventListener("click", requestWeather);
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
    state.tasks.push({ title, priority: "보통", status: "today", firstAction: "첫 10분 행동 정하기" });
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
    updateScriptPreview();
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
