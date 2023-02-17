const express = require('express');
const router = express();
const mangaController = require('../controllers/manga.controller');

router.get('/manga/:manga/chapter/:number', mangaController.getPagesOfChapter);
router.get('/manga/catalogue', mangaController.getCatalogue);
router.get('/manga/catalogue/:userPseudo', mangaController.getCatalogueWithUserFavoris);
router.get('/manga/catalogue/:userPseudo/recommandations', mangaController.getCatalogueRecommandation);
router.get('/manga/:mangaName/chapters', mangaController.getChapters);
router.post('/manga/add/favoris', mangaController.addMangaToFavoris);
router.post('/manga/remove/favoris', mangaController.removeMangaFromFavoris);
router.post('/manga/rating', mangaController.rateManga);

module.exports = router;