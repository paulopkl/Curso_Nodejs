// Import the MongoDB
const mongo = require('mongodb');

const connMongoDB = () => {
    console.log('Entered the connection function!!');
    const db = new mongo.Db(
        'got', // Database Name
        new mongo.Server(
            'localhost', // Host
            27017, // port default
            {} // Server Options
        ),
        {} // Adictional Configuration
    );
    
    return db;
}

module.exports = () => connMongoDB;