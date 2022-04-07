import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import { SaveProgressinLocalSotorage } from '../services/helpers';
import context from '../context/context';

function FoodInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { ingredientChecked, ingredientClick,
    progress, setProgress } = useContext(context);

  useEffect(() => {
    if (progress.length > 0) {
      SaveProgressinLocalSotorage(progress, id, 'food');
    }
  }, [progress, id]);

  useEffect(() => {
    const checkIngredient = async () => {
      if (progress.includes(ingredientChecked)) {
        const newProgress = progress.filter((item) => item !== ingredientChecked);
        setProgress(newProgress);
      }
      if (!progress.includes(ingredientChecked)) {
        const newProgress = progress.concat(ingredientChecked);
        setProgress(newProgress);
      }
    };
    checkIngredient();
  }, [ingredientClick]);

  const adaptToRecipe = (data) => {
    if (!data.meals) {
      return;
    }
    const singleRecipe = data.meals[0];
    const { strMeal,
      strMealThumb, strCategory, strInstructions, strArea, strTags } = data.meals[0];

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
      tags: strTags,
    });
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saved && saved.meals[id]) {
      setProgress(saved.meals[id]);
    }
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
    <div className="page">
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
