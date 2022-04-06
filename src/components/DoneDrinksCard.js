import React, { useState, useEffect } from 'react';

export default function DoneDrinksCard() {
  const [doneDrinks, setDrinks] = useState([]);
  const saved = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (saved) {
      const drinksDone = saved.filter((drink) => drink.type === 'drink');
      setDrinks(drinksDone);
    }
  }, []);

  return (
    <div>
      {doneDrinks.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            key={ recipe.id }
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </p>
          <p>
            { recipe.alcoholicOrNot }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Compartilhar
          </button>
        </div>
      ))}
    </div>
  );
}
