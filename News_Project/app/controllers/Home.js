module.exports.index = function (app, req, res) {
    const connection = app.config.dbConnection();
    const newsModel = new app.app.models.newsDAO(connection);
    newsModel.getLatestNews((error, result) => {
        res.render("home/index", { news: result });
    });
};