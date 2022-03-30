import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function ExploreFoods() {
  return (
    <>
      <Header pageTitle="Explore Foods" showSearchButton={ false } />
      <MenuInferior />
    </>
  );
}

export default ExploreFoods;
