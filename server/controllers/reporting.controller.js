const db = require('../config/database');
const { getRateOfManga } = require('../utilities/global-functions');

exports.getUserHistoryMangaRead = async (req, res) => {
    const userPseudo = req.params.userPseudo;

    let sql = 'SELECT m."idManga", hc."readDate", u.pseudo, c."number", c."title", m."titleName", m."technicalName", m."coverImage",m."coverImage_large", m.description FROM history_read_chapter hc INNER JOIN chapter c on c."idChapter" = hc."idChapter"\
    INNER JOIN manga m ON m."idManga" = c."idManga" INNER JOIN users u ON hc."idUser" = u."idUser" WHERE u.pseudo = $1';

    await db.query(sql, [userPseudo], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occured" });
            return;
        }
        let historyUser = [];
        let historyReadChapters = result.rows;
        sql = 'SELECT m."technicalName" FROM users_favoris uf INNER JOIN manga m ON m."idManga" = uf."idManga" INNER JOIN users u ON u."idUser" = uf."idUser"\
        WHERE u.pseudo = $1';
        await db.query(sql, [userPseudo], async (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            let mangaFavoris = result.rows;
            for (var i = 0; i < historyReadChapters.length; i++) {
                historyReadChapters[i].rate = await getRateOfManga(historyReadChapters[i].idManga);
                historyReadChapters[i].isFavoris = (mangaFavoris.find(m => m.technicalName === historyReadChapters[i].technicalName)) !== undefined ? true : false;
            }
            historyReadChapters = historyReadChapters.sort((a, b) => new Date(b.readDate) - new Date(a.readDate));
            res.status(200).send({ historyUser: historyReadChapters });
            return;
        });

    })

}

exports.getSubscriptionsPlan = async (req, res) => {
    const sql = 'SELECT * FROM subscription';
    await db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occured" });
            return;
        }
        res.status(200).send({ subscriptionsPlan: result.rows });
        return;
    })
}