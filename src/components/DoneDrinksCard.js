import React, { useState, useEffect } from 'react';

export default function DoneDrinksCard() {
  const [doneDrinks, setDrinks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('doneRecipes'));
    if (saved) {
      const drinksDone = saved.filter((drink) => drink.type === 'drink');
      setDrinks(drinksDone);
    }
  }, []);
  const createDrinkCard = () => doneDrinks.map((recipe, index) => (
    <div key={ recipe.id }>
      <img
        width="60px"
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
  ));
  return (
    <section>
      {doneDrinks[0] ? createDrinkCard()
        : (<p>Carregando...</p>)}
    </section>
  );
}
