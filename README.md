# Installation et configuration #
Clonez le projet depuis GitHub.
Téléchargez l'application "Expo Go" sur votre portable.
Vérifiez que votre ordinateur et votre portable soient sur le même réseau.

## Importez la base de données sur PgAdmin à l'aide du fichier MangaZ.tar : ##
- Téléchargez le fichier MangaZ.tar
- Créez une base de données "MangaZ"

## Installation des dépendances ##
Ouvrez un premier terminal et taper les commandes suivantes
```shell
cd MangaZ
cd client
npm init
npm install
```
Ouvrez un second terminal et taper les commandes suivantes
```shell
cd MangaZ
cd server
npm init
npm install
```

## Fichiers à ajouter ##
Dans le dossier "client", créer un .env dans lequel il faudra ajouter le code suivant :
```python
API_URL = 'http://adresse_ipv4_du_reseau:8000'
```
Dans le dossier "server", créer un .env dans lequel il faudra ajouter le code suivant :
```python
PGUSER = postgres
PGHOST = localhost
PGDATABASE = MangaZ
PGPASSWORD = "mdp_pdagdmin"
PGPORT = 5432
```    

# Lancement de l'application #
Dans le terminal "server"
```shell
npm run start
```
Dans le terminal "client"
```shell
expo start
```
Scannez le QR code avec l'application et attendez le chargement de la page sur votre smartphone.
