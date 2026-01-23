import React, { useEffect, useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import Footer from "../components/Footer";
import { games as localGames } from "../data/games";
import { fetchGames } from "../api";
import "./Home.css";

// Map RAWG results to your GameCard shape
function mapRawgToGameCard(g) {
  const id = g.provider_game_id;

  // Fake store fields (RAWG doesn't provide prices/discounts)
  const price = Number((((id % 50) + 10) + 0.99).toFixed(2)); // 10.99..59.99
  const hasDiscount = id % 3 === 0;
  const originalPrice = hasDiscount ? Number((price + 20).toFixed(2)) : null;
  const discount = hasDiscount ? `${Math.min(70, 10 + (id % 60))}% OFF` : null;

  const platforms = ["PC", "Xbox", "PlayStation", "Switch"];
  const platform = platforms[id % platforms.length];

  return {
    id,
    title: g.name,
    image: g.image_url,
    platform,
    price,
    originalPrice,
    discount
  };
}

const Home = ({ onGameSelect, searchTerm, onAbout }) => {
  const [apiGames, setApiGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Only fetch when user is searching
  useEffect(() => {
    let cancelled = false;

    async function loadSearch() {
      setLoading(true);
      setError("");
      try {
        const results = await fetchGames(searchTerm);
        if (!cancelled) setApiGames(results);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load search results");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (searchTerm && searchTerm.trim()) {
      loadSearch();
    } else {
      // clear API results when not searching
      setApiGames([]);
      setLoading(false);
      setError("");
    }

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  // Decide what to display:
  // - no search -> local fixed games
  // - search -> RAWG results mapped to GameCard format
  const displayGames = useMemo(() => {
    if (!searchTerm || !searchTerm.trim()) return localGames;
    return apiGames.map(mapRawgToGameCard);
  }, [searchTerm, apiGames]);

  return (
    <div className="home">
      <section className="games-section">
        {searchTerm && (
          <div className="search-results-header">
            <h2>Search Results for "{searchTerm}"</h2>
            <span className="results-count">{displayGames.length} games found</span>
          </div>
        )}

        {loading && <div>Loading games...</div>}

        {error && (
          <div className="no-games">
            <h2>{error}</h2>
            <p>Check that backend is running on port 3001.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="games-grid">
            {displayGames.map((game) => (
              <GameCard key={game.id} game={game} onClick={onGameSelect} />
            ))}
          </div>
        )}

        {!loading && !error && displayGames.length === 0 && (
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
