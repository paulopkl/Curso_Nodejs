module.exports = app => {
    app.get('/signup', (req, res) => {
        app.app.controllers.signup.signup(app, req, res);
    });
  
    app.post('/register', (req, res) => {
        app.app.controllers.signup.register(app, req, res);
    });
};