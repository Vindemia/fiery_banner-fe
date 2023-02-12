import React from 'react';

const UserContext = React.createContext({
    isLogIn: false,
    username: '',
    characterList: []
});

export default UserContext;
