# Générer l'icône « initiales » d'une carte (Windows / PowerShell)

Cette icône (fond bleu médical + initiales blanches) sert d'icône d'application
quand on ajoute la carte à l'écran d'accueil (iPhone et Android), et d'aperçu
lors des partages.

## Ce que fait le script
Il crée automatiquement **trois fichiers PNG** aux tailles requises :
`icon-180.png`, `icon-192.png`, `icon-512.png`, directement dans le dossier de
la carte.

## Comment l'utiliser
1. Ouvrez **PowerShell** (touche Windows, tapez « PowerShell », Entrée).
2. Copiez-collez le script ci-dessous **après avoir modifié les 2 variables du
   haut** :
   - `$Initiales` : les initiales à afficher (ex. `"AG"`, `"MK"`, `"AAG"`).
   - `$Dossier` : le chemin du dossier de la carte (ex.
     `"G:\Mon Drive\Carte-Visite-Electronique\cartes\mariam-kone"`).
3. Appuyez sur Entrée. Les trois icônes apparaissent dans le dossier indiqué.

> Astuce : gardez les initiales courtes (2, parfois 3 lettres) pour qu'elles
> restent lisibles.

```powershell
# ===== À MODIFIER =====
$Initiales = "AG"
$Dossier   = "G:\Mon Drive\Carte-Visite-Electronique\cartes\nom-prenom"
# ======================

Add-Type -AssemblyName System.Drawing
if (-not (Test-Path $Dossier)) { New-Item -ItemType Directory -Path $Dossier | Out-Null }

foreach ($N in 180,192,512) {
  $bmp = New-Object System.Drawing.Bitmap($N,$N)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $rect = New-Object System.Drawing.Rectangle(0,0,$N,$N)
  $c1 = [System.Drawing.ColorTranslator]::FromHtml('#1A5276')
  $c2 = [System.Drawing.ColorTranslator]::FromHtml('#2E86C1')
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect,$c1,$c2,45)
  $g.FillRectangle($brush,$rect)
  # Taille de police adaptée au nombre de lettres
  $ratio = if ($Initiales.Length -ge 3) { 0.26 } else { 0.34 }
  $font = New-Object System.Drawing.Font('Arial',[float]($N*$ratio),[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rectF = New-Object System.Drawing.RectangleF(0,0,[float]$N,[float]$N)
  $g.DrawString($Initiales,$font,[System.Drawing.Brushes]::White,$rectF,$sf)
  $g.Dispose()
  $chemin = Join-Path $Dossier ("icon-$N.png")
  $bmp.Save($chemin,[System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  "cree : $chemin"
}
```

## Vous préférez une photo à la place des initiales ?
C'est possible : mettez la photo (carrée de préférence) dans le dossier de la
carte, nommez-la par exemple `photo.jpg`, et renseignez `photo: "photo.jpg"`
dans l'objet `INFOS` de la carte. La photo s'affichera en rond dans l'en-tête.
(Les icônes d'application restent les initiales, sauf si vous fabriquez aussi
des icônes à partir de la photo.)
