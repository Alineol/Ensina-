import React, { useState, useEffect } from 'react';
import {
  getFoodsByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi } from '../services/fetchApiSearchBar';

export default function SearchBar() {
  const [filterByIngredient, setFilterByIngredient] = useState('');
  const [filterByName, setFilterByName] = useState('');
  const [filterByFirstLetter, setFilterByFirstLetter] = useState('');

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

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="search-input"
      />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredient-search"
      />
      Ingredient
      <input
        data-testid="name-search-radio"
        type="radio"
        name="name-search"
      />
      Name
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="first-letter-search"
      />
      First Letter
      <button
        data-testid="exec-search-btn"
        type="button"
        name="search-button"
      >
        Search
      </button>
    </div>
  );
}
