import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';

function FoodDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const adaptToRecipe = (data) => {
    if (!data.meals) {
      return;
    }

    const singleRecipe = data.meals[0];

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map((ingredient) => ingredient[1]);

    setRecipe({
      name: singleRecipe.strMeal,
      photo: singleRecipe.strMealThumb,
      category: singleRecipe.strCategory,
      ingredients,
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
    <div>
      <h1>Food in Details</h1>
      {
        recipe && <Recipe
          recipe={ recipe }
          viewMode="details"
        />
      }

    </div>

  );
}

export default FoodDetails;
