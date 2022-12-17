const express = require('express');
const router = express();
const reportingController = require('../controllers/reporting.controller');

router.get('/reporting/user/:userPseudo/history/manga', reportingController.getUserHistoryMangaRead);

module.exports = router;