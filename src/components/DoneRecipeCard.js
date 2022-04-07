import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipeCard({ filter }) {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('doneRecipes'));
    if (saved && filter === 'all') {
      setDoneRecipes(saved);
    }
    if (saved && filter === 'food') {
      const foodsList = saved.filter((savedRecipes) => savedRecipes.type === 'food');
      setDoneRecipes(foodsList);
    }
    if (saved && filter === 'drink') {
      const drinkList = saved.filter((savedRecipes) => savedRecipes.type === 'drink');
      setDoneRecipes(drinkList);
    }
  }, [filter]);
  const createCard = () => doneRecipes.map((recipe, index) => (
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
      {recipe.type === 'drink' && (
        <>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
          {/* <p>
            { recipe.alcoholicOrNot }
          </p> */}
        </>
      )}
      {recipe.type === 'food' && (
        <>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.nationality} - ${recipe.category}` }
          </p>
          <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
            {recipe.tags[0]}
          </p>
          {recipe.tags[1] && (
            <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
              {recipe.tags[1]}
            </p>
          )}
        </>
      )}
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
      >
        Compartilhar
      </button>
    </div>
  ));
  return (
    <section>
      {doneRecipes[0] ? createCard()
        : (<p>Carregando...</p>)}
    </section>
  );
}

DoneRecipeCard.propTypes = {
  filter: PropTypes.string.isRequired,
};
