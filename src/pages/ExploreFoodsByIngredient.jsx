import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreFoodsByIngredient() {
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

  const createIngredientCard = (() => ingredients.map(({ strIngredient,
    idIngredient }, index) => {
    const img = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
    return (
      <button
        type="button"
        key={ idIngredient }
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ img }
          alt="imagem do ingrediente"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
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

export default ExploreFoodsByIngredient;
