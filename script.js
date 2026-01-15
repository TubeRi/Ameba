// Sample game data
const games = [
    {
        id: 1,
        title: "Cyber Warriors 2077",
        price: "$59.99",
        description: "Immerse yourself in a dystopian future where you play as a cyber-enhanced warrior fighting against corporate tyranny. Explore a vast open world filled with neon lights, high-tech gadgets, and dangerous enemies. Make choices that affect the story and customize your character with various cybernetic implants.",
        image: "https://via.placeholder.com/400x300/9d7fc9/ffffff?text=Cyber+Warriors+2077"
    },
    {
        id: 2,
        title: "Fantasy Legends",
        price: "$49.99",
        description: "Embark on an epic journey through magical realms filled with mythical creatures and ancient magic. Form alliances, battle fierce dragons, and uncover the secrets of the legendary artifacts. Experience rich storytelling with branching narratives and character development.",
        image: "https://via.placeholder.com/400x300/b899db/ffffff?text=Fantasy+Legends"
    },
    {
        id: 3,
        title: "Speed Racers Ultimate",
        price: "$39.99",
        description: "Feel the adrenaline rush as you race through stunning tracks around the world. Customize your vehicle, compete against skilled opponents, and climb the global leaderboards. Features realistic physics, dynamic weather, and multiplayer racing modes.",
        image: "https://via.placeholder.com/400x300/9d7fc9/ffffff?text=Speed+Racers"
    },
    {
        id: 4,
        title: "Zombie Apocalypse Survival",
        price: "$44.99",
        description: "Survive in a world overrun by zombies. Scavenge for resources, build your base, and team up with other survivors. Face waves of undead enemies and make tough decisions to keep your group alive. Features both single-player and co-op multiplayer modes.",
        image: "https://via.placeholder.com/400x300/b899db/ffffff?text=Zombie+Survival"
    },
    {
        id: 5,
        title: "Space Explorer Chronicles",
        price: "$54.99",
        description: "Travel through the cosmos and discover new planets, alien civilizations, and cosmic mysteries. Build your own spaceship, trade with alien species, and engage in epic space battles. Explore a procedurally generated universe with endless possibilities.",
        image: "https://via.placeholder.com/400x300/9d7fc9/ffffff?text=Space+Explorer"
    },
    {
        id: 6,
        title: "Medieval Kingdom Builder",
        price: "$34.99",
        description: "Build and manage your own medieval kingdom from the ground up. Gather resources, construct buildings, and expand your territory. Defend against invaders, manage your citizens, and become the greatest ruler in the land.",
        image: "https://via.placeholder.com/400x300/b899db/ffffff?text=Kingdom+Builder"
    },
    {
        id: 7,
        title: "Detective Noir Mystery",
        price: "$29.99",
        description: "Step into the shoes of a hard-boiled detective in a noir-inspired city. Solve complex cases, interrogate suspects, and uncover dark secrets. Your choices matter as you navigate through a gripping narrative filled with twists and turns.",
        image: "https://via.placeholder.com/400x300/9d7fc9/ffffff?text=Detective+Noir"
    },
    {
        id: 8,
        title: "Pirate's Fortune",
        price: "$39.99",
        description: "Set sail on the high seas as a pirate captain seeking treasure and glory. Engage in naval battles, explore mysterious islands, and build your pirate crew. Manage your ship, trade goods, and become the most feared pirate in the Caribbean.",
        image: "https://via.placeholder.com/400x300/b899db/ffffff?text=Pirates+Fortune"
    },
    {
        id: 9,
        title: "Robot Wars Arena",
        price: "$24.99",
        description: "Build and customize your own combat robot to compete in intense arena battles. Choose from various weapons, armor, and special abilities. Fight against AI opponents or challenge other players in online multiplayer tournaments.",
        image: "https://via.placeholder.com/400x300/9d7fc9/ffffff?text=Robot+Wars"
    },
    {
        id: 10,
        title: "Mystic Puzzle Quest",
        price: "$19.99",
        description: "Solve intricate puzzles in a world of magic and mystery. Use your wits to overcome challenges, unlock new areas, and discover the ancient secrets hidden within the mystic realm. Features hundreds of unique puzzles with increasing difficulty.",
        image: "https://via.placeholder.com/400x300/b899db/ffffff?text=Puzzle+Quest"
    },
    {
        id: 11,
        title: "Tactical Strike Force",
        price: "$49.99",
        description: "Lead an elite military unit in strategic combat missions around the globe. Plan your tactics, command your squad, and complete dangerous objectives. Features realistic weapons, authentic military scenarios, and intense tactical gameplay.",
        image: "https://via.placeholder.com/400x300/9d7fc9/ffffff?text=Strike+Force"
    },
    {
        id: 12,
        title: "Farming Simulator Pro",
        price: "$34.99",
        description: "Experience the life of a modern farmer. Plant crops, raise livestock, and manage your farm's economy. Use realistic farming equipment, deal with changing seasons, and expand your agricultural empire. Relax and enjoy the peaceful countryside life.",
        image: "https://via.placeholder.com/400x300/b899db/ffffff?text=Farming+Sim"
    }
];

let currentGames = [...games];

// Initialize the page
function init() {
    displayGames(currentGames);
    setupEventListeners();
}

// Display games in the grid
function displayGames(gamesToDisplay) {
    const gameGrid = document.getElementById('gameGrid');
    
    if (gamesToDisplay.length === 0) {
        gameGrid.innerHTML = '<div class="no-results">No games found. Try a different search term.</div>';
        return;
    }
    
    gameGrid.innerHTML = gamesToDisplay.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <p class="game-price">${game.price}</p>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.getElementById('searchBtn');
    const modal = document.getElementById('gameModal');
    const closeBtn = document.querySelector('.close');
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchBar.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Real-time search as user types
    searchBar.addEventListener('input', performSearch);
    
    // Modal close functionality
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        currentGames = [...games];
    } else {
        currentGames = games.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayGames(currentGames);
}

// Open game details modal
function openModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    document.getElementById('modalTitle').textContent = game.title;
    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalPrice').textContent = game.price;
    
    document.getElementById('gameModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
