const getFoodsByIngredientApi = async () => {
  const requestByIngredient = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}');
  const responseJson = await requestByIngredient.json();
  return responseJson;
};

const getFoodsByNameApi = async () => {
  const requestByName = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s={nome}');
  const responseJson = await requestByName.json();
  return responseJson;
};

const getFoodsByFirstLetterApi = async () => {
  const requestByFirstLetter = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}');
  const responseJson = await requestByFirstLetter.json();
  return responseJson;
};

const responsesApi = {
  getFoodsByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi,
};

export default responsesApi;
