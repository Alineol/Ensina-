import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import { getFoodsByIngredientApi } from '../services/fetchApiSearchBar';
import context from '../context/context';

function ExploreFoodsByIngredient(props) {
  const { history } = props;
  const { setRecipes, setShowFilteredRecipes } = useContext(context);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const maxIndex = 12;
      const data = await response.json();
      const twelveIngredients = data.meals.slice(0, maxIndex);
      setIngredients(twelveIngredients);
    };
    getIngredients();
  }, [setIngredients]);

  const handleCardClick = async (ingredient) => {
    const recipes = await getFoodsByIngredientApi(ingredient);
    const maxIndex = 12;
    const twelveRecipes = recipes.meals.slice(0, maxIndex);
    setRecipes(twelveRecipes);
    setShowFilteredRecipes(true);
    history.push('/foods');
  };
  const createIngredientCard = (() => ingredients.map(({ strIngredient,
    idIngredient }, index) => {
    const img = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
    return (
      <button
        onClick={ () => handleCardClick(strIngredient) }
        type="button"
        key={ idIngredient }
        data-testid={ `${index}-ingredient-card` }
        className="explore-result-btn"
      >
        <img
          src={ img }
          alt="imagem do ingrediente"
          data-testid={ `${index}-card-img` }
          className="explore-result-img"
        />
        <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
      </button>
    );
  }));

  return (
    <div className="page">
      <Header pageTitle="Explore Ingredients" showSearchButton={ false } />
      <div className="Ingredients-div">
        {ingredients[0] ? createIngredientCard() : (<p>Carregando...</p>)}
      </div>
      <MenuInferior />
    </div>
  );
}

ExploreFoodsByIngredient.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ExploreFoodsByIngredient;
