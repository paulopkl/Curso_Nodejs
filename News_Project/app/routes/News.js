// const dbConnection = require('../../config/dbConnection');
module.exports = function(app) {
    app.get('/news', function(req, res) {
        app.app.controllers.News.news(app, req, res);
    });
    
    app.get('/singlenews', function(req, res) {
        app.app.controllers.News.singleNews(app, req, res);
    });
}