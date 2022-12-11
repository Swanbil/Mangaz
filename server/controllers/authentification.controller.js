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