const db = require('../config/database');
const bcrypt = require('bcryptjs');
const {getUserIdFromPseudo} = require("./user.controller");


exports.getPrivateKey = async (req, res) => {
    const user = req.params.userPseudo;

    const sql = "SELECT private_key FROM users WHERE pseudo=$1";

    db.query(sql, [user], async (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }

        if (result.rows.length != 1) {
            res.status(400).json("error no user found");
            return
        }

        if (result.rows[0].private_key == null ) {
            res.status(400).json("null");
            return
        }

        res.send("private key is " + result.rows[0].private_key) ;

    });
}

exports.postPrivateKey = async (req, res) => {
    const userPseudo = req.body.userPseudo;
    const privateKey = req.body.privateKey;
    const idUser = await getUserIdFromPseudo(userPseudo);

    if (idUser === null) {
        res.status(404).send({ message: "No user corresponding to this pseudo" });
        return;
    }

    let sql = 'Update users SET private_key = $1 WHERE pseudo = $2';

    await db.query(sql, [privateKey, userPseudo], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by adding to favoris this manga" });
            return;
        }
        res.status(200).send({ message: "private key add " });
        return;
    });
}