const db = require('../config/database');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const user = req.body;
    if (user.pseudo === '' || user.password === '') {
        res.status(400).json('Veuillez remplir tous les champs')
        return;
    }
    const sql = "SELECT * FROM users WHERE pseudo=$1";
    db.query(sql, [user.pseudo], async (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        if (result.rows.length != 1) {
            res.status(400).json("Identifiants doesn't exist");
            return
        }
        const passwordHash = result.rows[0].password;
        if (await bcrypt.compare(user.password, passwordHash)) {
            res.status(200).json(user.pseudo);
        }
        else {
            res.status(401).json('Mot de passe inconu');
            return
        }
    });
}

exports.register = async (req, res) => {
    const user = req.body;
    if (user.lastname === '' || user.firstname === '' || user.email === '' || user.pseudo === '' || user.password === '') {
        res.status(400).json('Veuillez remplir tous les champs')
        return;
    }
    const sql = "SELECT COUNT(*) FROM users WHERE pseudo=$1"
    db.query(sql, [user.pseudo], async (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        if (result.rows[0].count >= 1) {
            res.status(400).json('Cet utilisateur existe deja');
            return
        }
        else {
            const passwordCrypted = await bcrypt.hash(user.password, 10);
            const query = "INSERT INTO users(lastname, firstname, email, password, pseudo) VALUES($1,$2,$3,$4,$5)";
            db.query(query, [user.lastname, user.firstname, user.email, passwordCrypted, user.pseudo], (err, result) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                res.status(200).json("New user " + user.pseudo + " registered !")
            });

        }
    });
    
}

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
        console.log(checkHistory, [userPseudo, mangaName, chapterNumber, readDate]);
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


exports.getUserIdFromPseudo = async (userPseudo) => {
    const sql = 'SELECT "idUser" FROM users WHERE pseudo = $1';
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await db.query(sql, [userPseudo], (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(null);
                    return
                }
                if (result.rows.length !== 1) {
                    resolve(null);
                    return
                }
                resolve(result.rows[0].idUser);
            })
        }, 100)
    });
}
