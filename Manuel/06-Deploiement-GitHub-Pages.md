# Déploiement sur GitHub Pages

Toutes les cartes sont hébergées **gratuitement** sur GitHub Pages, dans **un
seul dépôt** (celui-ci), chacune dans son sous-dossier `cartes/<id>/`.

---

## 1. Structure et adresses
```
racine-du-depot/
├─ index.html                 → https://<compte>.github.io/<depot>/
├─ qrcode.min.js              (librairie QR partagée)
└─ cartes/
   ├─ mariam-kone/
   │  └─ index.html           → https://<compte>.github.io/<depot>/cartes/mariam-kone/
   └─ .../
```
L'adresse d'une carte est donc :
`https://<compte>.github.io/<depot>/cartes/<id>/`

## 2. Publier une nouvelle carte
Dans PowerShell, à la racine du dépôt :

```powershell
git add cartes/<id>
git commit -m "feat(cartes): ajout de la carte de <Prénom Nom>"
git push origin main
```

> Rappels PowerShell : enchaînez avec `;` (pas `&&`). Ajoutez des fichiers
> précis plutôt que `git add .`.

Attendez **1 à 2 minutes**, puis ouvrez l'adresse de la carte et faites
`Ctrl`+`F5` (rafraîchissement forcé).

## 3. Vérifier que tout répond (facultatif)
Vous pouvez vérifier que les fichiers sont bien en ligne (statut `200`) :

```powershell
$base = "https://<compte>.github.io/<depot>/cartes/<id>/"
"index.html","manifest.webmanifest","sw.js","icon-192.png","icon-512.png" | ForEach-Object {
  try { $r = Invoke-WebRequest -Uri ($base + $_) -Method Head -UseBasicParsing; "$($r.StatusCode)  $_" }
  catch { "ERREUR  $_" }
}
```

## 4. Vérifier l'installation (PWA) sur téléphone
- **iPhone (Safari)** : ouvrez la carte → bouton Partager → « Sur l'écran
  d'accueil » → Ajouter.
- **Android (Chrome)** : ouvrez la carte **dans Chrome** (pas dans le navigateur
  de WhatsApp) → menu ⋮ → « Installer et créer un raccourci » (ou « Ajouter à
  l'écran d'accueil »).

## 5. Activer GitHub Pages (une seule fois, déjà fait pour ce dépôt)
Si un jour vous créez un **nouveau** dépôt :
1. Sur GitHub : dépôt → **Settings** → **Pages**.
2. « Build and deployment » → Source : **Deploy from a branch**.
3. Branche : **main**, dossier : **/ (root)** → **Save**.
4. Après 1 à 2 minutes, le site est disponible à
   `https://<compte>.github.io/<depot>/`.

## 6. Mettre à jour une carte existante
Modifiez les fichiers de `cartes/<id>/`, puis :
```powershell
git add cartes/<id>
git commit -m "update(cartes): mise à jour de la carte de <Prénom Nom>"
git push origin main
```
Si la carte « ne se met pas à jour » sur un téléphone, incrémentez la version du
cache dans `cartes/<id>/sw.js` (`carte-<id>-v1` → `carte-<id>-v2`) et repoussez.

---

## Note sur le partage Google Drive
Ce dépôt est aussi dans votre Google Drive : c'est pratique pour la sauvegarde,
mais **l'adresse publique d'une carte reste l'adresse GitHub Pages** (pas un lien
Drive). C'est cette adresse `github.io` que vous transmettez aux gens.
