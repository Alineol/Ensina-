import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
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
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map((ingredient) => ingredient[1]);

    setRecipe({
      name: singleRecipe.strDrink,
      photo: singleRecipe.strDrinkThumb,
      category: singleRecipe.strCategory,
      ingredients,
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
    <div>
      <h1>Drink in Details</h1>
      {
        recipe && <Recipe
          recipe={ recipe }
          viewMode="details"
        />
      }

    </div>

  );
}

export default DrinkDetails;
