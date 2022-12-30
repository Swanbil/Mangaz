const db = require('../config/database');

exports.getUserHistoryMangaRead = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    
    const sql = 'SELECT hc."readDate", u.pseudo, c."number", c."title", m."titleName" FROM history_read_chapter hc INNER JOIN chapter c on c."idChapter" = hc."idChapter"\
    INNER JOIN manga m ON m."idManga" = c."idManga" INNER JOIN users u ON hc."idUser" = u."idUser" WHERE u.pseudo = $1';

    await db.query(sql, [userPseudo], (err, result) => {
        if(err){
            console.log(err);
            res.status(404).send({message : "An error occured"});
            return;
        }
        const historyUser = result.rows;
        res.status(200).send({historyUser: historyUser});
        return;
    })

}

exports.getSubscriptionsPlan = async (req, res) => {
    const sql = 'SELECT * FROM subscription';
    await db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.status(404).send({message : "An error occured"});
            return;
        }
        res.status(200).send({subscriptionsPlan: result.rows});
        return;
    })
}