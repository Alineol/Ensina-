import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreFoodsByIngredient() {
  const getIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const maxIndex = 12;
    const data = await response.json();
    const twelveIngredients = data.meals.slice(0, maxIndex);
    return twelveIngredients;
  };
  const getIngredienteImg = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`);
    return (response.url);
  };
  getIngredients();
  getIngredienteImg('banana');
  return (
    <>
      <Header pageTitle="Explore Ingredients" showSearchButton={ false } />
      <MenuInferior />
    </>
  );
}

export default ExploreFoodsByIngredient;
