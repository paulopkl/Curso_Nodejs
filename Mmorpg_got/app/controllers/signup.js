module.exports.signup = (app, req, res) => {
    res.render('signup', { errors: {}, data: {} });
};

module.exports.register = (app, req, res) => {

    const dataForm = req.body;

    req.assert('name', 'The Name Cannot be empty!!').notEmpty();
    req.assert('user', 'The User Cannot be empty!!').notEmpty();
    req.assert('password', 'The Password Cannot be empty!!').notEmpty();
    req.assert('password', 'Password must contain between 3 and 15 characters!').len(3, 15);
    req.assert('house', 'The House Cannot be empty!!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render("signup", { errors, data: dataForm });
        return;
    }

    const connection = app.config.dbConnection;
    
    const UsersDAO = new app.app.models.usersDAO(connection);
    const GameDAO = new app.app.models.gameDAO(connection);

    UsersDAO.insertUser(dataForm);
    GameDAO.generateParam(dataForm.user);
    // Generate params

    res.send('We can register!!');
};
