function NewsDAO(connection) {
    this._connection = connection;
}

NewsDAO.prototype.getNews = function(callback) {
    this._connection.query('SELECT * FROM noticias ORDER BY data_criacao DESC;', callback);
}

NewsDAO.prototype.getSingleNews = function(id, callback) {
    this._connection.query(`SELECT * FROM noticias WHERE id_noticia = ${id};`, callback);
    // The other way
    // this._connection.query(`SELECT * FROM noticias WHERE ?;`, { id_noticia: id }, callback);
}

NewsDAO.prototype.getLatestNews = function(callback) {
    this._connection.query('SELECT * FROM noticias ORDER BY data_criacao DESC LIMIT 5;', callback);
}

NewsDAO.prototype.saveNews = function(data, callback) {
    // connection.query(`INSERT INTO noticias(titulo, noticia) VALUES ('...', '...')`,
    // The JSON must contain the same label as the column in the database
    this._connection.query(`INSERT INTO noticias set ?;`, data, callback);
}

module.exports = () => NewsDAO;