import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [isSearchBarVisible, setSearchBar] = useState(false);
  
  return (
    <header>
      <Link to="/foods">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
      </Link>
      <h1 data-testid="page-title">Título da página</h1>

      <Link to="/foods">
        <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
      </Link>
    </header>
  );
}

export default Header;
