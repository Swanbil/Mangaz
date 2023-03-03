const db = require('../config/database');

exports.getRateOfManga = async (idManga) => {
    const sql = 'SELECT ROUND(AVG(rate), 0) as rate from rates_manga rm INNER JOIN manga m ON m."idManga" = rm."idManga"  WHERE m."idManga" = $1 GROUP BY m."technicalName"';
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await db.query(sql, [idManga], (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(undefined);
                }
                if (result.rows.length === 0) {
                    resolve(undefined);
                }
                resolve(result.rows[0].rate);
            })
        }, 100)
    });

};