import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/journals">Journals</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
