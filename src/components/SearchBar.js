import React from 'react';
import PropTypes from 'prop-types';
import SearchBarFilters from './SearchBarFilters';
// import SearchBarForFoods from './SearchBarForFoods';
// import SearchBarForDrinks from './SearchBarForDrinks';

function SearchBar(props) {
  const { pathname } = props;
  console.log(pathname);
  return (
    <SearchBarFilters pathname={ pathname } />
    // <>
    //   <SearchBarFilters pathname={ pathname } />
    //   { pathname === '/foods'
    //     ? <SearchBarForFoods { ...props } />
    //     : <SearchBarForDrinks { ...props } /> }
    // </>
  );
}

SearchBar.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default SearchBar;
