import React from 'react';
import SearchBar from './SearchBar';
import './Header.css';

const Header = ({ onSearch, onGameSelect }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>AMEBA</h1>
          <p className="tagline">PAY LESS. GAME MORE.</p>
        </div>
        
        <SearchBar onSearch={onSearch} onGameSelect={onGameSelect} />
        
        <div className="header-actions">
          <button className="icon-btn">❤️</button>
          <button className="icon-btn cart-btn">
            🛒
            <span className="cart-count">0</span>
          </button>
          <button className="user-btn">👤</button>
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
