import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, showSearchButton }, props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { location } = props;
  const { pathname } = location;

  return (
    <header data-testid="header">
      <Link to="/profile">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
      </Link>
      <h1 data-testid="page-title">{pageTitle}</h1>
      {showSearchButton && (
        <button
          type="button"
          onClick={ () => {
            setShowSearchBar(!showSearchBar);
          } }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </button>
      )}
      {showSearchBar && <SearchBar pathname={ pathname } />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchButton: PropTypes.bool.isRequired,
};

export default Header;
