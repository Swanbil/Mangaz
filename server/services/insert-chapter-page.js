const db = require('../config/database');
const prompt = require("prompt-sync")({ sigint: true });

const chapterNumber = parseInt(prompt("Which id Chapter : "));
const pageNumber = prompt('How many pages : ');
const baseUrl = prompt('Base url page : ');

const insertPages = async (chapterNumber, pageNumber, baseUrl) => {
    for (i = 1; i <= pageNumber; i++) {
        let nPage = (i <= 9 ? ('0' + i) : i);
        let sql = 'INSERT INTO page(source, "pageNumber", "idChapter") VALUES ($1, $2, $3)';
        let sourceUrl = baseUrl.split('/');
        sourceUrl[sourceUrl.length - 1] = nPage + '.' + sourceUrl[sourceUrl.length - 1].split('.')[1]
        sourceUrl = sourceUrl.join('/');
        await db.query(sql, [sourceUrl, i, chapterNumber], async (err, result) => {
            console.log(`INSERTING page ${i} ${sourceUrl} for chapter ${chapterNumber}`);
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

    }
}

insertPages(chapterNumber, pageNumber, baseUrl)

