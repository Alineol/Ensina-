import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Ingredient from './Ingredient';
import context from '../context/context';
import { SaveFavoriteRecipe, checkFavorite,
  handleFavoriteBtn, handleFinishClickBtn } from '../services/helpers';

function Recipe({ recipe, viewMode }) {
  const {
    copyToClipboard,
    progress,
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
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe.image }
        alt="RecipePhoto"
        className="recipe-image"
      />
      <h6 data-testid="recipe-title">
        {recipe.name}
      </h6>
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
          handleFavoriteBtn(img, setImage);
        } }
      >
        <img src={ img } alt="favoritar" />
      </button>

      <section className="ingredients-section">
        <h6>Ingredients</h6>
        <ul
          className="ingredients-list"
          style={ { listStyle: viewMode === 'inProgress' ? 'none' : null } }
        >
          {
            recipe.ingredients && renderIngredients()
          }
        </ul>
      </section>
      <section>
        <h6>Instructions</h6>
        <p data-testid="instructions">{recipe.instructions}</p>
        {
          viewMode === 'inProgress'
            ? (
              <Link to="/done-recipes">
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  disabled={ disabled }
                  onClick={ () => handleFinishClickBtn(recipe) }
                >
                  Finish Recipe
                </button>
              </Link>
            ) : null
        }
      </section>
    </>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    doneDate: PropTypes.string,
  }).isRequired,
  viewMode: PropTypes.oneOf(['details', 'inProgress']).isRequired,
};

export default Recipe;
