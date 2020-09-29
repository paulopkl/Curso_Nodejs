function UsersDAO(connection) {
    this._connection = connection();
}

UsersDAO.prototype.insertUser = function(user) {
    // Db.open(callback(error, client));
    this._connection.open((err, mongoclient) => {
        // handle documents within sections

        // mongoclient.collection('[database name]', callback(error, object));
        mongoclient.collection("users", (err, collection) => {
            // console.log(user);
            collection.insert(user);
            // Close the connection
            mongoclient.close();
        });
    });
}

UsersDAO.prototype.Authenticate = function(data, req, res) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection("users", (err, collection) => {
            // collection.find({ user: { $eq: data.user }, password: { $eq: data.password } });
            // collection.find({ user: data.user, password: data.password });
            collection.find(data).toArray((err, result) => {
                console.log(result);
                if (result[0] != undefined || result[0] != null) {
                    req.session.authorization = true; // Session variable
                    req.session.user = result[0].user;
                    req.session.house = result[0].house;
                } else {
                    req.session.authorization = false;
                }

                if (req.session.authorization) {
                    // res.send('User was found in the database!');
                    res.redirect('game');
                } else {
                    // res.send('User does not exist in the database!');
                    res.render('index', { errors: [{ msg: 'User does not exist in the database!' }] });
                }
            });
            mongoclient.close();
        });
    });
}

module.exports = () => UsersDAO;