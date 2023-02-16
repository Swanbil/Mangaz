const express = require('express');
const router = express();
const web3Controller = require('../controllers/web3.controller');


router.get('/web3/getPrivateKey/:userPseudo', web3Controller.getPrivateKey);
router.post('/web3/postPrivateKey', web3Controller.postPrivateKey);

router.get('/web3/OpenSea/getNFTsUser/:userAddress', web3Controller.getNftsUser);
router.get('/web3/OpenSea/getNFT/:asset_contract/:idToken', web3Controller.getNft);
router.get('/web3/OpenSea/getCollection/:nameCollection', web3Controller.getCollection);
router.get('/web3/OpenSea/getCollections/:asset_collection', web3Controller.getCollections);
router.get('/web3/OpenSea/getNFTsFromCollection/:name_collection', web3Controller.getNftsFromCollection);


module.exports = router;