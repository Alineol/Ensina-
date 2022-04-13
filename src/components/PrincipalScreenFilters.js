import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/context';

function PrincipalScreenFilters(props) {
  const { setRecipes, showFilteredRecipes, setShowFilteredRecipes } = useContext(context);
  const { pathname } = props;
  const [filtersList, setFiltersList] = useState([]);
  const [selected, setSelected] = useState('');

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

  const checkSelected = (category) => {
    console.log(selected);
    switch (selected) {
    case category:
      setShowFilteredRecipes(false);
      setSelected('');
      break;
    case '':
      setSelected(category);
      break;
    default: return null;
    }
  };

  const handleButtonClick = async (strCategory) => {
    checkSelected(strCategory);
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
      className="filter-principal-btn"
      onClick={ () => handleButtonClick(strCategory) }
      // onFocus={ (e) => handleOnFocus(e) }
    >
      {strCategory}
    </button>
  ));

  return (
    <section className="principal-filters-section">
      {filtersList[0] ? createButtonsFilters() : (<p>Carregando...</p>)}
      <button
        data-testid="All-category-filter"
        type="button"
        key={ 6 }
        onClick={ () => setShowFilteredRecipes(false) }
        className="filter-principal-btn"
      >
        All
      </button>
    </section>
  );
}
PrincipalScreenFilters.propTypes = {
  pathname: PropTypes.string.isRequired,
};
export default PrincipalScreenFilters;
