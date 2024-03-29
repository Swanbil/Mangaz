const db = require('../config/database');
const { getUserIdFromPseudo } = require('../controllers/user.controller');
const { getRateOfManga } = require('../utilities/global-functions');
const { recommande } = require('../utilities/recommandation');

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

exports.getCatalogueRecommandation = async (req, res) => {
    const { userPseudo } = req.params;
    const idUser = await getUserIdFromPseudo(userPseudo);

    //get Ids user
    let sql = 'SELECT distinct "idUser" from rates_manga';
    await db.query(sql, async (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        const users = result.rows;
        var mangasRatedByUser = {}

        const queryMangaRates = 'SELECT DISTINCT manga."titleName", rates_manga."rate", rates_manga."idUser" FROM rates_manga JOIN manga ON rates_manga."idManga"= manga."idManga"';
        await db.query(queryMangaRates, async (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            const mangasRated = result.rows;
            users.forEach((user) => {
                mangasRatedByUser[user.idUser] = {};
                mangasRated.forEach((mangaRated) => {
                    if (mangaRated.idUser === user.idUser) {
                        mangasRatedByUser[user.idUser][mangaRated.titleName] = mangaRated.rate;
                    }
                });
            });

            const recommandations = recommande(idUser, mangasRatedByUser)
            console.log("recommandations", recommandations);
            const catalogueRecommandations = [];

            for (var i = 0; i < recommandations.length; i++) {
                const recommandation = recommandations[i];
                const queryCatalogue = await db.query('SELECT * from manga WHERE manga."titleName" = $1', [recommandation[0]]);
                catalogueRecommandations.push(queryCatalogue.rows[0])
            }
            const mangaFavoris = result.rows;

            sql = 'SELECT m."technicalName", ROUND(AVG(rate), 0) as rate from rates_manga rm INNER JOIN manga m ON m."idManga" = rm."idManga"\
            GROUP BY "technicalName"';
            await db.query(sql, [], (err, result) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                const mangaRates = result.rows;

                const catalogueWithRates = catalogueRecommandations.map((manga) => {
                    manga.rate = (mangaRates.find(m => m.technicalName === manga.technicalName)) !== undefined ? mangaRates.find(m => m.technicalName === manga.technicalName).rate : null;
                    return manga;
                });
                res.status(200).json(catalogueWithRates);
                return
            });


        });
    });
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
        await db.query(sql, [userPseudo], async (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            const mangaFavoris = result.rows;
            sql = 'SELECT m."technicalName", ROUND(AVG(rate), 0) as rate from rates_manga rm INNER JOIN manga m ON m."idManga" = rm."idManga"\
            GROUP BY "technicalName"';
            await db.query(sql, [], (err, result) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                const mangaRates = result.rows;

                const catalogueWithFavoris = catalogue.map((manga) => {
                    manga.isFavoris = (mangaFavoris.find(m => m.technicalName === manga.technicalName)) !== undefined ? true : false;
                    manga.rate = (mangaRates.find(m => m.technicalName === manga.technicalName)) !== undefined ? mangaRates.find(m => m.technicalName === manga.technicalName).rate : null;
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
    let sql = 'SELECT * from rates_manga where "idUser" = $1 and "idManga" = $2';
    console.log('rates', [starRating, idManga, userPseudo])
    await db.query(sql, [idUser, idManga], async (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by rating this manga" });
            return;
        }
        if (result.rows.length > 0) {
            sql = 'UPDATE rates_manga SET rate = $3 WHERE "idUser" = $1 and "idManga" = $2 ';
        }
        else {
            sql = 'INSERT INTO rates_manga ("idUser", "idManga", rate) VALUES ($1, $2, $3)';
        }
        await db.query(sql, [idUser, idManga, starRating], async (err, result) => {
            if (err) {
                console.error('Error executing query', err.stack);
                res.status(404).send({ message: "An error occured by rating this manga" });
                return;
            }
            res.status(200).send({ message: `Manga rated to ${starRating}` });
            return;
        });
    });

}

exports.getMostPopular = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    let sql = 'SELECT m."technicalName", ROUND(AVG(rate), 0) as rate, m."coverImage", m."coverImage_large", m."createdDate", m.description, m.genre, m."idManga", m."popularityRank",\
    m."titleName" from rates_manga rm INNER JOIN manga m ON m."idManga" = rm."idManga" WHERE rate > 3.8 GROUP BY m."technicalName", m."coverImage", m."coverImage_large",\
    m."createdDate", m.description, m.genre, m."idManga", m."popularityRank", m."titleName"';
    await db.query(sql, async (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by rating this manga" });
            return;
        }
        const catalogue = result.rows;
        sql = 'SELECT m."technicalName" FROM users_favoris uf INNER JOIN manga m ON m."idManga" = uf."idManga" INNER JOIN users u ON u."idUser" = uf."idUser"\
        WHERE u.pseudo = $1';
        await db.query(sql, [userPseudo], async (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            const mangaFavoris = result.rows;
            const catalogueMostPopular = catalogue.map((manga) => {
                manga.isFavoris = (mangaFavoris.find(m => m.technicalName === manga.technicalName)) !== undefined ? true : false;
                return manga;
            });
            res.status(200).send(catalogueMostPopular);
            return;

        });
    });
}

exports.getTrends = async (req, res) => {
    const NUMBER_READ_MANGA = 2;
    const userPseudo = req.params.userPseudo;
    let sql = 'SELECT distinct m."technicalName", COUNT(m."technicalName") as number_read, hm."readDate", m."coverImage", m."coverImage_large", m."createdDate", m.description, \
    m.genre, m."idManga", m."popularityRank", m."titleName" from history_read_chapter hm INNER JOIN chapter c ON c."idChapter" = hm."idChapter"\
    INNER JOIN manga m ON c."idManga" = m."idManga"\
    WHERE hm."readDate" >= $1\
    GROUP BY m."technicalName", m."coverImage", m."coverImage_large",m."createdDate", m.description, m.genre, m."idManga", m."popularityRank", m."titleName", hm."readDate"';
    let currentDate = new Date();
    currentDate.setDate(0)
    currentDate.setDate(1)
    let lastMonthDate = new Date(currentDate);
    lastMonthDate = lastMonthDate.getFullYear() + '-' + (lastMonthDate.getMonth() - 1 < 0 ? '01' : lastMonthDate.getMonth() + 1) + '-' + lastMonthDate.getDay();
    await db.query(sql, [lastMonthDate], async (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by rating this manga" });
            return;
        }
        const readMangas = result.rows;
        let catalogueTrends = []
        readMangas.forEach((manga) => {
            const count = readMangas.filter((obj) => obj.technicalName === manga.technicalName).length;
            if (count >= NUMBER_READ_MANGA) {
                console.log(manga.technicalName + " : " + count)
                catalogueTrends.push(manga);
            }
        })
        catalogueTrends = [...new Map(catalogueTrends.map(item =>
            [item['technicalName'], item])).values()];
        sql = 'SELECT m."technicalName" FROM users_favoris uf INNER JOIN manga m ON m."idManga" = uf."idManga" INNER JOIN users u ON u."idUser" = uf."idUser"\
        WHERE u.pseudo = $1';
        await db.query(sql, [userPseudo], async (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            const mangaFavoris = result.rows;
            for (var i = 0; i < catalogueTrends.length; i++) {
                catalogueTrends[i].rate = await getRateOfManga(catalogueTrends[i].idManga);
                catalogueTrends[i].isFavoris = (mangaFavoris.find(m => m.technicalName === catalogueTrends[i].technicalName)) !== undefined ? true : false;
            }
            res.status(200).send(catalogueTrends);
            return;

        });

    });
}
