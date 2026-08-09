/* ==========================================================================
   figures.js — the textbook's diagrams, redrawn as inline SVG.

   The PDF's own artwork is 4,457 fragments at ~100 ppi, useless as assets and
   with Uzbek text baked in. Redrawing keeps them sharp at any size and lets
   labels come from i18n.
   ========================================================================== */

const Figures = (() => {

  const wrap = (viewBox, body, extra = '') =>
    `<svg class="fig" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg"
          role="img" ${extra}>${body}</svg>`;

  /* ---- Lesson 1, ex. 5: name all four shapes with one word ------------- */
  // Square, rectangle, triangle, trapezium — i.e. ko‘pburchaklar.
  function polygons4() {
    return wrap('0 0 420 130', `
      <g stroke-width="3" stroke-linejoin="round">
        <rect x="18"  y="35" width="72" height="72" fill="#f9c5db" stroke="#e0479e"/>
        <rect x="118" y="45" width="102" height="62" fill="#f7e0b8" stroke="#c98a1e"/>
        <polygon points="252,107 300,38 348,107" fill="#8fd6a9" stroke="#2f9e5e"/>
        <polygon points="374,107 396,45 414,45 418,107" fill="#a9dcf5" stroke="#2f8fc4"/>
      </g>
      <g font-size="13" fill="#64748b" font-family="inherit">
        <text x="18"  y="26">1)</text>
        <text x="118" y="26">2)</text>
        <text x="252" y="26">3)</text>
        <text x="374" y="26">4)</text>
      </g>
    `);
  }

  /* ---- Lesson 1, ex. 2: 6 items, the other group has 4 more ------------ */
  function sixAndFourMore(labelLeft, labelRight) {
    let items = '';
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        items += `<rect x="${18 + c * 34}" y="${22 + r * 30}" width="28" height="22"
                        rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>`;
      }
    }
    return wrap('0 0 340 120', `
      ${items}
      <g transform="translate(196,20)">
        <rect x="0" y="4" width="96" height="58" rx="10" fill="#e2e8f0" stroke="#94a3b8"
              stroke-width="2" stroke-dasharray="6 4"/>
        <text x="48" y="44" text-anchor="middle" font-size="34" font-weight="700"
              fill="#6366f1" font-family="inherit">?</text>
      </g>
      <g font-size="15" fill="#1e293b" font-family="inherit">
        <text x="60"  y="104" text-anchor="middle">${labelLeft}</text>
        <text x="244" y="104" text-anchor="middle">${labelRight}</text>
      </g>
    `);
  }

  /* ---- Lesson 2, ex. 4: how many triangles in each figure? ------------- */

  // Square split by one diagonal -> 2
  function triSquare() {
    return wrap('0 0 130 130', `
      <g stroke="#2f9e5e" stroke-width="3" fill="#8fd6a9" stroke-linejoin="round">
        <rect x="14" y="14" width="102" height="102"/>
        <line x1="14" y1="116" x2="116" y2="14"/>
      </g>
    `);
  }

  // Apex A, base B–C, midpoint M on the base; M joined to A, to P on AB and to
  // Q on AC. 4 small + BAM + ACM + ABC = 7
  function triPink() {
    return wrap('0 0 210 130', `
      <g stroke="#e0479e" stroke-width="3" fill="#f9a8d4" stroke-linejoin="round">
        <polygon points="16,116 105,16 194,116"/>
        <line x1="105" y1="116" x2="105" y2="16"/>
        <line x1="105" y1="116" x2="60"  y2="66"/>
        <line x1="105" y1="116" x2="150" y2="57"/>
      </g>
    `);
  }

  // Apex A near the right, base B–C, N on the base, P on AB.
  // 3 small + BAN + ABC = 5
  function triYellow() {
    return wrap('0 0 210 130', `
      <g stroke="#ea8c1e" stroke-width="3" fill="#fde68a" stroke-linejoin="round">
        <polygon points="14,116 168,16 196,116"/>
        <line x1="168" y1="16" x2="163" y2="116"/>
        <line x1="70"  y1="80" x2="163" y2="116"/>
      </g>
    `);
  }

  /* ---- Lesson 2, ex. 5: had 10 and 7, then more were bought ------------ */
  function bagsBoughtMore(hadLabel, boughtLabel, a, b, totalLabel) {
    const bag = (x, y, s, n) => {
      let balls = '';
      const cols = 3;
      for (let i = 0; i < n; i++) {
        const c = i % cols, r = Math.floor(i / cols);
        balls += `<circle cx="${x + 12 + c * 15 * s}" cy="${y + 16 + r * 15 * s}"
                          r="${6 * s}" fill="${i % 2 ? '#ef4444' : '#3b82f6'}"/>`;
      }
      const w = 16 + cols * 15 * s, h = 20 + Math.ceil(n / cols) * 15 * s;
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"
                    fill="none" stroke="#64748b" stroke-width="2"/>${balls}`;
    };

    return wrap('0 0 400 175', `
      <g font-size="14" fill="#1e293b" font-family="inherit">
        <text x="105" y="14" text-anchor="middle">${hadLabel}</text>
        <text x="310" y="14" text-anchor="middle">${boughtLabel}</text>
      </g>
      ${bag(30, 24, 1, 10)}
      <text x="140" y="72" font-size="15" fill="#64748b" font-family="inherit">va</text>
      ${bag(168, 24, 0.9, 7)}
      <line x1="252" y1="20" x2="252" y2="120" stroke="#38bdf8" stroke-width="3"/>
      ${bag(280, 24, 0.85, 6)}
      <path d="M24 138 Q200 158 386 138" fill="none" stroke="#334155" stroke-width="2"/>
      <text x="205" y="170" text-anchor="middle" font-size="16" font-weight="600"
            fill="#6366f1" font-family="inherit">${totalLabel}</text>
    `);
  }

  /* ---- Lesson 3, ex. 4: name each shape, count its sides --------------- */
  // Shape 1 is a square drawn rotated 45° (its diagonals are equal), so the
  // book's "name it" is left as an oral self-check; only the side count is graded.
  const SHAPES = {
    rhombus:  { vb: '0 0 120 120', body: '<polygon points="60,10 110,60 60,110 10,60" fill="#f9c5db" stroke="#e0479e"/>' },
    rtri:     { vb: '0 0 120 120', body: '<polygon points="20,12 20,108 108,108" fill="#bfe8cd" stroke="#2f9e5e"/>' },
    rect:     { vb: '0 0 140 100', body: '<rect x="10" y="20" width="120" height="62" fill="#b3b0dd" stroke="#3b3a86"/>' },
    hexagon:  { vb: '0 0 130 120', body: '<polygon points="40,16 90,16 116,60 90,104 40,104 14,60" fill="#8fd8f5" stroke="#22a3d8"/>' }
  };

  function shape(kind) {
    const s = SHAPES[kind];
    return wrap(s.vb, `<g stroke-width="3" stroke-linejoin="round">${s.body}</g>`);
  }

  function shapesFour() {
    let out = '<div class="fig-row">';
    ['rhombus', 'rtri', 'rect', 'hexagon'].forEach((k, i) => {
      out += `<div class="fig-cell"><span class="fig-no">${i + 1})</span>${shape(k)}</div>`;
    });
    return out + '</div>';
  }

  /* ---- Lesson 3, ex. 5: Bor edi / Sotildi / Qoldi ---------------------- */
  // A table, so plain HTML rather than SVG — it is text, not a diagram.
  function threeColumnTable(heads, cells) {
    const th = heads.map(h => `<th>${h}</th>`).join('');
    const td = cells.map(c => `<td>${c}</td>`).join('');
    return `<table class="fig-table"><thead><tr>${th}</tr></thead>
            <tbody><tr>${td}</tr></tbody></table>`;
  }

  /* ---- Lesson 5, ex. 2: one crate, and one 2 kg lighter ---------------- */
  function twoCrates(emojiA, labelA, emojiB, labelB) {
    const crate = (emoji, label) => `
      <div class="crate">
        <div class="crate-box">${emoji.repeat(6)}</div>
        <div class="crate-label">${label}</div>
      </div>`;
    return `<div class="crate-row">${crate(emojiA, labelA)}${crate(emojiB, labelB)}</div>`;
  }

  /* ---- Lesson 6, ex. 5: two amounts, a brace joins them to a total ----- */
  function twoAmountsTotal(emoji, labelA, labelB, totalLabel) {
    const box = (label) => `
      <div class="crate">
        <div class="crate-box">${emoji.repeat(6)}</div>
        <div class="crate-label">${label}</div>
      </div>`;
    return `<div class="total-wrap">
      <div class="crate-row">${box(labelA)}${box(labelB)}</div>
      <svg class="total-brace" viewBox="0 0 300 26" preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 4 Q150 36 292 4" fill="none" stroke="#334155" stroke-width="2.5"/>
      </svg>
      <div class="total-label">${totalLabel}</div>
    </div>`;
  }

  /* ---- Lesson 5, ex. 1: two methods side by side ----------------------- */
  function twoMethods(a, b) {
    const col = (m) => `<div class="method">
        <div class="method-head">${m.head}</div>
        ${m.lines.map(l => `<div class="method-line">${l}</div>`).join('')}
      </div>`;
    return `<div class="method-row">${col(a)}${col(b)}</div>`;
  }

  return {
    polygons4, sixAndFourMore, triSquare, triPink, triYellow, bagsBoughtMore,
    shape, shapesFour, threeColumnTable, twoCrates, twoMethods, twoAmountsTotal
  };

})();
