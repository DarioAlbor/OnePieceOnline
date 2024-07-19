const express = require('express');
const router = express.Router();
const fetchIframe = require('../controllers/fetchiframecontroller');

router.post('/fetch-iframe', fetchIframe);

module.exports = router;