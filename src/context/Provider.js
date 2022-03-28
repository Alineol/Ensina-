import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  // const [mealsToken, setMealsToken] = useState(1);
  // const [cocktailsToken, setCocktailsToken] = useState(1);
  const [user, setUser] = useState({ email: '' });
  // const [doneRecipes, setDoceRecipes] = useState([]);
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const contextValue = {
    user, setUser,
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
