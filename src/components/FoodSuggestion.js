import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './CardSuggestion';

function FoodSuggestion({ numberOfSuggestions }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const adaptToRecipes = (data) => {
      if (!data.meals) {
        return;
      }

      const recipes = data.meals
        .slice(0, numberOfSuggestions)
        .map((recipe) => ({
          name: recipe.strMeal,
          photo: recipe.strMealThumb,
          category: recipe.strCategory,
        }));

      setSuggestions(recipes);
    };

    const fetchFoodsApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      adaptToRecipes(data);
    };

    fetchFoodsApi();
  }, [numberOfSuggestions]);

  return suggestions && suggestions.map((recipe, index) => (
    <Card
      key={ index }
      photo={ recipe.photo }
      category={ recipe.category }
      title={ recipe.name }
      index={ index }
    />));
}

FoodSuggestion.propTypes = {
  numberOfSuggestions: PropTypes.number.isRequired,
};

export default FoodSuggestion;
