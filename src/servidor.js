const express = require('express');
const rotas = require("./rotas");

const app = express();

app.use(rotas);

module.exports = app;