import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

const allowedOrigins = new Set([
  "https://sjrtkf.github.io",
  "http://127.0.0.1:4177",
  "http://localhost:4177"
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://sjrtkf.github.io",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Vary": "Origin"
  };
}

function json(request: Request, body: unknown, status = 200) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

async function endpointHash(endpoint: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(endpoint));
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(request) });

  const publicKey = Deno.env.get("VAPID_PUBLIC_KEY") || "";
  const privateKey = Deno.env.get("VAPID_PRIVATE_KEY") || "";
  const subject = Deno.env.get("VAPID_SUBJECT") || "mailto:morningdesk@example.com";
  if (!publicKey || !privateKey) return json(request, { error: "VAPID secrets are not configured." }, 503);

  if (request.method === "GET") return json(request, { publicKey });
  if (request.method !== "POST") return json(request, { error: "Method not allowed." }, 405);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON body." }, 400);
  }

  const action = String(payload.action || "");
  const profileKey = String(payload.profileKey || "");
  if (profileKey.length < 20) return json(request, { error: "Invalid profile key." }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  if (action === "subscribe") {
    const subscription = payload.subscription as Record<string, unknown> | undefined;
    const endpoint = String(subscription?.endpoint || "");
    if (!endpoint.startsWith("https://")) return json(request, { error: "Invalid push subscription." }, 400);

    const row = {
      profile_id: profileKey,
      endpoint_hash: await endpointHash(endpoint),
      subscription,
      device_label: String(payload.deviceLabel || "device").slice(0, 80),
      active: true,
      updated_at: new Date().toISOString()
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
        await webpush.sendNotification(row.subscription, JSON.stringify({
          title: "모닝데스크 백그라운드 테스트",
          body: "앱이 닫혀 있어도 이 알림이 보이면 연결이 완료된 것입니다.",
          tag: `background-test-${Date.now()}`,
          url: "https://sjrtkf.github.io/morningdesk-app/",
          vibration: payload.vibration !== false
        }));
        sent += 1;
      } catch (pushError) {
        const statusCode = Number((pushError as { statusCode?: number })?.statusCode || 0);
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from("morningdesk_push_subscriptions").update({ active: false }).eq("id", row.id);
        }
      }
    }
    return json(request, { ok: true, sent });
  }

  return json(request, { error: "Unknown action." }, 400);
});
