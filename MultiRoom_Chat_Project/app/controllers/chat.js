module.exports.InicializeChat = function (app, req, res) {
    const dataForm = req.body;

    req.assert('nickname', 'Name or Nickname can\'t be Null!!').notEmpty();
    req.assert('nickname', 'Name or Nickname must contain between 3 and 15 characters!!').len(3, 15);

    const errors = req.validationErrors();

    if(errors) {
        // res.send('There are errors in the form');
        res.render('index', { errors });
        return;
    }

    // getter and setter in variable 'io', the method 'emmit' make a request to frontend
    app.get('io').emit('msgToClient', { nickname: dataForm.nickname,  message: 'Just joined the chat!' });

    res.render('chat', { dataForm });
};