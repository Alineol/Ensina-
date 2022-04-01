import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';

function Recipe({ recipe, viewMode }) {
  const renderIngredients = () => (
    recipe.ingredients
        && recipe.ingredients.map((ingredient, index) => {
          let dataTestId = `${index}-ingredient-step`;
          let selectable = true;

          if (viewMode === 'details') {
            dataTestId = `${index}-ingredient-name-and-measure`;
            selectable = false;
          }

          return (
            <Ingredient
              key={ index }
              dataTestId={ dataTestId }
              name={ ingredient }
              selectable={ selectable }
              isSelected={ false }
            />);
        }));

  return (
    <div style={ { width: '400px' } }>
      <img
        data-testid="recipe-photo"
        src={ recipe.photo }
        alt="RecipePhoto"
        height="300px"
        width="400px"
      />

      <h2 data-testid="recipe-title">
        {recipe.name}
      </h2>
      <p data-testid="recipe-category">{recipe.category}</p>

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorito
      </button>

      <section>
        <h3>Ingredients</h3>
        <ul style={ { listStyle: viewMode === 'inProgress' ? 'none' : null } }>
          {
            recipe.ingredients && renderIngredients()
          }
        </ul>
      </section>

      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.instructions}</p>
        {
          viewMode === 'inProgress'
          && <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
        }
      </section>
      {/* <label htmlFor="card">
        {
          viewMode === 'details'
          && <input name="card" data-testid={ `${index}-recomendation-card` } />
        }
      </label> */}
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
  viewMode: PropTypes.oneOf(['details', 'inProgress']).isRequired,
};

export default Recipe;
