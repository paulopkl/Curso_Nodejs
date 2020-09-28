// Inicialize server
const express = require('express');
const app = express();

const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set Views-Engine, Views
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configures middlewares express.static for standard location files
app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Configures consig
consign()
    // Includes everything inside the folder 'routes'
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    //  All modules will be inserted in the object 'app'
    .into(app);

// Export Server
module.exports = app;