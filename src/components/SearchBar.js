import React from 'react';
import PropTypes from 'prop-types';
import SearchBarFilters from './SearchBarFilters';

function SearchBar(props) {
  const { location } = props;
  const { pathname } = location;

  return (
    <>
      <SearchBarFilters pathname={ pathname } />
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
