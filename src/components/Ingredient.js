import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/context';

function Ingredient({ name, selectable, isSelected, dataTestId }) {
  const { setIngredientChecked, ingredientChecked } = useContext(context);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleOnChangeInput = (ingredient) => {
    setSelected(!selected);
    setIngredientChecked([...ingredientChecked, ingredient]);
  };

  const renderSelectableIngredient = () => (
    <li data-testid={ dataTestId }>
      <label
        style={ { textDecoration: selected ? 'line-through' : null } }
        htmlFor={ `${name}-ingredient` }
      >
        <input
          name={ `${name}-ingredient` }
          type="checkbox"
          value={ name }
          onChange={ (e) => handleOnChangeInput(e.target.value) }
        />
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
