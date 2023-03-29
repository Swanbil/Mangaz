# Installation et configuration #
Clonez le projet depuis GitHub.
Téléchargez l'application "Expo Go" sur votre portable.
Vérifiez que votre ordinateur et votre portable soient sur le même réseau.

## Importez la base de données sur PgAdmin à l'aide du fichier MangaZ.tar : ##
- Téléchargez le fichier MangaZ.tar
- Créez une base de données "MangaZ" sans ajouter de colonnes

![image](https://user-images.githubusercontent.com/61740337/228588496-f237803a-5b21-4096-9265-e70f5f764923.png)
- Faites un clic droit sur cette base de données et sélectionnez "Restaurez"

![image](https://user-images.githubusercontent.com/61740337/228582188-9ac7237b-7bc5-4b73-971f-45f717f538dc.png)
- Dans "Nom de fichier", sélectionnez le fichier MangaZ.tar et cliquez sur "Restaurez"

![image](https://user-images.githubusercontent.com/61740337/228588664-a5a9a4fd-823e-4dd1-9356-4947b8aba2ac.png)
- Vous obtiendrez la base de données nécessaire pour le bon fonctionnement de l'application

## Installation des dépendances ##
Ouvrez un premier terminal et tapez les commandes suivantes
```shell
cd MangaZ
cd client
npm init
npm install
```
Ouvrez un second terminal et tapez les commandes suivantes
```shell
cd MangaZ
cd server
npm init
npm install
```

## Fichiers à ajouter ##
Dans le dossier "client", créer un fichier ".env" dans lequel il faudra ajouter le code suivant :
```python
API_URL = 'http://adresse_ipv4_du_reseau:8000'
```
Dans le dossier "server", créer un fichier ".env" dans lequel il faudra ajouter le code suivant :
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
Scannez le QR code avec Expo Go et attendez le chargement de la page sur votre smartphone (une jauge de progression devrait apparaître dans le terminal "client").

![image](https://user-images.githubusercontent.com/61740337/228586983-2472ddb3-03c9-4c29-901c-e77cce0ba1f4.png)

Les identifiants de tests sont :
- Pseudo : Test
- Mot de passe : test
Après vous être authentifié, vous devriez voir la page suivante :

![image](https://user-images.githubusercontent.com/61740337/228588242-2c6fdb5f-ca59-4f1d-9aef-8aac2ac08dfa.png)



