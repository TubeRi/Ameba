import React from 'react';
import './GameDetail.css';

const GameDetail = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="game-detail-overlay" onClick={onClose}>
      <div className="game-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="game-detail-content">
          <div className="game-detail-header">
            <img src={game.image} alt={game.title} className="game-detail-image" />
            
            <div className="game-detail-info">
              <h1 className="game-detail-title">{game.title}</h1>
              
              <div className="game-badges">
                <span className="badge platform-badge-detail">{game.platform}</span>
                {game.genre.map((g, i) => (
                  <span key={i} className="badge genre-badge">{g}</span>
                ))}
              </div>
              
              <div className="game-meta">
                <div className="meta-item">
                  <span className="meta-label">Release Date:</span>
                  <span className="meta-value">{game.releaseDate}</span>
                </div>
              </div>
              
              <div className="price-box">
                {game.discount && (
                  <div className="discount-info">
                    <span className="discount-badge-large">{game.discount}</span>
                    {game.originalPrice && (
                      <span className="original-price-large">€{game.originalPrice}</span>
                    )}
                  </div>
                )}
                <div className="current-price-large">€{game.price}</div>
              </div>
              
              <div className="action-buttons">
                <button className="btn-add-large">
                  🛒 ADD TO CART
                </button>
                <button className="btn-buy-large">
                  ⚡ BUY NOW
                </button>
              </div>
            </div>
          </div>
          
          <div className="game-detail-body">
            <section className="detail-section">
              <h2>About This Game</h2>
              <p className="game-description">{game.description}</p>
            </section>
            
            <section className="detail-section">
              <h2>Features</h2>
              <div className="features-grid">
                {game.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="detail-section">
              <h2>Game Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Platform:</span>
                  <span className="detail-value">{game.platform}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">{game.genre.join(', ')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Release Date:</span>
                  <span className="detail-value">{game.releaseDate}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
