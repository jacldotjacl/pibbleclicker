window.addEventListener("DOMContentLoaded", () => {
  // Core game variables and all our other declarations remain unchanged:
  let points = 0;
  let treatGeneratorCost = 50;
  let toyFactoryCost = 200;
  let treatGenerators = 0;
  let toyFactories = 0;
  let clickPower = 1;
  let clickUpgradeCost = 100;

  // Pibbles upgrade variables
  let pibblesUpgrade = false;
  let pibblesCost = 1000000;
  let pibblesUpgrade2 = false;
  let pibblesUpgrade2Cost = 100000000;

  // Additional upgrades
  let dogWash = 0;
  let dogWashCost = 1000;
  let gmail = 0;
  let gmailCost = 5000;
  let washington = 0;
  let washingtonCost = 20000;

  // New additional upgrades (Bagels, Franklins, Geebles, Waffles, Jiggles)
  let bagels = 0;
  let bagelsCost = 100000;
  let franklins = 0;
  let franklinsCost = 500000;
  let geebles = 0;
  let geeblesCost = 2000000;
  let waffles = 0;
  let wafflesCost = 10000000;
  let jiggles = 0;
  let jigglesCost = 50000000;

  // Get DOM elements
  const pointsDisplay = document.getElementById("points");
  const clickButton = document.getElementById("click-button");
  const treatUpgradeBtn = document.getElementById("treat-upgrade");
  const toyUpgradeBtn = document.getElementById("toy-upgrade");
  const resetButton = document.getElementById("reset-button");
  const clickPowerDisplay = document.getElementById("click-power");
  const clickUpgradeButton = document.getElementById("click-upgrade");

  const treatOwnedDisplay = document.getElementById("treat-owned");
  const treatPPSDisplay = document.getElementById("treat-pps");
  const toyOwnedDisplay = document.getElementById("toy-owned");
  const toyPPSDisplay = document.getElementById("toy-pps");

  const dogWashOwnedDisplay = document.getElementById("dogwash-owned");
  const dogWashPPSDisplay = document.getElementById("dogwash-pps");
  const gmailOwnedDisplay = document.getElementById("gmail-owned");
  const gmailPPSDisplay = document.getElementById("gmail-pps");
  const washingtonOwnedDisplay = document.getElementById("washington-owned");
  const washingtonPPSDisplay = document.getElementById("washington-pps");

  const pibblesStatusDisplay = document.getElementById("pibbles-status");
  const pibblesUpgradeButton = document.getElementById("pibbles-upgrade");
  const pibblesUpgrade2Button = document.getElementById("pibbles-upgrade2");

  // New additional upgrades DOM elements (if present)
  const bagelsOwnedDisplay = document.getElementById("bagels-owned");
  const bagelsPPSDisplay = document.getElementById("bagels-pps");
  const franklinsOwnedDisplay = document.getElementById("franklins-owned");
  const franklinsPPSDisplay = document.getElementById("franklins-pps");
  const geeblesOwnedDisplay = document.getElementById("geebles-owned");
  const geeblesPPSDisplay = document.getElementById("geebles-pps");
  const wafflesOwnedDisplay = document.getElementById("waffles-owned");
  const wafflesPPSDisplay = document.getElementById("waffles-pps");
  const jigglesOwnedDisplay = document.getElementById("jiggles-owned");
  const jigglesPPSDisplay = document.getElementById("jiggles-pps");

  // Functions to load and save progress using localStorage
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

      bagels = savedData.bagels || 0;
      bagelsCost = savedData.bagelsCost || 100000;
      franklins = savedData.franklins || 0;
      franklinsCost = savedData.franklinsCost || 500000;
      geebles = savedData.geebles || 0;
      geeblesCost = savedData.geeblesCost || 2000000;
      waffles = savedData.waffles || 0;
      wafflesCost = savedData.wafflesCost || 10000000;
      jiggles = savedData.jiggles || 0;
      jigglesCost = savedData.jigglesCost || 50000000;
    }
    updatePoints();
    if (pibblesUpgrade) {
      document.getElementById("pibble-image").src = "pibblelevel2.png";
      pibblesStatusDisplay.textContent = "Upgraded";
      if (!pibblesUpgrade2) {
        document.getElementById("pibbles-upgrade2-container").style.display = "block";
      }
    }
    if (pibblesUpgrade2) {
      document.getElementById("pibble-image").src = "pibblelevel3.png";
      document.getElementById("pibbles-upgrade2-container").style.display = "none";
      document.getElementById("pibbles2-status").textContent = "Upgraded";
    }
  }

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
      bagels,
      bagelsCost,
      franklins,
      franklinsCost,
      geebles,
      geeblesCost,
      waffles,
      wafflesCost,
      jiggles,
      jigglesCost
    };
    localStorage.setItem("pibbleProgress", JSON.stringify(saveData));
  }

  // Event listener for Reset button
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

      bagels = 0;
      bagelsCost = 100000;
      franklins = 0;
      franklinsCost = 500000;
      geebles = 0;
      geeblesCost = 2000000;
      waffles = 0;
      wafflesCost = 10000000;
      jiggles = 0;
      jigglesCost = 50000000;

      localStorage.removeItem("pibbleProgress");
      document.getElementById("pibble-image").src = "pibble.png";
      pibblesStatusDisplay.textContent = "Base";
      document.getElementById("pibbles-upgrade2-container").style.display = "none";
      updatePoints();
    }
  });

  // Manual Click Event
  clickButton.addEventListener("click", () => {
    points += clickPower;
    updatePoints();
    const pibbleImage = document.getElementById("pibble-image");
    pibbleImage.classList.add("clicked");
    setTimeout(() => {
      pibbleImage.classList.remove("clicked");
    }, 300);
  });

  // Click Upgrade Event
  clickUpgradeButton.addEventListener("click", () => {
    if (points >= clickUpgradeCost) {
      points -= clickUpgradeCost;
      clickPower++;
      clickUpgradeCost += 50;
      updatePoints();
    }
  });

  // Treat Generator Event
  treatUpgradeBtn.addEventListener("click", () => {
    if (points >= treatGeneratorCost) {
      points -= treatGeneratorCost;
      treatGenerators++;
      treatGeneratorCost += 10;
      updatePoints();
    }
  });

  // Toy Factory Event
  toyUpgradeBtn.addEventListener("click", () => {
    if (points >= toyFactoryCost) {
      points -= toyFactoryCost;
      toyFactories++;
      toyFactoryCost += 50;
      updatePoints();
    }
  });

  // Dog Wash Event
  document.getElementById("dogwash-upgrade").addEventListener("click", () => {
    if (points >= dogWashCost) {
      points -= dogWashCost;
      dogWash++;
      dogWashCost += 200;
      updatePoints();
    }
  });

  // Gmail Event
  document.getElementById("gmail-upgrade").addEventListener("click", () => {
    if (points >= gmailCost) {
      points -= gmailCost;
      gmail++;
      gmailCost += 1000;
      updatePoints();
    }
  });

  // Washington Event
  document.getElementById("washington-upgrade").addEventListener("click", () => {
    if (points >= washingtonCost) {
      points -= washingtonCost;
      washington++;
      washingtonCost += 5000;
      updatePoints();
    }
  });

  // First Pibbles Upgrade Event
  pibblesUpgradeButton.addEventListener("click", () => {
    if (!pibblesUpgrade && points >= pibblesCost) {
      points -= pibblesCost;
      pibblesUpgrade = true;
      document.getElementById("pibble-image").src = "pibblelevel2.png";
      pibblesStatusDisplay.textContent = "Upgraded";
      updatePoints();
      document.getElementById("pibbles-upgrade2-container").style.display = "block";
    }
  });

  // Second Pibbles Upgrade Event
  pibblesUpgrade2Button.addEventListener("click", () => {
    if (!pibblesUpgrade2 && points >= pibblesUpgrade2Cost) {
      points -= pibblesUpgrade2Cost;
      pibblesUpgrade2 = true;
      document.getElementById("pibble-image").src = "pibblelevel3.png";
      document.getElementById("pibbles2-status").textContent = "Upgraded";
      document.getElementById("pibbles-upgrade2-container").style.display = "none";
      updatePoints();
    }
  });

  // Additional Upgrades Event Listeners
  document.getElementById("bagels-upgrade").addEventListener("click", () => {
    if (points >= bagelsCost) {
      points -= bagelsCost;
      bagels++;
      bagelsCost += 20000;
      updatePoints();
    }
  });
  document.getElementById("franklins-upgrade").addEventListener("click", () => {
    if (points >= franklinsCost) {
      points -= franklinsCost;
      franklins++;
      franklinsCost += 100000;
      updatePoints();
    }
  });
  document.getElementById("geebles-upgrade").addEventListener("click", () => {
    if (points >= geeblesCost) {
      points -= geeblesCost;
      geebles++;
      geeblesCost += 500000;
      updatePoints();
    }
  });
  document.getElementById("waffles-upgrade").addEventListener("click", () => {
    if (points >= wafflesCost) {
      points -= wafflesCost;
      waffles++;
      wafflesCost += 2000000;
      updatePoints();
    }
  });
  document.getElementById("jiggles-upgrade").addEventListener("click", () => {
    if (points >= jigglesCost) {
      points -= jigglesCost;
      jiggles++;
      jigglesCost += 10000000;
      updatePoints();
    }
  });

  // Passive generation using setInterval (every second)
  setInterval(() => {
    points +=
      treatGenerators * (pibblesUpgrade ? 2 : 1) +
      toyFactories * (pibblesUpgrade2 ? 10 : 5) +
      dogWash * 10 +
      gmail * 30 +
      washington * 100 +
      bagels * 300 +
      franklins * 1500 +
      geebles * 5000 +
      waffles * 25000 +
      jiggles * 100000;
    updatePoints();
  }, 1000);

  // Flyout functionality for Snake
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

  // Flyout functionality for Subway
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

  // Global keydown handler: Only Enter opens the Snake flyout.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      flyoutWindow.style.display = "block";
      if (!snakeIframe.getAttribute("src")) {
        snakeIframe.setAttribute("src", snakeURL);
      }
    }
  });

  // Finally, load progress from localStorage on startup
  loadProgress();
});
