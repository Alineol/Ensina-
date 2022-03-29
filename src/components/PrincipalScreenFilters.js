import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/context';

function PrincipalScreenFilters(props) {
  const { setRecipes, showFilteredRecipes, setShowFilteredRecipes } = useContext(context);
  const { pathname } = props;
  const [filtersList, setFiltersList] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const maxIndex = 5;
      if (pathname === '/foods') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const fiveCategories = data.meals.slice(0, maxIndex);
        setFiltersList(fiveCategories);
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        const fiveCategories = data.drinks.slice(0, maxIndex);
        setFiltersList(fiveCategories);
      }
    };
    fetchApi();
  }, [pathname]);

  const handleButtonClick = async (strCategory) => {
    if (showFilteredRecipes === false) {
      setShowFilteredRecipes(true);
    }
    const maxIndex = 12;
    if (pathname === '/foods') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
      const data = await response.json();
      const twelveRecipes = data.meals.slice(0, maxIndex);
      setRecipes(twelveRecipes);
    } else {
      console.log('lala');
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`);
      const data = await response.json();
      const twelveRecipes = data.drinks.slice(0, maxIndex);
      setRecipes(twelveRecipes);
    }
  };
  const createButtonsFilters = () => filtersList.map(({ strCategory }, index) => (
    <button
      data-testid={ `${strCategory}-category-filter` }
      type="button"
      key={ index }
      onClick={ () => handleButtonClick(strCategory) }
      onFocus={ () => setSelected([...selected, strCategory]) }
    >
      {strCategory}
    </button>
  ));

  return (
    <div>
      {filtersList[0] ? createButtonsFilters() : (<p>Carregando...</p>)}
      <button
        data-testid="All-category-filter"
        type="button"
        key={ 6 }
        onClick={ () => setShowFilteredRecipes(false) }
      >
        All
      </button>
    </div>
  );
}
PrincipalScreenFilters.propTypes = {
  pathname: PropTypes.string.isRequired,
};
export default PrincipalScreenFilters;
