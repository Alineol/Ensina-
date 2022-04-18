import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import {
  SaveProgressinLocalSotorage } from '../services/helpers';
import context from '../context/context';

function DrinkInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { ingredientChecked, ingredientClick,
    progress, setProgress } = useContext(context);

  useEffect(() => {
    if (progress.length > 0) {
      SaveProgressinLocalSotorage(progress, id, 'drink');
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

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (savedProgress) {
      if (savedProgress.cocktails[id]) {
        const saved = savedProgress.cocktails[id];
        setProgress(saved);
      }
    } else {
      setProgress([]);
    }
  }, [id]);

  const adaptToRecipe = (data) => {
    if (!data.drinks) {
      return;
    }

    const singleRecipe = data.drinks[0];
    const { strDrink,
      strDrinkThumb, strCategory, strInstructions, strAlcoholic } = data.drinks[0];

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value)
      .map((ingredient) => ingredient[1]);

    setRecipe({
      name: strDrink,
      image: strDrinkThumb,
      category: strCategory,
      ingredients,
      instructions: strInstructions,
      type: 'drink',
      nationality: '',
      alcoholicOrNot: strAlcoholic,
      id,
    });
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saved && saved.cocktails[id]) {
      setProgress(saved.cocktails[id]);
    }
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
    <div className="page">
      <section className="recipe-section">

        {
          recipe && <Recipe
            recipe={ recipe }
            viewMode="inProgress"
          />
        }
      </section>

    </div>

  );
}

export default DrinkInProgress;
