const express = require('express');
const socket = require('socket.io');
const app = express();
const port = 3000;

// set up a server
const server = app.listen(port, () => console.log(`Listening on port ${port}!`));

// static files
app.use(express.static('public'));

// set up socket on the server
io = socket(server);

// listen on the connection event for incoming sockets
io.on('connection', (socket) => {
    console.log("Made a socket connection: " + socket.id);
    // handle chat event
    socket.on("chat", (data) => {
        io.emit("chat", data);
    });

    // handle typing event
    socket.on("typing", (data) => {
        // broadcast to every other client
        socket.broadcast.emit("typing", data);
    });
});