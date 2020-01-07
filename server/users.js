// helper functions for managing users

const users = [];

const addUser = ({ id, name, room }) => {
    // remove white space and make lowercase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    // addUser function returns either an object with an error property

    if (existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { id, name, room };

    users.push(user);

    // or it returns an object with the user

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    // if user exists
    if (index !== -1) {
        return users.splice(index, 1)[0]; // remove spliced user from array
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };