import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Explore(props) {
  const { history } = props;
  return (
    <div className="page">
      <Header pageTitle="Explore" showSearchButton={ false } />
      <div className="explore-div">
        <button
          onClick={ () => history.push('/explore/foods') }
          type="button"
          data-testid="explore-foods"
          className="explore-selector-btn"
        >
          Explore Foods
        </button>
        <button
          onClick={ () => history.push('/explore/drinks') }
          type="button"
          data-testid="explore-drinks"
          className="explore-selector-btn"
        >
          Explore Drinks
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}
Explore.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default Explore;
