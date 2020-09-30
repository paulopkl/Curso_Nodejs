const game = (app, req, res) => {
    if (req.session.authorization !== true) {
        res.redirect('/');
    }

    let msg = '';

    if (req.query.msg !== '') {
        msg = req.query.msg;
    }
    
    const connection = app.config.dbConnection;
    const GameDAO = new app.app.models.gameDAO(connection);

    GameDAO.inicializeGame(res, req.session.user, req.session.house, msg);
    // res.send('Do you need to LogIn!')
};

const exit = (app, req, res) => {
    if(req.session.authorization) {
        req.session.destroy((err, result) => {
            res.render('index', { errors: {} });
        });
        return;
    }
    
    res.redirect('/');
};

const subjects = (app, req, res) => {
    if(req.session.authorization) {
        res.render('subjects');
        return;
    }
    
    res.redirect('/');
};

const scrolls = (app, req, res) => {
    if(req.session.authorization != true) {
        res.redirect('/');
        return;
    }

    // Recover action inserted in the database
    const connection = app.config.dbConnection;
    const GameDAO = new app.app.models.gameDAO(connection);

    const user = req.session.user;

    GameDAO.getActions(user, res);
    
    // res.render('scrolls');
};

const orderActionSubject = (app, req, res) => {
    const dataForm = req.body;

    req.assert('action', 'Action must be informed!').notEmpty();
    req.assert('quantity', 'Quantity must be informed!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.redirect('game?msg=A');
        return;
    }
    
    const connection = app.config.dbConnection;
    const GameDAO = new app.app.models.gameDAO(connection);
    
    dataForm.user = req.session.user;
    GameDAO.action(dataForm);
    
    res.redirect('game?msg=B');
}

const revogueAction = (app, req, res) => {
    const urlQuery = req.query;

    const connection = app.config.dbConnection;
    const GameDAO = new app.app.models.gameDAO(connection);
    GameDAO.revogueActions(urlQuery.id_action, req, res);
}

module.exports = { game, exit, subjects, scrolls, orderActionSubject, revogueAction };