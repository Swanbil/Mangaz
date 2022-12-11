DROP TABLE IF EXISTS chapter CASCADE; 
DROP TABLE IF EXISTS editor CASCADE; 
DROP TABLE IF EXISTS history_opened_pack CASCADE; 
DROP TABLE IF EXISTS history_read_chapter CASCADE; 
DROP TABLE IF EXISTS manga CASCADE; DROP TABLE pack CASCADE; 
DROP TABLE IF EXISTS provide CASCADE; DROP TABLE rates_manga CASCADE; 
DROP TABLE IF EXISTS subscribe CASCADE; 
DROP TABLE IF EXISTS subscription CASCADE; 
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
   idUser SERIAL,
   lastname TEXT,
   firstname TEXT,
   email TEXT,
   password TEXT,
   pseudo TEXT,
   adresseEthereum INT,
   PRIMARY KEY(idUser)
);

CREATE TABLE editor(
   idEditor SERIAL,
   name TEXT,
   email TEXT,
   password TEXT,
   apiUrl TEXT,
   PRIMARY KEY(idEditor)
);

CREATE TABLE manga(
   idManga SERIAL,
   name TEXT,
   description TEXT,
   createdAt DATE,
   coverImage TEXT,
   popularityRank TEXT,
   genre TEXT,
   PRIMARY KEY(idManga)
);

CREATE TABLE chapter(
   idChapter SERIAL,
   number INT,
   numberPage TEXT,
   title TEXT,
   idManga INT NOT NULL,
   PRIMARY KEY(idChapter),
   FOREIGN KEY(idManga) REFERENCES manga(idManga)
);

CREATE TABLE subscription(
   idSubscirbe SERIAL,
   type TEXT,
   price TEXT,
   PRIMARY KEY(idSubscirbe)
);

CREATE TABLE page(
   idPage SERIAL,
   source TEXT,
   number INT,
   idChapter INT NOT NULL,
   PRIMARY KEY(idPage),
   FOREIGN KEY(idChapter) REFERENCES chapter(idChapter)
);

CREATE TABLE pack(
   idPack SERIAL,
   cover TEXT,
   title TEXT,
   description TEXT,
   PRIMARY KEY(idPack)
);

CREATE TABLE history_read_chapter(
   idUser INT,
   idChapter INT,
   readDate DATE,
   PRIMARY KEY(idUser, idChapter),
   FOREIGN KEY(idUser) REFERENCES users(idUser),
   FOREIGN KEY(idChapter) REFERENCES chapter(idChapter)
);

CREATE TABLE subscribe(
   idSubscirbe INT,
   startedAt DATE,
   endedAt DATE,
   idUser INT NOT NULL,
   PRIMARY KEY(idSubscirbe),
   FOREIGN KEY(idSubscirbe) REFERENCES subscription(idSubscirbe),
   FOREIGN KEY(idUser) REFERENCES users(idUser)
);

CREATE TABLE provide(
   idEditor INT,
   idManga INT,
   PRIMARY KEY(idEditor, idManga),
   FOREIGN KEY(idEditor) REFERENCES editor(idEditor),
   FOREIGN KEY(idManga) REFERENCES manga(idManga)
);

CREATE TABLE history_opened_pack(
   idUser INT,
   idPack INT,
   openedDate DATE,
   PRIMARY KEY(idUser, idPack),
   FOREIGN KEY(idUser) REFERENCES users(idUser),
   FOREIGN KEY(idPack) REFERENCES pack(idPack)
);

CREATE TABLE rates_manga(
   idUser INT,
   idManga INT,
   rate INT,
   PRIMARY KEY(idUser, idManga),
   FOREIGN KEY(idUser) REFERENCES users(idUser),
   FOREIGN KEY(idManga) REFERENCES manga(idManga)
);
