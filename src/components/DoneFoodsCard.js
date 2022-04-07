import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

function DoneFoodsCard() {
  const [food, setFoods] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('doneRecipes'));
    if (saved) {
      const foodsList = saved.filter((savedRecipes) => savedRecipes.type === 'food');
      setFoods(foodsList);
    }
  }, []);

  const createFoodCard = () => food.map((meal, index) => (
    <div key={ index }>
      <img
        src={ meal.image }
        alt={ meal.name }
        data-testid={ `${index}-horizontal-image` }
        width="60px"
      />
      <p data-testid={ `${index}-horizontal-name` }>{meal.name}</p>
      <p data-testid={ `${index}-horizontal-name` }>{meal.tags}</p>
      <p data-testid={ `${index}-horizontal-tag` }>{meal.category}</p>
      <p data-testid={ `${index}-horizontal-done-date` }>{meal.doneDate}</p>
      <p>{meal.nationality}</p>
      <button type="button" data-testid="start-recipe-btn">Compartilhar</button>
    </div>
  ));

  return (
    <section>{food[0] ? createFoodCard() : (<p>Carregando...</p>)}</section>
  );
}

export default DoneFoodsCard;
