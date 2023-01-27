const express = require('express');
const router = express();
const web3Controller = require('../controllers/web3.controller');


router.get('/web3/getPrivateKey/:userPseudo', web3Controller.getPrivateKey);
router.post('/web3/postPrivateKey', web3Controller.postPrivateKey);


module.exports = router;