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
- `VAPID_SUBJECT` with the MorningDesk public HTTPS URL

Generate one additional long random value and save the same value in both
places below. Never put it in Git or in the browser app.

- Edge Function secret: `MORNINGDESK_DISPATCH_SECRET`
- Supabase Vault secret: `morningdesk_dispatch_secret`

## 3. Deploy the Edge Function

Deploy `supabase/functions/morningdesk-push` with legacy JWT verification
disabled, as recorded in `supabase/config.toml`. The function validates the
project publishable key from the `apikey` header itself. Supabase automatically
provides `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEYS`, and
`SUPABASE_SECRET_KEYS` to the function.

For Dashboard deployment, create a function named `morningdesk-push` via the
editor and paste the complete `index.ts`. Its npm imports are pinned directly in
the file, so no additional import map is required. Turn off the legacy Verify
JWT option because the function performs current publishable-key validation.

## 4. Connect the iPhone

Open the installed Home Screen PWA, then go to Settings > Notifications:

1. Turn on notification permission.
2. Select vibration if desired.
3. Press `앱이 닫혀도 알림 연결`.
4. Close the PWA.
5. Reopen it and press `백그라운드 테스트`, then close it immediately.

The server test is only the transport check. Scheduled closed-app reminders
require a Supabase Cron dispatcher in the next step.

## 5. Prepare scheduled reminders

After the closed-app server test succeeds:

1. Run the latest `supabase-morningdesk.sql` again to create the private
   `morningdesk_push_delivery_log` table.
2. In Supabase Vault, store the Edge Function URL as `morningdesk_push_url`.
3. Store the same dispatch secret as `morningdesk_dispatch_secret`.
4. Run `supabase-cron-dispatch.sql` in SQL Editor.
5. Run `select public.morningdesk_dispatch_push('dispatch-preview');` once.
6. Only after the preview succeeds, run the final `cron.schedule` statement
   shown at the bottom of that SQL file.

The dispatcher uses Asia/Seoul time and sends each schedule at the configured
lead time, one minute before, and at the exact time. A private delivery log
prevents duplicate sends.
