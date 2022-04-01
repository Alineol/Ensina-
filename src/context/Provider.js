import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [renderFoodRecipes, setRenderFoodRecipes] = useState(true);
  // const [doneRecipes, setDoceRecipes] = useState([]);
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [ingredientChecked, setIngredientChecked] = useState([]);

  // const [natioanlities, setNationalities] = useState([]);
  const contextValue = {
    user,
    setUser,
    recipes,
    setRecipes,
    showFilteredRecipes,
    setShowFilteredRecipes,
    renderFoodRecipes,
    setRenderFoodRecipes,
    pageTitle,
    setPageTitle,
    ingredients,
    setIngredients,
    ingredientChecked,
    setIngredientChecked,
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
