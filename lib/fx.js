/* ==========================================================================
   fx.js — confetti + sound
   Carried over from math_review_1st_grade.html. Fully offline: canvas confetti
   and WebAudio oscillators, no libraries, no audio files.
   ========================================================================== */

const FX = (() => {

  /* ---------------------------------------------------------------- confetti */

  const COLORS = ['#f43f5e', '#8b5cf6', '#06b6d4', '#10b981', '#fbbf24', '#ec4899'];

  function confetti({ count = 90, originY = 0.5 } = {}) {
    const canvas = document.getElementById('fxCanvas');
    if (!canvas) return;

    // Match the backing store to the device pixel ratio, or it looks soft on retina.
    const dpr = window.devicePixelRatio || 1;
    canvas.style.display = 'block';
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: w / 2,
        y: h * originY,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    (function animate() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;                        // gravity
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      if (++frame < 120) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, w, h);
        canvas.style.display = 'none';
      }
    })();
  }

  /* ------------------------------------------------------------------ sound */

  let audioCtx = null;
  let enabled = true;

  function initAudio() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      // iOS suspends the context until a real user gesture resumes it.
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) { /* audio is optional */ }
  }

  function tone(freq, startAt, duration, type = 'sine', volume = 0.2) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startAt);
    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
    osc.start(startAt);
    osc.stop(startAt + duration);
  }

  function play(kind) {
    if (!enabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;

      if (kind === 'correct') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);

      } else if (kind === 'incorrect') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(164.81, now);
        osc.frequency.linearRampToValueAtTime(130.81, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);

      } else if (kind === 'tap') {
        tone(880, now, 0.09, 'sine', 0.09);

      } else if (kind === 'fanfare') {
        [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
          tone(f, now + i * 0.1, 0.3);
        });
      }
    } catch (e) { /* audio is optional */ }
  }

  return {
    confetti,
    play,
    unlock: initAudio,
    get enabled() { return enabled; },
    set enabled(v) { enabled = v; }
  };

})();
