/* importar as configurações do servidor */
var app = require('./config/server');



/* parametrizar a porta de escuta */
const port = 8000
app.listen(port, function(){
	console.log('Servidor online');
});