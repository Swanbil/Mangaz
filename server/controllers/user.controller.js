const db = require('../config/database');
const bcrypt = require('bcryptjs');
const { getCurrentDate, getDateInOneMonth } = require('../utilities/date');
const { getRateOfManga } = require('../utilities/global-functions');
const stripe = require("stripe")(process.env.STRIPE_SK_KEY_TEST);

const isUserSubscribe = async (userPseudo) => {
    const currentDate = getCurrentDate();
    const sql = 'SELECT stripe_id FROM subscribe s INNER JOIN users u ON u."idUser" = s."idUser" WHERE u."pseudo" = $1 and s."startedDate" <= $2 and s."endedDate" >= $2';
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await db.query(sql, [userPseudo, currentDate], async (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(false);
                    return
                }
                let stripeId = result.rows[result.rows.length - 1]?.stripe_id;
                if (!stripeId) {
                    resolve(false);
                    return

                }
                const subscription = await stripe.subscriptions.retrieve(stripeId);
                const subscriptionActive = (subscription.status === "active");
                resolve(subscriptionActive);
                return;
            })
        }, 100)
    });





}

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
        const isSubscribe = await isUserSubscribe(user.pseudo);
        if (await bcrypt.compare(user.password, passwordHash)) {
            res.status(200).json({ userPseudo: user.pseudo, isSubscribe: isSubscribe });
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

exports.getMangasFavoris = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    sql = 'SELECT m."coverImage", m."createdDate", m.description, m.genre, m."idManga", m."popularityRank", m."technicalName", m."titleName"\
           FROM users_favoris uf INNER JOIN manga m ON m."idManga" = uf."idManga" INNER JOIN users u ON u."idUser" = uf."idUser"\
           WHERE u.pseudo = $1';
    await db.query(sql, [userPseudo], async (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        let mangaFavoris = result.rows;
        let newMangaFavoris = [];
        for (var i = 0; i < result.rows.length; i++) {
            result.rows[i].isFavoris = true;
            result.rows[i].rate = await getRateOfManga(result.rows[i].idManga);
            newMangaFavoris.push(result.rows[i])
        }
        res.status(200).send({ mangaFavoris: mangaFavoris });
        return;
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
const getUserId = async (userPseudo) => {
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

exports.getUserInfos = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    const sql = "SELECT firstname, lastname, pseudo, email from users WHERE pseudo = $1";
    await db.query(sql, [userPseudo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occurred during getting user infos" });
            return;
        }
        const userInfos = result.rows[0];
        res.status(200).send({ userInfos: userInfos });
        return;
    })
}

exports.subscribe = async (req, res) => {
    const { userPseudo, idSubscription, idSubscriptionStripe } = req.body;
    const idUser = await getUserId(userPseudo);
    const startedDate = getCurrentDate();
    const endedDate = getDateInOneMonth(); //sub for 1 month

    const sql = 'INSERT INTO subscribe ("idSubscription", "startedDate", "endedDate", "idUser", stripe_id) VALUES ($1,$2,$3,$4,$5)';
    await db.query(sql, [idSubscription, startedDate, endedDate, idUser, idSubscriptionStripe], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occurred during the subscription" });
            return;
        }
        res.status(200).send({ message: "Your premium subscription is ended " + endedDate + " !", endedDate: endedDate });
        return;
    })
}

exports.getUserSubscribeValid = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    const currentDate = getCurrentDate();
    const sql = 'SELECT s."idSubscription", "pseudo", "endedDate", "price", "type" FROM subscribe s\
    INNER JOIN subscription on subscription."idSubscription" = s."idSubscription"\
    INNER JOIN users u on u."idUser" = s."idUser"\
    WHERE u.pseudo = $1 and "endedDate" >= $2';
    await db.query(sql, [userPseudo, currentDate], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occurred during the subscription" });
            return;
        }
        const subscription = (result.rows.length !== 0) ? result.rows[0] : {}
        res.status(200).send({ subscription: subscription });
        return;
    })
}

exports.getMangasRated = async (req, res) => {
    const userPseudo = req.params.userPseudo;
    sql = 'SELECT u.pseudo, m."technicalName", m."titleName", rm.rate, m."coverImage", m.description, m."createdDate", m."idManga" from rates_manga rm\
    INNER JOIN manga m on m."idManga" = rm."idManga"\
    INNER JOIN users u on u."idUser" = rm."idUser"\
    WHERE u.pseudo = $1';
    await db.query(sql, [userPseudo], (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        let mangaRated = result.rows;
        res.status(200).send({ mangaRated: mangaRated });
        return;
    })
}

exports.getSubscriptionUserStripe = async (req, res) => {
    const { userPseudo } = req.params;

    const isSubscribe = await isUserSubscribe(userPseudo);
    res.status(200).send({ active: isSubscribe });
    return;
}

exports.getUserStats = async (req, res) => {
    const { userPseudo } = req.params;

    const sql = 'SELECT COUNT(*) as mangasRead from history_read_chapter hm\
    INNER JOIN users u on hm."idUser" = u."idUser"\
    INNER JOIN chapter ON chapter."idChapter"=hm."idChapter"\
    INNER JOIN manga ON manga."idManga"=chapter."idManga"\
    where u.pseudo = $1';
    await db.query(sql, [userPseudo], (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send({ message: "An error occurred during the fetching" });
            return;
        }
        const mangasRead = result.rows[0].mangasread;
        //TODO : get number nft of users
        res.status(200).send({ mangasRead: mangasRead, nfts: 3 });
        return;
    })
}
