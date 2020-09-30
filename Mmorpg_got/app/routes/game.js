module.exports = app => {
    
    app.get('/game', (req, res) => {
        app.app.controllers.game.game(app, req, res);
    });

    app.get('/exit', (req, res) => {
        app.app.controllers.game.exit(app, req, res);
    });
    
    app.get('/subjects', (req, res) => {
        app.app.controllers.game.subjects(app, req, res);
    });
    
    app.get('/scrolls', (req, res) => {
        app.app.controllers.game.scrolls(app, req, res);
    });
    
    app.post('/order_action_subject', (req, res) => {
        app.app.controllers.game.orderActionSubject(app, req, res);
    });
    
    app.get('/revogue_action', (req, res) => {
        app.app.controllers.game.revogueAction(app, req, res);
    });

};