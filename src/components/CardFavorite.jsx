import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import context from '../context/context';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function CardFavorite({ filter }) {
  const [showFavoriteRecipe, setShowFavoriteRecipe] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { copyToClipboard } = useContext(context);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes && filter === 'all') {
      setFilteredRecipes(favoriteRecipes);
    }
    if (favoriteRecipes && filter === 'food') {
      const foodsList = favoriteRecipes
        .filter((savedRecipes) => savedRecipes.type === 'food');
      setFilteredRecipes(foodsList);
    }
    if (favoriteRecipes && filter === 'drink') {
      const drinkList = favoriteRecipes
        .filter((savedRecipes) => savedRecipes.type === 'drink');
      setFilteredRecipes(drinkList);
    }
  }, [filter]);

  const handleClickCopyLinkButton = (e) => {
    if (recipe.type === 'food') {
      const linkCopied = 'Link copied!';
      global.alert(linkCopied);
      const url = `http://localhost:3000/foods/${recipe.id}`;
      copyToClipboard(url);
      e.target.innerText = linkCopied;
      console.log(id);
    } else {
      const linkCopied = 'Link copied!';
      global.alert(linkCopied);
      const url = `http://localhost:3000/drinks/${recipe.id}`;
      copyToClipboard(url);
      e.target.innerText = linkCopied;
      console.log(id);
    }
  };

  const handleClickOnFavoriteButton = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
    const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    console.log(newFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setShowFavoriteRecipe(!showFavoriteRecipe);
  };

  const createCard = () => filteredRecipes.map((recipe, index) => (
    <section key={ recipe.id }>
      <Link to={ `/foods/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
          width="200px"
        />
      </Link>
      <Link to={ `/foods/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      <p
        data-testid={ `${recipe.index}-horizontal-top-text` }
      >
        { `${recipe.nationality} - ${recipe.category}` }
      </p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ handleClickCopyLinkButton }
      >
        Compartilhar
      </button>
      <button
        type="button"
        name={ `${index}-horizontal-favorite-btn` }
        data-testid={ `${index}-horizontal-favorite-btn` }
        className="favorite-btn"
        src={ blackHeart }
        onClick={ handleClickOnFavoriteButton }
      >
        <img src={ blackHeart } alt="" />
      </button>
    </section>
  ));
  return (
    <section>
      {filteredRecipes[0] ? createCard()
        : (<p>Carregando...</p>)}
    </section>
  );
}

CardFavorite.propTypes = {
  filter: PropTypes.string.isRequired,
};

// const renderFood = filteredRecipes.map((recipe, index) => (

//   const renderDrink = (
//     <section key={ index }>
//       <Link to={ `/drinks/${recipe.id}` }>
//         <img
//           src={ recipe.image }
//           alt=""
//           data-testid={ `${index}-horizontal-image` }
//           width="200px"
//         />
//       </Link>
//       <Link to={ `/drinks/${recipe.id}` }>
//         <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
//       </Link>
//       <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.alcoholicOrNot }</p>
//       <button
//         type="button"
//         data-testid={ `${index}-horizontal-share-btn` }
//         src={ shareIcon }
//         onClick={ handleClickCopyLinkButton }
//       >
//         Compartilhar
//       </button>
//       <button
//         type="button"
//         data-testid={ `${index}-horizontal-favorite-btn` }
//         className="favorite-btn"
//         src={ blackHeart }
//         onClick={ handleClickOnFavoriteButton }
//       >
//         <img src={ blackHeart } alt="" />
//       </button>
//     </section>
//   );
//   if (recipe.type === 'food') {
//     return (
//       showFavoriteRecipe
//       && renderFood);
//   }
//   return (
//     showFavoriteRecipe
//     && renderDrink
//   );
// }

// CardFavorite.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   nationality: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   alcoholicOrNot: PropTypes.string.isRequired,
//   filter: PropTypes.string.isRequired,
// };

export default CardFavorite;
