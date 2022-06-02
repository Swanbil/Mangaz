const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const port = process.env.PORT || 8000;

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MangazDb',
    password: 'vote',
    port: 5432,
})

app.get('/welcome', (req, res) => {
    res.send('Hello world !!');
});

app.post('/register', async (req, res) => {
    const user = req.body;
    if (user.lastname === '' || user.firstname === '' || user.email === '' || user.pseudo === '' || user.password === '') {
        res.status(400).json('Veuillez remplir tous les champs')
        return;
    }
    const sql = "SELECT COUNT(*) FROM users WHERE pseudo=$1"
    const result = await pool.query(sql,[user.pseudo])
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
            res.status(200).json("New user "+user.pseudo+ " registered !")
        });

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