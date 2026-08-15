/* ============================================================================
   SERVICE WORKER — Carte de visite Dr GUINDO
   ============================================================================
   Un "service worker" est un petit programme que le navigateur installe en
   arrière-plan. Il a deux rôles ici :
     1. Rendre la carte INSTALLABLE comme une application sur Android
        (Chrome exige un service worker pour proposer « Installer l'application »).
     2. Faire fonctionner la carte HORS-LIGNE : les fichiers sont mis en cache,
        donc la page s'ouvre même sans connexion Internet.

   Note : un service worker ne fonctionne qu'en HTTPS (comme GitHub Pages) ou en
   local sur "localhost". Il ne s'active pas quand on ouvre le fichier
   directement (protocole file://) — c'est normal.
   ============================================================================ */

// On change ce numéro de version pour forcer la mise à jour du cache.
const CACHE = "carte-guindo-v1";

// Liste des fichiers à mettre en cache pour un fonctionnement hors-ligne.
const FICHIERS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./fond-ecran-qr.html",
  "./qrcode.min.js"
];

// INSTALLATION : on met les fichiers en cache.
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(FICHIERS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// ACTIVATION : on supprime les anciens caches (des versions précédentes).
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cles) {
      return Promise.all(
        cles.filter(function (c) { return c !== CACHE; })
            .map(function (c) { return caches.delete(c); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// RÉCUPÉRATION DES FICHIERS : on répond depuis le cache si possible,
// sinon on va chercher sur le réseau. Si tout échoue (hors-ligne + non
// mis en cache), on renvoie la page d'accueil.
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function (reponse) {
      return reponse || fetch(event.request).catch(function () {
        return caches.match("./index.html");
      });
    })
  );
});
