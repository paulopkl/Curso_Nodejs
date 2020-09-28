module.exports = function (app) {

    app.post('/chat', (req, res) => {
        app.app.controllers.chat.InicializeChat(app, req, res);
    });
    
    app.get('/chat', (req, res) => {
        app.app.controllers.chat.InicializeChat(app, req, res);
    });

};