import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilterRecipes] = useState('All');

  const allFavorites = (
    favoriteRecipes.map((recipe, index) => (
      <CardFavorite
        key={ index }
        id={ recipe.id }
        name={ recipe.name }
        image={ recipe.image }
        category={ recipe.category }
        nationality={ recipe.nationality }
        type={ recipe.type }
        index={ index }
        alcoholicOrNot={ recipe.alcoholicOrNot }
      />
    ))
  );

  const filterRecipes = () => {
    if (filteredRecipes === 'All') {
      return allFavorites;
    }
  };
  return (
    <div className="page">
      <Header pageTitle="Favorite Recipes" showSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterRecipes('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterRecipes('Foods') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterRecipes('Drinks') }
      >
        Drinks
      </button>
      <section>
        {
          favoriteRecipes.map((recipe, index) => (
            <CardFavorite
              key={ index }
              id={ recipe.id }
              name={ recipe.name }
              image={ recipe.image }
              category={ recipe.category }
              nationality={ recipe.nationality }
              type={ recipe.type }
              index={ index }
              alcoholicOrNot={ recipe.alcoholicOrNot }
            />
          ))
        }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
