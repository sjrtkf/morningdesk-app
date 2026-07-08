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
- Reliable notifications when the app is fully closed will likely need server-based Web Push later.
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
3. Decide notification backend:
   - Keep local in-page reminders only for now, or
   - Add server/Web Push later for reliable background alerts.
4. Decide news collection path:
   - Browser-only RSS/source list is simpler but limited.
   - Backend news collector is more reliable.
5. Set up real Supabase sync for PC/mobile continuity.
6. Test local TTS engines later.

## Start Prompt For Next Chat

Read `README.md`, `PROJECTS.md`, `CURRENT.md`, `프로젝트/모닝데스크/README.md`, `프로젝트/모닝데스크/requirements.md`, and this handoff file. Then continue MorningDesk from the current public app state. First verify the deployed page and local `publish/morningdesk-app` repo state, then proceed with mobile/PWA notification and Supabase sync planning unless I redirect you.
