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
    <div key={ recipe.id } className="done-recipe-card">
      <Link
        className="done-recipe-img-a"
        to={ `/${recipe.type}s/${recipe.id}` }
      >
        <img
          width="60px"
          key={ recipe.id }
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          className="done-recipe-img"
        />
      </Link>
      <div className="informations-done-div">
        <div className="done-horizontal-top-text">
          <span data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'drink' ? recipe.alcoholicOrNot
              : `${recipe.nationality} - ${recipe.category}`}
          </span>
        </div>
        <Link
          to={ `/${recipe.type}s/${recipe.id}` }
        >
          <h6 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h6>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { `Done date: ${recipe.doneDate}`}
        </p>
        {recipe.tags && (
          <>
            <span
              className="done-tags"
              data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
            >
              {recipe.tags[0]}
            </span>
            {recipe.tags[1] && (
              <span
                className="done-tags"
                data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
              >
                {recipe.tags[1]}
              </span>
            )}
          </>
        )}

      </div>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ (e) => handleShareClick(recipe, e) }
      >
        <img src={ shareIcon } className="done-share-icon" alt="shareIcon" />
      </button>
    </div>
  ));
  return (
    <section className="done-recipes-section">
      {doneRecipes[0] ? createCard()
        : (<p>We could not find done recipes. </p>)}
    </section>
  );
}

DoneRecipeCard.propTypes = {
  filter: PropTypes.string.isRequired,
};
