module.exports = function(app) {
    app.get('/', function(req, res) {
        app.app.controllers.Home.index(app, req, res);
    });
}