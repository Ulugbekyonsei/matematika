/* ==========================================================================
   practice.js — "Mashq", the daily drill.

   A session is Store.SESSION_LENGTH questions, weighted towards the current
   table's unmastered facts with mastered facts sprinkled back in as review.
   Response time is measured from question render to submit, because mastery
   is defined by recall speed, not just correctness.
   ========================================================================== */

const Practice = (() => {

  const T = () => STRINGS[Store.lang];

  const CORRECT_PAUSE_MS = 750;
  const WRONG_PAUSE_MS = 2200;

  let table = 2;
  let questions = [];
  let index = 0;
  let askedAt = 0;
  let keypad = null;
  let onFinish = () => {};

  let tally = { correct: 0, times: [], newlyMastered: 0 };

  /* ---------------------------------------------------------- render */

  function renderDots() {
    const host = document.getElementById('practiceDots');
    host.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
      const d = document.createElement('span');
      d.className = 'dot-pip'
        + (i < index ? ' done' : '')
        + (i === index ? ' current' : '');
      host.appendChild(d);
    }
  }

  function renderQuestion() {
    const q = questions[index];
    const slot = document.getElementById('answerSlot');
    const feedback = document.getElementById('questionFeedback');
    const scaffold = document.getElementById('questionScaffold');

    document.getElementById('questionText').innerHTML =
      `${q.a} <span class="dotop">•</span> ${q.b} =`;
    document.getElementById('practiceStep').textContent =
      T().practiceOf(index + 1, questions.length);
    document.getElementById('practiceBackLabel').textContent = T().back;

    feedback.hidden = true;
    scaffold.hidden = true;
    Keypad.renderSlot(slot, '');
    slot.className = 'answer-slot empty';
    document.getElementById('questionCard').className = 'question-card';

    renderDots();
    keypad.reset();
    askedAt = performance.now();
  }

  function submit(value) {
    const q = questions[index];
    const ms = Math.round(performance.now() - askedAt);
    const right = value === q.answer;

    const card = document.getElementById('questionCard');
    const feedback = document.getElementById('questionFeedback');
    const scaffold = document.getElementById('questionScaffold');
    const slot = document.getElementById('answerSlot');

    Keypad.renderSlot(slot, String(value));
    slot.className = 'answer-slot ' + (right ? 'ok' : 'bad');

    const result = Store.recordAnswer(q.a, q.b, right, ms);
    if (right) {
      tally.correct++;
      tally.times.push(ms);
      if (result.mastered) tally.newlyMastered++;
    }

    card.className = 'question-card ' + (right ? 'flash-ok' : 'shake');
    feedback.hidden = false;
    feedback.className = 'feedback ' + (right ? 'ok' : 'bad');
    feedback.textContent = right ? T().correct : T().wrongIs(`${q.a} • ${q.b}`, q.answer);

    if (!right) {
      scaffold.hidden = false;
      scaffold.textContent = T().l6Scaffold(Array(q.b).fill(q.a).join(' + '));
    }

    FX.play(right ? 'correct' : 'incorrect');
    if (result.mastered) FX.confetti({ count: 50, originY: 0.4 });

    setTimeout(next, right ? CORRECT_PAUSE_MS : WRONG_PAUSE_MS);
  }

  function next() {
    index++;
    if (index >= questions.length) return finish();
    renderQuestion();
  }

  function finish() {
    const asked = questions.length;
    const avgMs = tally.times.length
      ? Math.round(tally.times.reduce((a, b) => a + b, 0) / tally.times.length)
      : 0;

    const streak = Store.touchStreak();
    Store.recordSession({
      table, asked, correct: tally.correct, avgMs, newlyMastered: tally.newlyMastered
    });
    const unlocked = Store.unlockNextIfEarned(table);

    onFinish({
      table, asked, correct: tally.correct, avgMs,
      newlyMastered: tally.newlyMastered,
      streak,
      unlocked,
      tableComplete: Store.isTableComplete(table)
    });
  }

  /* ------------------------------------------------------------- api */

  function start(n, done) {
    table = n;
    questions = Store.buildSession(n);
    index = 0;
    tally = { correct: 0, times: [], newlyMastered: 0 };
    onFinish = done;

    keypad = Keypad.mount(document.getElementById('keypad'), {
      onChange: (v) => Keypad.renderSlot(document.getElementById('answerSlot'), v),
      onSubmit: submit
    });

    renderQuestion();
  }

  /**
   * Questions answered so far still count — nothing is discarded on quit.
   * Idempotent: the quit confirmation and the popstate handler both call this,
   * and without the reset it would record the session twice.
   */
  function abandon() {
    if (index === 0) return;
    const avgMs = tally.times.length
      ? Math.round(tally.times.reduce((a, b) => a + b, 0) / tally.times.length)
      : 0;
    Store.touchStreak();
    Store.recordSession({
      table, asked: index, correct: tally.correct, avgMs, newlyMastered: tally.newlyMastered
    });
    Store.unlockNextIfEarned(table);
    index = 0;
    tally = { correct: 0, times: [], newlyMastered: 0 };
  }

  return { start, abandon, renderQuestion };

})();
