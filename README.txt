MONOUSCAR — site web (location de voitures, Marrakech)
========================================================

Ce site est un site 100% statique (HTML/CSS/JS). Il n'a besoin d'aucune
base de données ni langage serveur : il fonctionne sur N'IMPORTE QUEL
hébergement Namecheap (mutualisé "Stellar", "cPanel", etc.).


1) AVANT DE PUBLIER — à faire absolument
-----------------------------------------
Le numéro de téléphone / WhatsApp du site est pour l'instant un
NUMÉRO FACTICE (placeholder). Ouvrez le fichier :

    js/script.js

Tout en haut du fichier, modifiez ces deux lignes avec le vrai numéro :

    phoneIntl: "212600000000",          <-- votre numéro, format international,
                                             SANS "+" et SANS espaces
    phoneDisplay: "+212 6 00 00 00 00", <-- le même numéro, mis en forme
                                             pour l'affichage à l'écran

Exemple, si votre numéro WhatsApp est +212 6 12 34 56 78 :

    phoneIntl: "212612345678",
    phoneDisplay: "+212 6 12 34 56 78",

C'est le seul fichier à modifier pour que les boutons "Réserver sur
WhatsApp" fonctionnent avec votre vrai numéro.


2) METTRE LE SITE EN LIGNE SUR NAMECHEAP
-----------------------------------------
Option A — Gestionnaire de fichiers (le plus simple)

  1. Connectez-vous à votre compte Namecheap > Hosting List > "Manage"
     sur votre hébergement, puis ouvrez "File Manager" (cPanel).
  2. Ouvrez le dossier "public_html" (c'est la racine de votre site).
     Si vous voulez que le site s'affiche sur votredomaine.com
     directement, videz d'abord ce dossier (ou utilisez un
     sous-dossier si vous préférez un sous-chemin).
  3. Cliquez sur "Upload", puis envoyez TOUT le contenu de ce dossier
     (index.html, css/, js/, assets/) directement à l'intérieur de
     public_html — pas le dossier "monouscar-site" lui-même, mais
     bien son CONTENU.
  4. Visitez votredomaine.com : le site est en ligne.

Option B — FTP (FileZilla, Cyberduck, etc.)

  1. Récupérez vos identifiants FTP dans Namecheap > Hosting List >
     "Manage" > "FTP Accounts" (ou utilisez le compte FTP principal).
  2. Connectez-vous avec votre client FTP.
  3. Glissez-déposez le CONTENU de ce dossier dans /public_html.

Dans les deux cas, la structure finale sur le serveur doit être :

    public_html/
      index.html
      css/style.css
      js/script.js
      assets/ (logos et favicons)


3) NOM DE DOMAINE
-------------------
Si votre nom de domaine est déjà chez Namecheap et pointe vers cet
hébergement, aucune configuration supplémentaire n'est nécessaire :
le site apparaît automatiquement une fois les fichiers envoyés dans
public_html.


4) PERSONNALISATION RAPIDE
-----------------------------
- Flotte de véhicules, prix, boîte, carburant, année, quantité :
  tout est modifiable dans js/script.js, tableau "FLEET" en haut du
  fichier.
- Photos des voitures : chaque véhicule affiche une photo libre de
  droits hébergée sur Wikimedia Commons (champ "photo" dans FLEET).
  Pour mettre VOS propres photos (recommandé) : créez le dossier
  assets/cars/, déposez-y vos images (ex. clio-2022.jpg) et ajoutez
  dans le véhicule concerné :   localPhoto: "assets/cars/clio-2022.jpg",
  Votre photo remplace alors automatiquement celle de Wikimedia.
- Texte de l'assurance : dans index.html, section id="assurance".
- Ville / adresse : dans index.html, section id="contact".
- Logos : assets/logo-dark.png (fond clair) et assets/logo-gold.png
  (fond sombre), déjà extraits de votre PDF logo.

Aucun outil de compilation n'est nécessaire : ouvrez simplement
index.html dans un navigateur pour prévisualiser vos changements
avant de les renvoyer sur Namecheap.
