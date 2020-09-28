module.exports = app => {

    app.get('/', (req, res) => {
        app.app.controllers.index.Home(app, req, res);
    });

};