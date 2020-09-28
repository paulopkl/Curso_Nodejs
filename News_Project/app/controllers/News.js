module.exports.news = function (app, req, res) {
    const connection = app.config.dbConnection();
    // This opens a new instance
    const newsModel = new app.app.models.newsDAO(connection);
    // connection.query(<sql>, <Callback>);
    newsModel.getNews(function (error, result) {
        // res.send(result);
        res.render("noticias/news", { news: result });
    });
};

module.exports.singleNews = function (app, req, res) {
    const { id_noticia } = req.query;
    const connection = app.config.dbConnection();
    const newsModel = new app.app.models.newsDAO(connection);

    newsModel.getSingleNews(id_noticia, function (error, result) {
        res.render('noticias/singleNews', { news: result });
    });
};
