/* ==========================================================================
   store.js — persistent state, mastery model, streak.

   Mastery model (agreed): tables unlock in textbook order 2→9. A fact is
   mastered after MASTERY_STREAK correct answers each under MASTERY_FAST_MS.
   Mastery is never revoked — a wrong answer resets the streak, but a trophy
   already earned is never taken away.
   ========================================================================== */

const Store = (() => {

  const KEY = 'imona.matematika.v1';

  const TABLES = [2, 3, 4, 5, 6, 7, 8, 9];
  const MULTIPLIERS = [2, 3, 4, 5, 6, 7, 8, 9];   // ×0, ×1, ×10 are a separate chapter
  const FACTS_PER_TABLE = MULTIPLIERS.length;      // 8
  const TOTAL_FACTS = TABLES.length * FACTS_PER_TABLE;

  const MASTERY_FAST_MS = 5000;
  const MASTERY_STREAK = 3;
  const SESSION_LENGTH = 15;
  const MAX_SESSIONS_KEPT = 60;

  const DEFAULTS = {
    v: 2,
    lang: 'uz',
    sound: true,

    // Times-tables progress. Kept when the app pivoted to textbook lessons so
    // that trophies already earned are never lost.
    facts: {},
    tables: { 2: { unlocked: true, learned: false } },

    // Textbook lesson progress, keyed by lesson id.
    // { done: bool, steps: { [stepId]: { attempts, correct, ms } } }
    lessons: {},

    streak: { count: 0, lastActiveDate: null, freezeWeek: null },
    sessions: [],
    installHintDismissed: false
  };

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULTS);
      const parsed = JSON.parse(raw);
      const merged = { ...structuredClone(DEFAULTS), ...parsed };
      // A table record written by an older build may lack `learned`.
      for (const n of TABLES) {
        if (merged.tables[n]) merged.tables[n] = { unlocked: false, learned: false, ...merged.tables[n] };
      }
      merged.tables[2] = { ...merged.tables[2], unlocked: true };
      merged.lessons = merged.lessons || {};      // added when lessons arrived
      merged.v = DEFAULTS.v;
      return merged;
    } catch (e) {
      return structuredClone(DEFAULTS);
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* private mode or quota — the session still works */ }
  }

  /* ------------------------------------------------------------ dates */

  function dayKey(d = new Date()) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function daysBetween(aKey, bKey) {
    const a = new Date(aKey + 'T00:00:00');
    const b = new Date(bKey + 'T00:00:00');
    return Math.round((b - a) / 86400000);
  }

  /** Monday-based week id, used to allow one streak freeze per week. */
  function weekKey(d = new Date()) {
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dow = (t.getDay() + 6) % 7;               // Monday = 0
    t.setDate(t.getDate() - dow);
    return dayKey(t);
  }

  /* ----------------------------------------------------------- facts */

  const factKey = (a, b) => `${a}x${b}`;

  function fact(a, b) {
    return state.facts[factKey(a, b)]
        || { attempts: 0, correct: 0, fastStreak: 0, mastered: false, bestMs: null, lastSeen: null };
  }

  function isMastered(a, b) {
    return Boolean(state.facts[factKey(a, b)]?.mastered);
  }

  function masteredInTable(n) {
    return MULTIPLIERS.filter(m => isMastered(n, m)).length;
  }

  function isTableComplete(n) {
    return masteredInTable(n) === FACTS_PER_TABLE;
  }

  function totalMastered() {
    return TABLES.reduce((sum, n) => sum + masteredInTable(n), 0);
  }

  function trophyCount() {
    return TABLES.filter(isTableComplete).length;
  }

  function isUnlocked(n) {
    return Boolean(state.tables[n]?.unlocked);
  }

  function isLearned(n) {
    return Boolean(state.tables[n]?.learned);
  }

  function markLearned(n) {
    state.tables[n] = { unlocked: true, learned: true, ...state.tables[n], learned: true };
    save();
  }

  /**
   * Record one answer. Returns { mastered: true } when this answer is the one
   * that tipped the fact into mastery, so the caller can celebrate it.
   */
  function recordAnswer(a, b, correct, ms) {
    const key = factKey(a, b);
    const f = { ...fact(a, b) };
    const wasMastered = f.mastered;

    f.attempts++;
    f.lastSeen = Date.now();

    if (correct) {
      f.correct++;
      f.bestMs = f.bestMs == null ? ms : Math.min(f.bestMs, ms);
      f.fastStreak = ms <= MASTERY_FAST_MS ? f.fastStreak + 1 : 0;
      if (f.fastStreak >= MASTERY_STREAK) f.mastered = true;
    } else {
      f.fastStreak = 0;      // deliberately does NOT clear f.mastered
    }

    state.facts[key] = f;
    save();
    return { mastered: f.mastered && !wasMastered };
  }

  /**
   * Unlock the next table if the current one is complete.
   * Returns the newly unlocked table number, or null.
   */
  function unlockNextIfEarned(n) {
    if (!isTableComplete(n)) return null;
    const next = TABLES[TABLES.indexOf(n) + 1];
    if (!next || isUnlocked(next)) return null;
    state.tables[next] = { unlocked: true, learned: false };
    save();
    return next;
  }

  /* ---------------------------------------------------- question pool */

  /**
   * Weighted pick for a practice session: the current table's unlearned facts
   * dominate, its mastered facts come back lightly, and mastered facts from
   * earlier tables are sprinkled in as review.
   */
  function buildSession(table, length = SESSION_LENGTH) {
    const weighted = [];
    const push = (a, b, weight) => {
      for (let i = 0; i < weight; i++) weighted.push({ a, b });
    };

    for (const m of MULTIPLIERS) {
      push(table, m, isMastered(table, m) ? 1 : 4);
    }
    for (const n of TABLES) {
      if (n === table || !isUnlocked(n)) continue;
      for (const m of MULTIPLIERS) if (isMastered(n, m)) push(n, m, 1);
    }

    const questions = [];
    let last = null;
    while (questions.length < length) {
      const pick = weighted[Math.floor(Math.random() * weighted.length)];
      const key = factKey(pick.a, pick.b);
      if (key === last && weighted.length > 1) continue;   // never twice in a row
      last = key;
      questions.push({ a: pick.a, b: pick.b, answer: pick.a * pick.b, key });
    }
    return questions;
  }

  /* ---------------------------------------------------------- streak */

  /**
   * Forgiving streak: a missed day is absorbed once per week rather than
   * resetting to zero. Returns the streak count after the update.
   */
  function touchStreak() {
    const today = dayKey();
    const s = state.streak;

    if (s.lastActiveDate === today) return s.count;

    if (s.lastActiveDate == null) {
      s.count = 1;
    } else {
      const gap = daysBetween(s.lastActiveDate, today);
      const thisWeek = weekKey();
      if (gap === 1) {
        s.count += 1;
      } else if (gap === 2 && s.freezeWeek !== thisWeek) {
        s.count += 1;
        s.freezeWeek = thisWeek;         // one free miss per week
      } else {
        s.count = 1;
      }
    }

    s.lastActiveDate = today;
    save();
    return s.count;
  }

  function recordSession({ table, asked, correct, avgMs, newlyMastered }) {
    state.sessions.push({
      date: dayKey(), ts: Date.now(), table, asked, correct, avgMs, newlyMastered
    });
    if (state.sessions.length > MAX_SESSIONS_KEPT) {
      state.sessions = state.sessions.slice(-MAX_SESSIONS_KEPT);
    }
    save();
  }

  /* -------------------------------------------------------- settings */

  function set(patch) {
    Object.assign(state, patch);
    save();
  }

  /* --------------------------------------------------- textbook lessons */

  function lesson(id) {
    return state.lessons[id] || { done: false, steps: {} };
  }

  function isLessonDone(id) {
    return Boolean(state.lessons[id]?.done);
  }

  /**
   * Lessons unlock strictly in the book's order; the first is always open.
   * A lesson already finished stays open regardless, so she can always replay it.
   */
  // TEMPORARY: every lesson open, for exploring the app. Set back to false
  // before she uses it for real — the book-order lock below then applies again.
  const UNLOCK_ALL_LESSONS = true;

  function isLessonUnlocked(id, allIds) {
    if (UNLOCK_ALL_LESSONS) return true;
    if (isLessonDone(id)) return true;
    const i = allIds.indexOf(id);
    if (i <= 0) return true;
    return isLessonDone(allIds[i - 1]);
  }

  function lessonsDone() {
    return Object.values(state.lessons).filter(l => l.done).length;
  }

  /**
   * Record one answered step. `fast` is only meaningful for computation
   * drills — speed says nothing useful about a word problem, so callers pass
   * fast:false for those and the timing is stored for the dashboard only.
   */
  function recordStep(lessonId, stepId, correct, ms) {
    const l = state.lessons[lessonId] || { done: false, steps: {} };
    const s = l.steps[stepId] || { attempts: 0, correct: 0, bestMs: null };
    s.attempts++;
    if (correct) {
      s.correct++;
      s.bestMs = s.bestMs == null ? ms : Math.min(s.bestMs, ms);
    }
    l.steps[stepId] = s;
    state.lessons[lessonId] = l;
    save();
  }

  /** Marks a lesson complete. Returns true the first time it happens. */
  function completeLesson(id) {
    const l = state.lessons[id] || { done: false, steps: {} };
    const first = !l.done;
    l.done = true;
    l.completedAt = l.completedAt || Date.now();
    state.lessons[id] = l;
    save();
    return first;
  }

  function recordLessonSession({ lessonId, steps, correct, wrong, avgMs }) {
    state.sessions.push({
      date: dayKey(), ts: Date.now(), kind: 'lesson', lessonId, steps, correct, wrong, avgMs
    });
    if (state.sessions.length > MAX_SESSIONS_KEPT) {
      state.sessions = state.sessions.slice(-MAX_SESSIONS_KEPT);
    }
    save();
  }

  return {
    TABLES, MULTIPLIERS, FACTS_PER_TABLE, TOTAL_FACTS,
    MASTERY_FAST_MS, MASTERY_STREAK, SESSION_LENGTH,

    get state() { return state; },
    get lang() { return state.lang; },
    get sound() { return state.sound; },

    set, save, factKey, fact,
    isMastered, masteredInTable, isTableComplete, totalMastered, trophyCount,
    isUnlocked, isLearned, markLearned,
    recordAnswer, unlockNextIfEarned, buildSession,
    touchStreak, recordSession, dayKey,

    lesson, isLessonDone, isLessonUnlocked, lessonsDone,
    recordStep, completeLesson, recordLessonSession
  };

})();
