const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const getEpisodesRoutes = require('./routes/getepisoderoutes');
const getIframeRoutes = require('./routes/getiframeroutes');
const fetchIframeRoutes = require('./routes/fetchiframeroutes');

app.use('/', getEpisodesRoutes);
app.use('/', getIframeRoutes);
app.use('/', fetchIframeRoutes);

app.listen(3001, () => {
    console.log('Backend iniciado correctamente (3001)');
});