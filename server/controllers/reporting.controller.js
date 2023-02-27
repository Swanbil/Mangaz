const db = require('../config/database');
const { getRateOfManga } = require('../utilities/global-functions');

exports.getUserHistoryMangaRead = async (req, res) => {
    const userPseudo = req.params.userPseudo;

    const sql = 'SELECT m."idManga", hc."readDate", u.pseudo, c."number", c."title", m."titleName", m."technicalName", m."coverImage", m.description FROM history_read_chapter hc INNER JOIN chapter c on c."idChapter" = hc."idChapter"\
    INNER JOIN manga m ON m."idManga" = c."idManga" INNER JOIN users u ON hc."idUser" = u."idUser" WHERE u.pseudo = $1';

    await db.query(sql, [userPseudo], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occured" });
            return;
        }
        let historyUser = [];
        for (var i = 0; i < result.rows.length; i++) {
            result.rows[i].rate = await getRateOfManga(result.rows[i].idManga);
            historyUser.push(result.rows[i])
        }
        historyUser = historyUser.sort((a, b) => new Date(b.readDate) - new Date(a.readDate));
        res.status(200).send({ historyUser: historyUser });
        return;
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