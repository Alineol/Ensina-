import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [renderFoodRecipes, setRenderFoodRecipes] = useState(true);
  // const [doneRecipes, setDoceRecipes] = useState([]);
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);

  const contextValue = {
    user,
    setUser,
    recipes,
    setRecipes,
    recipesFiltered,
    setRecipesFiltered,
    showFilteredRecipes,
    setShowFilteredRecipes,
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
