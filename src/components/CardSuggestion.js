import React from 'react';
import PropTypes from 'prop-types';

function Card({ photo, title, category, index }) {
  return (
    <section
      data-testid={ `${index}-recomendation-card` }
      className="card"
    >
      <img
        src={ photo }
        alt={ title }
        width="100px"
      />
      <p>{category}</p>
      <h6 data-testid={ `${index}-recomendation-title` }>
        {title}
      </h6>
    </section>
  );
}

Card.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
