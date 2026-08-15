/* ============================================================================
   SERVICE WORKER (MODÈLE) — à copier dans le dossier de chaque carte.
   Rôle : rendre la carte installable (Android) et fonctionnelle hors-ligne.
   >>> Changez le numéro de version (v1 -> v2...) à chaque mise à jour de la
       carte, pour forcer le rafraîchissement du cache.
   ============================================================================ */
const CACHE = "carte-«nom-prenom»-v1";

const FICHIERS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "../../qrcode.min.js"   // librairie QR partagée à la racine du dépôt
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(FICHIERS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cles) {
      return Promise.all(cles.filter(function (c) { return c !== CACHE; })
        .map(function (c) { return caches.delete(c); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function (rep) {
      return rep || fetch(event.request).catch(function () { return caches.match("./index.html"); });
    })
  );
});
