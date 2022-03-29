import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import MenuInferior from './components/MenuInferior';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        </Switch>
        <MenuInferior />

        {/* <div className="meals">
          <span className="logo">TRYBE</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object>
        </div> */}
      </Provider>
    </BrowserRouter>
  );
}

export default App;
