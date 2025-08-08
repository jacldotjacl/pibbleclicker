const pibbleButton = document.getElementById("pibbleButton");
const pibbblesCountEl = document.getElementById("pibbblesCount");
const ppcEl = document.getElementById("ppc");
const ppsEl = document.getElementById("pps");

let pibbbles = 0;
let ppc = 1;
let pps = 0;

function updateDisplay() {
  pibbblesCountEl.textContent = Math.floor(pibbbles);
  ppcEl.textContent = ppc;
  ppsEl.textContent = pps;
}

pibbleButton.addEventListener("click", () => {
  pibbbles += ppc;
  updateDisplay();
});

setInterval(() => {
  pibbbles += pps / 10;
  updateDisplay();
}, 100);

// Placeholder for save/load functions
document.getElementById("saveBtn").addEventListener("click", () => {
  alert("Game saved!");
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Reset all progress?")) {
    pibbbles = 0;
    ppc = 1;
    pps = 0;
    updateDisplay();
  }
});
