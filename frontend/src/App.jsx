import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import GameDetail from './components/GameDetail';
import './App.css';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleCloseDetail = () => {
    setSelectedGame(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} onGameSelect={handleGameSelect} />
      <main className="main-content">
        <Home onGameSelect={handleGameSelect} searchTerm={searchTerm} />
      </main>
      {selectedGame && (
        <GameDetail game={selectedGame} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
