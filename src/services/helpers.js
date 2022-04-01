export function isNotArrayEmpty(arr) {
  return Array.isArray(arr) && arr.length;
}

export const createInProgressStorage = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
      },
      meals: {
      },
    }));
  }
};
