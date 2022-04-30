import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import { SaveProgressinLocalSotorage } from '../services/helpers';
import context from '../context/context';

function FoodInProgress(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { progress, setProgress } = useContext(context);

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
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
      if (JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id]) {
        setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id]);
      }
    };

    fetchRecipeApi();
  }, []);

  useEffect(() => {
    if (progress.length > 0) {
      SaveProgressinLocalSotorage(progress, id, 'food');
    }
  }, [progress, id]);

  return (
    <div className="page">
      <section className="recipe-section">
        {
          recipe && <Recipe
            props={ props }
            recipe={ recipe }
            viewMode="inProgress"
          />
        }
      </section>
    </div>

  );
}

export default FoodInProgress;
