import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import context from '../context/context';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function CardFavorite(
  { id, image, name, category, nationality, type, index, alcoholicOrNot },
) {
  const [showFavoriteRecipe, setShowFavoriteRecipe] = useState(true);
  const { copyToClipboard } = useContext(context);
  const handleClickCopyLinkButton = (e) => {
    if (type === 'food') {
      const linkCopied = 'Link copied!';
      global.alert(linkCopied);
      const url = `http://localhost:3000/foods/${id}`;
      copyToClipboard(url);
      e.target.innerText = linkCopied;
      console.log(id);
    } else {
      const linkCopied = 'Link copied!';
      global.alert(linkCopied);
      const url = `http://localhost:3000/drinks/${id}`;
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

  const renderFood = (
    <section key={ index }>
      <Link to={ `/foods/${id}` }>
        <img
          src={ image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
          width="200px"
        />
      </Link>
      <Link to={ `/foods/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${nationality} - ${category}` }
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
  );

  const renderDrink = (
    <section key={ index }>
      <Link to={ `/drinks/${id}` }>
        <img
          src={ image }
          alt=""
          data-testid={ `${index}-horizontal-image` }
          width="200px"
        />
      </Link>
      <Link to={ `/drinks/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
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
        data-testid={ `${index}-horizontal-favorite-btn` }
        className="favorite-btn"
        src={ blackHeart }
        onClick={ handleClickOnFavoriteButton }
      >
        <img src={ blackHeart } alt="" />
      </button>
    </section>
  );
  if (type === 'food') {
    return (
      showFavoriteRecipe
      && renderFood);
  }
  return (
    showFavoriteRecipe
    && renderDrink
  );
}

CardFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};

export default CardFavorite;
