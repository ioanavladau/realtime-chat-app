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

// db
const mongoose = require('mongoose');

// define Schema
let MessageSchema = mongoose.Schema({
    sender: String,
    message: String,
    room: String, 
    writtenAt: String
});

let Message = mongoose.model('Message', MessageSchema, 'messages');


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


        // make a db connection
        mongoose.connect('mongodb://localhost:27017/react-chat-app');

            
        // get reference to database
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));

        // save msgs to db
        db.once('open', function() {
            console.log("Connection Successful!");
            

        
            // compile schema to model
            Message = mongoose.model('Message', MessageSchema, 'messages');
        
            // a document instance
            let current_date=new Date();
        
            let message1 = new Message({ sender: user.name, message: message, room: user.room, writtenAt: current_date });
        
            // save model to database
            message1.save(function (err, message) {
                if (err) return console.error(err);
                console.log(message1.sender + " saved to messages collection.");
            });
            
        });

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