module.exports = app => {
    
    app.get('/game', (req, res) => {
        app.app.controllers.game.game(app, req, res);
    });

    app.get('/exit', (req, res) => {
        app.app.controllers.game.exit(app, req, res);
    });
};