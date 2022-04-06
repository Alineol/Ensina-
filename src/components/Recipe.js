import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Ingredient from './Ingredient';
import context from '../context/context';
import { SaveFavoriteRecipe, checkFavorite,
  handleFavoriteBtn } from '../services/helpers';

function Recipe({ recipe, viewMode }) {
  const { copyToClipboard, progress,
  } = useContext(context);
  const [img, setImage] = useState(checkFavorite(recipe));
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const enableFinishButton = () => {
      if (recipe.ingredients.length === progress.length) {
        setDisabled(false);
      } else { setDisabled(true); }
    };
    enableFinishButton();
  }, [progress]);

  const handleClickCopyLinkButton = (e) => {
    const linkCopied = 'Link copied!';
    if (viewMode === 'inProgress') {
      global.alert(linkCopied);
      const url = window.location.href;
      const index = url.indexOf('/in');
      const toClipBoard = url.substring(0, index);
      copyToClipboard(toClipBoard);
      e.target.innerText = linkCopied;
    } else if (viewMode === 'details') {
      global.alert(linkCopied);
      const url = window.location.href;
      copyToClipboard(url);
      e.target.innerText = linkCopied;
    }
  };

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
        src={ recipe.image }
        alt="RecipePhoto"
        height="300px"
        width="400px"
      />
      <h2 data-testid="recipe-title">
        {recipe.name}
      </h2>
      <p data-testid="recipe-category">
        {
          window.location.href.includes('foods')
            ? recipe.category
            : recipe.alcoholicOrNot
        }
      </p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleClickCopyLinkButton }
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        className="favorite-btn"
        src={ img }
        onClick={ () => {
          SaveFavoriteRecipe(recipe);
          console.log(localStorage);
          handleFavoriteBtn(img, setImage);
        } }
      >

        {/* <img src={ img } alt="favoritar" /> */}
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
            ? (
              <Link to="/done-recipes">
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  disabled={ disabled }
                >
                  Finish Recipe
                </button>
              </Link>
            ) : null
        }
      </section>
    </div>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  viewMode: PropTypes.oneOf(['details', 'inProgress']).isRequired,
};

export default Recipe;
