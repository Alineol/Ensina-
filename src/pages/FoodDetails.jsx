import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
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

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value);

    const measures = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strMeasure') && value);

    const ingredientsWithMeasures = ingredients
      .map(([iKey, iValue]) => {
        const measure = measures.find(([mKey, mValue]) => {
          const measureKey = iKey.replace('Ingredient', 'Measure');
          return mKey === measureKey && mValue;
        });
        return `${iValue} ${measure[1]}`;
      });

    setRecipe({
      name: singleRecipe.strMeal,
      photo: singleRecipe.strMealThumb,
      category: singleRecipe.strCategory,
      ingredients: ingredientsWithMeasures,
      instructions: singleRecipe.strInstructions,
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
          <button
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        </section>
      </div>
    )
  );
}

export default FoodDetails;
