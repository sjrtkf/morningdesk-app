# MorningDesk Next Chat Handoff

Last updated: 2026-07-08

## Public App

- Repository: `https://github.com/sjrtkf/morningdesk-app`
- Branch: `main`
- GitHub Pages: `https://sjrtkf.github.io/morningdesk-app/`
- Latest feature commit: `b7d655f Add voice toggle plan articles and alerts`
- Latest handoff commit: this file's current Git commit

## Current Product Direction

MorningDesk is a personal morning assistant PWA. The first screen should reduce friction, ask for a small check-in, and then show a readable daily briefing with schedule, tasks, articles, voice reading, and sync settings.

The product philosophy is:

- The app takes care of the user instead of making the user manage the app.
- The morning flow should be short, soft, and useful.
- Features that only look present but do not help the user act should be improved or removed.

## Implemented App Features

- Card-style check-in flow:
  - Intro/weather card
  - Condition card
  - Question card
  - Dashboard
- Smooth condition-based tone transition.
- Capsule-style `음성 넘김` toggle.
  - First user action is required for microphone permission.
  - If permission is already granted, the app attempts to resume voice advance on later check-ins.
  - Commands include `다음`, `넘어가`, `확인`, `시작`, `계속`.
  - User can turn it off with the same capsule toggle.
- Today plan board:
  - Current starting task
  - Next schedule
  - Daily task load
- Task management:
  - Priority
  - First 10-minute action
  - Done/defer/split/delete
- Deferred task controls:
  - Bring back today
  - Split into 10-minute action
  - View again tomorrow
  - Hold/delete
- Article controls:
  - Original article links
  - User-added article URL cards
  - News source list management
- Notification first pass:
  - Browser notification permission UI
  - Popup/sound/open-on-click settings
  - Schedule reminder structure for default lead time, 1 minute before, and exact time
  - Service worker notification click opens/focuses the app
- Voice reading settings:
  - Browser voice
  - Kokoro/MeloTTS/sherpa local endpoint placeholders
- Local storage and optional Supabase sync structure.

## Important Browser/PWA Constraints

- A web page cannot start the microphone with no user action. The first activation must be user-triggered.
- A web/PWA notification cannot reliably force-open the app at a scheduled time. The stable first version is: show a notification, then open/focus the app when the notification is clicked.
- Closed-app notifications use server Web Push. The source is ready, but the Supabase Edge Function and VAPID secrets must be deployed before the UI can subscribe.
- Web vibration patterns have limited browser support. On iPhone, alert vibration and haptics are ultimately controlled by iOS notification settings and Focus mode.
- Actual article collection may need a backend because many news sites block direct browser fetches with CORS or content policies.

## Verification Already Done

- `node --check app.js`
- `node --check service-worker.js`
- JSON parse check for `data/sample-briefing.json`
- Public-app sensitive word scan
- Browser check:
  - Dashboard renders
  - Plan board shows 3 cards
  - Original links appear
  - Source rows appear
  - Article URL add form works
  - Task add form works
  - No horizontal overflow after layout fix
- GitHub Pages returned `200 OK`.

## Recommended Next Steps

1. Test on a real mobile phone:
   - Install as PWA.
   - Check microphone permission and voice command recognition.
   - Check notification permission and notification appearance.
2. Test notification behavior:
   - App open in browser.
   - PWA installed but backgrounded.
   - Browser closed.
3. Deploy and verify the included Supabase Web Push Edge Function.
4. Add a Supabase Cron dispatcher only after closed-app test push succeeds.
5. Decide news collection path:
   - Browser-only RSS/source list is simpler but limited.
   - Backend news collector is more reliable.
6. Test local TTS engines later.

## 2026-07-14 Supabase 양방향 동기화와 Web Push 기반

- 사용자가 PC와 iPhone의 Supabase 양방향 동기화 성공을 확인했다.
- 사용자가 iPhone 홈 화면 PWA에서 기본 테스트 알림 수신을 확인했다.
- 알림 설정에 `진동 요청`을 추가했다.
  - 지원 브라우저에서는 `[160, 80, 160]` 패턴을 요청한다.
  - iPhone의 실제 진동은 iOS 알림 설정과 집중 모드가 최종 결정한다.
- 서비스워커에 `push` 이벤트 수신과 알림 표시 처리를 추가했다.
- `supabase/functions/morningdesk-push` Edge Function을 추가했다.
  - VAPID 공개 키 제공
  - 기기 PushSubscription 저장
  - 프로필 키에 연결된 기기로 테스트 Push 발송
  - 만료된 404/410 구독 비활성화
- 최신 SQL에는 anon 정책이 없는 `morningdesk_push_subscriptions` 테이블이 포함된다.
- 배포 절차는 `PUSH_SETUP.md`에 정리했다.
- 다음 순서:
  1. 최신 SQL을 다시 실행해 Push 구독 테이블 추가
  2. VAPID 키 생성 후 Supabase Function secrets에 저장
  3. `morningdesk-push` Edge Function 배포
  4. iPhone에서 `앱이 닫혀도 알림 연결` 후 백그라운드 테스트
  5. 성공하면 Supabase Cron 일정 발송기 추가

## 2026-07-14 iPhone 재실행 시 동기화 설정 유지 보강

- 사용자 제보: iPhone 홈 화면 앱을 종료한 뒤 URL, publishable key, 프로필 키를 다시 요구하는 불편이 있었다.
- `storage.js`가 동기화 연결 정보를 localStorage와 IndexedDB에 이중 저장하도록 변경했다.
- 재실행 때 localStorage 연결 정보가 비어 있으면 IndexedDB 백업에서 자동 복구한다.
- 저장 시 지원 브라우저에 `navigator.storage.persist()`도 요청한다.
- 검증: localStorage만 비운 새 실행에서 URL, 키, 프로필 키와 설정 레코드가 복구되는 단위 테스트 통과.
- 주의: Safari와 홈 화면 PWA는 저장 공간이 분리될 수 있으므로 홈 화면 앱 안에서 한 번 저장해야 한다.

## Start Prompt For Next Chat

Read `README.md`, `PROJECTS.md`, `CURRENT.md`, `프로젝트/모닝데스크/README.md`, `프로젝트/모닝데스크/requirements.md`, and this handoff file. Then continue MorningDesk from the current public app state. First verify the deployed page and local `publish/morningdesk-app` repo state, then proceed with mobile/PWA notification and Supabase sync planning unless I redirect you.
