# Le prompt IA réutilisable

C'est le cœur de la fabrique. Vous **remplissez** le bloc d'informations, puis
vous **collez tout le prompt** dans l'assistant de Cursor (ce chat), dans ce
dépôt. L'IA génère alors la carte complète.

## Comment l'utiliser
1. Remplissez le bloc « INFORMATIONS DE LA PERSONNE » ci-dessous (avec la
   [fiche de collecte](01-Fiche-de-collecte.md)). Laissez vide les champs absents.
2. Copiez **tout** le bloc entre les lignes `>>>>> DÉBUT` et `<<<<< FIN`.
3. Collez-le dans l'assistant IA et envoyez.
4. À la fin, l'IA vous donnera l'adresse en ligne de la carte à vérifier.

> Remarque : la génération des **icônes** (fichiers `.png`) et le **push GitHub**
> peuvent nécessiter votre validation dans Cursor. C'est normal.

---

```
>>>>> DÉBUT DU PROMPT >>>>>

Tu es un développeur front-end expert. Dans CE dépôt, crée une nouvelle carte de
visite numérique pour la personne décrite plus bas, en réutilisant le modèle et
les règles déjà en place. Réponds en français, simplement.

CONTEXTE DU PROJET (déjà existant, à respecter) :
- Le modèle de carte est : Manuel/modele/carte-modele.html
- Les modèles associés : Manuel/modele/manifest.webmanifest et Manuel/modele/sw.js
- La librairie QR est PARTAGÉE à la racine : qrcode.min.js (déjà corrigée pour
  les accents ; NE PAS en remettre une autre version).
- Chaque carte se range dans : cartes/<identifiant>/ (deux niveaux sous la racine),
  c'est pourquoi le modèle charge la librairie via ../../qrcode.min.js.

INFORMATIONS DE LA PERSONNE (laisse vide les champs absents) :
- Prénom          : «...»
- Nom             : «...»
- Préfixe         : «... (Dr, Pr, M., Mme, ou vide)»
- Titre principal : «...»
- Titre secondaire: «...»
- Accroche        : «...»
- Rôle/fonction   : «...»
- Établissement   : «...»
- Université/école: «...»
- Téléphone 1     : «...»
- Téléphone 2     : «...»
- Email           : «...»
- Portfolio/site  : «...»
- ORCID           : «...»
- LinkedIn        : «...»
- ResearchGate    : «...»
- Photo           : «nom-du-fichier.jpg si fournie, sinon vide»
- Identifiant dossier (minuscules, sans accent, tirets) : «nom-prenom»
- Initiales pour l'icône : «XX»
- Compte GitHub / dépôt (pour l'adresse en ligne) : «VOTRE-COMPTE / DEPOT»

CE QUE TU DOIS FAIRE :
1) Crée le dossier cartes/<identifiant>/ .
2) Copie Manuel/modele/carte-modele.html vers cartes/<identifiant>/index.html, puis :
   - Remplis l'objet INFOS avec les informations ci-dessus. Mets "" pour les
     champs vides (ils seront masqués automatiquement).
   - Renseigne INFOS.carteUrl avec :
     https://<compte>.github.io/<depot>/cartes/<identifiant>/
   - Dans le <head>, remplace TOUS les textes entre guillemets « » : <title>,
     meta description, apple-mobile-web-app-title (nom court, ex "Dr NOM"),
     et les balises og:title / og:description / og:url / og:image (l'og:image
     pointe vers .../cartes/<identifiant>/icon-512.png).
3) Copie Manuel/modele/manifest.webmanifest vers cartes/<identifiant>/manifest.webmanifest
   et remplis name, short_name et description.
4) Copie Manuel/modele/sw.js vers cartes/<identifiant>/sw.js et remplace le nom
   de cache par carte-<identifiant>-v1.
5) Génère les icônes icon-180.png, icon-192.png, icon-512.png DANS
   cartes/<identifiant>/ à l'aide du script PowerShell documenté dans
   Manuel/modele/generer-icones.md (avec les initiales indiquées).
6) Vérifie en local (ouvre le fichier dans un navigateur) que : le nom et les
   titres s'affichent, le QR code apparaît (non vide), le bouton .vcf télécharge
   un fichier, et qu'aucune ligne vide ne laisse de trou.
7) Fais un commit clair (ex: "feat(cartes): ajout de la carte de <Prénom Nom>")
   puis pousse sur la branche principale (demande-moi validation si nécessaire).
8) Donne-moi enfin l'adresse en ligne de la carte et la marche à suivre pour la
   partager et l'ajouter à l'écran d'accueil.

RÈGLES IMPORTANTES (déjà éprouvées, NE PAS enfreindre) :
- vCard en VERSION 3.0, lignes séparées par \r\n (déjà géré par le modèle).
- Ne réintègre PAS une autre librairie QR : garde ../../qrcode.min.js partagée.
- Garde tous les chemins RELATIFS (manifest.webmanifest, icon-*.png, sw.js,
  ../../qrcode.min.js). N'utilise pas de chemins absolus commençant par "/".
- Conserve le service worker (installation Android + hors-ligne).
- N'invente aucune information : si un champ est vide, laisse-le vide.

<<<<< FIN DU PROMPT <<<<<
```

---

## Variante « sans IA » (rappel)
Si un jour vous n'utilisez pas l'IA, la même chose se fait à la main : copier le
dossier `modele`, renommer `carte-modele.html` en `index.html`, remplir `INFOS`
et les balises `«...»`, lancer le script d'icônes, puis pousser. Tout est
détaillé dans [`03-Procedure-A-a-Z.md`](03-Procedure-A-a-Z.md).
