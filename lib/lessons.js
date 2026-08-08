/* ==========================================================================
   lessons.js — the textbook, as data.

   The book has no numbered lessons; its unit of work is a block of numbered
   exercises that restarts at 1. There are 159 such blocks across pages 3–200.
   One block = one lesson here, and a block straddles page boundaries.

   Each lesson compiles to a flat list of steps, one per screen.
   ========================================================================== */

const Lessons = (() => {

  const L = (uz, en) => ({ uz, en });
  const pick = (s) => (typeof s === 'string' ? s : s[Store.lang]);

  /* ---------------------------------------------------------- sections */

  const SECTIONS = {
    s1: L('1-sinfda o‘tilgan materiallarni takrorlash va umumlashtirish',
          'Revising and consolidating Grade 1')
  };

  /* ----------------------------------------------------------- lessons */

  const LESSONS = [
    {
      id: 'L1',
      no: 1,
      section: 's1',
      pages: '3–4',
      topic: L('Yig‘indi va ayirmani topishga doir sodda misollar',
               'Simple sums and differences'),
      exercises: [
        {
          n: 1,
          type: 'neighbours',
          parts: [
            { mode: 'before', numbers: [10, 12, 14, 16, 18, 20] },
            { mode: 'after',  numbers: [11, 13, 15, 17, 19] }
          ]
        },
        {
          n: 2,
          type: 'self-check',
          prompt: L('Rasm asosida masala tuzing va uni yeching',
                    'Make up a problem from the picture and solve it'),
          figure: () => Figures.sixAndFourMore(
            pick(L('6 ta', '6 of them')),
            pick(L('?, 4 ta ortiq', '?, 4 more'))),
          answer: 10
        },
        {
          n: 3,
          type: 'word-problem',
          text: L('Ikkinchi sinfda 32 nafar o‘quvchi bor. Ularning 12 nafari qiz bola, ' +
                  'qolganlari esa o‘g‘il bola. Sinfda necha nafar o‘g‘il bola bor?',
                  'There are 32 pupils in the second class. 12 of them are girls and ' +
                  'the rest are boys. How many boys are in the class?'),
          answer: 20
        },
        {
          n: 4,
          type: 'compute',
          items: [
            ['20 + 20', 40], ['80 − 40', 40], ['50 + 10', 60], ['60 + 40', 100],
            ['40 − 10', 30], ['30 + 20', 50], ['70 − 20', 50], ['90 − 50', 40]
          ]
        },
        {
          n: 5,
          type: 'choice',
          prompt: L('Hamma shakllar bir so‘z bilan qanday nomlanadi?',
                    'What is the one word for all of these shapes?'),
          figure: () => Figures.polygons4(),
          options: [
            L('Ko‘pburchaklar', 'Polygons'),
            L('To‘rtburchaklar', 'Quadrilaterals'),
            L('Uchburchaklar', 'Triangles'),
            L('Doiralar', 'Circles')
          ],
          answer: 0
        },
        {
          n: 6,
          type: 'word-problem',
          text: L('Ertalab do‘konga 29 l sut keltirildi. Tushgacha 20 l sut sotildi. ' +
                  'Do‘konda necha litr sut qoldi?',
                  'In the morning 29 L of milk was delivered to the shop. By midday ' +
                  '20 L had been sold. How many litres are left in the shop?'),
          answer: 9
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['37 − 7', 30], ['40 + 9', 49], ['58 − 50', 8],  ['94 − 90', 4],
            ['20 + 8', 28], ['16 − 6', 10], ['30 + 10', 40], ['62 − 40', 22]
          ]
        }
      ]
    },

    {
      id: 'L2',
      no: 2,
      section: 's1',
      pages: '4–5',
      topic: L('Yig‘indi va ayirmani topishga doir sodda misollar',
               'Simple sums and differences'),
      exercises: [
        {
          n: 1,
          type: 'namuna',
          blocks: [
            {
              head: '67 + 3 = ?',
              split: ['60', '7 + 3'],
              work: '60 + (7 + 3) = 60 + 10 = 70'
            },
            {
              head: '38 − 30 = ?',
              split: ['30', '8'],
              work: '(30 − 30) + 8 = 0 + 8 = 8'
            }
          ]
        },
        {
          n: 2,
          type: 'word-problem',
          text: L('Hayvonot bog‘iga birinchi sinfdan 27 nafar, ikkinchi sinfdan esa undan ' +
                  '3 nafar ortiq o‘quvchi bordi. Hayvonot bog‘iga ikkinchi sinfdan necha ' +
                  'nafar o‘quvchi borgan?',
                  '27 pupils from the first class went to the zoo, and 3 more than that ' +
                  'from the second class. How many pupils from the second class went?'),
          answer: 30
        },
        {
          n: 3,
          type: 'fill-blank',
          prompt: L('Namuna bo‘yicha bajaring', 'Do it like the example'),
          namuna: '65 = 60 + 5',
          items: [
            ['57 = 50 +', 7], ['32 = 30 +', 2], ['78 = 70 +', 8],
            ['45 = 40 +', 5], ['96 = 90 +', 6], ['29 = 20 +', 9]
          ]
        },
        {
          n: 4,
          type: 'count-figures',
          prompt: L('Har bir shaklda nechtadan uchburchak bor?',
                    'How many triangles are in each figure?'),
          figures: [
            { draw: () => Figures.triSquare(), answer: 2,
              why: L('Diagonal kvadratni 2 ta uchburchakka bo‘ladi.',
                     'The diagonal splits the square into 2 triangles.') },
            { draw: () => Figures.triPink(), answer: 7,
              why: L('4 ta kichik + 2 ta juft + katta uchburchakning o‘zi = 7 ta.',
                     '4 small + 2 pairs + the whole triangle itself = 7.') },
            { draw: () => Figures.triYellow(), answer: 5,
              why: L('3 ta kichik + 1 ta juft + katta uchburchakning o‘zi = 5 ta.',
                     '3 small + 1 pair + the whole triangle itself = 5.') }
          ]
        },
        {
          n: 5,
          type: 'self-check',
          prompt: L('Rasm bo‘yicha masala tuzing va uni yeching',
                    'Make up a problem from the picture and solve it'),
          figure: () => Figures.bagsBoughtMore(
            pick(L('Bor edi', 'There were')),
            pick(L('Yana sotib olindi', 'More were bought')),
            10, 7, pick(L('? ta', '? of them')))
          // No auto-graded answer: the third bag has no printed count, so the
          // total is not determined by the page alone.
        },
        {
          n: 6,
          type: 'compute',
          prompt: L('Sonlarning yig‘indisini toping', 'Find the sum of the numbers'),
          items: [['26 + 4', 30], ['38 + 2', 40], ['57 + 3', 60], ['69 + 1', 70]]
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['47 + 3', 50],  ['68 − 60', 8],  ['36 + 4', 40], ['87 + 3', 90],
            ['54 + 4', 58],  ['26 − 20', 6],  ['77 − 7', 70], ['58 + 2', 60]
          ]
        }
      ]
    }
  ];

  const ALL_IDS = LESSONS.map(l => l.id);
  const byId = (id) => LESSONS.find(l => l.id === id);

  /* ------------------------------------------------------ step compiler */

  const digits = (n) => String(n).length;

  /** Widest answer in an exercise, so the keypad auto-submits consistently
   *  within it rather than hinting at any individual answer's length. */
  function maxDigitsOf(answers) {
    return Math.max(...answers.map(digits));
  }

  function compile(lesson) {
    const steps = [];
    const T = () => STRINGS[Store.lang];

    for (const ex of lesson.exercises) {
      const base = { exercise: ex.n };

      if (ex.type === 'namuna') {
        steps.push({ ...base, id: `${ex.n}`, kind: 'info', blocks: ex.blocks });

      } else if (ex.type === 'neighbours') {
        for (const part of ex.parts) {
          for (const num of part.numbers) {
            steps.push({
              ...base,
              id: `${ex.n}.${part.mode}.${num}`,
              kind: 'numeric',
              prompt: part.mode === 'before' ? T().exNeighbourBefore(num) : T().exNeighbourAfter(num),
              expr: null,
              answer: part.mode === 'before' ? num - 1 : num + 1,
              maxDigits: 2,
              timed: false
            });
          }
        }

      } else if (ex.type === 'compute') {
        const md = maxDigitsOf(ex.items.map(i => i[1]));
        ex.items.forEach(([expr, answer], i) => {
          steps.push({
            ...base, id: `${ex.n}.${i}`, kind: 'numeric',
            prompt: ex.prompt ? pick(ex.prompt) : null,
            expr, answer, maxDigits: md,
            timed: true                     // fluency matters for drills
          });
        });

      } else if (ex.type === 'fill-blank') {
        const md = maxDigitsOf(ex.items.map(i => i[1]));
        ex.items.forEach(([expr, answer], i) => {
          steps.push({
            ...base, id: `${ex.n}.${i}`, kind: 'numeric',
            prompt: pick(ex.prompt), namuna: ex.namuna,
            expr, answer, maxDigits: md, timed: true
          });
        });

      } else if (ex.type === 'word-problem') {
        steps.push({
          ...base, id: `${ex.n}`, kind: 'numeric',
          prompt: pick(ex.text), expr: null,
          answer: ex.answer, maxDigits: digits(ex.answer) + 1,
          timed: false                      // reading time is not fluency
        });

      } else if (ex.type === 'choice') {
        steps.push({
          ...base, id: `${ex.n}`, kind: 'choice',
          prompt: pick(ex.prompt), figure: ex.figure(),
          options: ex.options.map(pick), answer: ex.answer
        });

      } else if (ex.type === 'count-figures') {
        ex.figures.forEach((f, i) => {
          steps.push({
            ...base, id: `${ex.n}.${i}`, kind: 'numeric',
            prompt: pick(ex.prompt), figure: f.draw(),
            expr: null, answer: f.answer, why: pick(f.why),
            maxDigits: 2, timed: false
          });
        });

      } else if (ex.type === 'self-check') {
        steps.push({
          ...base, id: `${ex.n}.say`, kind: 'selfcheck',
          prompt: pick(ex.prompt), figure: ex.figure()
        });
        if (ex.answer != null) {
          steps.push({
            ...base, id: `${ex.n}.solve`, kind: 'numeric',
            prompt: pick(ex.prompt), expr: null,
            answer: ex.answer, maxDigits: digits(ex.answer) + 1, timed: false
          });
        }
      }
    }
    return steps;
  }

  return {
    SECTIONS, LESSONS, ALL_IDS, byId, compile,
    sectionTitle: (key) => pick(SECTIONS[key]),
    topicTitle: (lesson) => pick(lesson.topic)
  };

})();
