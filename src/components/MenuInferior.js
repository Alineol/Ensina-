import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function MenuInferior() {
  return (
    <div
      data-testid="footer"
      style={ { bottom: '0', position: 'fixed' } }
      className="footer"
    >
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          className="foot-img"
          alt="Drink"
        />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          className="foot-img"
          src={ exploreIcon }
          alt="Explore"
        />
      </Link>
      <Link to="/foods">
        <img
          className="foot-img"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Food"
        />
      </Link>
    </div>
  );
}

export default MenuInferior;
