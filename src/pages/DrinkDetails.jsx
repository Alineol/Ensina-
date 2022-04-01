import React, { useEffect, useState } from 'react';
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

    const ingredientsWithMeasures = ingredients
      .map(([iKey, iValue]) => {
        const measure = measures.find(([mKey, mValue]) => {
          const measureKey = iKey.replace('Ingredient', 'Measure');
          return mKey === measureKey && mValue;
        });
        return `${iValue} ${measure[1]}`;
      });

    setRecipe({
      name: singleRecipe.strDrink,
      photo: singleRecipe.strDrinkThumb,
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

export default DrinkDetails;
