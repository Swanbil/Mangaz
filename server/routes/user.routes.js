const express = require('express');
const router = express();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/chapter/history/save', userController.saveChapterRead);

module.exports = router;