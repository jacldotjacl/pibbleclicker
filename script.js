let points = 0;
let treatGeneratorCost = 50;
let toyFactoryCost = 200;
let treatGenerators = 0;
let toyFactories = 0;

const pointsDisplay = document.getElementById("points");
const clickButton = document.getElementById("click-button");
const treatUpgrade = document.getElementById("treat-upgrade");
const toyUpgrade = document.getElementById("toy-upgrade");
const resetButton = document.getElementById("reset-button");

// Display elements for upgrades
const treatOwnedDisplay = document.getElementById("treat-owned");
const treatPPSDisplay = document.getElementById("treat-pps");
const toyOwnedDisplay = document.getElementById("toy-owned");
const toyPPSDisplay = document.getElementById("toy-pps");

// Load saved progress from localStorage
function loadProgress() {
  const savedData = JSON.parse(localStorage.getItem("pibbleProgress"));
  if (savedData) {
    points = savedData.points || 0;
    treatGenerators = savedData.treatGenerators || 0;
    toyFactories = savedData.toyFactories || 0;
    treatGeneratorCost = savedData.treatGeneratorCost || 50;
    toyFactoryCost = savedData.toyFactoryCost || 200;
    updatePoints();
  }
}

// Save progress to localStorage
function saveProgress() {
  const saveData = {
    points,
    treatGenerators,
    toyFactories,
    treatGeneratorCost,
    toyFactoryCost,
  };
  localStorage.setItem("pibbleProgress", JSON.stringify(saveData));
}

// Reset progress with confirmation popup
resetButton.addEventListener("click", () => {
  if (window.confirm("Are you sure you want to reset all progress?")) {
    points = 0;
    treatGenerators = 0;
    toyFactories = 0;
    treatGeneratorCost = 50;
    toyFactoryCost = 200;
    localStorage.removeItem("pibbleProgress");
    updatePoints();
  }
});

clickButton.addEventListener("click", () => {
  points++;
  updatePoints();

  // Add bounce effect
  const pibbleImage = document.getElementById("pibble-image");
  pibbleImage.classList.add("clicked");

  // Remove bounce effect after animation
  setTimeout(() => {
    pibbleImage.classList.remove("clicked");
  }, 300);
});

treatUpgrade.addEventListener("click", () => {
  if (points >= treatGeneratorCost) {
    points -= treatGeneratorCost;
    treatGenerators++;
    treatGeneratorCost += 10;
    updatePoints();
  }
});

toyUpgrade.addEventListener("click", () => {
  if (points >= toyFactoryCost) {
    points -= toyFactoryCost;
    toyFactories++;
    toyFactoryCost += 50;
    updatePoints();
  }
});

function updatePoints() {
  pointsDisplay.textContent = `Pibble Points: ${points}`;
  treatUpgrade.textContent = `Buy Treat Generator (${treatGeneratorCost} Points)`;
  toyUpgrade.textContent = `Buy Toy Factory (${toyFactoryCost} Points)`;

  // Update owned and PPS for Treat Generators
  treatOwnedDisplay.textContent = treatGenerators;
  treatPPSDisplay.textContent = treatGenerators * 1;

  // Update owned and PPS for Toy Factories
  toyOwnedDisplay.textContent = toyFactories;
  toyPPSDisplay.textContent = toyFactories * 5;

  treatUpgrade.disabled = points < treatGeneratorCost;
  toyUpgrade.disabled = points < toyFactoryCost;
  saveProgress();
}

// Generate points passively
setInterval(() => {
  points += treatGenerators + toyFactories * 5;
  updatePoints();
}, 1000);

// Load progress on page load
loadProgress();
