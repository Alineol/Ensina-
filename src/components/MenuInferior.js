import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function MenuInferior() {
  return (
    <div data-testid="footer" className="footer">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink" />
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explore" />
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Food" />
    </div>
  );
}

export default MenuInferior;
