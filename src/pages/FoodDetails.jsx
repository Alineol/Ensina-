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
    console.log(singleRecipe);

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
      name: singleRecipe.strMeal,
      image: singleRecipe.strMealThumb,
      category: singleRecipe.strCategory,
      ingredients: ingredientsWithMeasures,
      instructions: singleRecipe.strInstructions,
      alcoholicOrNot: '',
      nationality: singleRecipe.strArea,
      id,
      type: 'food',
      video: singleRecipe.strYoutube,
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
      <div className="page">
        <section>
          <Recipe
            recipe={ recipe }
            viewMode="details"
          />
        </section>
        <iframe
          title="teste"
          width="450"
          height="350"
          src={ recipe.video }
          frameBorder="0"
          allowFullScreen
          data-testid="video"
          className="details-video"
        />
        <section className="sugestions-section">
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
