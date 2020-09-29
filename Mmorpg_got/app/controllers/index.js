module.exports.index = (app, req, res) => {
    res.render('index', { errors: {}});
};

module.exports.authenticate = (app, req, res) => {

    const dataForm = req.body;

    req.assert('user', 'User Can\'t be empty!').notEmpty();
    req.assert('password', 'Password Can\'t be empty!').notEmpty();
    req.assert('password', 'Password must contain between 3 and 15 characters!').len(3, 15);

    const errors = req.validationErrors();

    if (errors) {
        res.render('index', { errors });
        return;
    }

    const connection = app.config.dbConnection;
    const UsersDAO = new app.app.models.usersDAO(connection);

    UsersDAO.Authenticate(dataForm, req, res);
};
