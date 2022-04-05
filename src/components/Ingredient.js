import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';
import context from '../context/context';
import { checkCheked } from '../services/helpers';

function Ingredient({ name, selectable, isSelected, dataTestId }) {
  const { pathname } = useHistory().location;
  const { id } = useParams();
  const { setIngredientChecked, ingredientClick,
    setIngredientClick } = useContext(context);
  const [selected, setSelected] = useState(false);
  const [check, setCheck] = useState(checkCheked(pathname, name, id));

  useEffect(() => {
    setSelected(isSelected);
    if (check) {
      setSelected(true);
    }
  }, [isSelected]);

  const handleOnChangeInput = (ingredient) => {
    setSelected(!selected);
    setCheck(!check);
    setIngredientChecked(ingredient);
  };

  const renderSelectableIngredient = () => (
    <li data-testid={ dataTestId }>
      <label
        htmlFor={ `${name}-ingredient` }
        style={ { textDecoration: selected ? 'line-through' : null } }
      >
        <input
          name={ `${name}-ingredient` }
          id={ `${name}-ingredient` }
          type="checkbox"
          value={ name }
          className="ingredienteProgress"
          onChange={ (e) => handleOnChangeInput(e.target.value) }
          checked={ check }
          onClick={ () => setIngredientClick(!ingredientClick) }
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
