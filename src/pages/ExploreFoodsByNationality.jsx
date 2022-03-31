import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreFoodsByNationality(props) {
  const { history } = props;
  const [natioanlities, setNationalities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const maxIndex = 12;

  useEffect(() => {
    const getNationalies = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const twelveNationalities = data.meals.slice(0, maxIndex);
      setNationalities(twelveNationalities);
      setSelected(twelveNationalities[0].strArea);
    };
    getNationalies();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`);
      const data = await response.json();
      const twelveRecipes = data.meals.slice(0, maxIndex);
      setRecipes(twelveRecipes);
    };
    if (selected.length > 0) {
      getRecipes();
    }
  }, [selected]);

  const createCards = () => recipes.map((recipe, index) => (
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
  ));

  return (
    <div className="page">
      <Header pageTitle="Explore Nationalities" showSearchButton />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ (e) => setSelected(e.target.value) }
      >
        {natioanlities[0] && natioanlities.map((nationality, index) => (
          <option
            data-testid={ `${nationality.strArea}-option` }
            key={ index }
          >
            {nationality.strArea}

          </option>
        ))}
      </select>
      {recipes[0] && createCards()}
      <MenuInferior />
    </div>
  );
}

ExploreFoodsByNationality.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ExploreFoodsByNationality;
