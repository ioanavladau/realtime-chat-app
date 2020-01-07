let mongoose = require('mongoose');
// let Schema = mongoose.Schema;

// define Schema
let MessageSchema = mongoose.Schema({
    sender: String,
    message: String,
    room: String, 
    writtenAt: String
});

module.exports = mongoose.model('Message', MessageSchema, 'messages');