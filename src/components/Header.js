import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import context from '../context/context';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, showSearchButton }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { setPageTitle } = useContext(context);

  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle, setPageTitle]);

  return (
    <header data-testid="header" className="header">
      <div className="icons-header">
        <Link to="/profile">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile"
            className="profile-icon"
          />
        </Link>
        <h4 data-testid="page-title" className="page-title">{pageTitle}</h4>
        {showSearchButton && (
          <button
            type="button"
            className="search-icon"
            onClick={ () => {
              setShowSearchBar(!showSearchBar);
            } }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="search"
            />
          </button>
        )}
      </div>
      {showSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchButton: PropTypes.bool.isRequired,
};

export default Header;
