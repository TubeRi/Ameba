import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onClick }) => {
  return (
    <div className="game-card" onClick={() => onClick(game)}>
      <div className="game-card-image-container">
        <img src={game.image} alt={game.title} className="game-card-image" />
        {game.discount && (
          <div className="discount-badge">{game.discount}</div>
        )}
        <div className="platform-badge">{game.platform}</div>
      </div>
      
      <div className="game-card-content">
        <h3 className="game-card-title">{game.title}</h3>
        
        <div className="game-card-footer">
          <div className="price-section">
            {game.originalPrice && (
              <span className="original-price">€{game.originalPrice}</span>
            )}
            <span className="current-price">€{game.price}</span>
          </div>
          
          <div className="card-actions">
            <button className="btn-add" onClick={(e) => {
              e.stopPropagation();
              alert('Added to cart!');
            }}>
              ADD
            </button>
            <button className="btn-buy" onClick={(e) => {
              e.stopPropagation();
              alert('Proceeding to checkout...');
            }}>
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
