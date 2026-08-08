/* ==========================================================================
   learn.js — "O‘rganish", the one-off lesson for a table.

   Follows the textbook's own order: equal addends first, then the • notation,
   then the table built up a row at a time, then the names of the parts, then
   the table to memorise, then guided attempts.
   Generic over the table number, so ×3–×9 are data, not new code.
   ========================================================================== */

const Learn = (() => {

  const T = () => STRINGS[Store.lang];

  const ITEM = { 2: '🍎', 3: '🌸', 4: '🚗', 5: '⭐', 6: '🐟', 7: '🍇', 8: '🐝', 9: '🎈' };
  const TOTAL_STEPS = 6;
  const GUIDED_MULTIPLIERS = [2, 3, 5];

  let table = 2;
  let step = 1;
  let rowsShown = 2;          // step 3 accumulates rows
  let guidedIndex = 0;
  let keypad = null;
  let onFinish = () => {};

  /* --------------------------------------------------------- visuals */

  function emojiGroup(n, emoji) {
    return `<span class="egroup">${emoji.repeat(n)}</span>`;
  }

  function dotArray(rows, perRow) {
    let html = '<div class="dot-array">';
    for (let r = 0; r < rows; r++) {
      html += '<div class="dot-row">';
      for (let c = 0; c < perRow; c++) html += '<span class="dot"></span>';
      html += '</div>';
    }
    return html + '</div>';
  }

  /* ----------------------------------------------------------- steps */

  function stepEqualAddends() {
    const n = table;
    const emoji = ITEM[n];
    return `
      <h3 class="lesson-title">${T().l1Title(n)}</h3>
      <div class="visual-row">
        ${emojiGroup(n, emoji)}
        <span class="op">+</span>
        ${emojiGroup(n, emoji)}
      </div>
      <div class="equation big">${n} + ${n} = <strong>${n * 2}</strong></div>
      <p class="lesson-caption">${T().l1Caption(n)}</p>
    `;
  }

  function stepNotation() {
    const n = table;
    return `
      <h3 class="lesson-title">${T().l2Title}</h3>
      <div class="collapse">
        <div class="equation fade-out-soft">${n} + ${n} = ${n * 2}</div>
        <div class="arrow-down">↓</div>
        <div class="equation big pop-in">${n} <span class="dotop">•</span> 2 = <strong>${n * 2}</strong></div>
      </div>
      <p class="lesson-read">${T().l2Read(n)}</p>
      <p class="lesson-caption">${T().l2Caption(n)}</p>
    `;
  }

  function stepBuildTable() {
    const n = table;
    let rows = '';
    for (let m = 2; m <= rowsShown; m++) {
      rows += `
        <div class="build-row${m === rowsShown ? ' pop-in' : ''}">
          ${dotArray(m, n)}
          <div class="equation">${n} <span class="dotop">•</span> ${m} = <strong>${n * m}</strong></div>
        </div>`;
    }
    return `
      <h3 class="lesson-title">${T().l3Title}</h3>
      <div class="build-list">${rows}</div>
      <p class="lesson-caption">${T().l3Caption(n)}</p>
    `;
  }

  function stepVocabulary() {
    const n = table;
    return `
      <h3 class="lesson-title">${T().l4Title}</h3>
      <div class="vocab">
        <div class="vocab-part">
          <span class="vocab-value">${n}</span>
          <span class="vocab-label">${T().l4Factor}</span>
        </div>
        <span class="vocab-op">•</span>
        <div class="vocab-part">
          <span class="vocab-value">3</span>
          <span class="vocab-label">${T().l4Factor}</span>
        </div>
        <span class="vocab-op">=</span>
        <div class="vocab-part">
          <span class="vocab-value accent">${n * 3}</span>
          <span class="vocab-label">${T().l4Product}</span>
        </div>
      </div>
    `;
  }

  function stepMemorise() {
    const n = table;
    let cells = '';
    for (const m of Store.MULTIPLIERS) {
      cells += `<div class="fact-cell">${n} <span class="dotop">•</span> ${m} = <strong>${n * m}</strong></div>`;
    }
    return `
      <h3 class="lesson-title">${T().l5Title}</h3>
      <div class="fact-grid">${cells}</div>
      <p class="lesson-caption">${T().l5Caption(n)}</p>
    `;
  }

  function stepGuided() {
    const n = table;
    const m = GUIDED_MULTIPLIERS[guidedIndex];
    const scaffold = Array(m).fill(n).join(' + ');
    return `
      <h3 class="lesson-title">${T().l6Title}</h3>
      <div class="guided-progress">${guidedIndex + 1} / ${GUIDED_MULTIPLIERS.length}</div>
      <div class="equation huge">${n} <span class="dotop">•</span> ${m} = <span class="answer-slot empty" id="learnSlot"></span></div>
      <p class="lesson-caption">${T().l6Scaffold(scaffold)}</p>
      <div class="feedback" id="learnFeedback" hidden></div>
      <div class="keypad" id="learnKeypad"></div>
    `;
  }

  /* ---------------------------------------------------------- render */

  function render() {
    const body = document.getElementById('learnBody');
    const next = document.getElementById('learnNext');

    const renderers = {
      1: stepEqualAddends, 2: stepNotation, 3: stepBuildTable,
      4: stepVocabulary, 5: stepMemorise, 6: stepGuided
    };
    body.innerHTML = renderers[step]();

    document.getElementById('learnStep').textContent = T().learnStepOf(step, TOTAL_STEPS);
    document.getElementById('learnProgressFill').style.width = `${(step / TOTAL_STEPS) * 100}%`;
    document.getElementById('learnBackLabel').textContent = T().back;

    if (step === 3) {
      // Keep the row that was just added in view inside the scrollable list.
      const newest = body.querySelector('.build-row:last-child');
      if (newest && rowsShown > 2) newest.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      next.hidden = false;
      next.textContent = rowsShown < 9 ? T().l3AddRow : T().next;
    } else if (step === 6) {
      next.hidden = true;
      mountGuidedKeypad();
    } else if (step === TOTAL_STEPS) {
      next.hidden = false;
      next.textContent = T().finishLearn;
    } else {
      next.hidden = false;
      next.textContent = T().next;
    }
  }

  function mountGuidedKeypad() {
    const slot = document.getElementById('learnSlot');
    const feedback = document.getElementById('learnFeedback');
    const n = table;
    const m = GUIDED_MULTIPLIERS[guidedIndex];

    keypad = Keypad.mount(document.getElementById('learnKeypad'), {
      onChange: (v) => Keypad.renderSlot(slot, v),
      onSubmit: (v) => {
        const right = v === n * m;
        feedback.hidden = false;
        feedback.className = 'feedback ' + (right ? 'ok' : 'bad');
        feedback.textContent = right
          ? T().correct
          : T().wrongIs(`${n} • ${m}`, n * m);
        FX.play(right ? 'correct' : 'incorrect');
        if (right) FX.confetti({ count: 40, originY: 0.4 });

        setTimeout(() => {
          if (right) {
            guidedIndex++;
            if (guidedIndex >= GUIDED_MULTIPLIERS.length) {
              guidedIndex = 0;
              Store.markLearned(table);
              onFinish();
              return;
            }
          }
          render();
        }, right ? 900 : 1800);
      }
    });
  }

  /* ------------------------------------------------------------- api */

  function advance() {
    if (step === 3 && rowsShown < 9) {
      rowsShown++;
      render();
      FX.play('tap');
      return;
    }
    if (step === TOTAL_STEPS) {
      Store.markLearned(table);
      onFinish();
      return;
    }
    step++;
    FX.play('tap');
    render();
  }

  function start(n, done) {
    table = n;
    step = 1;
    rowsShown = 2;
    guidedIndex = 0;
    onFinish = done;
    render();
  }

  return { start, advance, render, TOTAL_STEPS };

})();
