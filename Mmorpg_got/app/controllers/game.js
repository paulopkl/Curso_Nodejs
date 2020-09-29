module.exports.game = function (app, req, res) {
    if (req.session.authorization) {
        res.render('game');
    } else {
        // res.send('Do you need to LogIn!')
        res.redirect('/');
    }
};

module.exports.exit = function (app, req, res) {
    if(req.session.authorization) {
        req.session.destroy((err, result) => {
            res.render('index', { errors: {} });
        });
        return;
    }

    res.redirect('/');
};
