import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export function isNotArrayEmpty(arr) {
  return Array.isArray(arr) && arr.length;
}

const SaveFoodsInLocal = (progress, recipeId) => {
  const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (saved) {
    saved.meals[recipeId] = progress;
    localStorage.setItem('inProgressRecipes', JSON.stringify(saved));
  }
  if (!saved) {
    const object = {
      cocktails: {},
      meals: { [recipeId]: progress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(object));
  }
};

const SaveDrinksinLocal = (progress, recipeId) => {
  const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (saved) {
    saved.cocktails[recipeId] = progress;
    localStorage.setItem('inProgressRecipes', JSON.stringify(saved));
  }
  if (!saved) {
    const object = {
      meals: {},
      cocktails: { [recipeId]: progress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(object));
  }
};

export const SaveProgressinLocalSotorage = (progress, recipeId, type) => {
  if (type === 'food') {
    SaveFoodsInLocal(progress, recipeId);
  }
  if (type === 'drink') {
    SaveDrinksinLocal(progress, recipeId);
  }
};

export function checkCheked(pathname, name, id) {
  const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (saved) {
    const { meals, cocktails } = saved;

    if (pathname.includes('foods') && meals && meals[id]) {
      const hasIngredient = saved.meals[id].some((ingredient) => ingredient === name);
      if (hasIngredient) {
        return true;
      } return false;
    }
    if (pathname.includes('drinks') && cocktails && cocktails[id]) {
      const hasIngredient = saved.cocktails[id].some((ingredient) => ingredient === name);
      if (hasIngredient) {
        return true;
      } return false;
    }
  }
  return false;
}

export const SaveFavoriteRecipe = ({
  id, type, nationality, category, alcoholicOrNot, name, image }) => {
  const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!savedFavorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    }]));
  }
  if (savedFavorites) {
    const findId = savedFavorites.some((favorite) => favorite.id === id);
    if (!findId) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...savedFavorites, {
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
      }]));
    }
    if (findId) {
      const newFavoritsList = savedFavorites.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritsList));
    }
  }
};

export const checkFavorite = ({ id }) => {
  const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!savedFavorites) {
    return whiteHeart;
  }
  if (savedFavorites) {
    const isFavorite = savedFavorites.some((recipe) => recipe.id === id);
    if (isFavorite) {
      return blackHeart;
    } return whiteHeart;
  }
};

export const handleFavoriteBtn = (src, setImage) => {
  if (src.includes('blackHeartIcon')) {
    setImage(whiteHeart);
  } else { setImage(blackHeart); }
};

export const checkRecipeProgress = (recipe, setDisabled) => {
  if (recipe.type === 'food') {
    const progressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
      .meals[recipe.id];
    if (progressRecipe) {
      console.log(progressRecipe.length);
      console.log(recipe.ingredients.length);
      if (progressRecipe.length === recipe.ingredients.length) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }
};

export const SaveDoneRecipe = (recipeToSave) => {
  const saved = JSON.parse(localStorage.getItem('doneRecipes'));
  if (saved) {
    const newSaved = [...saved, recipeToSave];
    localStorage.setItem('doneRecipes', JSON.stringify(newSaved));
  }
  if (!saved) {
    localStorage.setItem('doneRecipes', JSON.stringify([recipeToSave]));
  }
};

export const handleFinishClickBtn = (recipe) => {
  delete recipe.ingredients;
  delete recipe.instructions;
  if (recipe.type === 'food') {
    recipe.tags = recipe.tags.split((/\s*,\s*/));
  }
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  recipe.doneDate = `${day}/${month}/${year}`;
  SaveDoneRecipe(recipe);
};
