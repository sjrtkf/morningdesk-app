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
- PWA notification diagnostics and test notification button
- PNG icons for iOS home screen install
- PWA manifest and service worker

## Notes

This public repository contains only the standalone app files and sanitized sample data.

Private work notes, internal project documents, credentials, and voice data are not included.

Supabase connection values are entered in the app and stored only in the browser local storage of each device.

For mobile testing outside the same Wi-Fi network, use the public HTTPS address:

- https://sjrtkf.github.io/morningdesk-app/

Local LAN addresses such as `192.168.x.x` only work while the phone and PC are on the same network. iPhone PWA notification checks should be done from the installed Home Screen app after opening the GitHub Pages URL.

## Supabase Prototype Sync

`supabase-morningdesk.sql` creates the prototype `morningdesk_state` table and row-level security policies.

This no-login prototype uses a long random profile key generated in the app settings. It is enough for PC/mobile sync testing, but stronger private use should later move to Supabase Auth and `auth.uid()` based policies.

## Design Samples

- Check-in UI samples: `checkin-samples.html`
- Mood dashboard samples: `mood-layout-samples.html`
- Mobile app preview sample: `mobile-preview.html`
