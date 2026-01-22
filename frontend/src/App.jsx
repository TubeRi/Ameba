import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GameDetail from './components/GameDetail';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import './App.css';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleGameSelect = (game) => {
    if (!game) {
      navigate('/not-found');
    } else {
      navigate(`/game/${game.id}`);
    }
  };

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <div className="app">
      {location.pathname !== '/login' && location.pathname !== '/about' && (
        <Header 
          onSearch={handleSearch} 
          onGameSelect={handleGameSelect}
          onCartClick={() => setShowCart(!showCart)}
          cartOpen={showCart}
        />
      )}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<Home onGameSelect={handleGameSelect} searchTerm={searchTerm} onAbout={handleAbout} />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
