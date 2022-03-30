import React from 'react';

function FoodInProgress() {
  return (
    <div>
      <h1>Food in progreess page</h1>
      <img data-testid="recipe-photo" src="img" alt="RecipePhoto" />
      <h2 data-testid="recipe-title"> Nome da Receita</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">texto da categoria</p>
      <h3>Ingredients</h3>
      <li>Lista ingredientes</li>
      <h3>Instructions</h3>
      <p data-testid="instructions">Texto instruções</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>

    </div>

  );
}

export default FoodInProgress;
