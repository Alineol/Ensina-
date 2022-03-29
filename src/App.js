import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
