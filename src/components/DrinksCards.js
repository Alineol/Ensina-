import React, { useEffect, useContext } from 'react';
import context from '../context/context';

function DrinksCards(props) {
  const { history } = props;
  const { recipes, setRecipes, showFilteredRecipes } = useContext(context);
  useEffect(() => {
    const fetchFoodsApi = async () => {
      const maxIndex = 12;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveRecipes = data.drinks.slice(0, maxIndex);
      setRecipes(twelveRecipes);
    };
    if (showFilteredRecipes === false) {
      fetchFoodsApi();
    }
  }, [setRecipes, showFilteredRecipes]);

  if (recipes[0] !== undefined) {
    return (
      <section className="recipes-section">
        {recipes.map((recipe, index) => (
          <button
            type="button"
            key={ recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/drinks/${recipe.idDrink}`) }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {recipe.strDrink}
            </p>
          </button>
        ))}
      </section>
    );
  }
  return (
    <p>Carregando...</p>
  );
}

export default DrinksCards;
