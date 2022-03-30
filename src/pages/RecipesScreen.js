import React from 'react';
import PropTypes from 'prop-types';
import FoodsCards from '../components/FoodsCards';
import PrincipalScreenFilters from '../components/PrincipalScreenFilters';
import DrinksCards from '../components/DrinksCards';
// import context from '../context/context';

function RecipesScreen(props) {
  const { location } = props;
  const { pathname } = location;

  return (
    <div className="recipesScreen">
      <PrincipalScreenFilters pathname={ pathname } />
      {pathname === '/foods' ? <FoodsCards { ...props } /> : <DrinksCards { ...props } />}
    </div>
  );
}

RecipesScreen.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RecipesScreen;
