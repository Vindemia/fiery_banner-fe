import React, { useState } from 'react';
import './App.css';
import CharacterSheet from './containers/characterSheet';
import Login from './containers/login'
import UserContext from './context/UserContext';

function App() {
  const [user, updateUser] = useState({
    isLogIn: false,
    username: '',
    characterList: []
  })

  return (
    <UserContext.Provider value={{ user, updateUser }} >
      {user.isLogIn ? <CharacterSheet /> : <Login />}
    </UserContext.Provider>
  );
}

export default App;
