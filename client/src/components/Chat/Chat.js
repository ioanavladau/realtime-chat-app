import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState(''); // initial value will be empty string
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const ENDPOINT = 'localhost:5000'; // local files
    const ENDPOINT = 'https://react-chat-app-web19w1.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search); // location comes from react-router

        socket = io(ENDPOINT);

        // console.log(location.search);
        console.log(`name: ${name}, room: ${room}`);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            // I can destructure parameters from the callback from b-e
            // this will be executed when the callback from the back-end is called
            // alert(error);

        });

        // console.log(socket);

        // used for unmounting
        return () => {
            socket.emit('disconnect');
            
            socket.off();
        }
    }, [ENDPOINT, location.search]); // if present, effect will only activate if the values in the list change

    // handling messages
    useEffect(() => {
        // linked to socket.emit in the b-e
        socket.on('message', (message) => {
            setMessages([...messages, message]); // spread all msgs and add one msg to it
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

        // return () => {
        //     socket.emit('disconnect');
      
        //     socket.off();
        // }


    }, [messages]);

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        
        if (message) {
            // message, callback
            socket.emit('sendMessage', message, () => setMessage('')); // clear input on message sent
        }
    }

    console.log(message, messages);


    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
};

export default Chat;