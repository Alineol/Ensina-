import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div className="page">
      <Header pageTitle="Favorite Recipes" showSearchButton={ false } />
    </div>
  );
}

export default FavoriteRecipes;
