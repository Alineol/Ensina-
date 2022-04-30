import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'food', 'drink'];

  return (
    <div className="page">
      <Header pageTitle="Done Recipes" showSearchButton={ false } />
      <section className="filter-section">
        {filters.map((option, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `filter-by-${option}-btn` }
            onClick={ () => setFilter(option) }
            className="done-filter-btn"
          >
            {option}
          </button>
        ))}
      </section>
      <DoneRecipeCard filter={ filter } />
    </div>
  );
}

export default DoneRecipes;
