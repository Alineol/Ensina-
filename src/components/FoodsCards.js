import React, { useContext, useEffect } from 'react';
import context from '../context/context';

function FoodsCards(props) {
  const { history } = props;
  const { recipes, setRecipes, showFilteredRecipes } = useContext(context);
  useEffect(() => {
    const maxIndex = 12;
    const fetchFoodsApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveRecipes = data.meals.slice(0, maxIndex);
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
            key={ recipe.idMeal }
            type="button"
            data-testid={ `${index}-recipe-card` }
            tabIndex={ index }
            onClick={ () => history.push(`/foods/${recipe.idMeal}`) }
          >
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {recipe.strMeal}
              {' '}
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

export default FoodsCards;
