const crypto = require('crypto');

function UsersDAO(connection) {
    this._connection = connection();
}

UsersDAO.prototype.insertUser = function(data) {
    // Db.open(callback(error, client));
    this._connection.open((err, mongoclient) => {
        // handle documents within sections

        // Generate HASH with crypto
        const crypPassword = crypto.createHash('md5').update(data.password).digest('hex');
        data.password = crypPassword;

        // mongoclient.collection('[database name]', callback(error, object));
        mongoclient.collection("users", (err, collection) => {
            collection.insert(data);
            // Close the connection
            mongoclient.close();
        });
    });
}

UsersDAO.prototype.Authenticate = function(data, req, res) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection("users", (err, collection) => {

            data.password = crypto.createHash('md5').update(data.password).digest('hex');

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