const db = require('../config/database');
const {getUserIdFromPseudo} = require("./user.controller");
const crypto = require('crypto');

// Defining password
const password = 'cnouswesh';

// Defining key
const cryptoEncryptedKey = crypto.scryptSync(password, 'GfG', 24);

//Defining algorithm
const algorithm = 'aes-192-cbc';

// Defining iv
const iv = Buffer.alloc(16, 0);


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

        let encryptedPrivateKey = result.rows[0].private_key;
        console.log(encryptedPrivateKey);

        //If private key don't exist in BDD
        if(encryptedPrivateKey == null){
            res.send("Private key don't exist");
            return;
        }

        // Decrypt process
        const decipher = crypto.createDecipheriv(algorithm, cryptoEncryptedKey, iv);

        // Updating encrypted text
        let privateKey = decipher.update(encryptedPrivateKey, "hex", "utf8");
        privateKey += decipher.final('utf8');

        res.send(privateKey.toString());


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

    // Crypt process
    const cipher = crypto.createCipheriv(algorithm, cryptoEncryptedKey, iv);

    // Encrypt the private key
    let encryptedPrivateKey = cipher.update(privateKey, 'utf8', 'hex');
    encryptedPrivateKey += cipher.final('hex');


    let sql = 'Update users SET private_key = $1 WHERE pseudo = $2';

    await db.query(sql, [encryptedPrivateKey, userPseudo], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(404).send({ message: "An error occured by adding private key to user" });
            return;
        }
        res.status(200).send({ message: "private key add " + encryptedPrivateKey});
        return;
    });
}