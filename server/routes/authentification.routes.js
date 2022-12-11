const express = require('express');
const router = express();
const authentificationController = require('../controllers/authentification.controller');

router.post('/login', authentificationController.login);
router.post('/register', authentificationController.register);

module.exports = router;