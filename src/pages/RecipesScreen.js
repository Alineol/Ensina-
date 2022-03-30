import React from 'react';
import PropTypes from 'prop-types';
import FoodsCards from '../components/FoodsCards';
import PrincipalScreenFilters from '../components/PrincipalScreenFilters';
import DrinksCards from '../components/DrinksCards';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
// import context from '../context/context';

function RecipesScreen(props) {
  const { location } = props;
  const { pathname } = location;

  return (
    <div className="recipesScreen">
      <Header showSearchButton pageTitle={ pathname === '/foods' ? 'Foods' : 'Drinks' } />
      <PrincipalScreenFilters pathname={ pathname } />
      {pathname === '/foods' ? <FoodsCards { ...props } /> : <DrinksCards { ...props } />}
      <MenuInferior />
    </div>
  );
}

RecipesScreen.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RecipesScreen;
