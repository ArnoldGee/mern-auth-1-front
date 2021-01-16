import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import axios from 'axios';

import UserContext from './context/UserContext';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './style.css';

export default function App() {
  const [userData, setUserData] = useState({token: undefined, user: undefined});

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await axios.post(
        'https://mern-auth-1-back.herokuapp.com/tokenIsValid',
        null,
        {headers: {'x-auth-token': token}}
      );
      if (tokenRes.data) {
        const newUserData = await axios.get(
          'https://mern-auth-1-back.herokuapp.com/users/',
          {
            headers: {'x-auth-token': token},
          }
        );
        console.log(newUserData.data.user)
        setUserData({token, user: newUserData.data.user})
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
