const express = require('express');
const router = express();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/chapter/history/save', userController.saveChapterRead);
router.get('/user/:userPseudo/mangas/favoris', userController.getMangasFavoris);
router.get('/user/:userPseudo/mangas/rated', userController.getMangasRated);
router.get('/user/:userPseudo', userController.getUserInfos);
router.post('/user/subscribe', userController.subscribe);
router.get('/user/:userPseudo/subscribe', userController.getUserSubscribeValid);
router.get('/user/:userPseudo/subscription/me', userController.getSubscriptionUserStripe)

module.exports = router;