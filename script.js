let points = 0;
let treatGeneratorCost = 50;
let toyFactoryCost = 200;
let treatGenerators = 0;
let toyFactories = 0;

let clickPower = 1;
let clickUpgradeCost = 100;

const pointsDisplay = document.getElementById("points");
const clickButton = document.getElementById("click-button");
const treatUpgrade = document.getElementById("treat-upgrade");
const toyUpgrade = document.getElementById("toy-upgrade");
const resetButton = document.getElementById("reset-button");

const clickPowerDisplay = document.getElementById("click-power");
const clickUpgradeButton = document.getElementById("click-upgrade");

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
    clickPower = savedData.clickPower || 1;
    clickUpgradeCost = savedData.clickUpgradeCost || 100;
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
    clickPower,
    clickUpgradeCost,
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
    clickPower = 1;
    clickUpgradeCost = 100;
    treatGeneratorCost = 50;
    toyFactoryCost = 200;
    localStorage.removeItem("pibbleProgress");
    updatePoints();
  }
});

clickButton.addEventListener("click", () => {
  points += clickPower;
  updatePoints();

  // Add bounce effect to Pibble button
  const pibbleImage = document.getElementById("pibble-image");
  pibbleImage.classList.add("clicked");

  // Remove bounce effect after animation
  setTimeout(() => {
    pibbleImage.classList.remove("clicked");
  }, 300);
});

clickUpgradeButton.addEventListener("click", () => {
  if (points >= clickUpgradeCost) {
    points -= clickUpgradeCost;
    clickPower++;
    clickUpgradeCost += 50;
    updatePoints();
  }
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
  clickPowerDisplay.textContent = clickPower;
  clickUpgradeButton.textContent = `Increase Click Power (${clickUpgradeCost} Points)`;

  treatUpgrade.textContent = `Buy Treat Generator (${treatGeneratorCost} Points)`;
  toyUpgrade.textContent = `Buy Toy Factory (${toyFactoryCost} Points)`;

  treatOwnedDisplay.textContent = treatGenerators;
  treatPPSDisplay.textContent = treatGenerators * 1;

  toyOwnedDisplay.textContent = toyFactories;
  toyPPSDisplay.textContent = toyFactories * 5;

  clickUpgradeButton.disabled = points < clickUpgradeCost;
  treatUpgrade.disabled = points < treatGeneratorCost;
  toyUpgrade.disabled = points < toyFactoryCost;

  saveProgress();
}

// Generate points passively
setInterval(() => {
  points += treatGenerators + (toyFactories * 5);
  updatePoints();
}, 1000);

loadProgress();

/* --- Code for Snake Flyout --- */
const snakeButton = document.getElementById("snake-button");
const flyoutWindow = document.getElementById("flyout-window");
const flyoutClose = document.getElementById("flyout-close");

// Store the original URL for the snake iframe
const snakeIframe = flyoutWindow.querySelector("iframe");
const snakeURL = "https://emulatoros.github.io/gfile/snake/";

snakeButton.addEventListener("click", () => {
  // Restore iframe src if empty
  if (!snakeIframe.getAttribute("src")) {
    snakeIframe.setAttribute("src", snakeURL);
  }
  flyoutWindow.style.display = "block";
});

flyoutClose.addEventListener("click", () => {
  flyoutWindow.style.display = "none";
  // Unload the iframe to stop audio playback
  snakeIframe.setAttribute("src", "");
});

/* --- Code for Subway Flyout --- */
const subwayButton = document.getElementById("subway-button");
const flyoutSubway = document.getElementById("flyout-subway");
const flyoutCloseSubway = document.getElementById("flyout-close-subway");

// Store the original URL for the subway iframe
const subwayIframe = flyoutSubway.querySelector("iframe");
const subwayURL = "https://77pen.github.io/p8/subway-surfers-newyork/";

subwayButton.addEventListener("click", () => {
  if (!subwayIframe.getAttribute("src")) {
    subwayIframe.setAttribute("src", subwayURL);
  }
  flyoutSubway.style.display = "block";
});

flyoutCloseSubway.addEventListener("click", () => {
  flyoutSubway.style.display = "none";
  // Unload the iframe to stop audio playback
  subwayIframe.setAttribute("src", "");
});

// Global keydown handler now only opens the snake flyout with Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    flyoutWindow.style.display = "block";
    // Also restore the snake iframe src if needed
    if (!snakeIframe.getAttribute("src")) {
      snakeIframe.setAttribute("src", snakeURL);
    }
  }
});
