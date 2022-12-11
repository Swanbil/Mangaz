const express = require('express');
const router = express();
const mangaController = require('../controllers/manga.controller');

router.get('/chapter/:manga/:number', mangaController.getChapter);
router.get('/manga/catalogue', mangaController.getCatalogue);

module.exports = router;