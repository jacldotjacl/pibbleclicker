// Game state
let gameState = {
    pibbles: 0,
    pibblesPerSecond: 0,
    upgrades: {},
    boosters: {}
};

// Initialize game state with upgrades and boosters
function initializeGameState() {
    // Initialize upgrades
    Object.keys(upgrades).forEach(upgradeType => {
        gameState.upgrades[upgradeType] = {
            count: 0,
            cost: upgrades[upgradeType].baseCost,
            production: upgrades[upgradeType].baseProduction,
            multiplier: 1
        };
    });

    // Initialize boosters
    Object.keys(boosters).forEach(boosterType => {
        gameState.boosters[boosterType] = {
            count: 0,
            cost: boosters[boosterType].baseCost
        };
    });
}

// DOM Elements
const pibblesDisplay = document.getElementById('pibbles');
const pibblesPerSecondDisplay = document.getElementById('pibblesPerSecond');
const clickButton = document.getElementById('clickButton');

// Create upgrade elements
function createUpgradeElements() {
    const upgradesContainer = document.querySelector('.upgrades');
    
    // Create upgrade cards
    Object.entries(upgrades).forEach(([upgradeType, upgrade]) => {
        const upgradeCard = document.createElement('div');
        upgradeCard.className = 'upgrade';
        upgradeCard.id = upgradeType;
        
        upgradeCard.innerHTML = `
            <h3>${upgrade.icon} ${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p>Cost: <span id="${upgradeType}Cost">${upgrade.baseCost}</span> pibbles</p>
            <p>Owned: <span id="${upgradeType}Count">0</span></p>
            <button id="buy${upgradeType}">Buy</button>
        `;
        
        upgradesContainer.appendChild(upgradeCard);
    });

    // Create boosters section
    const boostersSection = document.createElement('div');
    boostersSection.className = 'boosters';
    boostersSection.innerHTML = '<h2>Boosters</h2>';
    
    Object.entries(boosters).forEach(([boosterType, booster]) => {
        const boosterCard = document.createElement('div');
        boosterCard.className = 'booster';
        boosterCard.id = boosterType;
        
        boosterCard.innerHTML = `
            <h3>${booster.icon} ${booster.name}</h3>
            <p>${booster.description}</p>
            <p>Cost: <span id="${boosterType}Cost">${booster.baseCost}</span> pibbles</p>
            <p>Owned: <span id="${boosterType}Count">0</span></p>
            <button id="buy${boosterType}">Buy</button>
        `;
        
        boostersSection.appendChild(boosterCard);
    });
    
    document.querySelector('.container').appendChild(boostersSection);
}

// Initialize upgrade and booster elements
const upgradeElements = {};
const boosterElements = {};

function initializeElements() {
    // Initialize upgrade elements
    Object.keys(upgrades).forEach(upgradeType => {
        upgradeElements[upgradeType] = {
            button: document.getElementById(`buy${upgradeType}`),
            cost: document.getElementById(`${upgradeType}Cost`),
            count: document.getElementById(`${upgradeType}Count`)
        };
    });

    // Initialize booster elements
    Object.keys(boosters).forEach(boosterType => {
        boosterElements[boosterType] = {
            button: document.getElementById(`buy${boosterType}`),
            cost: document.getElementById(`${boosterType}Cost`),
            count: document.getElementById(`${boosterType}Count`)
        };
    });
}

// Click handler
clickButton.addEventListener('click', () => {
    gameState.pibbles += 1;
    updateDisplay();
});

// Upgrade purchase handlers
function setupUpgradeHandlers() {
    Object.keys(upgradeElements).forEach(upgradeType => {
        const element = upgradeElements[upgradeType];
        element.button.addEventListener('click', () => {
            const upgrade = gameState.upgrades[upgradeType];
            if (gameState.pibbles >= upgrade.cost) {
                gameState.pibbles -= upgrade.cost;
                upgrade.count += 1;
                upgrade.cost = Math.floor(upgrade.cost * upgrades[upgradeType].costMultiplier);
                updateDisplay();
            }
        });
    });
}

// Booster purchase handlers
function setupBoosterHandlers() {
    Object.keys(boosterElements).forEach(boosterType => {
        const element = boosterElements[boosterType];
        element.button.addEventListener('click', () => {
            const booster = gameState.boosters[boosterType];
            if (gameState.pibbles >= booster.cost) {
                gameState.pibbles -= booster.cost;
                booster.count += 1;
                booster.cost = Math.floor(booster.cost * boosters[boosterType].costMultiplier);
                
                // Apply booster effect
                const targetUpgrade = boosters[boosterType].targetUpgrade;
                gameState.upgrades[targetUpgrade].multiplier *= boosters[boosterType].multiplier;
                
                updateDisplay();
            }
        });
    });
}

// Update all displays
function updateDisplay() {
    // Update pibbles count
    pibblesDisplay.textContent = Math.floor(gameState.pibbles);
    
    // Calculate and update pibbles per second
    let totalPibblesPerSecond = 0;
    Object.entries(gameState.upgrades).forEach(([upgradeType, upgrade]) => {
        totalPibblesPerSecond += upgrade.count * upgrade.production * upgrade.multiplier;
    });
    gameState.pibblesPerSecond = totalPibblesPerSecond;
    pibblesPerSecondDisplay.textContent = totalPibblesPerSecond.toFixed(1);
    
    // Update upgrade displays
    Object.entries(upgradeElements).forEach(([upgradeType, elements]) => {
        const upgrade = gameState.upgrades[upgradeType];
        elements.cost.textContent = Math.floor(upgrade.cost);
        elements.count.textContent = upgrade.count;
        elements.button.disabled = gameState.pibbles < upgrade.cost;
    });
    
    // Update booster displays
    Object.entries(boosterElements).forEach(([boosterType, elements]) => {
        const booster = gameState.boosters[boosterType];
        elements.cost.textContent = Math.floor(booster.cost);
        elements.count.textContent = booster.count;
        elements.button.disabled = gameState.pibbles < booster.cost;
    });
}

// Game loop for passive income
function gameLoop() {
    gameState.pibbles += gameState.pibblesPerSecond / 10; // Update 10 times per second
    updateDisplay();
}

// Initialize the game
function init() {
    initializeGameState();
    createUpgradeElements();
    initializeElements();
    setupUpgradeHandlers();
    setupBoosterHandlers();
    updateDisplay();
    setInterval(gameLoop, 100);
}

// Start the game
init(); 
