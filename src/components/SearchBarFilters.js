import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import context from '../context/context';
import FoodsCards from './FoodsCards';
// import FoodDetails from '../pages/FoodDetails';
import DrinksCards from './DrinksCards';
// import DrinkDetails from '../pages/DrinkDetails';
import {
  getFoodsByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi,
  getDrinksByIngredientApi,
  getDrinksByNameApi,
  getDrinksByFirstLetterApi } from '../services/fetchApiSearchBar';

export default function SearchBarFilters() {
  const { setRecipes, recipes, pageTitle } = useContext(context);
  const history = useHistory();

  const [filters, setFilters] = useState({
    searchInputText: '',
    ingredientFilterType: false,
    nameFilterType: false,
    firstLetterFilterType: false,
  });

  const setFilter = (filter, value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [filter]: value,
    }));
  };

  const handleInputTextChange = ({ target }) => {
    const { name, value } = target;
    setFilter(name, value);
  };
  const handleRadioChange = ({ target: { name, checked } }) => setFilter(name, checked);

  const validateFields = (searchInputText,
    ingredientFilterType,
    nameFilterType,
    firstLetterFilterType) => {
    if (searchInputText === undefined || searchInputText === '') {
      global.alert('Informe pelo menos uma letra!');
      return false;
    }
    if (!ingredientFilterType && !nameFilterType && !firstLetterFilterType) {
      global.alert('Selecione um filtro!');
      return false;
    }
    if (firstLetterFilterType && searchInputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }
    return true;
  };

  const getRecipesByIngredient = async (textFilter) => {
    if (pageTitle === 'Foods') {
      const foods = await getFoodsByIngredientApi(textFilter);
      return foods.meals;
    }
    if (pageTitle === 'Drinks') {
      const drinks = await getDrinksByIngredientApi(textFilter);
      return drinks.drinks;
    }
  };

  const getRecipesByName = async (textFilter) => {
    if (pageTitle === 'Foods') {
      const foods = await getFoodsByNameApi(textFilter);
      return foods.meals;
    }
    if (pageTitle === 'Drinks') {
      const drinks = await getDrinksByNameApi(textFilter);
      return drinks.drinks;
    }
  };

  const getRecipesByFirstLetter = async (textFilter) => {
    if (pageTitle === 'Foods') {
      const foods = await getFoodsByFirstLetterApi(textFilter);
      return foods.meals;
    }
    if (pageTitle === 'Drinks') {
      const drinks = await getDrinksByFirstLetterApi(textFilter);
      return drinks.drinks;
    }
  };

  const cardRecipeRedirect = () => {
    if (pageTitle === 'Foods' && recipes.length > 1) {
      return <FoodsCards />;
    }
    if (pageTitle === 'Drinks' && recipes.length > 1) {
      return <DrinksCards />;
    }
  };
  // eslint-disable-next-line no-debugger
  debugger;
  const handleRedirect = () => {
    if (pageTitle === 'Foods' && recipes.length === 1) {
      history.push(`/foods/${recipes[0].idMeal}`);
    }
    if (pageTitle === 'Drinks' && recipes.length === 1) {
      history.push(`/drinks/${recipes[0].idDrinks}`);
      // return <DrinkDetails />;
    }
    cardRecipeRedirect();
  };

  const handleClickButton = async () => {
    const {
      searchInputText,
      ingredientFilterType,
      nameFilterType,
      firstLetterFilterType } = filters;
    if (validateFields(searchInputText, ingredientFilterType,
      nameFilterType, firstLetterFilterType)) {
      if (ingredientFilterType) {
        setRecipes(await getRecipesByIngredient(searchInputText));
      }
      if (nameFilterType) {
        setRecipes(await getRecipesByName(searchInputText));
      }
      if (firstLetterFilterType) {
        setRecipes(await getRecipesByFirstLetter(searchInputText));
      }
    }
    handleRedirect();
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="searchInputText"
        value={ filters.searchInputText }
        onChange={ handleInputTextChange }
      />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredientFilterType"
        checked={ filters.ingredientFilterType }
        onChange={ handleRadioChange }
      />
      Ingredient
      <input
        data-testid="name-search-radio"
        type="radio"
        name="nameFilterType"
        checked={ filters.nameFilterType }
        onChange={ handleRadioChange }
      />
      Name
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="firstLetterFilterType"
        checked={ filters.firstLetterFilterType }
        onChange={ handleRadioChange }
      />
      First Letter
      <button
        data-testid="exec-search-btn"
        type="button"
        name="search-button"
        onClick={ handleClickButton }
      >
        Search
      </button>
    </div>
  );
}
