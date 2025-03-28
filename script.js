let points = 0;
let treatGeneratorCost = 50;
let toyFactoryCost = 200;
let treatGenerators = 0;
let toyFactories = 0;

const pointsDisplay = document.getElementById("points");
const clickButton = document.getElementById("click-button");
const treatUpgrade = document.getElementById("treat-upgrade");
const toyUpgrade = document.getElementById("toy-upgrade");

clickButton.addEventListener("click", () => {
  points++;
  updatePoints();
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
  
  treatUpgrade.disabled = points < treatGeneratorCost;
  toyUpgrade.disabled = points < toyFactoryCost;
}

// Generate points passively
setInterval(() => {
  points += treatGenerators + toyFactories * 5;
  updatePoints();
}, 1000);
