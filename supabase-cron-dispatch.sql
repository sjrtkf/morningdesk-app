-- MorningDesk scheduled Web Push dispatcher.
-- Prerequisites:
--   Vault secret morningdesk_push_url
--   Vault secret morningdesk_dispatch_secret
-- Keep both values out of SQL files and Git.

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

create or replace function public.morningdesk_dispatch_push(action_name text default 'dispatch')
returns bigint
language plpgsql
security definer
set search_path = public, vault, extensions
as $$
declare
  push_url text;
  dispatch_secret text;
  request_id bigint;
begin
  if action_name not in ('dispatch', 'dispatch-preview') then
    raise exception 'Unsupported MorningDesk dispatch action';
  end if;

  select decrypted_secret into push_url
  from vault.decrypted_secrets
  where name = 'morningdesk_push_url'
  order by updated_at desc
  limit 1;

  select decrypted_secret into dispatch_secret
  from vault.decrypted_secrets
  where name = 'morningdesk_dispatch_secret'
  order by updated_at desc
  limit 1;

  if coalesce(push_url, '') = '' or coalesce(dispatch_secret, '') = '' then
    raise exception 'MorningDesk Vault secrets are not configured';
  end if;

  select net.http_post(
    url := push_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-morningdesk-dispatch-secret', dispatch_secret
    ),
    body := jsonb_build_object('action', action_name),
    timeout_milliseconds := 10000
  ) into request_id;

  return request_id;
end;
$$;

revoke all on function public.morningdesk_dispatch_push(text) from public;
grant execute on function public.morningdesk_dispatch_push(text) to postgres;

-- Safe transport preview. This claims currently due reminders without sending.
-- select public.morningdesk_dispatch_push('dispatch-preview');

-- Enable only after the iPhone closed-app test and preview both succeed.
-- select cron.schedule(
--   'morningdesk-schedule-push-every-minute',
--   '* * * * *',
--   $$select public.morningdesk_dispatch_push('dispatch');$$
-- );

-- To stop later:
-- select cron.unschedule('morningdesk-schedule-push-every-minute');
