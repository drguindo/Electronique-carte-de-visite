# Corrections et pièges déjà résolus (à ne jamais refaire)

Ce document est la **mémoire technique** du projet. Chaque point ci-dessous est
un problème rencontré et **déjà corrigé**. Le modèle (`Manuel/modele/`) intègre
toutes ces corrections : si vous partez du modèle, vous êtes tranquille.

---

## 1. QR code vide à cause des accents (le piège n°1)
- **Symptôme** : le QR code ne s'affiche pas ; erreur console
  `code length overflow`.
- **Cause** : un bug dans la librairie `qrcode.js` (fonction d'encodage UTF-8).
  Le tampon d'octets n'était pas réinitialisé à chaque caractère ; dès qu'un
  caractère accentué (`é`, `—`…) apparaissait, la taille des données était
  faussement gonflée.
- **Correction** : dans `qrcode.min.js`, on réinitialise le tampon à chaque tour
  de boucle. Concrètement, la boucle contient `...d++){b=[];var f=...` (le
  `b=[]` ajouté est la correction).
- **Règle** : **utilisez toujours le `qrcode.min.js` partagé de ce dépôt**. Ne le
  remplacez jamais par une version téléchargée d'un CDN (elles ont le bug).

## 2. Fonctionnement 100% hors-ligne du QR
- La librairie QR est **fournie localement** (fichier `qrcode.min.js`), pas via
  Internet. Le QR se génère donc même sans connexion.
- Dans le modèle, elle est chargée en **relatif** : `../../qrcode.min.js`
  (car les cartes sont deux niveaux sous la racine).

## 3. Format de la fiche contact (vCard)
- **VERSION:3.0** (compatible iPhone et Android).
- Les lignes doivent être séparées par **`\r\n`** (le modèle le fait déjà).
- Seuls les champs **remplis** sont inclus (pas de ligne vide dans la vCard).

## 4. Bouton « Partager » = envoi du FICHIER .vcf
- Le bouton envoie en priorité le **fichier `.vcf`** (API Web Share « files »).
  Avantage : le destinataire peut enregistrer le contact **même hors-ligne**.
- Replis automatiques : si l'appareil ne sait pas partager un fichier → partage
  du **lien** ; sur ordinateur → **copie** du lien dans le presse-papiers.

## 5. Icône d'application (ajout à l'écran d'accueil)
- Il faut de **vrais fichiers PNG** : `icon-180.png` (iPhone), `icon-192.png` et
  `icon-512.png` (Android + aperçu de partage). Un SVG ne suffit pas pour iPhone.
- Générés par le script de [`modele/generer-icones.md`](modele/generer-icones.md).

## 6. Android : installation impossible sans « service worker »
- **Symptôme** : sur iPhone l'ajout à l'écran d'accueil marche, mais sur Android
  l'option « Installer » n'apparaît pas.
- **Cause** : Chrome/Android exige un **service worker** (petit programme de fond)
  pour proposer l'installation.
- **Correction** : le fichier `sw.js` + son enregistrement dans la page. Le
  modèle l'inclut déjà.
- **Piège d'usage** : sur Android, il faut ouvrir la carte dans la **vraie
  application Chrome** (pas le navigateur intégré de WhatsApp/Facebook), sinon
  l'option d'installation n'existe pas. Selon la version de Chrome, l'option
  s'appelle « Ajouter à l'écran d'accueil », « Installer l'application » ou
  « Installer et créer un raccourci ».

## 7. Chemins RELATIFS obligatoires (hébergement en sous-dossier)
- Comme chaque carte vit dans `cartes/<id>/`, tous les liens doivent être
  **relatifs** : `manifest.webmanifest`, `icon-*.png`, `sw.js`, et
  `../../qrcode.min.js`.
- **N'utilisez jamais** de chemin absolu commençant par `/` : il casserait quand
  la carte est dans un sous-dossier.

## 8. Formulation des boutons (côté destinataire)
- On évite le « **mon** » ambigu (« mon portfolio » lu par quelqu'un d'autre).
- Le modèle met le **nom** de la personne : « Voir le portfolio du Dr NOM »,
  « Enregistrer le contact du Dr NOM ». Ces libellés sont construits
  automatiquement à partir de `INFOS` (un seul endroit à modifier).

## 9. Aperçu lors du partage (WhatsApp, réseaux)
- Les balises `og:title`, `og:description`, `og:url`, `og:image` doivent être
  **écrites en clair dans le `<head>`** (les robots d'aperçu ne lisent pas le
  JavaScript). Le modèle contient des emplacements `«...»` à remplir.

## 10. PowerShell (Windows) — pièges de commandes
- **`&&` ne fonctionne pas** pour enchaîner : utilisez `;`.
  Ex : `git add . ; git commit -m "..." ; git push`
- Préférez ajouter des **fichiers précis** (`git add cartes/<id>`) plutôt que
  `git add .`.
- Le script d'icônes utilise `System.Drawing` : pour dessiner du texte, il faut
  un `RectangleF` (et non un `Rectangle`), sinon le texte n'apparaît pas.

## 11. GitHub Pages
- Sert correctement `manifest.webmanifest` (type `application/manifest+json`) et
  `sw.js` (type `application/javascript`). Rien à configurer de ce côté.
- Après un `push`, laissez **1 à 2 minutes** puis faites `Ctrl`+`F5`.
- Si vous **renommez** le dépôt, toutes les adresses changent : pensez à mettre à
  jour `carteUrl` et les balises `og:*` des cartes concernées.

---

## En cas de doute : repartez du modèle
99% des problèmes viennent d'un fichier modifié à la main qui s'écarte du
modèle. Le plus sûr est de **repartir de `Manuel/modele/`** et de ne toucher
qu'aux zones prévues (`INFOS` et les `«...»`).
