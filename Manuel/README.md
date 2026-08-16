# Manuel — Fabrique de cartes de visite numériques

Ce dossier contient **tout le nécessaire** pour créer, à partir du CV ou des
coordonnées d'une personne, une **carte de visite numérique complète**, avec
exactement les mêmes fonctionnalités que la carte d'origine :

- Affichage des coordonnées (téléphone, email, ORCID, LinkedIn, ResearchGate…).
- **QR code** contenant une fiche contact (vCard) : le scan propose « Ajouter aux contacts ».
- Bouton **Partager** qui envoie le **fichier `.vcf`** (fonctionne hors-ligne pour le destinataire).
- Bouton **WhatsApp** (message pré-rempli).
- **Téléchargement** du contact `.vcf`.
- **Installable comme une application** (icône « initiales ») sur iPhone et Android, et **fonctionnement hors-ligne**.

> Objectif : vous recevez le CV d'un collègue → vous produisez sa carte **de A à Z**,
> sans avoir à refaire les réglages ni à retomber sur les pièges déjà résolus.

---

## 1. Comment ça marche (le principe en 30 secondes)

Toutes les cartes vivent dans **un seul dépôt** (celui-ci), chacune dans son
**sous-dossier** :

```
racine-du-depot/
├─ index.html                 ← votre carte à vous (Dr GUINDO)
├─ qrcode.min.js              ← librairie QR PARTAGÉE (corrigée pour les accents)
├─ cartes/
│  ├─ mariam-kone/            ← carte d'une collègue
│  │  ├─ index.html
│  │  ├─ manifest.webmanifest
│  │  ├─ sw.js
│  │  ├─ icon-180.png
│  │  ├─ icon-192.png
│  │  └─ icon-512.png
│  └─ autre-personne/
│     └─ ...
└─ Manuel/                    ← CE dossier (le manuel + le modèle)
```

Chaque carte est donc accessible à une adresse du type :
`https://VOTRE-COMPTE.github.io/DEPOT/cartes/mariam-kone/`

> Important : les cartes sont rangées **deux niveaux** sous la racine
> (`cartes/nom-prenom/`). C'est pour cela que le modèle charge la librairie QR
> partagée via `../../qrcode.min.js`.

---

## 2. La méthode recommandée : le prompt IA

La façon la plus rapide de créer une carte est de **coller un prompt** (une
consigne toute prête) dans l'assistant IA de Cursor, **avec les informations de
la personne**. L'IA génère alors tous les fichiers de la carte automatiquement.

➡️ Le prompt se trouve dans **[`02-Prompt-IA.md`](02-Prompt-IA.md)**.

---

## 3. Contenu du dossier `Manuel/`

| Fichier | À quoi il sert |
|---|---|
| [`README.md`](README.md) | Ce document (vue d'ensemble). |
| [`01-Fiche-de-collecte.md`](01-Fiche-de-collecte.md) | La liste des informations à récupérer dans le CV de la personne (obligatoires / optionnelles). |
| [`02-Prompt-IA.md`](02-Prompt-IA.md) | **Le prompt réutilisable** à coller dans l'IA pour générer la carte. |
| [`03-Procedure-A-a-Z.md`](03-Procedure-A-a-Z.md) | La procédure pas-à-pas complète (du CV à la mise en ligne). |
| [`04-Corrections-et-pieges.md`](04-Corrections-et-pieges.md) | Le mémo des corrections et pièges **déjà résolus** (à ne jamais refaire). |
| [`05-Personnalisation.md`](05-Personnalisation.md) | Couleurs, photo, réseaux sociaux, champs optionnels. |
| [`06-Deploiement-GitHub-Pages.md`](06-Deploiement-GitHub-Pages.md) | Mise en ligne, structure des dossiers, vérifications. |
| [`modele/carte-modele.html`](modele/carte-modele.html) | **Le modèle de carte** (à copier + remplir). |
| [`modele/manifest.webmanifest`](modele/manifest.webmanifest) | Modèle du fichier « application ». |
| [`modele/sw.js`](modele/sw.js) | Modèle du service worker (installation + hors-ligne). |
| [`modele/generer-icones.md`](modele/generer-icones.md) | Le script pour créer l'icône « initiales ». |

---

## 4. Par où commencer

1. Lisez **[`03-Procedure-A-a-Z.md`](03-Procedure-A-a-Z.md)** une fois en entier.
2. Pour chaque nouvelle personne : remplissez **[`01-Fiche-de-collecte.md`](01-Fiche-de-collecte.md)**,
   puis utilisez **[`02-Prompt-IA.md`](02-Prompt-IA.md)**.
3. En cas de doute technique, consultez **[`04-Corrections-et-pieges.md`](04-Corrections-et-pieges.md)**.

---

## Statut du projet

- **Dernier audit fonctionnel : 16/08/2026** — tout est opérationnel en ligne
  (carte, générateur de fond d'écran, modèle, PWA/service worker). Détails des
  vérifications et des petits correctifs dans
  [`04-Corrections-et-pieges.md`](04-Corrections-et-pieges.md) (point 12).
