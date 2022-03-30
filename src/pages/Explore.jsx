import React from 'react';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Explore() {
  return (
    <>
      <Header pageTitle="Explore" showSearchButton={ false } />
      <MenuInferior />
    </>
  );
}

export default Explore;
