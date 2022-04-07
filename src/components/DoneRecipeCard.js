import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import context from '../context/context';

export default function DoneRecipeCard({ filter }) {
  const { copyToClipboard,
  } = useContext(context);
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

  const handleShareClick = (recipe, e) => {
    const url = window.location.host;
    copyToClipboard(`http://${url}/${recipe.type}s/${recipe.id}`);
    e.target.innerText = 'Link copied!';
  };

  const createCard = () => doneRecipes.map((recipe, index) => (
    <div key={ recipe.id }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
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
      </Link>
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
        onClick={ (e) => handleShareClick(recipe, e) }
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
