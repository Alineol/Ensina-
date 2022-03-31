import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreDrinksByIngredient() {
  const [ingredients, setIngredients] = useState([]);

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

  const createIngredientCard = (() => ingredients.map(({ strIngredient1 }, index) => {
    const img = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
    return (
      <button
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
