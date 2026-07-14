# Morning Desk

Morning Desk is a personal morning briefing PWA.

It helps you start the day with a short check-in, selected articles, schedule items, tasks, and a brief reading panel.

## Current Features

- Morning check-in modes
- Short start and off-day mode
- Mood-aware dashboard density
  - tired/off: minimal action view
  - steady/light: reduced briefing view
  - charged: full dashboard
- Real URL based sample briefing cards
- Korean and foreign article samples
- Article selection reasons instead of visible scores
- Original title, Korean title, source excerpt, and Korean summary side by side
- Schedule and task entry
- Action board split into tasks, timed schedule, and deferred work
- Schedule status labels for upcoming, soon, and past items
- News exclusion chips and capped category weights
- Local browser storage
- JSON backup and import
- Browser speech reading
- Optional Supabase sync settings panel
- Supabase setup SQL for prototype sync
- Read-only Supabase connection test before saving settings
- PWA notification diagnostics and test notification button
- Optional vibration request with device support diagnostics
- Web Push subscription UI and service worker push handling
- Supabase Edge Function source for closed-app test notifications
- PNG icons for iOS home screen install
- PWA manifest and service worker

## Notes

This public repository contains only the standalone app files and sanitized sample data.

Private work notes, internal project documents, credentials, and voice data are not included.

Supabase connection values are entered in the app and stored only in the browser local storage of each device.

The sync connection is stored redundantly in localStorage and IndexedDB inside the installed PWA. If localStorage is unexpectedly empty after relaunch, the app restores it from IndexedDB. Safari and an iPhone Home Screen app can use separate storage, so enter the connection in the Home Screen app itself once.

For mobile testing outside the same Wi-Fi network, use the public HTTPS address:

- https://sjrtkf.github.io/morningdesk-app/

Local LAN addresses such as `192.168.x.x` only work while the phone and PC are on the same network. iPhone PWA notification checks should be done from the installed Home Screen app after opening the GitHub Pages URL.

## Supabase Prototype Sync

`supabase-morningdesk.sql` creates the prototype `morningdesk_state` table, the restricted `morningdesk_load` / `morningdesk_save` RPC functions, and a private Web Push subscription table.

This no-login prototype uses a long random profile key generated in the app settings. Anonymous clients cannot query the table directly; they can only call the two profile-key RPC functions. It is enough for PC/mobile sync testing, but stronger private use should later move to Supabase Auth and `auth.uid()` based policies. Never enter a `service_role` key in the browser app.

Closed-app notification setup is documented in `PUSH_SETUP.md`. VAPID private keys and the Supabase service role key stay in Supabase Edge Function secrets and must never be committed or entered into the browser app.

## Design Samples

- Check-in UI samples: `checkin-samples.html`
- Mood dashboard samples: `mood-layout-samples.html`
- Mobile app preview sample: `mobile-preview.html`
