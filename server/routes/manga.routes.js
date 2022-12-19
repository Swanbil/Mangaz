const express = require('express');
const router = express();
const mangaController = require('../controllers/manga.controller');

router.get('/manga/:manga/chapter/:number', mangaController.getPagesOfChapter);
router.get('/manga/catalogue', mangaController.getCatalogue);
router.get('/manga/:mangaName/chapters', mangaController.getChapters);
router.post('/manga/add/favoris', mangaController.addMangaToFavoris);
router.delete('/manga/remove/favoris', mangaController.removeMangaFromFavoris);

module.exports = router;