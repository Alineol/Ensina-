const callApi = async (api, filter) => {
  const requestByIngredient = await fetch(`${api}${filter}`);
  const responseJson = await requestByIngredient.json();
  return responseJson;
};

export const getFoodsByIngredientApi = async (ingredient) => callApi(
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  ingredient,
);

export const getDrinksByIngredientApi = async (ingredient) => callApi(
  'www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  ingredient,
);

export const getFoodsByNameApi = async (name) => callApi(
  'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  name,
);

export const getFoodsByFirstLetterApi = async (firstLetter) => callApi(
  'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  firstLetter,
);
