import React, { useState, useEffect, useRef } from 'react';
import { games } from '../data/games';
import './SearchBar.css';

const SearchBar = ({ onSearch, onGameSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      // Fast filtering with debounce effect
      const filtered = games.filter(game =>
        game.title.toLowerCase().includes(value.toLowerCase()) ||
        game.genre.some(g => g.toLowerCase().includes(value.toLowerCase())) ||
        game.platform.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions for performance
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSuggestionClick = (game) => {
    setSearchTerm(game.title);
    setShowSuggestions(false);
    if (onGameSelect) {
      onGameSelect(game);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search by title, genre, platform..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          <div className="suggestions-header">
            Results found: {suggestions.length}
          </div>
          {suggestions.map((game) => (
            <div
              key={game.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(game)}
            >
              <img src={game.image} alt={game.title} className="suggestion-image" />
              <div className="suggestion-info">
                <div className="suggestion-title">{game.title}</div>
                <div className="suggestion-meta">
                  <span className="suggestion-platform">{game.platform}</span>
                  <span className="suggestion-price">€{game.price}</span>
                  {game.discount && (
                    <span className="suggestion-discount">{game.discount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showSuggestions && searchTerm && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="no-results">No games found matching "{searchTerm}"</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
