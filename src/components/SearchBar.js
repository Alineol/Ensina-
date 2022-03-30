import React from 'react';
import PropTypes from 'prop-types';
import SearchBarForFoods from './SearchBarForFoods';
import SearchBarForDrinks from './SearchBarForDrinks';

function SearchBar(props) {
  const { location } = props;
  const { pathname } = location;

  return (
    <>
      <SearchBarForFoods pathname={ pathname } />
      { pathname === '/foods'
        ? <SearchBarForFoods { ...props } />
        : <SearchBarForDrinks { ...props } /> }
    </>
  );
}

SearchBar.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SearchBar;
