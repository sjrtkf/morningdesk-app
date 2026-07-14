const CACHE_NAME = "morningdesk-v20";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app-config.js",
  "./storage.js",
  "./app.js",
  "./mood-layout-samples.html",
  "./mobile-preview.html",
  "./manifest.webmanifest",
  "./manifest-v12.webmanifest",
  "./icons/morningdesk-icon.svg",
  "./icons/morningdesk-icon-192.png",
  "./icons/morningdesk-icon-512.png",
  "./supabase-morningdesk.sql",
  "./supabase-cron-dispatch.sql",
  "./data/sample-briefing.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const refreshFirst = ["document", "script", "style"].includes(event.request.destination)
    || requestUrl.pathname.endsWith("/data/sample-briefing.json")
    || requestUrl.pathname.endsWith("/manifest.webmanifest")
    || requestUrl.pathname.endsWith("/manifest-v12.webmanifest");
  if (refreshFirst) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data?.json() || {};
  } catch {
    payload = { body: event.data?.text() || "새 알림이 있습니다." };
  }

  const options = {
    body: payload.body || "확인할 일정이 있습니다.",
    tag: payload.tag || "morningdesk-push",
    badge: "./icons/morningdesk-icon.svg",
    icon: "./icons/morningdesk-icon.svg",
    data: { url: payload.url || "./" }
  };
  if (payload.vibration !== false) options.vibrate = [160, 80, 160];
  event.waitUntil(self.registration.showNotification(payload.title || "모닝데스크", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "./";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const existing = clientList.find((client) => client.url.includes(self.location.origin));
      if (existing) return existing.focus();
      return clients.openWindow(targetUrl);
    })
  );
});
