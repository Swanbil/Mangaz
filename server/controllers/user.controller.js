const db = require('../config/database');
const axios = require('axios').default;

const isUserHistoryAlreadyExist = async (idUser, idChapter) => {
    const sql = 'SELECT * from history_read_chapter WHERE "idUser" = $1 and "idChapter" = $2';
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await db.query(sql, [idUser, idChapter], (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(true);
                }
                if (result.rows.length !== 0) {
                    resolve(true);
                }
                resolve(false);
            })
        }, 100)
    });
}

exports.saveChapterRead = async (req, res) => {
    const userPseudo = req.body.userPseudo;
    const mangaName = req.body.mangaName;
    const chapterNumber = req.body.chapterNumber;
    let dateNow = new Date();
    const readDate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
    console.log([userPseudo, mangaName, chapterNumber, readDate]);

    const sqlGetId = 'SELECT users."idUser", chapter."idChapter" from users, chapter, manga\
    WHERE chapter."number" = $1 and chapter."idManga" = manga."idManga"\
    and manga."technicalName" = $2 and users.pseudo = $3';
    await db.query(sqlGetId, [chapterNumber, mangaName, userPseudo], async (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occurred during saving history" });
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send({ message: "The user or the chapter doesn't exist" });
            return;
        }
        const { idUser, idChapter } = result.rows[0];
        const checkHistory = await isUserHistoryAlreadyExist(idUser, idChapter);
        if (checkHistory) {
            res.status(202).send({ message: "History already saved" });
            return;
        }
        const sql = 'INSERT INTO history_read_chapter("idUser", "idChapter", "readDate") VALUES\
        ($1, $2, $3)';
        await db.query(sql, [idUser, idChapter, readDate], (err, result) => {
            if (err) {
                console.log(err);
                res.status(404).send({ message: "An error occurred during saving history" });
                return;
            }
            res.status(200).send({ message: "History chapter read saved !" });
            return;

        })

    })


}