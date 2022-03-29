const callApi = async (api, filter) => {
  const requestByIngredient = await fetch(`${api}${filter}`);
  const responseJson = await requestByIngredient.json();
  return responseJson;
};

const getFoodsByIngredientApi = async (ingredient) => callApi(
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  ingredient,
);

const getDrinksByIngredientApi = async (ingredient) => callApi(
  'www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  ingredient,
);

const getFoodsByNameApi = async (name) => callApi(
  'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  name,
);

const getFoodsByFirstLetterApi = async (firstLetter) => callApi(
  'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  firstLetter,
);

const responsesApi = {
  getFoodsByIngredientApi,
  getDrinksByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi,
};

export default responsesApi;
