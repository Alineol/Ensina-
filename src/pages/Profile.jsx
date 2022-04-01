import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile(props) {
  const { history } = props;
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="page">
      <Header pageTitle="Profile" showSearchButton={ false } />
      <div>
        <p data-testid="profile-email">{email}</p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Profile;
