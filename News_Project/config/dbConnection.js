const mysql = require('mysql');

const connMySQL = function () {
    console.log("Connection successfully!!");
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'portal_noticias'
    });
}

module.exports = () => {
    console.log("O auto-load carregou o módulo de conexão com o banco de dados!!!");
    return connMySQL;
} 