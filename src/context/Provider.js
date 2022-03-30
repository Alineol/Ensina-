import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  // const [mealsToken, setMealsToken] = useState(1);
  // const [cocktailsToken, setCocktailsToken] = useState(1);
  const [user, setUser] = useState({ email: '' });
  const [renderFoodRecipes, setRenderFoodRecipes] = useState(true);
  // const [doneRecipes, setDoceRecipes] = useState([]);
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const contextValue = {
    user,
    setUser,
    recipesFiltered,
    setRecipesFiltered,
    renderFoodRecipes,
    setRenderFoodRecipes,
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
