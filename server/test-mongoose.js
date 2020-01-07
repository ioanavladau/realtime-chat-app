var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost:27017/react-chat-app');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    var MessageSchema = mongoose.Schema({
      sender: String,
      message: String,
      writtenAt: String
    });
 
    // compile schema to model
    var Message = mongoose.model('Message', MessageSchema, 'messages');
 
    // a document instance
    var current_date=new Date();

    var message1 = new Message({ sender: 'Ioana', message: 'test', writtenAt: current_date });
 
    // save model to database
    message1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(message1.sender + " saved to messages collection.");
    });
    
});