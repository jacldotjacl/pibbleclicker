let points = 0;
let treatGeneratorCost = 50;
let toyFactoryCost = 200;
let treatGenerators = 0;
let toyFactories = 0;

let clickPower = 1;
let clickUpgradeCost = 100;

// New upgrade: Pibbles – first grade
let pibblesUpgrade = false;
let pibblesCost = 1000000;

// New upgrade: Pibbles – second grade
let pibblesUpgrade2 = false;
let pibblesUpgrade2Cost = 100000000;

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

// New upgrade display elements for Dog Wash, Gmail, and Washington:
const dogWashOwnedDisplay = document.getElementById("dogwash-owned");
const dogWashPPSDisplay = document.getElementById("dogwash-pps");
const gmailOwnedDisplay = document.getElementById("gmail-owned");
const gmailPPSDisplay = document.getElementById("gmail-pps");
const washingtonOwnedDisplay = document.getElementById("washington-owned");
const washingtonPPSDisplay = document.getElementById("washington-pps");

// New upgrade display elements for Pibbles upgrade:
const pibblesStatusDisplay = document.getElementById("pibbles-status");
const pibblesUpgradeButton = document.getElementById("pibbles-upgrade");
const pibblesUpgrade2Button = document.getElementById("pibbles-upgrade2");

// New upgrades for Dog Wash, Gmail, and Washington:
let dogWash = 0;
let dogWashCost = 1000; // effect: 10 PPS
let gmail = 0;
let gmailCost = 5000;   // effect: 30 PPS
let washington = 0;
let washingtonCost = 20000; // effect: 100 PPS

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
    // Load new upgrades
    dogWash = savedData.dogWash || 0;
    dogWashCost = savedData.dogWashCost || 1000;
    gmail = savedData.gmail || 0;
    gmailCost = savedData.gmailCost || 5000;
    washington = savedData.washington || 0;
    washingtonCost = savedData.washingtonCost || 20000;
    pibblesUpgrade = savedData.pibblesUpgrade || false;
    pibblesCost = savedData.pibblesCost || 1000000;
    pibblesUpgrade2 = savedData.pibblesUpgrade2 || false;
    pibblesUpgrade2Cost = savedData.pibblesUpgrade2Cost || 100000000;
    updatePoints();
    // If first pibbles upgrade was purchased, update image/status accordingly.
    if (pibblesUpgrade) {
      document.getElementById("pibble-image").src = "pibblelevel2.png";
      pibblesStatusDisplay.textContent = "Upgraded";
      // Show second upgrade button if not purchased already.
      if (!pibblesUpgrade2) {
        document.getElementById("pibbles-upgrade2-container").style.display = "block";
      }
    }
    // If second pibbles upgrade was purchased, update image.
    if (pibblesUpgrade2) {
      document.getElementById("pibble-image").src = "pibblelevel3.png";
      document.getElementById("pibbles-upgrade2-container").style.display = "none";
      document.getElementById("pibbles2-status").textContent = "Upgraded";
    }
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
    dogWash,
    dogWashCost,
    gmail,
    gmailCost,
    washington,
    washingtonCost,
    pibblesUpgrade,
    pibblesCost,
    pibblesUpgrade2,
    pibblesUpgrade2Cost,
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
    dogWash = 0;
    dogWashCost = 1000;
    gmail = 0;
    gmailCost = 5000;
    washington = 0;
    washingtonCost = 20000;
    pibblesUpgrade = false;
    pibblesCost = 1000000;
    pibblesUpgrade2 = false;
    pibblesUpgrade2Cost = 100000000;
    localStorage.removeItem("pibbleProgress");
    document.getElementById("pibble-image").src = "pibble.png";
    pibblesStatusDisplay.textContent = "Base";
    document.getElementById("pibbles-upgrade2-container").style.display = "none";
    updatePoints();
  }
});

clickButton.addEventListener("click", () => {
  points += clickPower;
  updatePoints();
  const pibbleImage = document.getElementById("pibble-image");
  pibbleImage.classList.add("clicked");
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

document.getElementById("dogwash-upgrade").addEventListener("click", () => {
  if (points >= dogWashCost) {
    points -= dogWashCost;
    dogWash++;
    dogWashCost += 200;
    updatePoints();
  }
});

document.getElementById("gmail-upgrade").addEventListener("click", () => {
  if (points >= gmailCost) {
    points -= gmailCost;
    gmail++;
    gmailCost += 1000;
    updatePoints();
  }
});

document.getElementById("washington-upgrade").addEventListener("click", () => {
  if (points >= washingtonCost) {
    points -= washingtonCost;
    washington++;
    washingtonCost += 5000;
    updatePoints();
  }
});

// First Pibbles upgrade event listener:
pibblesUpgradeButton.addEventListener("click", () => {
  if (!pibblesUpgrade && points >= pibblesCost) {
    points -= pibblesCost;
    pibblesUpgrade = true;
    // Change main click button's image to the upgraded version (level 2)
    document.getElementById("pibble-image").src = "pibblelevel2.png";
    pibblesStatusDisplay.textContent = "Upgraded";
    updatePoints();
    // Now reveal the second upgrade button
    document.getElementById("pibbles-upgrade2-container").style.display = "block";
  }
});

// Second Pibbles upgrade event listener:
document.getElementById("pibbles-upgrade2").addEventListener("click", () => {
  if (!pibblesUpgrade2 && points >= pibblesUpgrade2Cost) {
    points -= pibblesUpgrade2Cost;
    pibblesUpgrade2 = true;
    // Change main click button's image to level 3
    document.getElementById("pibble-image").src = "pibblelevel3.png";
    // For this upgrade, double the Toy Factory effect.
    document.getElementById("pibbles2-status").textContent = "Upgraded";
    // Hide the second upgrade button after purchase.
    document.getElementById("pibbles-upgrade2-container").style.display = "none";
    updatePoints();
  }
});

function updatePoints() {
  pointsDisplay.textContent = `Pibble Points: ${points}`;
  clickPowerDisplay.textContent = clickPower;
  clickUpgradeButton.textContent = `Increase Click Power (${clickUpgradeCost} Points)`;
  treatUpgrade.textContent = `Buy Treat Generator (${treatGeneratorCost} Points)`;
  toyUpgrade.textContent = `Buy Toy Factory (${toyFactoryCost} Points)`;
  document.getElementById("dogwash-upgrade").textContent = `Buy Dog Wash (${dogWashCost} Points)`;
  document.getElementById("gmail-upgrade").textContent = `Buy Gmail (${gmailCost} Points)`;
  document.getElementById("washington-upgrade").textContent = `Buy Washington (${washingtonCost} Points)`;
  pibblesUpgradeButton.textContent = `Upgrade Pibbles (${pibblesCost} Points)`;
  pibblesUpgrade2Button.textContent = `Upgrade Pibbles (${pibblesUpgrade2Cost} Points)`;
  
  // Update owned counts and PPS; treat generators effect is doubled if first pibbles upgrade is purchased.
  treatOwnedDisplay.textContent = treatGenerators;
  treatPPSDisplay.textContent = treatGenerators * (pibblesUpgrade ? 2 : 1);
  
  // Toy factories: if second pibbles upgrade is purchased, double toy factory income.
  toyOwnedDisplay.textContent = toyFactories;
  toyPPSDisplay.textContent = toyFactories * (pibblesUpgrade2 ? 10 : 5);
  
  dogWashOwnedDisplay.textContent = dogWash;
  dogWashPPSDisplay.textContent = dogWash * 10;
  
  gmailOwnedDisplay.textContent = gmail;
  gmailPPSDisplay.textContent = gmail * 30;
  
  washingtonOwnedDisplay.textContent = washington;
  washingtonPPSDisplay.textContent = washington * 100;
  
  clickUpgradeButton.disabled = points < clickUpgradeCost;
  treatUpgrade.disabled = points < treatGeneratorCost;
  toyUpgrade.disabled = points < toyFactoryCost;
  document.getElementById("dogwash-upgrade").disabled = points < dogWashCost;
  document.getElementById("gmail-upgrade").disabled = points < gmailCost;
  document.getElementById("washington-upgrade").disabled = points < washingtonCost;
  pibblesUpgradeButton.disabled = pibblesUpgrade || points < pibblesCost;
  pibblesUpgrade2Button.disabled = pibblesUpgrade2 || points < pibblesUpgrade2Cost;
  
  saveProgress();
}

// Passive generation including new upgrades. Note that:
 // - Treat generators produce 1 point each (doubled if first Pibbles upgrade is active).
 // - Toy factories produce 5 points each (doubled to 10 if second Pibbles upgrade is active).
setInterval(() => {
  points +=
    treatGenerators * (pibblesUpgrade ? 2 : 1) +
    toyFactories * (pibblesUpgrade2 ? 10 : 5) +
    dogWash * 10 +
    gmail * 30 +
    washington * 100;
  updatePoints();
}, 1000);

loadProgress();

/* --- Code for Snake Flyout --- */
const snakeButton = document.getElementById("snake-button");
const flyoutWindow = document.getElementById("flyout-window");
const flyoutClose = document.getElementById("flyout-close");

const snakeIframe = flyoutWindow.querySelector("iframe");
const snakeURL = "https://emulatoros.github.io/gfile/snake/";

snakeButton.addEventListener("click", () => {
  if (!snakeIframe.getAttribute("src")) {
    snakeIframe.setAttribute("src", snakeURL);
  }
  flyoutWindow.style.display = "block";
});

flyoutClose.addEventListener("click", () => {
  flyoutWindow.style.display = "none";
  snakeIframe.setAttribute("src", "");
});

/* --- Code for Subway Flyout --- */
const subwayButton = document.getElementById("subway-button");
const flyoutSubway = document.getElementById("flyout-subway");
const flyoutCloseSubway = document.getElementById("flyout-close-subway");

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
  subwayIframe.setAttribute("src", "");
});

// Global keydown handler: Only Enter opens the snake flyout.
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    flyoutWindow.style.display = "block";
    if (!snakeIframe.getAttribute("src")) {
      snakeIframe.setAttribute("src", snakeURL);
    }
  }
});
