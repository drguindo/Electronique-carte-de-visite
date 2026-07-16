# Carte de Visite Numérique — Dr GUINDO Aly Abdoulaye

Carte de visite professionnelle **numérique**, statique et autonome, hébergée
gratuitement sur **GitHub Pages**. Elle affiche les coordonnées du Dr GUINDO,
génère un **QR code** contenant une fiche contact (vCard) et permet de
**télécharger le contact** (`.vcf`) en un clic.

> 🔗 **Adresse en ligne :** https://drguindo.github.io/Electronique-carte-de-visite/

---

## 1. À quoi ça sert

Lorsqu'une personne ouvre la page (sur ordinateur ou téléphone), elle peut :

- 📇 **Scanner le QR code** avec l'appareil photo de son téléphone → son
  smartphone (iPhone ou Android) propose directement **« Ajouter aux contacts »**.
- 📥 **Télécharger la carte (`.vcf`)** → le fichier contact est enregistré
  dans le téléphone.
- 📞 **Appeler** ou ✉️ **envoyer un e-mail** en touchant les coordonnées.
- 🌐 Ouvrir le **portfolio** dans un nouvel onglet.

---

## 2. Caractéristiques techniques

- **Un seul fichier** : `index.html` (tout le HTML, le CSS et le JavaScript
  sont à l'intérieur).
- **100 % hors-ligne** : la librairie de génération de QR code (`qrcodejs`,
  licence MIT) est intégrée directement dans le fichier. Aucune connexion
  Internet n'est nécessaire pour afficher le QR code.
- **Mobile-First & responsive** : optimisé pour l'écran d'un smartphone, et
  centré (largeur max. 500 px) sur ordinateur.
- **Format vCard 3.0** : standard reconnu par tous les téléphones.
- Aucune dépendance à installer, aucun serveur à lancer.

---

## 3. Comment modifier mes informations

Toutes les informations personnelles sont regroupées dans **un seul endroit**.
Ouvrez `index.html` et cherchez l'objet `INFOS` (vers le bas du fichier, dans
la balise `<script>`) :

```javascript
const INFOS = {
  prenom:           "Aly Abdoulaye",
  nom:              "GUINDO",
  prefixe:          "Dr",
  titrePrincipal:   "Chirurgien Maxillo-Facial & Stomatologiste",
  titreSecondaire:  "Doctorant en Informatique Médicale",
  hopital:          "Hôpital Sominé Dolo de Mopti",
  ecoleDoctorale:   "École Doctorale des Sciences et Technologies du Mali (EDSTM)",
  telephone1:       "+223 76 24 06 41",
  telephone2:       "+223 66 24 06 41",
  email:            "dralyab@gmail.com",
  portfolio:        "https://drguindo.github.io/Mon_PortFolio_2025/"
};
```

Changez simplement les valeurs entre guillemets, enregistrez le fichier :
l'affichage, le QR code **et** le fichier `.vcf` se mettent à jour
automatiquement. Rien d'autre à toucher.

---

## 4. Mettre à jour la version en ligne

Après avoir modifié `index.html`, publiez la nouvelle version avec ces trois
commandes (dans le dossier du projet) :

```bash
git add .
git commit -m "Mise à jour des informations de la carte"
git push
```

GitHub Pages met le site à jour automatiquement en une à deux minutes.

> Astuce : si le QR code ou le contenu ne se met pas à jour dans le navigateur,
> faites un rafraîchissement forcé (`Ctrl` + `F5`).

---

## 5. Technologies utilisées

| Élément | Choix | Pourquoi |
|---|---|---|
| Structure | HTML5 | Standard du web, lu par tous les navigateurs |
| Style | CSS3 (intégré) | Design sobre, médical, responsive |
| Logique | JavaScript (intégré) | Génère le QR code et le fichier contact |
| QR code | [qrcodejs](https://github.com/davidshimjs/qrcodejs) (MIT) | Génération locale, sans Internet |
| Hébergement | GitHub Pages | Gratuit, simple, fiable pour un site statique |

---

## 6. Licence

Projet personnel à usage professionnel. La librairie `qrcodejs` incluse est
distribuée sous licence MIT.
