import React, { useContext, useState } from 'react';
import context from '../context/context';
import {
  getFoodsByIngredientApi,
  getDrinksByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi } from '../services/fetchApiSearchBar';

export default function SearchBar() {
  const { recipesFiltered, setRecipesFiltered } = useContext(context);

  const [filters, setFilters] = useState({
    filters: {
      searchInputText: '',
      ingredientFilterType: [],
      nameFilterType: [],
      firstLetterFilterType: [],
    },
  });

  const setFilter = (filter, value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      filters: {
        [filter]: value,
      },
    }));
  };

  const handleChange = ({ target: { name, value } }) => setFilter(name, value);

  const validateFields = (searchInputText,
    ingredientFilterType,
    firstLetterFilterType,
    nameFilterType) => {
    // Validar se os filtros informados são válidos
    if (searchInputText !== undefined) {
      return true;
    }
    if (ingredientFilterType || nameFilterType || firstLetterFilterType) {
      return true;
    }
    return false;
  };

  const FOOD = 'food';
  const DRINK = 'drink';
  const mergeFoodsAndDrinksRecipes = (foods, drinks) => {
    const mergedResults = [];
    mergedResults.push(foods.map((food) => ({
      id: food.idDrink,
      description: food.strMeal,
      imageUrl: food.strMealThumb,
      type: FOOD,
    })));

    mergedResults.push(drinks.map((drink) => ({
      id: drink.idMeal,
      description: drink.strDrink,
      imageUrl: drink.strDrinkThumb,
      type: DRINK,
    })));
    return mergedResults;
  };

  const getRecipesByIngredient = async (textFilter) => {
    const foods = await getFoodsByIngredientApi(textFilter);
    const drinks = await getDrinksByIngredientApi(textFilter);
    return mergeFoodsAndDrinksRecipes(foods, drinks);
  };

  const getRecipesByName = async (textFilter) => {
    const foods = await getFoodsByNameApi(textFilter);
    const drinks = await getDrinksByNameApi(textFilter);
    return mergeFoodsAndDrinksRecipes(foods, drinks);
  };

  const getRecipesByFirstLetter = async (textFilter) => {
    const foods = await getFoodsByFirstLetterApi(textFilter);
    const drinks = await getDrinksByFirstLetterApi(textFilter);
    return mergeFoodsAndDrinksRecipes(foods, drinks);
  };

  const handleClickButton = () => {
    const {
      searchInputText,
      ingredientFilterType,
      nameFilterType,
      firstLetterFilterType } = filters;

    if (validateFields(searchInputText, ingredientFilterType)) {
      if (ingredientFilterType) {
        setRecipesFiltered(getRecipesByIngredient(searchInputText));
      }
      if (nameFilterType) {
        setRecipesFiltered(getRecipesByName(searchInputText));
      }
      if (firstLetterFilterType) {
        setRecipesFiltered(getRecipesByFirstLetter(searchInputText));
      }
    }
    return recipesFiltered;
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="search-input"
        value={ searchInputText }
        onChange={ handleChange }
      />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredient-search"
        value={ ingredientFilterType }
        onChange={ handleChange }
      />
      Ingredient
      <input
        data-testid="name-search-radio"
        type="radio"
        name="name-search"
        value={ nameFilterType }
        onChange={ handleChange }
      />
      Name
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="first-letter-search"
        value={ firstLetterFilterType }
        onChange={ handleChange }
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
