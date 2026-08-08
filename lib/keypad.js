/* ==========================================================================
   keypad.js — the number pad, shared by the guided attempts in Learn and by
   Practice. Typed answers (not multiple choice) because the goal is recall,
   and multiple choice trains recognition instead.

   No answer here exceeds two digits (9•9 = 81), so entering a second digit
   auto-submits. That is the maximum length, not the answer's length, so it
   leaks nothing about the current question.
   ========================================================================== */

const Keypad = (() => {

  const MAX_DIGITS = 2;

  /**
   * Renders a keypad into `host` and returns a small controller.
   * onSubmit(value:number) fires on ✓ or on the second digit.
   */
  function mount(host, { onSubmit, onChange }) {
    let value = '';
    let locked = false;

    host.innerHTML = '';
    const keys = ['1','2','3','4','5','6','7','8','9','del','0','ok'];

    for (const k of keys) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'key' + (k === 'ok' ? ' key-ok' : k === 'del' ? ' key-del' : '');
      btn.textContent = k === 'del' ? '⌫' : k === 'ok' ? '✓' : k;
      btn.addEventListener('click', () => press(k));
      host.appendChild(btn);
    }

    function press(k) {
      if (locked) return;
      FX.unlock();

      if (k === 'del') {
        value = value.slice(0, -1);
        FX.play('tap');
        emit();
        return;
      }

      if (k === 'ok') {
        if (value === '') return;
        submit();
        return;
      }

      if (value.length >= MAX_DIGITS) return;
      value += k;
      FX.play('tap');
      emit();

      if (value.length === MAX_DIGITS) submit();
    }

    function submit() {
      const v = Number(value);
      locked = true;
      onSubmit(v);
    }

    function emit() {
      if (onChange) onChange(value);
    }

    return {
      reset() { value = ''; locked = false; emit(); },
      lock() { locked = true; },
      unlock() { locked = false; },
      get value() { return value; }
    };
  }

  /** Renders the entered digits into an answer slot, with a blinking caret. */
  function renderSlot(slot, value) {
    slot.textContent = value === '' ? '' : value;
    slot.classList.toggle('empty', value === '');
  }

  return { mount, renderSlot, MAX_DIGITS };

})();
