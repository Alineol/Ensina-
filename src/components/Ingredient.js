import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Ingredient({ name, selectable, isSelected, dataTestId }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleOnChangeInput = () => {
    setSelected(!selected);
  };

  const renderSelectableIngredient = () => (
    <li data-testid={ dataTestId }>
      <input
        name={ `${name}-ingredient` }
        type="checkbox"
        value={ name }
        onChange={ handleOnChangeInput }
      />
      <label
        style={ { textDecoration: selected ? 'line-through' : null } }
        htmlFor={ `${name}-ingredient` }
      >
        { name}
      </label>
    </li>
  );

  const renderIngredient = () => (
    <li data-testid={ dataTestId }>{name}</li>
  );

  return (
    selectable
      ? renderSelectableIngredient()
      : renderIngredient()
  );
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  selectable: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Ingredient;
