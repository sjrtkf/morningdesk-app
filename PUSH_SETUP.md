# MorningDesk background Web Push

This step is only for notifications that must arrive while the PWA is closed.
Do not commit generated VAPID keys, the Supabase service role key, or profile keys.

## 1. Update the database

Run the latest `supabase-morningdesk.sql` again in Supabase SQL Editor. It adds
the private `morningdesk_push_subscriptions` table without anon policies.

## 2. Generate VAPID keys

Run locally:

```powershell
node scripts/generate-vapid-keys.mjs
```

Copy the three output values directly into Supabase Edge Function secrets:

- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_SUBJECT` with an email address you control

## 3. Deploy the Edge Function

Deploy `supabase/functions/morningdesk-push`. Keep JWT verification enabled so
the browser must supply the project's publishable key. Supabase automatically
provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to the function.

## 4. Connect the iPhone

Open the installed Home Screen PWA, then go to Settings > Notifications:

1. Turn on notification permission.
2. Select vibration if desired.
3. Press `앱이 닫혀도 알림 연결`.
4. Close the PWA.
5. Reopen it and press `백그라운드 테스트`, then close it immediately.

The server test is only the transport check. Scheduled closed-app reminders
require a Supabase Cron dispatcher in the next step.
