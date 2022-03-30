import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreFoodsByIngredient() {
  return (
    <Header pageTitle="Explore Ingredients" showSearchButton={ false } />
    <MenuInferior />
  );
}

export default ExploreFoodsByIngredient;
