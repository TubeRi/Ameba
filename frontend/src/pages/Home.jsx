import React from 'react';
import GameCard from '../components/GameCard';
import Footer from '../components/Footer';
import { games } from '../data/games';
import './Home.css';

const Home = ({ onGameSelect, searchTerm, onAbout }) => {
  // Filter games based on search term
  const displayGames = searchTerm 
    ? games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : games;

  return (
    <div className="home">
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
      <Footer onAbout={onAbout} />
    </div>
  );
};

export default Home;
