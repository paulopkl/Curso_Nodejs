/* importar as configurações do servidor */
var app = require('./config/server');

const port = 3000
/* parametrizar a porta de escuta */
app.listen(port, function(){
	console.log('Servidor online');
})