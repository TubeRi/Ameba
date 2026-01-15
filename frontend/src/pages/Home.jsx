import React, { useState } from 'react';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import './Home.css';

const Home = ({ onGameSelect, searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter games based on search term
  const filteredGames = searchTerm 
    ? games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : games;

  // Filter by category if needed
  const displayGames = selectedCategory === 'all' 
    ? filteredGames 
    : filteredGames.filter(game => game.genre.includes(selectedCategory));

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">BEST SELLERS</h1>
          <p className="hero-subtitle">Discover the hottest games at unbeatable prices</p>
        </div>
        <div className="hero-gradient"></div>
      </section>

      {/* Category Filter */}
      <section className="categories">
        <button 
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Games
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'Action' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Action')}
        >
          Action
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'RPG' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('RPG')}
        >
          RPG
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'Adventure' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Adventure')}
        >
          Adventure
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'Horror' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('Horror')}
        >
          Horror
        </button>
      </section>

      {/* Games Grid */}
      <section className="games-section">
        {searchTerm && (
          <div className="search-results-header">
            <h2>Search Results for "{searchTerm}"</h2>
            <span className="results-count">{displayGames.length} games found</span>
          </div>
        )}
        
        <div className="games-grid">
          {displayGames.map((game) => (
            <GameCard key={game.id} game={game} onClick={onGameSelect} />
          ))}
        </div>

        {displayGames.length === 0 && (
          <div className="no-games">
            <h2>No games found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
