import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import GameDetail from './components/GameDetail';
import NotFound from './pages/NotFound';
import About from './pages/About';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleGameSelect = (game) => {
    if (!game) {
      setNotFound(true);
    } else {
      setSelectedGame(game);
    }
  };

  const handleCloseDetail = () => {
    setSelectedGame(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleBackHome = () => {
    setNotFound(false);
    setSelectedGame(null);
    setSearchTerm('');
    setShowAbout(false);
  };

  const handleAbout = () => {
    setShowAbout(true);
    setNotFound(false);
    setSelectedGame(null);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} onGameSelect={handleGameSelect} />
      <main className="main-content">
        {showAbout ? (
          <About onBack={handleBackHome} />
        ) : notFound ? (
          <NotFound onBackHome={handleBackHome} />
        ) : (
          <Home onGameSelect={handleGameSelect} searchTerm={searchTerm} onAbout={handleAbout} />
        )}
      </main>
      {selectedGame && !notFound && !showAbout && (
        <GameDetail game={selectedGame} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
