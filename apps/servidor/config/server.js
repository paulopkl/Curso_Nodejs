/* import the module framework express */
var express = require('express');

/* import the module consign */
var consign = require('consign');

/* import the module body-parser */
var bodyParser = require('body-parser');

/* import the module express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

// Middleware that configures status code
app.use((req, res, next) => {
	// If have '404' 
	// res.status(404).send('Page not Found!');
	res.status(404).render('Errors/404');
	next();
});

// Middleware that configures status code
app.use((err, req, res, next) => {
	// If have '500' 
	res.status(500).render('Errors/500');
	next();
});

/* exportar o objeto app */
module.exports = app;