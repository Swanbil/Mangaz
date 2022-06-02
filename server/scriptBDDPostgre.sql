-- Database: MangazDB

-- DROP DATABASE IF EXISTS "MangazDb";

CREATE TABLE Users(
        idUser     SERIAL NOT NULL ,
        lastname    Varchar (50) NOT NULL ,
        firstname Varchar (50) NOT NULL ,
        email   Varchar (50) NOT NULL ,
        password    Varchar (50) NOT NULL ,
        pseudo Varchar (50) NOT NULL
	,CONSTRAINT Utilisateur_PK PRIMARY KEY (idUser)
);



CREATE TABLE Editor(
        idEditor   SERIAL    NOT NULL ,
        name  Varchar (50) NOT NULL ,
        email Varchar (50) NOT NULL ,
        password  Varchar (50) NOT NULL
	,CONSTRAINT Editeur_PK PRIMARY KEY (idEditor)
);


CREATE TABLE Item(
        idItem          SERIAL    NOT NULL ,
        cover       Varchar (50) NOT NULL ,
        name         Varchar (50) NOT NULL ,
        description Varchar (100) NOT NULL ,
        droprate      Varchar (50) NOT NULL ,
        price            Float NOT NULL
	,CONSTRAINT Item_PK PRIMARY KEY (idItem)
);


CREATE TABLE Magasin(
        idMagasin SERIAL    NOT NULL ,
        idItem    SERIAL NOT NULL
	,CONSTRAINT Magasin_PK PRIMARY KEY (idMagasin)

	,CONSTRAINT Magasin_Item_FK FOREIGN KEY (idItem) REFERENCES Item(idItem)
);


CREATE TABLE Manga(
        idTM          SERIAL    NOT NULL ,
        idManga       SERIAL NOT NULL ,
        idUser SERIAL NOT NULL
	,CONSTRAINT Manga_PK PRIMARY KEY (idTM)

	,CONSTRAINT Manga_Utilisateur_FK FOREIGN KEY (idUser) REFERENCES Users(idUser)
);


CREATE TABLE ItemUser(
        idItem        SERIAL NOT NULL ,
        idUser SERIAL NOT NULL
	,CONSTRAINT ItemUtilisateur_PK PRIMARY KEY (idItem,idUser)

	,CONSTRAINT ItemUtilisateur_Item_FK FOREIGN KEY (idItem) REFERENCES Item(idItem)
	,CONSTRAINT ItemUtilisateur_Utilisateur0_FK FOREIGN KEY (idUser) REFERENCES Users(idUser)
);

-------------------------------------------------------

CREATE TABLE Fournir(
        idTM      SERIAL NOT NULL ,
        idEditor SERIAL NOT NULL
	,CONSTRAINT Fournir_PK PRIMARY KEY (idTM,idEditor)

	,CONSTRAINT Fournir_Manga_FK FOREIGN KEY (idTM) REFERENCES Manga(idTM)
	,CONSTRAINT Fournir_Editeur0_FK FOREIGN KEY (idEditor) REFERENCES Editor(idEditor)
);

