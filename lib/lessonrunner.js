/* ==========================================================================
   lessonrunner.js — walks one textbook lesson, one step per screen.

   A wrong answer shows the right one and moves on, then the step comes back
   once at the end of the lesson. Two misses and it is simply shown and left —
   a 7-year-old should never be trapped in a loop on one question.
   ========================================================================== */

const LessonRunner = (() => {

  const T = () => STRINGS[Store.lang];

  const CORRECT_PAUSE_MS = 800;
  const WRONG_PAUSE_MS = 2600;

  let lesson = null;
  let queue = [];
  let position = 0;
  let totalPlanned = 0;
  let retried = new Set();
  let keypad = null;
  let askedAt = 0;
  let onFinish = () => {};
  // `graded` counts only steps with a right answer — worked examples and
  // self-check cards are steps, but scoring them would be meaningless.
  let tally = { correct: 0, wrong: 0, graded: 0, times: [] };

  const $ = (id) => document.getElementById(id);

  /* ---------------------------------------------------------- rendering */

  function renderChrome(step) {
    $('lessonBackLabel').textContent = T().back;
    $('lessonExercise').textContent = T().exerciseNo(step.exercise);
    $('lessonStep').textContent = `${Math.min(position + 1, totalPlanned)} / ${totalPlanned}`;
    $('lessonProgressFill').style.width = `${(position / totalPlanned) * 100}%`;
  }

  function render() {
    const step = queue[position];
    if (!step) return finish();

    renderChrome(step);

    const body = $('lessonBody');
    const pad = $('lessonKeypad');
    const actions = $('lessonActions');

    body.className = 'lesson-card';
    pad.hidden = true;
    pad.innerHTML = '';
    actions.hidden = true;
    actions.innerHTML = '';

    if (step.kind === 'info') return renderInfo(step, body, actions);
    if (step.kind === 'numeric') return renderNumeric(step, body, pad);
    if (step.kind === 'choice') return renderChoice(step, body);
    if (step.kind === 'selfcheck') return renderSelfCheck(step, body, actions);
    if (step.kind === 'match') return renderMatch(step, body);
    if (step.kind === 'order') return renderOrder(step, body);
  }

  function renderInfo(step, body, actions) {
    const blocks = step.blocks.map(b => `
      <div class="namuna-block">
        <div class="namuna-head">${b.head}</div>
        ${b.split ? `<div class="namuna-split">
          <span>${b.split[0]}</span><span>${b.split[1]}</span></div>` : ''}
        ${b.work ? `<div class="namuna-work">${b.work}</div>` : ''}
        ${b.lines ? b.lines.map(l => `<div class="namuna-line">${l}</div>`).join('') : ''}
      </div>`).join('');

    body.innerHTML = `
      <div class="namuna-badge">${T().namuna}</div>
      <div class="namuna-grid">${blocks}</div>`;

    actions.hidden = false;
    actions.innerHTML = `<button class="btn-primary" type="button">${T().understood}</button>`;
    actions.querySelector('button').addEventListener('click', () => {
      FX.play('tap');
      Store.recordStep(lesson.id, step.id, true, 0);
      advance();
    });
  }

  /** The blank is not always at the end — "59 − _ = 50" puts it in the middle. */
  function questionLine(step) {
    const slot = '<span class="answer-slot empty" id="lessonSlot"></span>';
    if (step.expr && step.expr.includes('_')) {
      const [before, after] = step.expr.split('_');
      return `<div class="question-line">
        <span class="question">${before}</span>${slot}<span class="question">${after}</span>
      </div>`;
    }
    return `<div class="question-line">
      ${step.expr ? `<span class="question">${step.expr} =</span>` : ''}${slot}
    </div>`;
  }

  function renderNumeric(step, body, pad) {
    body.innerHTML = `
      ${step.prompt ? `<p class="ex-prompt">${step.prompt}</p>` : ''}
      ${step.namuna ? `<div class="ex-namuna">${T().namuna}: ${step.namuna}</div>` : ''}
      ${step.figure ? `<div class="ex-figure">${step.figure}</div>` : ''}
      ${questionLine(step)}
      <div class="feedback" id="lessonFeedback" hidden></div>`;

    pad.hidden = false;
    keypad = Keypad.mount(pad, {
      maxDigits: step.maxDigits,
      onChange: (v) => Keypad.renderSlot($('lessonSlot'), v),
      onSubmit: (v) => grade(step, v === step.answer, v, String(step.answer))
    });

    askedAt = performance.now();
  }

  function renderChoice(step, body) {
    const opts = step.options.map((o, i) =>
      `<button class="choice-btn" type="button" data-i="${i}">${o}</button>`).join('');

    body.innerHTML = `
      <p class="ex-prompt">${step.prompt}</p>
      ${step.figure ? `<div class="ex-figure">${step.figure}</div>` : ''}
      <div class="choice-list">${opts}</div>
      <div class="feedback" id="lessonFeedback" hidden></div>`;

    body.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.i);
        body.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
        btn.classList.add(i === step.answer ? 'ok' : 'bad');
        if (i !== step.answer) {
          body.querySelector(`.choice-btn[data-i="${step.answer}"]`).classList.add('ok');
        }
        grade(step, i === step.answer, i, step.options[step.answer]);
      });
    });

    askedAt = performance.now();
  }

  function renderSelfCheck(step, body, actions) {
    body.innerHTML = `
      <div class="selfcheck-badge">${T().sayAloud}</div>
      <p class="ex-prompt">${step.prompt}</p>
      ${step.figure ? `<div class="ex-figure">${step.figure}</div>` : ''}
      <p class="lesson-caption">${step.hint || T().selfCheckHint}</p>`;

    actions.hidden = false;
    actions.innerHTML = `<button class="btn-primary" type="button">${T().didIt}</button>`;
    actions.querySelector('button').addEventListener('click', () => {
      FX.play('correct');
      Store.recordStep(lesson.id, step.id, true, 0);
      advance();
    });
  }

  /* ------------------------------------------------- match and order --- */

  /**
   * Tap two expressions with the same value. Some cells have no partner —
   * the book's own table is like that — so the exercise ends when every
   * findable pair is found, not when every cell is used.
   */
  function renderMatch(step, body) {
    const counts = {};
    for (const [, v] of step.items) counts[v] = (counts[v] || 0) + 1;
    const target = Object.values(counts).reduce((n, c) => n + Math.floor(c / 2), 0);

    body.innerHTML = `
      <p class="ex-prompt">${step.prompt}</p>
      <div class="match-grid">${step.items.map(([expr], i) =>
        `<button class="match-cell" type="button" data-i="${i}">${expr}</button>`).join('')}</div>
      <p class="match-count"><span id="matchFound">0</span> / ${target}</p>`;

    let first = null;
    let found = 0;
    let mistakes = 0;
    askedAt = performance.now();

    body.querySelectorAll('.match-cell').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled || btn === first) return;
        FX.unlock();

        if (!first) {
          first = btn;
          btn.classList.add('sel');
          FX.play('tap');
          return;
        }

        const a = step.items[Number(first.dataset.i)][1];
        const b = step.items[Number(btn.dataset.i)][1];

        if (a === b) {
          [first, btn].forEach(el => {
            el.classList.remove('sel');
            el.classList.add('ok');
            el.disabled = true;
          });
          first = null;
          found++;
          document.getElementById('matchFound').textContent = found;
          FX.play('correct');
          if (found === target) finishInteractive(step, mistakes);
        } else {
          mistakes++;
          const pair = [first, btn];
          pair.forEach(el => el.classList.add('bad'));
          FX.play('incorrect');
          first = null;
          setTimeout(() => pair.forEach(el => el.classList.remove('bad', 'sel')), 500);
        }
      });
    });
  }

  /** Tap the numbers in ascending order. */
  function renderOrder(step, body) {
    const sorted = [...step.numbers].sort((x, y) => x - y);

    body.innerHTML = `
      <p class="ex-prompt">${step.prompt}</p>
      <div class="order-strip" id="orderStrip"></div>
      <div class="order-pool">${step.numbers.map(n =>
        `<button class="order-chip" type="button" data-n="${n}">${n}</button>`).join('')}</div>`;

    let next = 0;
    let mistakes = 0;
    askedAt = performance.now();

    body.querySelectorAll('.order-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        FX.unlock();
        const n = Number(btn.dataset.n);

        if (n === sorted[next]) {
          btn.classList.add('ok');
          btn.disabled = true;
          const chip = document.createElement('span');
          chip.className = 'order-placed';
          chip.textContent = n;
          document.getElementById('orderStrip').appendChild(chip);
          next++;
          FX.play('correct');
          if (next === sorted.length) finishInteractive(step, mistakes);
        } else {
          mistakes++;
          btn.classList.add('bad');
          FX.play('incorrect');
          setTimeout(() => btn.classList.remove('bad'), 450);
        }
      });
    });
  }

  /** Shared completion path for match and order, which have no single answer. */
  function finishInteractive(step, mistakes) {
    const ms = Math.round(performance.now() - askedAt);
    Store.recordStep(lesson.id, step.id, mistakes === 0, ms);
    tally.graded++;
    tally.correct++;              // she finished it; misses are counted separately
    tally.wrong += mistakes;
    if (mistakes === 0) FX.confetti({ count: 45, originY: 0.4 });
    setTimeout(advance, 900);
  }

  /* ----------------------------------------------------------- grading */

  function grade(step, right, given, correctText) {
    const ms = Math.round(performance.now() - askedAt);
    Store.recordStep(lesson.id, step.id, right, ms);

    // A retried step replaces its earlier attempt rather than adding to the total.
    if (!retried.has(step.id)) tally.graded++;

    if (right) {
      tally.correct++;
      if (step.timed) tally.times.push(ms);
    } else {
      tally.wrong++;
    }

    const slot = $('lessonSlot');
    if (slot) {
      Keypad.renderSlot(slot, String(given));
      slot.className = 'answer-slot ' + (right ? 'ok' : 'bad');
    }

    const fb = $('lessonFeedback');
    fb.hidden = false;
    fb.className = 'feedback ' + (right ? 'ok' : 'bad');
    fb.innerHTML = right
      ? T().correct
      : `${T().theAnswerIs(correctText)}${step.why ? `<span class="why">${step.why}</span>` : ''}`;

    FX.play(right ? 'correct' : 'incorrect');

    // One second chance, at the end of the lesson rather than immediately.
    if (!right && !retried.has(step.id)) {
      retried.add(step.id);
      queue.push(step);
    }

    setTimeout(advance, right ? CORRECT_PAUSE_MS : WRONG_PAUSE_MS);
  }

  function advance() {
    position++;
    if (position >= queue.length) return finish();
    totalPlanned = Math.max(totalPlanned, queue.length);
    render();
  }

  function finish() {
    const avgMs = tally.times.length
      ? Math.round(tally.times.reduce((a, b) => a + b, 0) / tally.times.length)
      : 0;
    const streak = Store.touchStreak();
    const firstTime = Store.completeLesson(lesson.id);
    Store.recordLessonSession({
      lessonId: lesson.id, steps: tally.graded,
      correct: tally.correct, wrong: tally.wrong, avgMs
    });

    onFinish({
      lesson,
      exercises: lesson.exercises.length,
      graded: tally.graded,
      correct: tally.correct,
      wrong: tally.wrong,
      avgMs, streak, firstTime
    });
  }

  /* --------------------------------------------------------------- api */

  function start(id, done) {
    lesson = Lessons.byId(id);
    queue = Lessons.compile(lesson);
    totalPlanned = queue.length;
    position = 0;
    retried = new Set();
    tally = { correct: 0, wrong: 0, graded: 0, times: [] };
    onFinish = done;
    render();
  }

  /** Progress is already saved per step; nothing extra to flush on quit. */
  function abandon() {
    if (position === 0) return;
    Store.touchStreak();
    position = 0;
  }

  return { start, abandon, render };

})();
