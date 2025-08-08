/* Pibble Clicker - minimal, extensible clicker with save, offline progress, golden events */

const el = {
  pibbbles: document.getElementById('pibbblesCount'),
  pps: document.getElementById('pps'),
  ppc: document.getElementById('ppc'),
  button: document.getElementById('pibbleButton'),
  floats: document.getElementById('floatingTexts'),
  goldenArea: document.getElementById('goldenArea'),
  upgradesList: document.getElementById('upgradesList'),
  buildingsList: document.getElementById('buildingsList'),
  achievementsList: document.getElementById('achievementsList'),
  saveBtn: document.getElementById('saveBtn'),
  resetBtn: document.getElementById('resetBtn'),
  exportBtn: document.getElementById('exportBtn'),
  importToggleBtn: document.getElementById('importToggleBtn'),
  importBox: document.getElementById('importBox'),
  importText: document.getElementById('importText'),
  importConfirmBtn: document.getElementById('importConfirmBtn'),
  importCancelBtn: document.getElementById('importCancelBtn'),
  logList: document.getElementById('logList'),
  toast: document.getElementById('toast'),
};

const VERSION = '1.0.0';
const SAVE_KEY = 'pibbbles-save-v1';

const game = {
  pibbbles: 0,
  totalPibbbles: 0,
  perClickBase: 1,
  perClickMult: 1,
  passiveMult: 1,
  lastSaveAt: Date.now(),
  buildings: [
    { id: 'fan', name: 'Super Fan', icon: '🙌', baseCost: 15, count: 0, basePps: 0.1, desc: '+0.1 PPS each' },
    { id: 'mod', name: 'Mod Team', icon: '🛡️', baseCost: 100, count: 0, basePps: 1, desc: '+1 PPS each' },
    { id: 'meme', name: 'Meme Factory', icon: '🧪', baseCost: 1100, count: 0, basePps: 8, desc: '+8 PPS each' },
    { id: 'server', name: 'Server Farm', icon: '🖥️', baseCost: 12000, count: 0, basePps: 47, desc: '+47 PPS each' },
    { id: 'ai', name: 'AI Hype Agent', icon: '🤖', baseCost: 130000, count: 0, basePps: 260, desc: '+260 PPS each' },
  ],
  upgrades: [
    { id: 'bigger-clicks', name: 'Bigger Clicks', icon: '🖱️', cost: 50, desc: 'Clicking is x2 stronger', owned: false, type: 'click-mult', value: 2, unlockAt: 40 },
    { id: 'sticky-fans', name: 'Sticky Fans', icon: '🧲', cost: 500, desc: 'Passive x1.5', owned: false, type: 'passive-mult', value: 1.5, unlockAt: 200 },
    { id: 'pro-clicks', name: 'Pro Clicks', icon: '🎯', cost: 5000, desc: 'Clicking is x3 stronger', owned: false, type: 'click-mult', value: 3, unlockAt: 2000 },
    { id: 'viral-loop', name: 'Viral Loop', icon: '🔁', cost: 25000, desc: 'Passive x2', owned: false, type: 'passive-mult', value: 2, unlockAt: 10000 },
  ],
  achievements: [],
  logs: [],
  goldenTimer: 0,
  nextGoldenIn: randInt(45, 90), // seconds
};

function save() {
  game.lastSaveAt = Date.now();
  const data = JSON.stringify({ version: VERSION, game });
  localStorage.setItem(SAVE_KEY, data);
  toast('Game saved');
}

function load() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data?.game) {
      Object.assign(game, data.game);
    }
  } catch (e) {
    log('Save data was corrupted. Starting fresh.');
  }
}

function hardReset() {
  if (!confirm('Hard reset your progress? This cannot be undone.')) return;
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

function exportSave() {
  const str = btoa(unescape(encodeURIComponent(localStorage.getItem(SAVE_KEY) || '')));
  navigator.clipboard?.writeText(str);
  toast('Exported to clipboard');
}

function importSave(str) {
  try {
    const decoded = decodeURIComponent(escape(atob(str)));
    localStorage.setItem(SAVE_KEY, decoded);
    location.reload();
  } catch {
    toast('Invalid import data', true);
  }
}

/* Utilities */
function format(n) {
  if (!isFinite(n)) return '∞';
  const abs = Math.abs(n);
  const suffixes = [
    [1e12, 'T'], [1e9, 'B'], [1e6, 'M'], [1e3, 'K']
  ];
  for (const [v, s] of suffixes) {
    if (abs >= v) return (n / v).toFixed(n / v >= 100 ? 0 : n / v >= 10 ? 1 : 2) + s;
  }
  return Math.floor(n).toLocaleString();
}
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function log(msg) {
  game.logs.unshift({ t: Date.now(), msg });
  renderLog();
}
function toast(msg, danger = false) {
  el.toast.textContent = msg;
  el.toast.classList.toggle('hidden', false);
  el.toast.style.borderColor = danger ? 'var(--danger)' : 'rgba(255,255,255,0.08)';
  setTimeout(() => el.toast.classList.add('hidden'), 1500);
}

/* Derived values */
function perClick() { return game.perClickBase * game.perClickMult; }
function pps() {
  const passive = game.buildings.reduce((sum, b) => sum + b.count * b.basePps, 0);
  return passive * game.passiveMult;
}

/* Rendering */
function renderStats() {
  el.pibbbles.textContent = format(game.pibbbles);
  el.pps.textContent = pps().toFixed(1);
  el.ppc.textContent = format(perClick());
}

function buildingCost(b) {
  return Math.floor(b.baseCost * Math.pow(1.15, b.count));
}

function renderBuildings() {
  el.buildingsList.innerHTML = '';
  game.buildings.forEach((b, i) => {
    const li = document.createElement('li');
    li.className = 'shop-item' + (game.pibbbles >= buildingCost(b) ? '' : ' locked');

    const icon = elNode('div', 'icon', b.icon);
    const info = elNode('div', 'info', '');
    const name = elNode('div', 'name', `${b.name} x${b.count}`);
    const desc = elNode('div', 'desc', `${b.desc}`);
    info.appendChild(name);
    info.appendChild(desc);

    const right = document.createElement('div');
    right.style.display = 'grid';
    right.style.gap = '6px';
    right.style.justifyItems = 'end';

    const cost = elNode('div', 'cost', `${format(buildingCost(b))}`);
    const btn = document.createElement('button');
    btn.className = 'buy';
    btn.textContent = 'Buy';
    btn.disabled = game.pibbbles < buildingCost(b);
    btn.addEventListener('click', () => buyBuilding(i));

    right.appendChild(cost);
    right.appendChild(btn);

    li.appendChild(icon);
    li.appendChild(info);
    li.appendChild(right);
    el.buildingsList.appendChild(li);
  });
}

function renderUpgrades() {
  el.upgradesList.innerHTML = '';
  game.upgrades.forEach((u, i) => {
    if (u.owned) return;
    const unlocked = game.totalPibbbles >= u.unlockAt;
    const li = document.createElement('li');
    li.className = 'shop-item' + ((unlocked && game.pibbbles >= u.cost) ? '' : ' locked');

    const icon = elNode('div', 'icon', u.icon);
    const info = elNode('div', 'info', '');
    const name = elNode('div', 'name', u.name);
    const desc = elNode('div', 'desc', `${u.desc} • Unlocks at ${format(u.unlockAt)} total`);
    info.appendChild(name);
    info.appendChild(desc);

    const right = document.createElement('div');
    right.style.display = 'grid';
    right.style.gap = '6px';
    right.style.justifyItems = 'end';

    const cost = elNode('div', 'cost', `${format(u.cost)}`);
    const btn = document.createElement('button');
    btn.className = 'buy';
    btn.textContent = 'Buy';
    btn.disabled = !unlocked || game.pibbbles < u.cost;
    btn.addEventListener('click', () => buyUpgrade(i));

    right.appendChild(cost);
    right.appendChild(btn);

    li.appendChild(icon);
    li.appendChild(info);
    li.appendChild(right);
    el.upgradesList.appendChild(li);
  });
}

function renderAchievements() {
  el.achievementsList.innerHTML = '';
  game.achievements.slice(0, 6).forEach(a => {
    const li = document.createElement('li');
    li.className = 'achievement';
    const badge = elNode('div', 'badge', a.icon);
    const content = document.createElement('div');
    const name = elNode('div', 'name', a.name);
    const note = elNode('div', 'note', a.desc);
    content.appendChild(name);
    content.appendChild(note);
    li.appendChild(badge);
    li.appendChild(content);
    el.achievementsList.appendChild(li);
  });
}

function renderLog() {
  el.logList.innerHTML = '';
  game.logs.slice(0, 10).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.msg;
    el.logList.appendChild(li);
  });
}

function elNode(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

/* Actions */
function addPibbbles(amount, floatAt = null) {
  game.pibbbles += amount;
  game.totalPibbbles += amount;
  if (floatAt) floatText(`+${format(amount)}`, floatAt.x, floatAt.y);
}

function floatText(text, x, y) {
  const span = document.createElement('span');
  span.className = 'float';
  span.textContent = text;
  const rect = el.floats.getBoundingClientRect();
  span.style.left = (x - rect.left - 10) + 'px';
  span.style.top = (y - rect.top - 10) + 'px';
  el.floats.appendChild(span);
  setTimeout(() => span.remove(), 1100);
}

function buyBuilding(index) {
  const b = game.buildings[index];
  const cost = buildingCost(b);
  if (game.pibbbles < cost) return;
  game.pibbbles -= cost;
  b.count++;
  renderAll();
}

function buyUpgrade(index) {
  const u = game.upgrades[index];
  if (u.owned || game.pibbbles < u.cost || game.totalPibbbles < u.unlockAt) return;
  game.pibbbles -= u.cost;
  u.owned = true;
  if (u.type === 'click-mult') game.perClickMult *= u.value;
  if (u.type === 'passive-mult') game.passiveMult *= u.value;
  log(`Upgrade purchased: ${u.name}`);
  renderAll();
}

/* Achievements (simple milestones) */
const ACHIEVEMENT_RULES = [
  { id: 'milestone-1', icon: '✨', name: 'First Spark', desc: 'Reach 100 Pibble', test: g => g.totalPibbbles >= 100 },
  { id: 'milestone-2', icon: '🌟', name: 'Going Viral', desc: 'Reach 10K Pibble', test: g => g.totalPibbbles >= 1e4 },
  { id: 'milestone-3', icon: '💫', name: 'Legend Status', desc: 'Reach 1M Pibble', test: g => g.totalPibbbles >= 1e6 },
  { id: 'builder-1', icon: '🏗️', name: 'Team Assembled', desc: 'Own 10 buildings total', test: g => g.buildings.reduce((s,b)=>s+b.count,0) >= 10 },
  { id: 'click-1', icon: '🎯', name: 'Click Master', desc: 'Per click ≥ 50', test: g => perClick() >= 50 },
];
function checkAchievements() {
  ACHIEVEMENT_RULES.forEach(rule => {
    if (!game.achievements.find(a => a.id === rule.id) && rule.test(game)) {
      game.achievements.unshift({ id: rule.id, icon: rule.icon, name: rule.name, desc: rule.desc });
      log(`Achievement unlocked: ${rule.name} 🏆`);
      renderAchievements();
    }
  });
}

/* Golden Pibble events */
function maybeSpawnGolden(dt) {
  game.goldenTimer += dt;
  if (game.goldenTimer >= game.nextGoldenIn) {
    game.goldenTimer = 0;
    game.nextGoldenIn = randInt(45, 90);
    spawnGolden();
  }
}
function spawnGolden() {
  const golden = document.createElement('div');
  golden.className = 'golden';
  golden.textContent = '⭐';
  const areaRect = el.goldenArea.getBoundingClientRect();
  const x = randInt(20, areaRect.width - 20);
  const y = randInt(20, areaRect.height - 20);
  golden.style.left = x + 'px';
  golden.style.top = y + 'px';
  el.goldenArea.appendChild(golden);
  let alive = true;

  const remove = () => { if (alive) { alive = false; golden.remove(); } };

  golden.addEventListener('click', (e) => {
    const reward = Math.max(25, Math.floor(pps() * 60));
    addPibbbles(reward, { x: e.clientX, y: e.clientY });
    log(`Golden Pibble! +${format(reward)}`);
    toast(`Golden Pibble! +${format(reward)}`);
    remove();
  });

  setTimeout(remove, 12000);
}

/* Game loop */
let prev = performance.now();
function loop(now) {
  const dtSec = (now - prev) / 1000;
  prev = now;

  const gain = pps() * dtSec;
  if (gain > 0) {
    game.pibbbles += gain;
    game.totalPibbbles += gain;
  }

  maybeSpawnGolden(dtSec);
  checkAchievements();
  renderStats();
  renderBuildings();
  renderUpgrades();

  requestAnimationFrame(loop);
}

/* Offline progress */
function applyOfflineProgress() {
  const now = Date.now();
  const seconds = Math.max(0, (now - game.lastSaveAt) / 1000);
  const gained = pps() * seconds;
  if (gained > 0.5) {
    game.pibbbles += gained;
    game.totalPibbbles += gained;
    toast(`While you were away: +${format(gained)} Pibble`);
    log(`Offline gains: +${format(gained)} Pibble`);
  }
}

/* Events */
el.button.addEventListener('click', (e) => {
  const amount = perClick();
  addPibbbles(amount, { x: e.clientX, y: e.clientY });
  renderStats();
});

el.saveBtn.addEventListener('click', save);
el.resetBtn.addEventListener('click', hardReset);
el.exportBtn.addEventListener('click', exportSave);

el.importToggleBtn.addEventListener('click', () => {
  el.importBox.classList.toggle('hidden');
});
el.importConfirmBtn.addEventListener('click', () => {
  const str = el.importText.value.trim();
  if (!str) return;
  importSave(str);
});
el.importCancelBtn.addEventListener('click', () => {
  el.importText.value = '';
  el.importBox.classList.add('hidden');
});

/* Auto-save */
setInterval(save, 10000);

/* Initial render */
function renderAll() {
  renderStats();
  renderBuildings();
  renderUpgrades();
  renderAchievements();
  renderLog();
}

/* Boot */
load();
renderAll();
applyOfflineProgress();
requestAnimationFrame(loop);
