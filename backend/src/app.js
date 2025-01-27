const express = require('express');
const cors = require('cors');
const { equipmentrRoutes } = require('./routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/', equipmentrRoutes);

module.exports = app;
