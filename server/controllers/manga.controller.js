const db = require('../config/database');
const { getUserIdFromPseudo } = require('../controllers/user.controller');

exports.getCatalogue = async (req, res) => {
    let sql = "SELECT * from manga";
    await db.query(sql, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        let catalogue = result.rows;
        res.status(200).send(catalogue);
        return
    })
}

exports.getCatalogueWithUserFavoris = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    let sql = 'SELECT * from manga';
    await db.query(sql, async (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        let catalogue = result.rows;

        sql = 'SELECT m."technicalName" FROM users_favoris uf INNER JOIN manga m ON m."idManga" = uf."idManga" INNER JOIN users u ON u."idUser" = uf."idUser"\
              WHERE u.pseudo = $1';
        await db.query(sql, [userPseudo], async(err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            const mangaFavoris = result.rows;

            sql = 'SELECT m."technicalName" FROM rates_manga rm INNER JOIN manga m ON m."idManga" = rm."idManga" INNER JOIN users u ON u."idUser" = rm."idUser"\
            WHERE u.pseudo = $1'
            await db.query(sql, [userPseudo], (err, result) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                const ratedManga = result.rows;
                const catalogueWithFavoris = catalogue.map((manga) => {
                    manga.isFavoris = (mangaFavoris.find(m => m.technicalName === manga.technicalName)) !== undefined ? true : false;
                    manga.isRated = (ratedManga.find(m => m.technicalName === manga.technicalName)) !== undefined ? true : false;
                    return manga;
                });
                res.status(200).send(catalogueWithFavoris);
                return;

            })
        });
    });
}

exports.getChapters = async (req, res) => {
    const mangaName = req.params.mangaName;
    if (mangaName === undefined || mangaName === null) {
        res.status(404).send({ message: "Please filled a valid manga name" });
        return;
    }
    let sql = 'SELECT c."idChapter", c.title, c.number, c."numberPage", m."technicalName", m."titleName" from chapter c, manga m WHERE m."technicalName" = $1 and m."idManga" = c."idManga"';
    await db.query(sql, [mangaName], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occur while loading chapters" });
            return;
        }
        res.status(200).send({ chapters: result.rows });
        return;
    })
}

exports.getPagesOfChapter = async (req, res) => {
    const mangaTitle = req.params.manga;
    const numberChapter = req.params.number;
    let sql = 'SELECT p."idPage", p.source, p."pageNumber", c."idChapter" from  page p INNER JOIN chapter c on c."idChapter" = p."idChapter" RIGHT JOIN manga m on m."idManga" = c."idManga" WHERE "technicalName" = $1 and c.number = $2';
    await db.query(sql, [mangaTitle, numberChapter], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occur while loading chapter pages" });
            return;
        }
        let pages = result.rows.sort((a, b) => parseInt(a.pageNumber) - parseInt(b.pageNumber));
        res.status(200).send({ pages: pages });
        return;
    })
}
exports.addMangaToFavoris = async (req, res) => {
    const idManga = req.body.idManga;
    const userPseudo = req.body.userPseudo;

    const idUser = await getUserIdFromPseudo(userPseudo);
    if (idUser === null) {
        res.status(404).send({ message: "No user corresponding to this pseudo" });
        return;
    }
    let sql = 'INSERT INTO users_favoris("idUser", "idManga") VALUES ($1, $2)';
    console.log('add', [idUser, idManga, userPseudo])
    await db.query(sql, [idUser, idManga], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by adding to favoris this manga" });
            return;
        }
        res.status(200).send({ message: "Manga added to favoris !" });
        return;
    });
}

exports.removeMangaFromFavoris = async (req, res) => {
    const idManga = req.body.idManga;
    const userPseudo = req.body.userPseudo;
    const idUser = await getUserIdFromPseudo(userPseudo);
    if (idUser === null) {
        res.status(404).send({ message: "No user corresponding to this pseudo" });
        return;
    }

    let sql = 'DELETE FROM users_favoris uf WHERE uf."idManga" = $1 and uf."idUser" = $2';
    console.log('remove', [idUser, idManga, userPseudo])
    await db.query(sql, [idManga, idUser], async (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by removing to favoris this manga" });
            return;
        }
        res.status(200).send({ message: "Manga removed from favoris !" });
        return;
    });
}

exports.rateManga = async (req, res) => {
    const { idManga, userPseudo, starRating } = req.body;
    const idUser = await getUserIdFromPseudo(userPseudo);
    if (idUser === null) {
        res.status(404).send({ message: "No user corresponding to this pseudo" });
        return;
    }
    let sql = 'INSERT INTO rates_manga ("idUser", "idManga", rate) VALUES ($1, $2, $3)';
    console.log('rates', [starRating, idManga, userPseudo])
    await db.query(sql, [idUser, idManga, starRating], async (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by rating this manga" });
            return;
        }
        res.status(200).send({ message: `Manga rated to ${starRating}` });
        return;
    });

}