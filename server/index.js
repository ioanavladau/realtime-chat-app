const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// call router as middleware
app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    console.log('We have a new connection!');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room }); // addUser returns either an object with the user or an error

        if (error) return callback(error); // if there is an existing user with that username

        // admin messaging
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        // broadcast to all other sockets except myself
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        // the if statement in the f-e won't run because there are no errors
        callback();
    });

    // sendMessage is the user-generated message
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        // do something after the message is sent on the f-e
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User had left :(');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});