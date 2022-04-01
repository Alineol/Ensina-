import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreFoods(props) {
  const getRandomFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return (data.meals[0].idMeal);
  };
  const { history } = props;
  return (
    <div className="page">
      <Header pageTitle="Explore Foods" showSearchButton={ false } />
      <div className="explore-div">
        <button
          onClick={ () => history.push('/explore/foods/ingredients') }
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
        <button
          onClick={ () => history.push('/explore/foods/nationalities') }
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
        <button
          onClick={ async () => history.push(`/foods/${await getRandomFood()}`) }
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}
ExploreFoods.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ExploreFoods;
