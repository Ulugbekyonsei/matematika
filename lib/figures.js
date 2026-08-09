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
        <polygon points="374,45 404,45 424,107 374,107" fill="#a9dcf5" stroke="#2f8fc4"/>
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

  /* ---- Lesson 8: angles ------------------------------------------------ */

  const RAD = (d) => (d * Math.PI) / 180;

  /**
   * One angle: two rays from a vertex with a filled wedge and its arc.
   * `a1` and `a2` are directions in degrees, counterclockwise from east, and
   * a1 < a2 so the wedge is always the interior of the angle. `ref` draws the
   * book's dashed comparison ray — where a right angle would fall.
   */
  function angleGlyph(a1, a2, {
    vb = '0 0 200 170', vx = 30, vy = 140, len = 130, r = 40,
    fill = '#fde047', ray = '#22a3d8', ref = null
  } = {}) {
    const P = (a, L) => [
      +(vx + L * Math.cos(RAD(a))).toFixed(1),
      +(vy - L * Math.sin(RAD(a))).toFixed(1)
    ];
    const [x1, y1] = P(a1, len), [x2, y2] = P(a2, len);
    const [ax, ay] = P(a1, r),   [bx, by] = P(a2, r);
    const large = a2 - a1 > 180 ? 1 : 0;
    const [rx, ry] = ref === null ? [0, 0] : P(ref, len);

    return wrap(vb, `
      <path d="M ${vx} ${vy} L ${ax} ${ay} A ${r} ${r} 0 ${large} 0 ${bx} ${by} Z"
            fill="${fill}"/>
      <path d="M ${ax} ${ay} A ${r} ${r} 0 ${large} 0 ${bx} ${by}"
            fill="none" stroke="#1f2937" stroke-width="3"/>
      ${ref === null ? '' : `<line x1="${vx}" y1="${vy}" x2="${rx}" y2="${ry}"
            stroke="#1f2937" stroke-width="3" stroke-dasharray="8 7"/>`}
      <g stroke="${ray}" stroke-width="7" stroke-linecap="round">
        <line x1="${vx}" y1="${vy}" x2="${x1}" y2="${y1}"/>
        <line x1="${vx}" y1="${vy}" x2="${x2}" y2="${y2}"/>
      </g>
    `);
  }

  /* Page 11: right angles, then angles larger and smaller than one. The
     dashed ray in the second pair is the book's right-angle reference. */
  function rightAngleIntro(capRight, capOther) {
    const ORANGE = '#f59e0b';
    const rightA = angleGlyph(0, 90,
      { vb: '0 0 150 150', vx: 30, vy: 120, len: 100, fill: ORANGE });
    const rightB = angleGlyph(-90, 0,
      { vb: '0 0 150 150', vx: 30, vy: 30, len: 100, fill: ORANGE });
    const bigger = angleGlyph(0, 130,
      { vb: '0 0 190 150', vx: 80, vy: 120, len: 95, ref: 90 });
    const smaller = angleGlyph(215, 270,
      { vb: '0 0 190 150', vx: 150, vy: 35, len: 95, ref: 180 });

    const group = (cap, figs) => `
      <div class="angle-group">
        <div class="angle-cap">${cap}</div>
        <div class="fig-row">${figs.map(f => `<div class="angle-cell">${f}</div>`).join('')}</div>
      </div>`;

    return `<div class="angle-groups">
      ${group(capRight, [rightA, rightB])}
      ${group(capOther, [bigger, smaller])}
    </div>`;
  }

  /* The set square, drawn as the book draws it — no extra markings. */
  function goniya() {
    return wrap('0 0 150 140', `
      <path d="M20 16 L20 124 L128 124 Z" fill="#3f9e5a" stroke="#d9463e"
            stroke-width="4" stroke-linejoin="round"/>
      <path d="M40 52 L40 104 L92 104 Z" fill="#ffffff" stroke="#d9463e"
            stroke-width="3" stroke-linejoin="round"/>
    `);
  }

  /* Page 12, ex. 4: the five angles to sort with the set square.
     Measured off the page: 45, 113, 90, 127 and 55 degrees. */
  const ANGLE_CARDS = {
    a1: [0,   45,  { vx: 30,  vy: 140, len: 140 }],
    a2: [180, 293, { vx: 150, vy: 30,  len: 120 }],
    a3: [0,   90,  { vx: 35,  vy: 140, len: 130 }],
    a4: [-8,  119, { vb: '0 0 210 170', vx: 105, vy: 135, len: 100 }],
    a5: [65,  115, { vb: '0 0 190 170', vx: 95,  vy: 150, len: 130 }]
  };

  function angleCard(kind) {
    const [a1, a2, opts] = ANGLE_CARDS[kind];
    return angleGlyph(a1, a2, { fill: '#fca5a5', ray: '#e0473c', ...opts });
  }

  /* Page 12, ex. 1: count the right angles in each polygon. */
  const RA_POLYGONS = {
    square:  ['0 0 150 150', '<rect x="30" y="25" width="95" height="95"/>', '#f9c5db', '#e0479e'],
    house:   ['0 0 150 150', '<polygon points="25,130 25,60 75,20 125,60 125,130"/>', '#bfe9f8', '#22a3d8'],
    rtrap:   ['0 0 170 150', '<polygon points="22,30 105,30 148,125 22,125"/>', '#fbdfae', '#ea8c1e'],
    arrow:   ['0 0 175 150', '<polygon points="22,35 110,35 155,80 110,125 22,125"/>', '#c9c7e8', '#4c4a9e']
  };

  function polygonRA(kind) {
    const [vb, body, fill, stroke] = RA_POLYGONS[kind];
    return wrap(vb, `<g fill="${fill}" stroke="${stroke}" stroke-width="4"
                        stroke-linejoin="round">${body}</g>`);
  }

  /* Page 13, ex. 5: two right angles drawn along the lines of squared paper. */
  function gridRightAngles() {
    const S = 26, W = 14, H = 8;
    let grid = '';
    for (let i = 0; i <= W; i++) grid += `<line x1="${i * S}" y1="0" x2="${i * S}" y2="${H * S}"/>`;
    for (let j = 0; j <= H; j++) grid += `<line x1="0" y1="${j * S}" x2="${W * S}" y2="${j * S}"/>`;
    return wrap(`0 0 ${W * S} ${H * S}`, `
      <g stroke="#a8d8ef" stroke-width="1.5">${grid}</g>
      <g stroke="#e0479e" stroke-width="4" fill="none" stroke-linecap="square">
        <polyline points="${2 * S},${1 * S} ${2 * S},${6 * S} ${5 * S},${6 * S}"/>
        <polyline points="${9 * S},${1 * S} ${13 * S},${1 * S} ${13 * S},${6 * S}"/>
      </g>
    `);
  }

  /* ---- Lesson 9: perimeter --------------------------------------------- */

  /* Page 13, ex. 1: four quadrilaterals whose angles are all right angles.
     The third is drawn tilted — a right angle does not care how it leans. */
  function fourRectangles() {
    return wrap('0 0 440 130', `
      <g stroke-width="3" stroke-linejoin="round">
        <rect x="14" y="52" width="98" height="28" fill="#f9c5db" stroke="#e0479e"/>
        <rect x="142" y="26" width="44" height="80" fill="#bfe9f8" stroke="#22a3d8"/>
        <g transform="rotate(-35 262 66)">
          <rect x="222" y="46" width="80" height="40" fill="#f3b25c" stroke="#c98a1e"/>
        </g>
        <rect x="352" y="30" width="64" height="76" fill="#8fd6a9" stroke="#2f9e5e"/>
      </g>
    `);
  }

  /* A quadrilateral with its side lengths written along the sides.
     Points run top-left, top-right, bottom-right, bottom-left. */
  const LABELED_SHAPES = {
    quad: { vb: '0 0 300 150', pts: [[65, 50], [245, 50], [215, 108], [80, 108]],
            fill: '#f9a8d4', stroke: '#e0479e' },
    trap: { vb: '0 0 260 150', pts: [[82, 40], [178, 40], [190, 111], [70, 111]],
            fill: '#8fd6a9', stroke: '#2f9e5e' },
    rect: { vb: '0 0 260 150', pts: [[70, 55], [190, 55], [190, 103], [70, 103]],
            fill: '#a9dcf5', stroke: '#2f8fc4' }
  };

  function sideLabeledShape(kind, top, left, right, bottom) {
    const s = LABELED_SHAPES[kind];
    const [tl, tr, br, bl] = s.pts;
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const [mt, mr, mb, ml] = [mid(tl, tr), mid(tr, br), mid(br, bl), mid(bl, tl)];
    return wrap(s.vb, `
      <polygon points="${s.pts.map(p => p.join(',')).join(' ')}"
               fill="${s.fill}" stroke="${s.stroke}" stroke-width="4"
               stroke-linejoin="round"/>
      <g font-size="15" font-weight="600" fill="#1e293b" font-family="inherit">
        <text x="${mt[0]}" y="${mt[1] - 10}" text-anchor="middle">${top}</text>
        <text x="${mr[0] + 10}" y="${mr[1] + 5}" text-anchor="start">${right}</text>
        <text x="${mb[0]}" y="${mb[1] + 22}" text-anchor="middle">${bottom}</text>
        <text x="${ml[0] - 10}" y="${ml[1] + 5}" text-anchor="end">${left}</text>
      </g>
    `);
  }

  /* ---- Lesson 8, ex. 2: two crates, each with a note under its weight --- */
  function cratesNoted(emoji, labelA, noteA, labelB, noteB) {
    const cell = (label, note) => `
      <div class="crate">
        <div class="crate-box">${emoji.repeat(6)}</div>
        <div class="crate-label">${label}</div>
        <div class="crate-note">${note}</div>
      </div>`;
    return `<div class="crate-row">${cell(labelA, noteA)}${cell(labelB, noteB)}</div>`;
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
    shape, shapesFour, threeColumnTable, twoCrates, twoMethods, twoAmountsTotal,
    rightAngleIntro, goniya, angleCard, polygonRA, gridRightAngles, cratesNoted,
    fourRectangles, sideLabeledShape
  };

})();
