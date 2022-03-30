import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreDrinks() {
  return (
    <Header pageTitle="Explore Drinks" showSearchButton={ false } />
    <MenuInferior />
  );
}

export default ExploreDrinks;
