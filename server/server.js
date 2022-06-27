const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const axios = require('axios').default;
const port = process.env.PORT || 8000;

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MangazDb',
    password: 'vote',
    port: 5432,
})
app.use("/images", express.static('chapters'));

app.get('/welcome', (req, res) => {
    res.send('Hello world !!');
});

app.get('/catalogue', async(req, res) => {
    const datas = await (await axios.get('https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=20')).data.data;
    let catalogue = []
    datas.forEach(manga => {
        const m = {
            "id":manga["id"],
            "title": manga['attributes']['titles']['en_jp'],
            "startDate": manga['attributes']['startDate'],
            "synopsis": manga['attributes']['synopsis'],
            "coverImage": manga['attributes']['posterImage']['small'],
            "popularityRank": manga['attributes']['popularityRank']
        }
        catalogue.push(m)
    });
    res.send(catalogue)
});

app.get('/chapter/:manga/:number', async(req,res) => {
    const mangaTitle = req.params.manga;
    const numberChapter = req.params.number;
    console.log(mangaTitle, numberChapter);
    let urlScan = "http://192.168.1.82:8000/images/";
    let chapter = [];
    for(let i=1;i<=16;i++){
        if(i<=9){
            chapter.push({uri:urlScan + "0"+ i + ".png"});
        }
        else{
            chapter.push({uri:urlScan + i + ".png"});
        }
    }
    res.json(chapter);

});

app.post('/register', async (req, res) => {
    const user = req.body;
    if (user.lastname === '' || user.firstname === '' || user.email === '' || user.pseudo === '' || user.password === '') {
        res.status(400).json('Veuillez remplir tous les champs')
        return;
    }
    const sql = "SELECT COUNT(*) FROM users WHERE pseudo=$1"
    const result = await pool.query(sql, [user.pseudo])
    if (result.rows[0].count >= 1) {
        res.status(400).json('Cet utilisateur existe deja');
        return
    }
    else {
        const passwordCrypted = await bcrypt.hash(user.password, 10);
        const query = "INSERT INTO users(lastname, firstname, email, password, pseudo) VALUES($1,$2,$3,$4,$5)";
        pool.query(query, [user.lastname, user.firstname, user.email, passwordCrypted, user.pseudo], (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.status(200).json("New user " + user.pseudo + " registered !")
        });

    }
});

app.post('/register', async (req, res) => {
    const user = req.body;
    if (user.lastname === '' || user.firstname === '' || user.email === '' || user.pseudo === '' || user.password === '') {
        res.status(400).json('Veuillez remplir tous les champs')
        return;
    }
    const sql = "SELECT COUNT(*) FROM users WHERE pseudo=$1"
    const result = await pool.query(sql, [user.pseudo])
    if (result.rows[0].count >= 1) {
        res.status(400).json('Cet utilisateur existe deja');
        return
    }
    else {
        const passwordCrypted = await bcrypt.hash(user.password, 10);
        const query = "INSERT INTO users(lastname, firstname, email, password, pseudo) VALUES($1,$2,$3,$4,$5)";
        pool.query(query, [user.lastname, user.firstname, user.email, passwordCrypted, user.pseudo], (err, result) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.status(200).json("New user " + user.pseudo + " registered !");
        });

    }
});

app.post('/login', async (req, res) => {
    const user = req.body;
    if (user.pseudo === '' || user.password === '') {
        res.status(400).json('Veuillez remplir tous les champs')
        return;
    }
    const sql = "SELECT * FROM users WHERE pseudo=$1";
    const result = await pool.query(sql, [user.pseudo])
    if (result.rows.length != 1) {
        res.status(400).json("Identifiants doesn't exist");
        return
    }
    else {
        const passwordHash = result.rows[0].password;
        if (await bcrypt.compare(user.password, passwordHash)) {
            // req.session.userId = result.rows[0].idUser;
            // console.log("session id = ", req.session.userId)
            // const token = jwt.sign({ log: true, admin: false }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
            // res.json({
            //     message: 'Bienvenue ',
            //     token: token
            // })
            // console.log("Authentification réussie")
            res.status(200).json(user.pseudo);
        }
        else {
            res.status(401).json('Mot de passe inconu');
            return
        }

    }
});

app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});