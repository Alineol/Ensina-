import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import { createInProgressStorage,
  SaveProgressinLocalSotorage } from '../services/helpers';
import context from '../context/context';

function FoodInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { ingredientChecked } = useContext(context);

  useEffect(() => {
    SaveProgressinLocalSotorage(ingredientChecked, id, 'food');
  }, [ingredientChecked]);

  useEffect(() => {
    createInProgressStorage();
  }, []);

  const adaptToRecipe = (data) => {
    if (!data.meals) {
      return;
    }

    const singleRecipe = data.meals[0];
    const { strMeal,
      strMealThumb, strCategory, strInstructions, strArea } = data.meals[0];

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map((ingredient) => ingredient[1]);

    setRecipe({
      name: strMeal,
      image: strMealThumb,
      category: strCategory,
      ingredients,
      instructions: strInstructions,
      alcoholicOrNot: '',
      nationality: strArea,
      id,
      type: 'food',
    });
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
    };

    fetchRecipeApi();
  }, []);

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
