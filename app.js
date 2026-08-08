/* ==========================================================================
   app.js — shell for the home screen.
   Step 1 scope: install, offline, language, and the table ladder rendered from
   real state. The Learn/Practice engine lands in step 2.
   ========================================================================== */

const TABLES = [2, 3, 4, 5, 6, 7, 8, 9];
const MULTIPLIERS = [2, 3, 4, 5, 6, 7, 8, 9];   // ×0, ×1, ×10 are a separate chapter
const FACTS_PER_TABLE = MULTIPLIERS.length;      // 8
const TOTAL_FACTS = TABLES.length * FACTS_PER_TABLE;   // 64

const CARD_GRADIENTS = {
  2: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  3: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  4: 'linear-gradient(135deg, #10b981, #059669)',
  5: 'linear-gradient(135deg, #f59e0b, #d97706)',
  6: 'linear-gradient(135deg, #ec4899, #db2777)',
  7: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  8: 'linear-gradient(135deg, #ef4444, #dc2626)',
  9: 'linear-gradient(135deg, #14b8a6, #0d9488)'
};

/* ----------------------------------------------------------------- state */

const STORAGE_KEY = 'imona.matematika.v1';

const DEFAULT_STATE = {
  v: 1,
  lang: 'uz',
  sound: true,
  facts: {},                       // "2x3" -> { attempts, correct, fastStreak, mastered, bestMs }
  tables: { 2: { unlocked: true } },
  streak: { count: 0, lastActiveDate: null, freezeUsedWeek: null },
  installHintDismissed: false
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    return { ...structuredClone(DEFAULT_STATE), ...JSON.parse(raw) };
  } catch (e) {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* private mode or quota — the app still works for this session */ }
}

let state = loadState();
let t = STRINGS[state.lang];

/* --------------------------------------------------------------- helpers */

function isTableUnlocked(n) {
  return Boolean(state.tables[n] && state.tables[n].unlocked);
}

function masteredInTable(n) {
  return MULTIPLIERS.filter(m => state.facts[`${n}x${m}`]?.mastered).length;
}

function totalMastered() {
  return TABLES.reduce((sum, n) => sum + masteredInTable(n), 0);
}

function trophyCount() {
  return TABLES.filter(n => masteredInTable(n) === FACTS_PER_TABLE).length;
}

/* ----------------------------------------------------------------- render */

function renderStats() {
  document.getElementById('streakValue').textContent = state.streak.count;
  document.getElementById('trophyValue').textContent = trophyCount();
  document.getElementById('factsValue').textContent = totalMastered();
}

function renderTables() {
  const grid = document.getElementById('tableGrid');
  grid.innerHTML = '';

  for (const n of TABLES) {
    const unlocked = isTableUnlocked(n);
    const done = masteredInTable(n);
    const complete = done === FACTS_PER_TABLE;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'table-card' + (unlocked ? '' : ' locked');
    card.dataset.table = String(n);
    if (unlocked) card.style.background = CARD_GRADIENTS[n];

    const badge = complete ? '<span class="trophy">🏆</span>'
                : unlocked ? ''
                : '<span class="lock">🔒</span>';

    card.innerHTML = `
      ${badge}
      <span class="num">${n}</span>
      <span class="caption">${unlocked ? t.tableCaption(n) : t.tableLocked}</span>
      <div class="progress-track">
        <div class="progress-fill" style="width:${(done / FACTS_PER_TABLE) * 100}%"></div>
      </div>
      <span class="progress-text">${t.progressText(done, FACTS_PER_TABLE)}</span>
    `;

    card.addEventListener('click', () => onTableTap(n, unlocked));
    grid.appendChild(card);
  }
}

function applyLanguage() {
  t = STRINGS[state.lang];
  document.documentElement.lang = t.htmlLang;

  document.getElementById('greeting').textContent = t.greeting;
  document.getElementById('subtitle').textContent = t.subtitle;
  document.getElementById('langBtn').textContent = t.langButton;
  document.getElementById('streakLabel').textContent = t.streakLabel;
  document.getElementById('trophyLabel').textContent = t.trophyLabel;
  document.getElementById('factsLabel').textContent = t.factsLabel;
  document.getElementById('tablesTitle').textContent = t.tablesTitle;
  document.getElementById('footerNote').textContent = t.footerNote;

  refreshInstallHint();
  renderTables();
}

/* ------------------------------------------------------------------ sheet */

function openSheet({ emoji, title, body }) {
  document.getElementById('sheetEmoji').textContent = emoji;
  document.getElementById('sheetTitle').textContent = title;
  document.getElementById('sheetBody').textContent = body;
  document.getElementById('sheetBtn').textContent = t.sheetOk;
  document.getElementById('sheetBackdrop').hidden = false;
}

function closeSheet() {
  document.getElementById('sheetBackdrop').hidden = true;
}

function onTableTap(n, unlocked) {
  FX.unlock();
  if (!unlocked) {
    FX.play('incorrect');
    openSheet({ emoji: '🔒', title: t.lockedTitle, body: t.lockedBody(n) });
    return;
  }
  // Step 2 replaces this with the Learn / Practice screens.
  FX.play('fanfare');
  FX.confetti({ count: 70, originY: 0.45 });
  openSheet({ emoji: '🚧', title: t.soonTitle, body: t.soonBody });
}

/* ---------------------------------------------------------------- install */

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);   // iPadOS 13+
}

function platformHint() {
  const ua = navigator.userAgent;
  // Detect the browser, not the device brand: an Honor tablet running Chrome
  // needs Chrome's wording, not Huawei Browser's.
  if (isIOS()) return 'ios';
  if (/HuaweiBrowser/i.test(ua)) return 'huawei';
  if (/Android|HarmonyOS/i.test(ua)) return 'android';
  return 'generic';
}

// Chromium fires this when the app is installable; holding it lets us offer a
// real one-tap install button instead of "open the menu and find it yourself".
// Registered at top level because it can fire before init() runs.
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  refreshInstallHint();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const hint = document.getElementById('installHint');
  if (hint) hint.hidden = true;
});

function refreshInstallHint() {
  const hint = document.getElementById('installHint');
  if (!hint) return;

  if (isStandalone() || state.installHintDismissed) {
    hint.hidden = true;
    return;
  }

  const action = document.getElementById('installAction');
  hint.hidden = false;
  document.getElementById('installTitle').textContent = t.installTitle;
  document.getElementById('installBody').textContent =
    deferredInstallPrompt ? t.installBody.ready : t.installBody[platformHint()];
  action.textContent = t.installAction;
  action.hidden = !deferredInstallPrompt;
}

function setupInstallHint() {
  document.getElementById('installClose').addEventListener('click', () => {
    document.getElementById('installHint').hidden = true;
    state.installHintDismissed = true;
    saveState();
  });

  document.getElementById('installAction').addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;        // the event is single-use
    refreshInstallHint();
  });

  refreshInstallHint();
}

/* ------------------------------------------------------------- decoration */

function renderBackgroundSymbols() {
  const host = document.getElementById('bgSymbols');
  const symbols = ['•', '×', '=', '2', '7', '★', '⭐', '9', '+'];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('span');
    el.className = 'floating-symbol';
    el.textContent = symbols[i % symbols.length];
    el.style.left = `${Math.random() * 95}%`;
    el.style.top = `${Math.random() * 95}%`;
    el.style.fontSize = `${Math.random() * 44 + 22}px`;
    el.style.animationDelay = `${Math.random() * 12}s`;
    host.appendChild(el);
  }
}

/* ---------------------------------------------------------- service worker */

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* offline install is a bonus */ });
  });

  // When a new version takes over, reload once so she never sees a half-old app.
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });
}

/* ------------------------------------------------------------------- init */

function init() {
  FX.enabled = state.sound;
  document.getElementById('soundBtn').textContent = state.sound ? '🔊' : '🔇';

  document.getElementById('langBtn').addEventListener('click', () => {
    state.lang = state.lang === 'uz' ? 'en' : 'uz';
    saveState();
    FX.unlock();
    FX.play('tap');
    applyLanguage();
  });

  document.getElementById('soundBtn').addEventListener('click', (e) => {
    state.sound = !state.sound;
    FX.enabled = state.sound;
    e.currentTarget.textContent = state.sound ? '🔊' : '🔇';
    saveState();
    if (state.sound) { FX.unlock(); FX.play('tap'); }
  });

  document.getElementById('sheetBtn').addEventListener('click', closeSheet);
  document.getElementById('sheetBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'sheetBackdrop') closeSheet();
  });

  applyLanguage();
  renderStats();
  renderBackgroundSymbols();
  setupInstallHint();
  registerServiceWorker();
}

init();
