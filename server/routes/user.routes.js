const express = require('express');
const router = express();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/chapter/history/save', userController.saveChapterRead);
router.get('/user/:userPseudo/mangas/favoris', userController.getMangasFavoris);
router.get('/user/:userPseudo/mangas/rated', userController.getMangasRated);
router.get('/user/:userPseudo', userController.getUserInfos);
router.get('/user/:userPseudo/stats', userController.getUserStats);
router.post('/user/subscribe', userController.subscribe);
router.get('/user/:userPseudo/subscribe', userController.getUserSubscribeValid);
<<<<<<< HEAD
router.get('/user/:userPseudo/subscription/me', userController.getSubscriptionUserStripe)
=======
router.get('/user/getProfilePicture/:userPseudo', userController.getProfilePicture);

>>>>>>> 8445147853f68511ef19d6c7362e36aca7eb0a45

module.exports = router;