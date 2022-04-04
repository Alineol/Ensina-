import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import { createInProgressStorage,
  SaveProgressinLocalSotorage } from '../services/helpers';
import context from '../context/context';

function DrinkInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { ingredientChecked } = useContext(context);

  useEffect(() => {
    createInProgressStorage();
  }, []);
  useEffect(() => {
    SaveProgressinLocalSotorage(ingredientChecked, id, 'drink');
  }, [ingredientChecked]);

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
      <h1>Drink in progress page</h1>
      {
        recipe && <Recipe
          recipe={ recipe }
          viewMode="inProgress"
        />
      }

    </div>

  );
}

export default DrinkInProgress;
