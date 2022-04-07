import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardSuggestion from './CardSuggestion';

function DrinkSuggestion({ numberOfSuggestions }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const adaptToRecipes = (data) => {
      if (!data.drinks) {
        return;
      }

      const recipes = data.drinks
        .slice(0, numberOfSuggestions)
        .map((recipe) => ({
          name: recipe.strDrink,
          photo: recipe.strDrinkThumb,
          category: recipe.strCategory,
        }));

      setSuggestions(recipes);
    };

    const fetchFoodsApi = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      adaptToRecipes(data);
    };

    fetchFoodsApi();
  }, [numberOfSuggestions]);

  return (
    <section className="suggestionSection">
      {
        suggestions && suggestions.map((recipe, index) => (
          <CardSuggestion
            key={ index }
            photo={ recipe.photo }
            category={ recipe.category }
            title={ recipe.name }
            index={ index }
          />))
      }

    </section>

  );
}

DrinkSuggestion.propTypes = {
  numberOfSuggestions: PropTypes.number.isRequired,
};

export default DrinkSuggestion;
