module.exports.formincludenews = function (app, req, res) {
    res.render("admin/form_add_news", { errors: {}, data: {} });
}

module.exports.news_save = function (app, req, res) {
    const data = req.body;

    req.assert('titulo', 'Title\'s Required!!').notEmpty();
    req.assert('summary', 'Summary\'s Required!!').notEmpty();
    req.assert('summary', 'Summary\'s must contain between 10 and 100 characters!!').len(10, 100);
    req.assert('author', 'Author\'s Required!!').notEmpty();
    req.assert('noticia', 'News\'s Required!!').notEmpty();
    req.assert('data_news', 'Date\'s Required!!').notEmpty().isDate({ format: 'YYYY-MM-DD' });

    // This property will receive the value 'true'
    const errors = req.validationErrors();

    if (errors) {
        res.render('admin/form_add_news', { errors, data: data || {} });
        return;
    }

    // Connection 
    const connection = app.config.dbConnection();
    // Model
    const newsModel = new app.app.models.newsDAO(connection);
    // Save

    newsModel.saveNews(data, function (error, result) {
        // res.render("noticias/news", { news: result });
        res.redirect('/news');
    });
}
