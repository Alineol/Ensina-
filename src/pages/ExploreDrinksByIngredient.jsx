import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import { getDrinksByIngredientApi } from '../services/fetchApiSearchBar';
import context from '../context/context';

function ExploreDrinksByIngredient(props) {
  const { history } = props;
  const [ingredients, setIngredients] = useState([]);
  const { setRecipes, setShowFilteredRecipes  } = useContext(context);
  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const maxIndex = 12;
      const data = await response.json();
      const twelveIngredients = data.drinks.slice(0, maxIndex);
      setIngredients(twelveIngredients);
    };
    getIngredients();
  }, [setIngredients]);

  const handleCardClick = async (ingredient) => {
    const recipes = await getDrinksByIngredientApi(ingredient);
    const maxIndex = 12;
    const twelveRecipes = recipes.drinks.slice(0, maxIndex);
    setRecipes(twelveRecipes);
    setShowFilteredRecipes(true);
    history.push('/drinks');
  };

  const createIngredientCard = (() => ingredients.map(({ strIngredient1 }, index) => {
    const img = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
    return (
      <button
        onClick={ () => handleCardClick(strIngredient1) }
        type="button"
        key={ index }
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ img }
          alt={ strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
      </button>
    );
  }));

  return (
    <div className="Page">
      <Header pageTitle="Explore Ingredients" showSearchButton={ false } />
      <section className="Ingredients-div">
        {ingredients[0] ? createIngredientCard() : (<p>Carregando...</p>)}
      </section>
      <MenuInferior />
    </div>
  );
}

export default ExploreDrinksByIngredient;
