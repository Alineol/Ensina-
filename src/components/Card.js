import React from 'react';
import PropTypes from 'prop-types';

function Card({ photo, title, category, index }) {
  return (
    <div
      data-testid={ `${index}-recomendation-card` }
      className="sugestion-card"
    >
      <p data-testid={ `${index}-recomendation-title` }>{title}</p>
      <img
        src={ photo }
        alt={ title }
        className="sugestion-img"
      />
      <p>{category}</p>
    </div>
  );
}

Card.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
