# Personnalisation d'une carte

Toutes ces modifications se font dans le fichier `cartes/<id>/index.html`.

---

## 1. Changer les couleurs (thème)
En haut du `<style>`, la palette est regroupée dans `:root` :

```css
:root {
  --blanc: #FFFFFF;
  --bleu-medical: #1A5276;   /* couleur principale (en-tête, boutons) */
  --bleu-clair: #2E86C1;     /* accent (liens, boutons secondaires) */
  --gris-fonce: #2C3E50;     /* texte */
  --gris-clair: #BDC3C7;     /* séparateurs */
  --gris-fond: #F4F6F7;      /* fond de page */
}
```

Changez simplement les codes couleur (format `#RRGGBB`). Par exemple, pour un
thème vert, remplacez `--bleu-medical` et `--bleu-clair`.

> Si vous changez la couleur principale, pensez aussi à `theme-color` dans le
> `<head>` et à la couleur du script d'icônes (`#1A5276` → votre couleur), pour
> rester cohérent.

## 2. Ajouter une photo (à la place de l'icône médicale)
1. Placez la photo (idéalement **carrée**) dans `cartes/<id>/`, par ex. `photo.jpg`.
2. Dans `INFOS`, mettez : `photo: "photo.jpg"`.
La photo s'affiche en rond dans l'en-tête, et l'icône médicale disparaît.

## 3. Champs optionnels : les afficher ou les masquer
Il suffit de **remplir** ou de **laisser vide** le champ dans `INFOS` :
- Vide (`""`) → la ligne est **masquée** automatiquement.
- Rempli → la ligne apparaît.

Champs concernés : `prefixe`, `titreSecondaire`, `accroche`, `roleHopital`,
`hopital`, `ecoleDoctorale`, `telephone2`, `portfolio`, `orcid`, `linkedin`,
`researchgate`, `photo`.

## 4. Ajouter un autre réseau (ex. Twitter/X, site perso…)
Le modèle gère déjà LinkedIn et ResearchGate. Pour un réseau supplémentaire, le
plus simple est de le mettre dans `portfolio` (site principal). Si vous voulez
une **ligne dédiée**, demandez-le à l'IA avec le prompt : elle peut ajouter un
nouvel élément `<li>` (icône + label + lien) sur le modèle des lignes existantes,
et l'inclure dans la vCard (`URL:`).

## 5. Changer les initiales de l'icône
Relancez le script de [`modele/generer-icones.md`](modele/generer-icones.md)
avec d'autres initiales (`$Initiales`), en ciblant le dossier de la carte.

## 6. Modifier la phrase de bas de page / la légende du QR
- Légende du QR : cherchez `📷 Scannez ce QR code...` dans le HTML.
- Pied de page : cherchez `Carte de visite numérique · ...`.
Modifiez le texte directement.

---

## Bon à savoir
- Après toute modification, **rafraîchissez** (`Ctrl`+`F5`) pour voir le
  changement, surtout si un service worker est actif (mémoire cache).
- Si vous changez beaucoup de choses en ligne et que ça « ne bouge pas », pensez
  à incrémenter la version du cache dans `sw.js` (`...-v1` → `...-v2`).
