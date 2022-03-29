import React, { useState, useEffect } from 'react';
import {
  getFoodsByIngredientApi,
  getDrinksByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi } from '../services/fetchApiSearchBar';

export default function SearchBar() {
  const [filterByIngredient, setFilterByIngredient] = useState([]);
  const [filterByName, setFilterByName] = useState([]);
  const [filterByFirstLetter, setFilterByFirstLetter] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  const [filters, setFilters] = useState({
    filters: {
      searchByIngredient: '',
      searchByName: '',
      searchByFirstLetter: '',
    },
  });

  useEffect(() => {
    const setSearchByIngredient = async () => {
      const searchIngredient = await getFoodsByIngredientApi();
      setFilterByIngredient(searchIngredient);
    };
    const setSearchByName = async () => {
      const searchName = await getFoodsByNameApi();
      setFilterByName(searchName);
    };
    const setSearchByLetter = async () => {
      const searchFirstLetter = await getFoodsByFirstLetterApi();
      setFilterByFirstLetter(searchFirstLetter);
    };

    setSearchByIngredient();
    setSearchByName();
    setSearchByLetter();
  }, []);

  const validateFields = (searchInputText) => {
    // Validar se os filtros informados são válidos
    if (searchInputText !== undefined) {
      return true;
    }
    return false;
  };

  const FOOD = 'food';
  const DRINK = 'drink';
  const mergeFoodsAndDrinksRecipes = (foods, drinks) => {
    let mergedResults;
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

    if (validateFields(searchInputText)) {
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
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="search-input"
        value={ searchInputText }
      />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredient-search"
        value={ ingredientFilterType }
      />
      Ingredient
      <input
        data-testid="name-search-radio"
        type="radio"
        name="name-search"
        value={ nameFilterType }
      />
      Name
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="first-letter-search"
        value={ firstLetterFilterType }
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
