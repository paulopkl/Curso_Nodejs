// Imports server configurations
const app = require('./config/server');

// Port
const port = 3000;
const server = app.listen(port, () => console.log("Server running!! on port "+ port));

const socketio = require('socket.io').listen(server);

// Defines a global variable
app.set('io', socketio);

// Create connection for websocket
socketio.on('connection', socket => {
    // .on("name", callback); // Listen the requests
    // .emit(run the function: "name", { }); Make a request
    console.log("User Connected!");
    
    socket.on('disconnect', () => {
        console.log("User Disconnected!!");
    });

    // On receive a request to 'msgToServer'
    socket.on('msgToServer', data => {

        /* Dialogs */
        socket.emit('msgToClient', { nickname: data.nickname, message: data.message });
        
        // 'broadcast' sends a message to all other users
        socket.broadcast.emit('msgToClient', { nickname: data.nickname, message: data.message });
        
        if (Number(data.nickname_updated_clients) == 0) {
            socket.emit('peopleToClient', { nickname: data.nickname });

            socket.broadcast.emit('peopleToClient', { nickname: data.nickname });
        }

    });

});