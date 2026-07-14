import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import webpush from "npm:web-push@3.6.7";
import { dueReminders, seoulClock } from "./schedule.ts";

const allowedOrigins = new Set([
  "https://sjrtkf.github.io",
  "http://127.0.0.1:4177",
  "http://localhost:4177",
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin)
      ? origin
      : "https://sjrtkf.github.io",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(request: Request, body: unknown, status = 200) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

function namedKeys(variable: string) {
  try {
    return Object.values(
      JSON.parse(Deno.env.get(variable) || "{}"),
    ) as string[];
  } catch {
    return [];
  }
}

function validPublishableKey(request: Request) {
  const supplied = request.headers.get("apikey") || "";
  const allowed = namedKeys("SUPABASE_PUBLISHABLE_KEYS");
  const legacyAnon = Deno.env.get("SUPABASE_ANON_KEY") || "";
  return Boolean(
    supplied && (allowed.includes(supplied) || supplied === legacyAnon),
  );
}

function serverSecretKey() {
  return namedKeys("SUPABASE_SECRET_KEYS")[0] ||
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    "";
}

function validDispatchSecret(request: Request) {
  const supplied = request.headers.get("x-morningdesk-dispatch-secret") || "";
  const expected = Deno.env.get("MORNINGDESK_DISPATCH_SECRET") || "";
  if (!supplied || !expected || supplied.length !== expected.length) {
    return false;
  }
  let different = 0;
  for (let index = 0; index < supplied.length; index += 1) {
    different |= supplied.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return different === 0;
}

async function endpointHash(endpoint: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(endpoint),
  );
  return Array.from(
    new Uint8Array(digest),
    (value) => value.toString(16).padStart(2, "0"),
  ).join("");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(request) });
  }

  const publicKey = Deno.env.get("VAPID_PUBLIC_KEY") || "";
  const privateKey = Deno.env.get("VAPID_PRIVATE_KEY") || "";
  const subject = Deno.env.get("VAPID_SUBJECT") ||
    "mailto:morningdesk@example.com";
  if (!publicKey || !privateKey) {
    return json(request, { error: "VAPID secrets are not configured." }, 503);
  }

  if (request.method === "GET") {
    if (!validPublishableKey(request)) {
      return json(request, { error: "Invalid publishable key." }, 401);
    }
    return json(request, {
      publicKey,
      schedulerConfigured: Boolean(Deno.env.get("MORNINGDESK_DISPATCH_SECRET")),
    });
  }
  if (request.method !== "POST") {
    return json(request, { error: "Method not allowed." }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON body." }, 400);
  }

  const action = String(payload.action || "");
  const isDispatch = action === "dispatch" || action === "dispatch-preview";
  if (isDispatch) {
    if (!validDispatchSecret(request)) {
      return json(request, { error: "Invalid dispatch secret." }, 401);
    }
  } else if (!validPublishableKey(request)) {
    return json(request, { error: "Invalid publishable key." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const secretKey = serverSecretKey();
  if (!supabaseUrl || !secretKey) {
    return json(
      request,
      { error: "Supabase server keys are unavailable." },
      503,
    );
  }
  const supabase = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (isDispatch) {
    const { data: states, error: stateError } = await supabase
      .from("morningdesk_state")
      .select("id, state")
      .limit(500);
    if (stateError) return json(request, { error: stateError.message }, 500);

    const profileIds = (states || []).map((row) => String(row.id));
    const { data: subscriptions, error: subscriptionError } = profileIds.length
      ? await supabase
        .from("morningdesk_push_subscriptions")
        .select("id, profile_id, subscription")
        .in("profile_id", profileIds)
        .eq("active", true)
        .limit(1000)
      : { data: [], error: null };
    if (subscriptionError) {
      return json(request, { error: subscriptionError.message }, 500);
    }

    const byProfile = new Map<string, Array<Record<string, unknown>>>();
    for (const row of subscriptions || []) {
      const profileId = String(row.profile_id);
      byProfile.set(profileId, [...(byProfile.get(profileId) || []), row]);
    }

    webpush.setVapidDetails(subject, publicKey, privateKey);
    let due = 0;
    let sent = 0;
    let duplicates = 0;
    let failed = 0;
    for (const row of states || []) {
      const profileId = String(row.id);
      const reminders = dueReminders(
        (row.state || {}) as Record<string, unknown>,
      );
      due += reminders.length;
      if (!(byProfile.get(profileId) || []).length) {
        failed += reminders.length;
        continue;
      }
      for (const reminder of reminders) {
        if (action === "dispatch-preview") continue;
        for (const subscriptionRow of byProfile.get(profileId) || []) {
          const deliveryKey = await endpointHash(
            `${profileId}|${reminder.key}|${subscriptionRow.id}`,
          );
          const { error: claimError } = await supabase.from(
            "morningdesk_push_delivery_log",
          ).insert({
            profile_id: profileId,
            delivery_key: deliveryKey,
            schedule_day: reminder.day,
          });
          if (claimError?.code === "23505") {
            duplicates += 1;
            continue;
          }
          if (claimError) {
            failed += 1;
            continue;
          }
          try {
            await webpush.sendNotification(
              subscriptionRow.subscription,
              JSON.stringify({
                title: "모닝데스크 일정 알림",
                body: `${reminder.label} · ${reminder.title}`,
                tag: `schedule-${deliveryKey}`,
                url: "https://sjrtkf.github.io/morningdesk-app/",
                vibration: true,
              }),
            );
            sent += 1;
          } catch (pushError) {
            failed += 1;
            const statusCode = Number(
              (pushError as { statusCode?: number })?.statusCode || 0,
            );
            if (statusCode === 404 || statusCode === 410) {
              await supabase.from("morningdesk_push_subscriptions").update({
                active: false,
              }).eq("id", subscriptionRow.id);
            }
          }
        }
      }
    }
    await supabase.from("morningdesk_push_delivery_log").delete().lt(
      "schedule_day",
      seoulClock(new Date(Date.now() - 8 * 86400000)).day,
    );
    return json(request, {
      ok: true,
      due,
      sent,
      duplicates,
      failed,
      preview: action === "dispatch-preview",
    });
  }

  const profileKey = String(payload.profileKey || "");
  if (profileKey.length < 20) {
    return json(request, { error: "Invalid profile key." }, 400);
  }

  if (action === "subscribe") {
    const subscription = payload.subscription as
      | Record<string, unknown>
      | undefined;
    const endpoint = String(subscription?.endpoint || "");
    if (!endpoint.startsWith("https://")) {
      return json(request, { error: "Invalid push subscription." }, 400);
    }

    const row = {
      profile_id: profileKey,
      endpoint_hash: await endpointHash(endpoint),
      subscription,
      device_label: String(payload.deviceLabel || "device").slice(0, 80),
      active: true,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("morningdesk_push_subscriptions")
      .upsert(row, { onConflict: "endpoint_hash" });
    if (error) return json(request, { error: error.message }, 500);
    return json(request, { ok: true });
  }

  if (action === "test") {
    const { data, error } = await supabase
      .from("morningdesk_push_subscriptions")
      .select("id, subscription")
      .eq("profile_id", profileKey)
      .eq("active", true)
      .limit(10);
    if (error) return json(request, { error: error.message }, 500);

    webpush.setVapidDetails(subject, publicKey, privateKey);
    let sent = 0;
    for (const row of data || []) {
      try {
        await webpush.sendNotification(
          row.subscription,
          JSON.stringify({
            title: "모닝데스크 백그라운드 테스트",
            body: "앱이 닫혀 있어도 이 알림이 보이면 연결이 완료된 것입니다.",
            tag: `background-test-${Date.now()}`,
            url: "https://sjrtkf.github.io/morningdesk-app/",
            vibration: payload.vibration !== false,
          }),
        );
        sent += 1;
      } catch (pushError) {
        const statusCode = Number(
          (pushError as { statusCode?: number })?.statusCode || 0,
        );
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from("morningdesk_push_subscriptions").update({
            active: false,
          }).eq("id", row.id);
        }
      }
    }
    return json(request, { ok: true, sent });
  }

  return json(request, { error: "Unknown action." }, 400);
});
