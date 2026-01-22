import React, { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch, onGameSelect, onCartClick, cartOpen }) => {
  const { getCartCount } = useCart();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header${visible ? '' : ' header-hidden'}`}>
      <div className="header-content">
        <div className="logo">
          <h1>AMEBA</h1>
          <p className="tagline">PAY LESS. GAME MORE.</p>
        </div>
        
        <SearchBar onSearch={onSearch} onGameSelect={onGameSelect} />
        
        <div className="header-actions">
          <button className="icon-btn">❤️</button>
          <button 
            className={`icon-btn cart-btn ${cartOpen ? 'active' : ''}`}
            onClick={onCartClick}
          >
            🛒
            <span className="cart-count">{getCartCount()}</span>
          </button>
          <button className="user-btn" onClick={() => navigate('/login')}>👤</button>
        </div>
      </div>
      
      <nav className="nav">
        <a href="#" className="nav-link active">PC</a>
        <a href="#" className="nav-link">PLAYSTATION</a>
        <a href="#" className="nav-link">XBOX</a>
        <a href="#" className="nav-link">NINTENDO</a>
        <a href="#" className="nav-link">GIFT CARDS</a>
        <a href="#" className="nav-link">DEALS</a>
        <a href="#" className="nav-link">LATEST GAMES</a>
        <a href="#" className="nav-link">PRE-ORDER</a>
      </nav>
    </header>
  );
};

export default Header;
