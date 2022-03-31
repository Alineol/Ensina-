import React from 'react';
import PropTypes from 'prop-types';

function Recipe({
  recipe,
  inProgress }) {
  const renderIngredientsInProgress = () => recipe.ingredients
        && recipe.ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              id={ `${index}-ingredient-step` }
              type="checkbox"
              key={ index }
              value={ ingredient }
              onChange={ (e) => {
                if (e.target.checked) {
                  e.target.nextSibling.style.textDecoration = 'line-through';
                } else {
                  e.target.nextSibling.style.textDecoration = null;
                }
              } }
            />
            <label htmlFor={ `${index}-ingredient-step` }>
              &nbsp;
              { ingredient}
            </label>
          </li>));

  const renderIngredientsList = () => (
    ingredients
        && recipe.ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            {ingredient}
          </li>))
  );

  const renderIngredients = () => (inProgress
    ? renderIngredientsInProgress()
    : renderIngredientsList());

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.photo } alt="RecipePhoto" />

      <h2 data-testid="recipe-title">{recipe.name}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{recipe.category}</p>

      <h3>Ingredients</h3>
      <ul style={ { listStyle: inProgress ? 'none' : null } }>
        {
          recipe.ingredients && renderIngredients()
        }
      </ul>

      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.instructions}</p>
      {
        inProgress
        && <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
      }

    </div>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
  inProgress: PropTypes.bool.isRequired,
};

export default Recipe;
