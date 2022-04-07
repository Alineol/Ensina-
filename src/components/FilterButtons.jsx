import React from 'react';

function FilterButtons() {
  return (
    <>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    </>
  );
}

export default FilterButtons;
