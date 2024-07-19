const express = require('express');
const router = express.Router();
const getEpisodes = require('../controllers/getepisodecontroller');

router.get('/get-one-piece-episodes', getEpisodes);

module.exports = router;