import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';
import context from '../context/context';
import { checkCheked } from '../services/helpers';

function Ingredient({ name, selectable, dataTestId }) {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const { setIngredientChecked, ingredientClick,
    setIngredientClick } = useContext(context);
  const [check, setCheck] = useState(checkCheked(pathname, name, id));

  const handleOnChangeInput = (ingredient) => {
    setCheck(!check);
    setIngredientChecked(ingredient);
  };

  const renderSelectableIngredient = () => (
    <li data-testid={ dataTestId }>
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
      <label
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
  dataTestId: PropTypes.string.isRequired,
};

export default Ingredient;
