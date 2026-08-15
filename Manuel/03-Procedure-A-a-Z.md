# Procédure de A à Z (du CV à la carte en ligne)

Cette procédure marche **avec** ou **sans** IA. Avec l'IA, la plupart des
étapes 2 à 5 sont faites automatiquement par le prompt
([`02-Prompt-IA.md`](02-Prompt-IA.md)) ; vous gardez alors surtout les étapes 1,
6 et 7.

> Convention utilisée : `<id>` = l'identifiant de dossier de la personne
> (ex. `mariam-kone`). `<compte>` et `<depot>` = votre compte GitHub et le nom
> du dépôt.

---

## Étape 1 — Collecter les informations
Remplissez [`01-Fiche-de-collecte.md`](01-Fiche-de-collecte.md) à partir du CV.
Choisissez l'identifiant `<id>` (minuscules, sans accent, avec des tirets) et
les initiales de l'icône.

## Étape 2 — Créer le dossier de la carte
Créez le dossier `cartes/<id>/` à la racine du dépôt.

## Étape 3 — Copier et remplir le modèle
1. Copiez `Manuel/modele/carte-modele.html` → `cartes/<id>/index.html`.
2. Ouvrez ce nouveau `index.html` et **remplissez l'objet `INFOS`** (tout en bas).
   - Mettez `""` (vide) pour chaque champ absent : la ligne disparaît toute seule.
   - Renseignez `carteUrl` :
     `https://<compte>.github.io/<depot>/cartes/<id>/`
3. Toujours dans ce fichier, dans la partie `<head>`, remplacez les textes entre
   guillemets `«...»` : `<title>`, `meta description`,
   `apple-mobile-web-app-title`, et les balises `og:title`, `og:description`,
   `og:url`, `og:image` (l'`og:image` finit par `.../cartes/<id>/icon-512.png`).
4. Copiez `Manuel/modele/manifest.webmanifest` → `cartes/<id>/manifest.webmanifest`
   et remplissez `name`, `short_name`, `description`.
5. Copiez `Manuel/modele/sw.js` → `cartes/<id>/sw.js` et remplacez le nom de
   cache par `carte-<id>-v1`.

## Étape 4 — Générer l'icône « initiales »
Suivez [`modele/generer-icones.md`](modele/generer-icones.md) :
- Mettez `$Initiales = "XX"` et `$Dossier` = chemin de `cartes/<id>`.
- Lancez le script dans PowerShell → il crée `icon-180.png`, `icon-192.png`,
  `icon-512.png` dans le dossier de la carte.

*(Photo au lieu des initiales ? Voir [`05-Personnalisation.md`](05-Personnalisation.md).)*

## Étape 5 — Vérifier en local (avant la mise en ligne)
Ouvrez `cartes/<id>/index.html` dans un navigateur et vérifiez :
- [ ] Le nom et les titres s'affichent correctement.
- [ ] Le **QR code apparaît** (il n'est pas vide).
- [ ] Aucune ligne vide ne laisse un « trou » (les champs absents sont masqués).
- [ ] Le bouton **« Enregistrer le contact »** télécharge bien un fichier `.vcf`.
- [ ] En ouvrant ce `.vcf`, les coordonnées sont correctes.

> Le service worker (installation Android) et le partage de fichier ne
> fonctionnent qu'**en ligne** (https), pas en ouvrant le fichier en local :
> c'est normal, on les vérifie après la mise en ligne.

## Étape 6 — Mettre en ligne (GitHub Pages)
Dans PowerShell, à la racine du dépôt :

```powershell
git add cartes/<id>
git commit -m "feat(cartes): ajout de la carte de <Prénom Nom>"
git push origin main
```

> Sous PowerShell, enchaînez les commandes avec `;` (le `&&` ne marche pas).

GitHub Pages publie en 1 à 2 minutes. Détails et vérifications :
[`06-Deploiement-GitHub-Pages.md`](06-Deploiement-GitHub-Pages.md).

## Étape 7 — Vérifier en ligne et transmettre
1. Ouvrez `https://<compte>.github.io/<depot>/cartes/<id>/` (rafraîchissez avec
   `Ctrl`+`F5`).
2. Vérifiez que le QR, les boutons et l'icône fonctionnent.
3. Donnez l'adresse à la personne. Elle peut :
   - **Ajouter la carte à son écran d'accueil** (iPhone : Safari → Partager →
     « Sur l'écran d'accueil » ; Android/Chrome : menu ⋮ → « Installer et créer
     un raccourci »).
   - **Partager** sa carte via le bouton dédié (envoi du fichier `.vcf`).

---

## Récapitulatif ultra-court
1. Remplir la fiche → 2. Créer `cartes/<id>/` → 3. Copier + remplir le modèle,
le manifest et le sw → 4. Générer les icônes → 5. Vérifier en local →
6. `git add/commit/push` → 7. Vérifier en ligne et transmettre.

**Avec l'IA :** collez simplement le prompt de [`02-Prompt-IA.md`](02-Prompt-IA.md)
rempli, et laissez-le faire les étapes 2 à 6.
