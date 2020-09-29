module.exports.signup = (app, req, res) => {
    res.render('signup', { errors: {}, data: {} });
};

module.exports.register = (app, req, res) => {

    const dataForm = req.body;

    req.assert('name', 'The Name Cannot be empty!!').notEmpty();
    req.assert('user', 'The User Cannot be empty!!').notEmpty();
    req.assert('password', 'The Password Cannot be empty!!').notEmpty();
    req.assert('house', 'The House Cannot be empty!!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render("signup", { errors, data: dataForm });
        return;
    }

    const connection = app.config.dbConnection;
    const UsersDAO = new app.app.models.usersDAO(connection);

    UsersDAO.insertUser(dataForm);

    res.send('We can register!!');
};
