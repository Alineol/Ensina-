import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import RecipesScreen from './pages/FoodRecipes';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/foods" render={ () => <RecipesScreen /> } />
        </Switch>
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
