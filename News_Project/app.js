const app = require('./config/server');

// const rotaNoticias = require('./app/routes/noticias')(app);
// rotaNoticias(app);
// const rotaHome = require('./app/routes/home')(app);
// rotaHome(app);
// const rotaForm = require('./app/routes/formulario_inclusao_noticia')(app);
// rotaForm(app);

app.listen(3000, function() { console.log('Servidor rodando') });