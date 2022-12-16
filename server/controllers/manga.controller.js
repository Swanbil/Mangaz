const db = require('../config/database');
const axios = require('axios').default;

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
    console.log(mangaTitle, numberChapter);
    let sql = 'SELECT p."idPage", p.source, p."pageNumber", c."idChapter" from  page p INNER JOIN chapter c on c."idChapter" = p."idChapter" RIGHT JOIN manga m on m."idManga" = c."idManga" WHERE "technicalName" = $1 and c.number = $2';
    await db.query(sql, [mangaTitle, numberChapter], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occur while loading chapter pages" });
            return;
        }
        let pages = result.rows.sort((a, b) => parseInt(a.pageNumber) - parseInt(b.pageNumber))
        res.status(200).send({ pages: pages });
        return;
    })
}