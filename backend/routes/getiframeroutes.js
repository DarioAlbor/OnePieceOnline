const express = require('express');
const router = express.Router();
const getIframe = require('../controllers/getiframecontroller');

router.get('/get-iframe', getIframe);

module.exports = router;