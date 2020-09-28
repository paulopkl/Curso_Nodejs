module.exports = function(app) {

    app.get('/formincludenews', function(req, res) {
        app.app.controllers.Admin.formincludenews(app, req, res);
    });
    
    app.post('/news/save', function(req, res) {
        app.app.controllers.Admin.news_save(app, req, res);
    });
}