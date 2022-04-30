import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Recipe from '../components/Recipe';
import { SaveProgressinLocalSotorage } from '../services/helpers';
import context from '../context/context';

function DrinkInProgress(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { progress, setProgress } = useContext(context);

  // useEffect(() => () => {
  //   setProgress([]);
  // }, []);
  // useEffect(() => { setProgress([]); }, [id]);

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
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
      if (JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]) {
        setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]);
      }
    };

    fetchRecipeApi();
  }, []);

  useEffect(() => {
    if (progress.length > 0) {
      SaveProgressinLocalSotorage(progress, id, 'drink');
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

export default DrinkInProgress;
