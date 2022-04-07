import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreDrinks(props) {
  const { history } = props;
  const getRandomDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    return (data.drinks[0].idDrink);
  };
  return (
    <div className="page">
      <Header pageTitle="Explore Drinks" showSearchButton={ false } />
      <div className="explore-div">
        <button
          onClick={ () => history.push('/explore/drinks/ingredients') }
          type="button"
          data-testid="explore-by-ingredient"
          className="explore-selector-btn"
        >
          By Ingredient
        </button>
        <button
          onClick={ async () => history.push(`/drinks/${await getRandomDrink()}`) }
          type="button"
          data-testid="explore-surprise"
          className="explore-selector-btn"
        >
          Surprise me!
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}
ExploreDrinks.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ExploreDrinks;
