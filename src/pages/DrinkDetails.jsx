import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import FoodSuggestion from '../components/FoodSuggestion';
import Recipe from '../components/Recipe';

function DrinkDetails(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const adaptToRecipe = (data) => {
    if (!data.drinks) {
      return;
    }

    const singleRecipe = data.drinks[0];
    const { strDrink, strDrinkThumb, strCategory, strInstructions,
      strAlcoholic } = data.drinks[0];

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value);

    const measures = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strMeasure') && value);

    const ingredientsWithMeasures = ingredients.map((ingredient, index) => {
      if (measures[index]) {
        return `${ingredient[1]} ${measures[index][1]}`;
      }
      return ingredient[1];
    });

    setRecipe({
      name: strDrink,
      image: strDrinkThumb,
      category: strCategory,
      ingredients: ingredientsWithMeasures,
      instructions: strInstructions,
      type: 'drink',
      nationality: '',
      alcoholicOrNot: strAlcoholic,
      id,
      // video,
    });
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
    };

    fetchRecipeApi();
  }, [id]);

  const checkDrinkInProgress = () => {
    const checkDrinks = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (checkDrinks && checkDrinks.cocktails) {
      const isDrinkOnLocalStorage = Object
        .keys(checkDrinks.cocktails)
        .some((keys) => keys === id);

      return isDrinkOnLocalStorage;
    }
  };

  return (
    recipe && (
      <div className="page">
        <section className="recipe-section">
          <Recipe
            recipe={ recipe }
            viewMode="details"
          />
        </section>
        <section className="sugestions-section">
          <FoodSuggestion numberOfSuggestions={ 6 } />
        </section>
        {/* <Link to={ `/drinks/${id}/in-progress` }> */}
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ () => {
            const { history } = props;
            history.push(`/drinks/${id}/in-progress`);
          } }
        >
          { checkDrinkInProgress()
            ? 'Continue Recipe'
            : 'Start Recipe' }
        </button>
        {/* </Link> */}
      </div>
    )
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DrinkDetails;
