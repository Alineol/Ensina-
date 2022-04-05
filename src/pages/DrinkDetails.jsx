import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import FoodSuggestion from '../components/FoodSuggestion';
import Recipe from '../components/Recipe';

function DrinkDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const adaptToRecipe = (data) => {
    if (!data.drinks) {
      return;
    }

    const singleRecipe = data.drinks[0];

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value);

    const measures = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strMeasure') && value);

    const ingredientsWithMeasures = ingredients.map((ingredient, index) => {
      if (measures[index]) {
        console.log(measures[index]);
        return `${ingredient[1]} ${measures[index][1]}`;
      }
      return ingredient[1];
    });

    setRecipe({
      name: singleRecipe.strDrink,
      image: singleRecipe.strDrinkThumb,
      category: singleRecipe.strAlcoholic,
      ingredients: ingredientsWithMeasures,
      instructions: singleRecipe.strInstructions,
      video: singleRecipe.strVideo,
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
    if (checkDrinks) {
      const isDrinkOnLocalStorage = Object.keys(checkDrinks.cocktails)
        .some((keys) => keys === id);
      return isDrinkOnLocalStorage;
    }
  };

  return (
    recipe && (
      <div>
        <section>
          <Recipe
            recipe={ recipe }
            viewMode="details"
          />
        </section>
        <section>
          <iframe
            title="teste"
            width="450"
            height="350"
            src={ recipe.video }
            frameBorder="0"
            allowFullScreen
            data-testid="video"
          />
        </section>
        <section>
          <FoodSuggestion numberOfSuggestions={ 6 } />
        </section>
        <section>
          <Link to={ `/drinks/${id}/in-progress` }>
            <button
              className="start-recipe-btn"
              type="button"
              data-testid="start-recipe-btn"
            >
              { checkDrinkInProgress()
                ? 'Continue Recipe'
                : 'Start Recipe' }
            </button>
          </Link>
        </section>
      </div>
    )
  );
}

export default DrinkDetails;
