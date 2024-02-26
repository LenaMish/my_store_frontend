// Nav.component.jsx
import React from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../../context/context';
import { useJwt } from 'react-jwt';
import './Nav.component.css'; 

const PAGES = [
  { name: 'Login', url: '/login' },
  { name: 'Register', url: '/register' }
];

const settings = [
  { name: 'Account', url: '/account' },
  { name: 'Shopping Cart', url: '/shopping-cart' },
  { name: 'Logout', url: '/logout' }
];

const Nav = () => {
  const { token } = useContext(TokenContext);
  const { decodedToken, isExpired } = useJwt(token);
  const navigate = useNavigate();

  let pages = null;
  if (token != null) {
    pages = PAGES.filter(page => page.name !== 'Register' && page.name !== 'Login');
  } else {
    pages = PAGES;
  }

  let accountLinks = '';
  if (token != null) {
    accountLinks = (
      <ul className="menu">
        {settings.map(page => (
          <li key={page.name}>
            <Link to={page.url}>
              {page.name === 'Account' ? (
                <FaUser />
              ) : page.name === 'Shopping Cart' ? (
                <FaShoppingCart />
              ) : page.name === 'Logout' ? (
                <FaSignOutAlt />
              ) : (
                page.name
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav>
      <div id="left-container" className="left-margin">
        <ul className="menu">
          <li key="Contact" className="contact-link">
            <Link to="/contact">
              <FaEnvelope />
            </Link>
          </li>
        </ul>
      </div>
      <div id="center-container" className='center-title'>
        <p className="store-name" onClick={handleLogoClick}>Bloom Blossoms Store</p>
        <p className="established-year" onClick={handleLogoClick}>est. 2024</p>
      </div>
      <div id="right-container" className="right-margin">
        {accountLinks}
      </div>
    </nav>
  );
};

export default Nav;
