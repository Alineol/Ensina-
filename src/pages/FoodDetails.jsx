import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import DrinkSuggestion from '../components/DrinkSuggestion';
import Recipe from '../components/Recipe';

function FoodDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const adaptToRecipe = (data) => {
    if (!data.meals) {
      console.log('lala');
      return;
    }

    const singleRecipe = data.meals[0];
    const { strMeal,
      strMealThumb, strCategory, strInstructions,
      strArea, strTags, strYoutube } = data.meals[0];

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
      name: strMeal,
      image: strMealThumb,
      category: strCategory,
      ingredients: ingredientsWithMeasures,
      instructions: strInstructions,
      alcoholicOrNot: '',
      nationality: strArea,
      id,
      type: 'food',
      video: strYoutube,
      tags: strTags,
    });
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
    };

    fetchRecipeApi();
  }, [id]);

  const checkMealInProgress = () => {
    const checkMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checkMeals) {
      const isMealOnLocalStorage = Object.keys(checkMeals.meals)
        .some((keys) => keys === id);
      return isMealOnLocalStorage;
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
          <DrinkSuggestion numberOfSuggestions={ 6 } />
        </section>
        <section>
          <Link to={ `/foods/${id}/in-progress` }>
            <button
              className="start-recipe-btn"
              type="button"
              data-testid="start-recipe-btn"
            >
              { checkMealInProgress()
                ? 'Continue Recipe'
                : 'Start Recipe' }
            </button>
          </Link>
        </section>
      </div>
    )
  );
}

export default FoodDetails;
