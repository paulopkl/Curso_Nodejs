const ObjectId = require('mongodb').ObjectId;

function GameDAO(connection) {
    this._connection = connection();
}

GameDAO.prototype.generateParam = function (user) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection('game', (err, collection) => {
            collection.insert({
                user: user,
                coin: 15,
                subjects: 10,
                fear: Math.floor(Math.random() * 1000),
                wisdom: Math.floor(Math.random() * 1000),
                commerce: Math.floor(Math.random() * 1000),
                magic: Math.floor(Math.random() * 1000)
            });

            mongoclient.close();
        })
    })
}

GameDAO.prototype.inicializeGame = function (res, user, img_house, msg) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection('game', (err, collection) => {
            collection.find({ user }).toArray((err, result) => {
                res.render('game', { img_house, gameData: result[0], msg });
                mongoclient.close();
            });
        })
    })
}

GameDAO.prototype.getActions = function (user, res) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection('action', (err, collection) => {

            let date = new Date();
            let dateNow = date.getTime();

            collection.find({ user, action_finish_in: { $gt: dateNow } }).toArray((err, result) => {
                res.render('scrolls', { data: result });
                mongoclient.close();
            });
        })
    })
}


GameDAO.prototype.action = function (data) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection('action', (err, collection) => {

            let date = new Date();
            // date.getTime(); // 01/01/1970 => 

            let time = null;

            switch (+data.action) {
                case 1: {
                    time = 1 * 60 * 60000;
                    break;
                }
                case 2: {
                    time = 2 * 60 * 60000;
                    break;
                }
                case 3: {
                    time = 5 * 60 * 60000;
                    break;
                }
                case 4: {
                    time = 5 * 60 * 60000;
                    break;
                }
                default: { }
            }

            data.quantity = +data.quantity;

            data.action_finish_in = +(date.getTime() + time);
            collection.insert(data);
        });

        mongoclient.collection('game', (err, collection) => {

            let coins = 0;
            switch (+data.action) {
                case 1: {
                    coins = -2 * data.quantity;
                    break;
                }
                case 2: {
                    coins = -3 * data.quantity;
                    break;
                }
                case 3: {
                    coins = -1 * data.quantity;
                    break;
                }
                case 4: {
                    coins = -1 * data.quantity;
                    break;
                }
                default: { }
            }

            collection.update({ user: data.user }, { $inc: { coin: coins } });

            mongoclient.close();
        });
    })
}

GameDAO.prototype.revogueActions = function (id, req, res) {
    this._connection.open((err, mongoclient) => {
        mongoclient.collection('action', (err, collection) => {
            collection.remove({ _id: ObjectId(id) }, (err, result) => {
                res.redirect('game?msg=D');
                mongoclient.close();
            });
        });
    });
}

module.exports = function () {
    return GameDAO;
}