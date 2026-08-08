/* ==========================================================================
   app.js — view router, home screen, table menu, session summary.
   Lesson and drill logic live in lib/learn.js and lib/practice.js.
   ========================================================================== */

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

const VIEWS = ['Home', 'Lesson', 'Tables', 'Table', 'Learn', 'Practice', 'Summary'];

let t = STRINGS[Store.lang];
let currentView = 'Home';
let currentTable = 2;
let currentLesson = null;

const $ = (id) => document.getElementById(id);

/* ---------------------------------------------------------------- router */

function showView(name, { push = true } = {}) {
  for (const v of VIEWS) $('view' + v).hidden = (v !== name);
  currentView = name;
  window.scrollTo(0, 0);
  if (push) history.pushState({ view: name, table: currentTable }, '');
}

// Android's back gesture must move through the app, not exit it.
window.addEventListener('popstate', (e) => {
  const target = e.state?.view || 'Home';
  if (currentView === 'Practice' && target !== 'Practice') Practice.abandon();
  if (currentView === 'Lesson' && target !== 'Lesson') LessonRunner.abandon();
  if (target === 'Home') renderHome();
  if (e.state?.table) currentTable = e.state.table;
  showView(target, { push: false });
});

/* ------------------------------------------------------------------ home */

function renderStats() {
  $('streakValue').textContent = Store.state.streak.count;
  $('trophyValue').textContent = Store.trophyCount();
  $('factsValue').textContent = Store.totalMastered();
}

function renderTables() {
  const grid = $('tableGrid');
  grid.innerHTML = '';

  for (const n of Store.TABLES) {
    const unlocked = Store.isUnlocked(n);
    const done = Store.masteredInTable(n);
    const complete = Store.isTableComplete(n);

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'table-card' + (unlocked ? '' : ' locked');
    if (unlocked) card.style.background = CARD_GRADIENTS[n];

    const badge = complete ? '<span class="trophy">🏆</span>'
                : unlocked ? ''
                : '<span class="lock">🔒</span>';

    card.innerHTML = `
      ${badge}
      <span class="num">${n}</span>
      <span class="caption">${unlocked ? t.tableCaption(n) : t.tableLocked}</span>
      <div class="progress-track">
        <div class="progress-fill" style="width:${(done / Store.FACTS_PER_TABLE) * 100}%"></div>
      </div>
      <span class="progress-text">${t.progressText(done, Store.FACTS_PER_TABLE)}</span>
    `;

    card.addEventListener('click', () => onTableTap(n, unlocked));
    grid.appendChild(card);
  }
}

function renderLessonList() {
  const host = $('lessonList');
  host.innerHTML = '';
  let lastSection = null;

  for (const lesson of Lessons.LESSONS) {
    if (lesson.section !== lastSection) {
      lastSection = lesson.section;
      const h = document.createElement('div');
      h.className = 'section-label';
      h.textContent = Lessons.sectionTitle(lesson.section);
      host.appendChild(h);
    }

    const unlocked = Store.isLessonUnlocked(lesson.id, Lessons.ALL_IDS);
    const done = Store.isLessonDone(lesson.id);

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'lesson-row' + (done ? ' done' : '') + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <span class="lesson-no">${lesson.no}</span>
      <span class="lesson-text">
        <strong>${Lessons.topicTitle(lesson)}</strong>
        <span>${t.lessonLabel(lesson.no)} · ${done ? t.lessonDone : unlocked ? t.lessonPages(lesson.pages) : t.lessonLocked}</span>
      </span>
      <span class="lesson-mark">${done ? '✓' : unlocked ? '›' : '🔒'}</span>`;

    card.addEventListener('click', () => {
      FX.unlock();
      if (!unlocked) { FX.play('incorrect'); return; }
      FX.play('tap');
      startLesson(lesson.id);
    });
    host.appendChild(card);
  }

  const note = document.createElement('p');
  note.className = 'more-soon';
  note.textContent = t.moreSoon;
  host.appendChild(note);
}

function renderHome() {
  renderStats();
  renderLessonList();
  renderTables();
}

function onTableTap(n, unlocked) {
  FX.unlock();
  if (!unlocked) {
    FX.play('incorrect');
    openSheet({ emoji: '🔒', title: t.lockedTitle, body: t.lockedBody(n) });
    return;
  }
  FX.play('tap');
  currentTable = n;
  renderTableMenu();
  showView('Table');
}

/* ------------------------------------------------------------ table menu */

function renderTableMenu() {
  const n = currentTable;
  $('tableHeading').textContent = t.tableCaption(n);
  $('tableBackLabel').textContent = t.back;
  $('modeLearnTitle').textContent = t.menuLearn;
  $('modeLearnSub').textContent = Store.isLearned(n) ? t.menuLearnDone : t.menuLearnSub;
  $('modeLearnBadge').hidden = !Store.isLearned(n);
  $('modePracticeTitle').textContent = t.menuPractice;
  $('modePracticeSub').textContent = t.menuPracticeSub(Store.SESSION_LENGTH);

  const grid = $('tableFactGrid');
  grid.innerHTML = '';
  for (const m of Store.MULTIPLIERS) {
    const mastered = Store.isMastered(n, m);
    const cell = document.createElement('div');
    cell.className = 'fact-cell' + (mastered ? ' mastered' : '');
    cell.innerHTML = `${n} <span class="dotop">•</span> ${m} = <strong>${mastered ? n * m : '?'}</strong>`;
    grid.appendChild(cell);
  }
}

/* ---------------------------------------------------------------- lesson */

function startLesson(id) {
  currentLesson = id;
  showView('Lesson');
  LessonRunner.start(id, (result) => {
    renderHome();
    renderLessonSummary(result);
  });
}

function renderLessonSummary(r) {
  $('summaryTitle').textContent = t.lessonDoneTitle(r.lesson.no);
  $('summaryCorrect').textContent = `${r.correct}/${r.graded}`;
  $('summaryCorrectLabel').textContent = t.sumCorrect;
  $('summarySpeed').textContent = r.wrong;
  $('summarySpeedLabel').textContent = t.sumWrong;
  $('summaryNew').textContent = r.exercises;
  $('summaryNewLabel').textContent = t.sumExercises;
  $('summaryAgain').textContent = t.sumAgain;
  $('summaryHome').textContent = t.sumHome;

  const streakEl = $('summaryStreak');
  streakEl.hidden = r.streak < 2;
  streakEl.textContent = t.sumStreak(r.streak);

  const clean = r.wrong === 0;
  $('summaryEmoji').textContent = clean ? '🌟' : '🎉';

  summaryAgainAction = () => startLesson(r.lesson.id);
  showView('Summary');

  FX.play('fanfare');
  FX.confetti({ count: clean ? 130 : 80, originY: 0.35 });

  if (r.firstTime) {
    const i = Lessons.ALL_IDS.indexOf(r.lesson.id);
    const hasNext = i >= 0 && i < Lessons.ALL_IDS.length - 1;
    setTimeout(() => openSheet({
      emoji: '📗',
      title: t.lessonDoneTitle(r.lesson.no),
      body: hasNext ? t.lessonDoneBody : t.lessonDoneLast
    }), 700);
  }
}

/* --------------------------------------------------------------- summary */

let summaryAgainAction = null;

function renderSummary(r) {
  summaryAgainAction = () => startPractice();
  $('summaryTitle').textContent = t.sumTitle;
  $('summaryCorrect').textContent = `${r.correct}/${r.asked}`;
  $('summaryCorrectLabel').textContent = t.sumCorrect;
  $('summarySpeed').textContent = r.avgMs ? `${(r.avgMs / 1000).toFixed(1)}s` : '—';
  $('summarySpeedLabel').textContent = t.sumSpeed;
  $('summaryNew').textContent = r.newlyMastered;
  $('summaryNewLabel').textContent = t.sumNewFacts;
  $('summaryAgain').textContent = t.sumAgain;
  $('summaryHome').textContent = t.sumHome;

  const streakEl = $('summaryStreak');
  streakEl.hidden = r.streak < 2;
  streakEl.textContent = t.sumStreak(r.streak);

  const perfect = r.correct === r.asked;
  $('summaryEmoji').textContent = perfect ? '🌟' : r.correct >= r.asked * 0.6 ? '🎉' : '💪';

  showView('Summary');
  if (perfect) { FX.play('fanfare'); FX.confetti({ count: 110, originY: 0.35 }); }

  if (r.tableComplete) {
    setTimeout(() => {
      FX.play('fanfare');
      FX.confetti({ count: 150, originY: 0.3 });
      openSheet({
        emoji: '🏆',
        title: t.trophyTitle(r.table),
        body: r.unlocked ? t.trophyBody(r.unlocked) : t.trophyBodyLast
      });
    }, 600);
  }
}

/* ----------------------------------------------------------------- sheet */

let sheetOnOk = null;
let sheetOnCancel = null;

function openSheet({ emoji, title, body, okLabel, cancelLabel, onOk, onCancel }) {
  $('sheetEmoji').textContent = emoji;
  $('sheetTitle').textContent = title;
  $('sheetBody').textContent = body;
  $('sheetBtn').textContent = okLabel || t.sheetOk;

  const cancel = $('sheetCancel');
  cancel.hidden = !cancelLabel;
  if (cancelLabel) cancel.textContent = cancelLabel;

  sheetOnOk = onOk || null;
  sheetOnCancel = onCancel || null;
  $('sheetBackdrop').hidden = false;
}

function closeSheet() {
  $('sheetBackdrop').hidden = true;
  sheetOnOk = null;
  sheetOnCancel = null;
}

/* ---------------------------------------------------------------- i18n */

function applyLanguage() {
  t = STRINGS[Store.lang];
  document.documentElement.lang = t.htmlLang;

  $('greeting').textContent = t.greeting;
  $('subtitle').textContent = t.subtitle;
  $('langBtn').textContent = t.langButton;
  $('streakLabel').textContent = t.streakLabel;
  $('trophyLabel').textContent = t.trophyLabel;
  $('factsLabel').textContent = t.factsLabel;
  $('tablesTitle').textContent = t.tablesTitle;
  $('lessonsTitle').textContent = t.lessonsTitle;
  $('tablesEntryTitle').textContent = t.tablesEntry;
  $('tablesEntrySub').textContent = t.tablesEntrySub;
  $('footerNote').textContent = t.footerNote;
  $('learnBackLabel').textContent = t.back;
  $('practiceBackLabel').textContent = t.back;
  $('tablesBackLabel').textContent = t.back;
  $('lessonBackLabel').textContent = t.back;

  refreshInstallHint();
  renderLessonList();
  renderTables();
  if (currentView === 'Table') renderTableMenu();
  if (currentView === 'Learn') Learn.render();
  if (currentView === 'Lesson') LessonRunner.render();
}

/* -------------------------------------------------------------- install */

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function platformHint() {
  // Detect the browser, not the device brand: an Honor tablet running Chrome
  // needs Chrome's wording, not Huawei Browser's.
  const ua = navigator.userAgent;
  if (isIOS()) return 'ios';
  if (/HuaweiBrowser/i.test(ua)) return 'huawei';
  if (/Android|HarmonyOS/i.test(ua)) return 'android';
  return 'generic';
}

let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  refreshInstallHint();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const hint = $('installHint');
  if (hint) hint.hidden = true;
});

function refreshInstallHint() {
  const hint = $('installHint');
  if (!hint) return;

  if (isStandalone() || Store.state.installHintDismissed) {
    hint.hidden = true;
    return;
  }

  hint.hidden = false;
  $('installTitle').textContent = t.installTitle;
  $('installBody').textContent =
    deferredInstallPrompt ? t.installBody.ready : t.installBody[platformHint()];
  $('installAction').textContent = t.installAction;
  $('installAction').hidden = !deferredInstallPrompt;
}

/* ----------------------------------------------------------- decoration */

function renderBackgroundSymbols() {
  const host = $('bgSymbols');
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

/* -------------------------------------------------------- service worker */

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });

  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });
}

/* ------------------------------------------------------------------ init */

function startPractice() {
  showView('Practice');
  Practice.start(currentTable, (result) => {
    renderHome();
    renderSummary(result);
  });
}

function init() {
  FX.enabled = Store.sound;
  $('soundBtn').textContent = Store.sound ? '🔊' : '🔇';

  $('langBtn').addEventListener('click', () => {
    Store.set({ lang: Store.lang === 'uz' ? 'en' : 'uz' });
    FX.unlock();
    FX.play('tap');
    applyLanguage();
  });

  $('soundBtn').addEventListener('click', (e) => {
    Store.set({ sound: !Store.sound });
    FX.enabled = Store.sound;
    e.currentTarget.textContent = Store.sound ? '🔊' : '🔇';
    if (Store.sound) { FX.unlock(); FX.play('tap'); }
  });

  $('installClose').addEventListener('click', () => {
    $('installHint').hidden = true;
    Store.set({ installHintDismissed: true });
  });

  $('installAction').addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    refreshInstallHint();
  });

  $('sheetBtn').addEventListener('click', () => {
    const fn = sheetOnOk;
    closeSheet();
    if (fn) fn();
  });
  $('sheetCancel').addEventListener('click', () => {
    const fn = sheetOnCancel;
    closeSheet();
    if (fn) fn();
  });
  $('sheetBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'sheetBackdrop' && !sheetOnOk) closeSheet();
  });

  $('tableBack').addEventListener('click', () => history.back());
  $('tablesBack').addEventListener('click', () => history.back());

  $('tablesEntry').addEventListener('click', () => {
    FX.unlock();
    FX.play('tap');
    renderTables();
    showView('Tables');
  });

  $('lessonBack').addEventListener('click', () => {
    openSheet({
      emoji: '🤔',
      title: t.quitTitle,
      body: t.quitBody,
      okLabel: t.quitYes,
      cancelLabel: t.quitNo,
      onOk: () => {
        LessonRunner.abandon();
        renderHome();
        history.back();
      }
    });
  });

  $('modeLearn').addEventListener('click', () => {
    FX.unlock();
    FX.play('tap');
    showView('Learn');
    Learn.start(currentTable, () => {
      renderTableMenu();
      startPractice();
    });
  });

  $('modePractice').addEventListener('click', () => {
    FX.unlock();
    FX.play('tap');
    startPractice();
  });

  $('learnBack').addEventListener('click', () => history.back());
  $('learnNext').addEventListener('click', () => Learn.advance());

  $('practiceBack').addEventListener('click', () => {
    openSheet({
      emoji: '🤔',
      title: t.quitTitle,
      body: t.quitBody,
      okLabel: t.quitYes,
      cancelLabel: t.quitNo,
      onOk: () => {
        Practice.abandon();
        renderHome();
        history.back();
      }
    });
  });

  $('summaryAgain').addEventListener('click', () => {
    FX.play('tap');
    (summaryAgainAction || startPractice)();
  });
  $('summaryHome').addEventListener('click', () => {
    FX.play('tap');
    renderHome();
    showView('Home');
  });

  applyLanguage();
  renderStats();
  renderBackgroundSymbols();
  refreshInstallHint();
  registerServiceWorker();
  history.replaceState({ view: 'Home', table: currentTable }, '');
}

init();
