import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import { createInProgressStorage } from '../services/helpers';

function FoodInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    createInProgressStorage();
  }, []);

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
    });
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
      console.dir(data);
    };

    fetchRecipeApi();
  }, [id]);

  return (
    <div>
      {
        recipe && <Recipe
          recipe={ recipe }
          viewMode="inProgress"
        />
      }
    </div>

  );
}

export default FoodInProgress;
