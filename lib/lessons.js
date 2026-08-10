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
    },

    {
      id: 'L3',
      no: 3,
      section: 's1',
      pages: '5–6',
      topic: L('Qiymati bir xil bo‘lgan misollar', 'Expressions with the same value'),
      exercises: [
        {
          n: 1,
          type: 'match-pairs',
          prompt: L('Jadvaldan javobi bir xil bo‘lgan misollarni toping',
                    'Find the expressions in the table that have the same answer'),
          // Two of the twelve have no partner — that is how the book prints it.
          items: [
            ['60 + 40', 100], ['90 − 50', 40], ['50 + 46', 96],  ['57 − 22', 35],
            ['70 − 30', 40],  ['63 + 23', 86], ['90 − 20', 70],  ['42 + 28', 70],
            ['20 + 15', 35],  ['30 + 24', 54], ['76 + 24', 100], ['90 − 36', 54]
          ]
        },
        {
          n: 2,
          type: 'word-problem',
          text: L('Duradgor 38 ta taxtani randalashi kerak edi. U bir kunda 30 ta taxtani ' +
                  'randalagani aniqlandi. Duradgor yana nechta taxtani randalashi kerak?',
                  'A carpenter had to plane 38 boards. It turned out he planed 30 boards in ' +
                  'one day. How many more boards must he plane?'),
          answer: 8
        },
        {
          n: 3,
          type: 'fill-blank',
          prompt: L('Misollarni namuna bo‘yicha bajaring', 'Do the examples like the model'),
          namuna: '40 + 6 = 46',
          items: [
            ['_ − 7 = 20', 27], ['48 + 2 = _', 50], ['59 − _ = 50', 9],
            ['60 + _ = 63', 3], ['_ − 7 = 30', 37]
          ]
        },
        {
          n: 4,
          type: 'shapes-sides',
          sayPrompt: L('Rasmda tasvirlangan har bir shaklning nomini ayting',
                       'Say the name of each shape in the picture'),
          allFigure: () => Figures.shapesFour(),
          shapes: [
            { kind: 'rhombus', sides: 4 },
            { kind: 'rtri',    sides: 3 },
            { kind: 'rect',    sides: 4 },
            { kind: 'hexagon', sides: 6 }
          ]
        },
        {
          n: 5,
          type: 'self-check',
          prompt: L('Rasm asosida masala tuzing va uni yeching',
                    'Make up a problem from the picture and solve it'),
          figure: () => Figures.threeColumnTable(
            [pick(L('Bor edi', 'There were')), pick(L('Sotildi', 'Sold')), pick(L('Qoldi', 'Left'))],
            [pick(L('18 kg anjir', '18 kg of figs')), pick(L('10 kg anjir', '10 kg of figs')), '? kg']),
          answer: 8
        },
        {
          n: 6,
          type: 'word-problem',
          text: L('Uchta sonning yig‘indisi 96. Birinchi son 42, ikkinchi son 24. ' +
                  'Uchinchi sonni toping.',
                  'The sum of three numbers is 96. The first is 42 and the second is 24. ' +
                  'Find the third number.'),
          answer: 30
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['70 − 30', 40], ['19 + 10', 29], ['58 + 2', 60], ['47 + 3', 50],
            ['50 + 40', 90], ['29 − 20', 9],  ['36 + 4', 40], ['24 + 6', 30]
          ]
        }
      ]
    },

    {
      id: 'L4',
      no: 4,
      section: 's1',
      pages: '7',
      topic: L('Qiymati bir xil bo‘lgan misollar', 'Expressions with the same value'),
      exercises: [
        {
          n: 1,
          type: 'namuna',
          blocks: [
            { head: '57 + 32 = ?', lines: ['7 + 2 = 9', '50 + 30 = 80', '80 + 9 = 89'] },
            { head: '57 − 32 = ?', lines: ['7 − 2 = 5', '50 − 30 = 20', '20 + 5 = 25'] }
          ]
        },
        {
          n: 2,
          type: 'match-pairs',
          prompt: L('Jadvaldan qiymati bir xil bo‘lgan misollarni toping',
                    'Find the expressions in the table that have the same value'),
          items: [
            ['47 − 22', 25],  ['20 + 20', 40], ['44 + 15', 59], ['60 + 40', 100],
            ['83 + 17', 100], ['38 − 30', 8],  ['68 − 43', 25], ['58 − 50', 8],
            ['90 − 50', 40],  ['67 + 3', 70],  ['37 + 22', 59], ['38 + 32', 70]
          ]
        },
        {
          n: 3,
          type: 'word-problem',
          text: L('Qo‘shiqlar tanlovida 37 nafar qiz bola va 22 nafar o‘g‘il bola qatnashdi. ' +
                  'Qo‘shiqlar tanlovida hammasi bo‘lib necha nafar bolalar qatnashgan?',
                  '37 girls and 22 boys took part in a singing competition. How many children ' +
                  'took part altogether?'),
          answer: 59
        },
        {
          n: 4,
          type: 'word-problem',
          text: L('Bir to‘pda 18 m atlas bor edi. Undan 8 m atlas qirqib olindi. ' +
                  'To‘pda necha metr atlas qoldi?',
                  'A roll had 18 m of satin. 8 m was cut from it. How many metres are left ' +
                  'on the roll?'),
          answer: 10
        },
        {
          n: 5,
          type: 'compute',
          prompt: L('70 bilan 30 ning, 60 bilan 20 ning yig‘indisini va shu sonlarning ' +
                    'ayirmasini toping',
                    'Find the sum and the difference of 70 and 30, and of 60 and 20'),
          items: [['70 + 30', 100], ['70 − 30', 40], ['60 + 20', 80], ['60 − 20', 40]]
        },
        {
          n: 6,
          type: 'compute',
          items: [
            ['37 + 12', 49], ['67 + 22', 89], ['57 − 32', 25], ['25 + 14', 39],
            ['37 − 12', 25], ['67 − 22', 45], ['57 + 32', 89], ['25 − 14', 11],
            ['28 + 11', 39], ['46 + 13', 59], ['76 − 22', 54], ['36 + 13', 49]
          ]
        }
      ]
    },

    {
      id: 'L5',
      no: 5,
      section: 's1',
      pages: '8–9',
      topic: L('Qiymati bir xil bo‘lgan misollar', 'Expressions with the same value'),
      exercises: [
        {
          n: 1,
          type: 'self-check',
          prompt: L('Qaysi usul qulay?', 'Which method is easier?'),
          hint: L('Ikkala usulni ko‘rib chiq. Qaysi biri senga osonroq? Ovoz chiqarib ayt.',
                  'Look at both methods. Which one is easier for you? Say it out loud.'),
          figure: () => Figures.twoMethods(
            { head: '96 − 44 = ?', lines: ['6 − 4 = 2', '90 − 40 = 50', '50 + 2 = 52', '96 − 44 = 52'] },
            { head: '96 − 44 = ?', lines: ['96 − 40 = 56', '56 − 4 = 52', '96 − 44 = 52'] })
          // No graded answer: the book is inviting a preference, not a fact.
        },
        {
          n: 2,
          type: 'word-problem',
          text: L('Anor solingan yashik 12 kg, uzum solingani esa undan 2 kg yengil. ' +
                  'Uzum solingan yashik necha kilogramm?',
                  'A crate of pomegranates weighs 12 kg, and the crate of grapes is 2 kg ' +
                  'lighter. How many kilograms is the crate of grapes?'),
          figure: () => Figures.twoCrates(
            Figures.pomegranates(), '12 kg',
            '🍇', pick(L('?, 2 kg yengil', '?, 2 kg lighter'))),
          answer: 10
        },
        {
          n: 3,
          type: 'compute',
          items: [
            ['87 + 12', 99], ['90 − 50', 40], ['25 + 12', 37], ['58 − 32', 26],
            ['38 − 24', 14], ['70 + 30', 100], ['29 − 13', 16], ['46 + 21', 67],
            ['26 + 13', 39], ['50 − 20', 30], ['40 + 28', 68], ['46 − 24', 22]
          ]
        },
        {
          n: 4,
          type: 'order',
          prompt: L('Sonlar ketma-ketligini to‘g‘ri joylashtiring',
                    'Put the number sequence in the right order'),
          numbers: [30, 10, 70, 100, 90, 60, 40, 20, 80, 50]
        },
        {
          n: 5,
          type: 'compute',
          prompt: L('Sonlarning ayirmasini toping', 'Find the difference of the numbers'),
          items: [['38 − 30', 8], ['80 − 50', 30], ['47 − 22', 25], ['59 − 36', 23]]
        },
        {
          n: 6,
          type: 'neighbours',
          prompt: L('Har qaysi berilgan sonlardan oldin va keyin kelgan sonlarni yozing',
                    'Write the numbers coming before and after each given number'),
          parts: [
            { mode: 'before', numbers: [29, 60, 99] },
            { mode: 'after',  numbers: [29, 60, 99] }
          ]
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['78 − 70', 8], ['89 + 1', 90], ['(54 − 34) + 20', 40],
            ['39 − 30', 9], ['28 + 2', 30], ['(60 + 23) − 80', 3]
          ]
        }
      ]
    },

    {
      id: 'L6',
      no: 6,
      section: 's1',
      pages: '9–10',
      topic: L('Qo‘shishni tekshirish', 'Checking addition'),
      exercises: [
        {
          n: 1,
          type: 'namuna',
          blocks: [
            { head: '6 + 4 = 10', lines: ['10 − 6 = 4', '10 − 4 = 6'] },
            { head: '48 + 2 = 50', lines: ['50 − 2 = 48 ✓'] }
          ],
          note: L('Qo‘shishni tekshirish uchun yig‘indidan qo‘shiluvchilarning birini ' +
                  'ayirish kerak. Agar ayirmada ikkinchi qo‘shiluvchi hosil bo‘lsa, ' +
                  'javob to‘g‘ri bo‘ladi.',
                  'To check an addition, subtract one of the addends from the sum. ' +
                  'If the difference is the other addend, the answer is right.')
        },
        {
          n: 2,
          type: 'compute',
          prompt: L('Misollarni yeching, natijani tekshiring',
                    'Solve the examples and check the result'),
          items: [
            ['34 + 12', 46], ['41 + 27', 68], ['62 + 3', 65], ['56 + 22', 78],
            ['26 + 13', 39], ['27 + 11', 38], ['57 + 3', 60], ['44 + 32', 76]
          ]
        },
        {
          n: 3,
          part: 1,
          type: 'word-problem',
          text: L('Issiqxonada 60 ta oq va 40 ta qizil atirgul ochilgan edi. ' +
                  'Issiqxonada hammasi bo‘lib nechta atirgul ochilgan?',
                  '60 white and 40 red roses had opened in the greenhouse. ' +
                  'How many roses opened in the greenhouse altogether?'),
          answer: 100
        },
        {
          n: 3,
          part: 2,
          type: 'word-problem',
          text: L('Issiqxonada 100 ta atirgul ochilgan edi. Xaridor kelib 60 ta ' +
                  'atirgulni olib ketdi. Nechta atirgul qoldi?',
                  'There were 100 roses in the greenhouse. A buyer came and took ' +
                  '60 of them. How many roses are left?'),
          answer: 40
        },
        {
          n: 4,
          type: 'compute',
          prompt: L('Qo‘shiluvchilarning yig‘indisini toping',
                    'Find the sum of the addends'),
          items: [
            ['60 + 40', 100], ['32 + 8', 40], ['24 + 13', 37], ['50 + 5', 55],
            ['26 + 32', 58],  ['14 + 6', 20], ['57 + 32', 89]
          ]
        },
        {
          n: 5,
          part: 1,
          type: 'self-check',
          prompt: L('Rasm asosida masala tuzing va uni yeching',
                    'Make up a problem from the picture and solve it'),
          figure: () => Figures.twoAmountsTotal('🥕', '10 kg', '8 kg', '? kg'),
          answer: 18
        },
        {
          n: 5,
          part: 2,
          type: 'self-check',
          prompt: L('Rasm asosida masala tuzing va uni yeching',
                    'Make up a problem from the picture and solve it'),
          figure: () => Figures.twoAmountsTotal('🍯', '40 kg', '? kg', '70 kg'),
          answer: 30
        },
        {
          n: 6,
          type: 'compute',
          prompt: L('60 bilan 40, 50 bilan 30, 40 bilan 20 ning yig‘indisini va shu ' +
                    'sonlarning ayirmasini toping',
                    'Find the sum and the difference of 60 and 40, of 50 and 30, ' +
                    'and of 40 and 20'),
          items: [
            ['60 + 40', 100], ['60 − 40', 20], ['50 + 30', 80],
            ['50 − 30', 20],  ['40 + 20', 60], ['40 − 20', 20]
          ]
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['47 + 3', 50], ['60 + 30', 90], ['36 + 4', 40], ['54 + 6', 60],
            ['58 − 8', 50], ['39 − 30', 9],  ['27 − 7', 20], ['63 − 3', 60]
          ]
        }
      ]
    },

    {
      id: 'L7',
      no: 7,
      section: 's1',
      pages: '10–11',
      topic: L('Ayirishni tekshirish', 'Checking subtraction'),
      exercises: [
        {
          n: 1,
          type: 'namuna',
          blocks: [
            { head: '16 − 4 = 12', lines: ['12 + 4 = 16'] },
            { head: '67 − 6 = 61', lines: ['61 + 6 = 67 ✓'] }
          ],
          note: L('Ayirishni tekshirish uchun ayirmaga ayriluvchini qo‘shish kerak. ' +
                  'Agar yig‘indida kamayuvchi hosil bo‘lsa, javob to‘g‘ri bo‘ladi.',
                  'To check a subtraction, add the subtrahend to the difference. ' +
                  'If the sum is the minuend, the answer is right.')
        },
        {
          n: 2,
          type: 'compute',
          prompt: L('Misollarni yeching va natijaning to‘g‘riligini tekshiring',
                    'Solve the examples and check that the result is right'),
          items: [['58 − 25', 33], ['35 − 4', 31], ['88 − 7', 81], ['75 − 3', 72]]
        },
        {
          n: 3,
          part: 1,
          type: 'word-problem',
          text: L('Bir to‘pda 90 m gazlama bor edi. Ko‘ylak tikish uchun 50 m gazlama ' +
                  'qirqib olindi. To‘pda necha metr gazlama qoldi?',
                  'A roll had 90 m of fabric. 50 m was cut off to sew dresses. ' +
                  'How many metres of fabric are left on the roll?'),
          answer: 40
        },
        {
          n: 3,
          part: 2,
          type: 'word-problem',
          text: L('Bir to‘p gazlamadan 50 m qirqib olingandan so‘ng 40 m gazlama qoldi. ' +
                  'Dastlab to‘pda necha metr gazlama bo‘lgan?',
                  'After 50 m was cut from a roll of fabric, 40 m remained. ' +
                  'How many metres were on the roll at first?'),
          answer: 90
        },
        {
          n: 4,
          type: 'compute',
          prompt: L('Ayirmani toping', 'Find the difference'),
          items: [
            ['90 − 50', 40], ['80 − 30', 50], ['38 − 30', 8], ['57 − 32', 25],
            ['96 − 44', 52], ['70 − 10', 60], ['49 − 24', 25]
          ]
        },
        {
          n: 5,
          type: 'compute',
          prompt: L('Bir ustunga qo‘shish amali bilan, ikkinchi ustunga ayirish amali ' +
                    'bilan berilgan ifodalarni yozing va ularning qiymatlarini toping',
                    'Write the addition expressions in one column and the subtraction ' +
                    'expressions in another, then find their values'),
          items: [
            ['50 + 30', 80], ['90 − 40', 50], ['57 + 3', 60],
            ['28 − 20', 8],  ['57 + 12', 69], ['76 − 34', 42]
          ]
        },
        {
          n: 6,
          type: 'compute',
          items: [
            ['66 − 44', 22], ['96 − 36', 60], ['58 + 22', 80], ['74 + 23', 97],
            ['55 + 20', 75], ['87 − 47', 40], ['57 − 32', 25], ['74 − 23', 51]
          ]
        }
      ]
    },

    {
      id: 'L8',
      no: 8,
      section: 's1',
      pages: '11–13',
      topic: L('To‘g‘ri burchak. To‘g‘rimas burchak',
               'Right angles and other angles'),
      exercises: [
        {
          n: 1,
          part: 1,
          type: 'namuna',
          figure: () => Figures.rightAngleIntro(
            pick(L('To‘g‘ri burchaklar', 'Right angles')),
            pick(L('To‘g‘ri burchakdan katta va kichik burchaklar',
                   'Angles larger and smaller than a right angle')))
        },
        {
          n: 1,
          part: 2,
          type: 'namuna',
          figure: () => Figures.goniya(),
          note: L('Bitta burchagi to‘g‘ri burchak, qolgan ikkita burchagi to‘g‘ri ' +
                  'burchak bo‘lmagan uchburchak shaklidagi chizg‘ich go‘niya deb ataladi.',
                  'A triangle-shaped ruler with one right angle and two angles that ' +
                  'are not right angles is called a go‘niya — a set square.')
        },
        {
          n: 1,
          part: 3,
          type: 'count-figures',
          prompt: L('Bu ko‘pburchakda nechta to‘g‘ri burchak bor?',
                    'How many right angles does this polygon have?'),
          figures: [
            { draw: () => Figures.polygonRA('square'), answer: 4,
              why: L('Kvadratning to‘rtta burchagi ham to‘g‘ri burchak.',
                     'All four corners of a square are right angles.') },
            { draw: () => Figures.polygonRA('house'), answer: 2,
              why: L('Pastdagi ikkita burchak to‘g‘ri, tepadagilari esa yo‘q.',
                     'The two bottom corners are right angles; the ones at the top are not.') },
            { draw: () => Figures.polygonRA('rtrap'), answer: 2,
              why: L('Chap tomondagi ikkita burchak to‘g‘ri burchak.',
                     'The two corners on the left are right angles.') },
            { draw: () => Figures.polygonRA('arrow'), answer: 2,
              why: L('Chap tomondagi ikkita burchak to‘g‘ri, o‘ng tomondagilari esa yo‘q.',
                     'The two corners on the left are right angles; those on the right are not.') }
          ]
        },
        {
          n: 2,
          type: 'self-check',
          prompt: L('Rasm asosida masala tuzing va uni yeching',
                    'Make up a problem from the picture and solve it'),
          figure: () => Figures.cratesNoted(
            '🍅',
            '16 kg', pick(L('Tuzlandi — 20 kg', 'Salted — 20 kg')),
            '14 kg', pick(L('Qoldi — ? kg', 'Left — ? kg'))),
          answer: 10
        },
        {
          n: 3,
          type: 'fill-blank',
          prompt: L('Misollarni tushuntirib yeching',
                    'Solve the examples and explain them'),
          items: [
            ['70 + _ = 76', 6],  ['_ − 5 = 40', 45], ['_ + 8 = 38', 30],
            ['59 − _ = 59', 0],  ['_ + 4 = 24', 20], ['62 − _ = 60', 2]
          ]
        },
        {
          n: 4,
          type: 'classify-angles',
          prompt: L('Go‘niya yordamida burchakning turini aniqlang',
                    'Use the set square to say what kind of angle this is'),
          options: [
            L('To‘g‘ri burchakdan kichik', 'Smaller than a right angle'),
            L('To‘g‘ri burchak', 'A right angle'),
            L('To‘g‘ri burchakdan katta', 'Larger than a right angle')
          ],
          // Measured off page 12: 45, 113, 90, 127 and 55 degrees. The third is
          // a right angle exactly, so it belongs to neither of the book's lists.
          angles: [
            { kind: 'a1', answer: 0 },
            { kind: 'a2', answer: 2 },
            { kind: 'a3', answer: 1 },
            { kind: 'a4', answer: 2 },
            { kind: 'a5', answer: 0 }
          ]
        },
        {
          n: 5,
          type: 'self-check',
          prompt: L('Daftaringizga shunday to‘g‘ri burchaklar chizing',
                    'Draw right angles like these in your notebook'),
          figure: () => Figures.gridRightAngles(),
          hint: L('Katakli daftaringga chiz. Chizib bo‘lgach, tugmani bos.',
                  'Draw them on squared paper. Tap the button once you have.')
        },
        {
          n: 6,
          type: 'word-problem',
          text: L('Oshxonaga 18 ta choynak, 20 ta piyola keltirildi. Oshxonaga ' +
                  'hammasi bo‘lib nechta idish keltirilgan?',
                  '18 teapots and 20 bowls were brought to the kitchen. How many ' +
                  'pieces of crockery were brought altogether?'),
          answer: 38
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['40 + 25', 65], ['52 − 30', 22], ['57 + 32', 89], ['80 − 50', 30],
            ['68 − 60', 8],  ['30 + 12', 42], ['96 − 44', 52], ['50 + 30', 80]
          ]
        }
      ]
    },

    {
      id: 'L9',
      no: 9,
      section: 's1',
      pages: '13–14',
      topic: L('Ko‘pburchak perimetri', 'Perimeter of a polygon'),
      exercises: [
        {
          n: 1,
          part: 1,
          type: 'namuna',
          figure: () => Figures.fourRectangles(),
          note: L('Bu to‘rtburchaklarning hamma burchaklari to‘g‘ri burchak.',
                  'All the angles of these quadrilaterals are right angles.')
        },
        {
          n: 1,
          part: 2,
          type: 'namuna',
          figure: () => Figures.sideLabeledShape('quad', '8 sm', '2 sm', '3 sm', '6 sm'),
          blocks: [{ head: '8 + 3 + 6 + 2 = 19 (sm)' }],
          note: L('Ko‘pburchakning barcha tomonlari uzunliklari yig‘indisi uning ' +
                  'perimetridir.',
                  'The sum of the lengths of all the sides of a polygon is its perimeter.')
        },
        {
          n: 2,
          type: 'compute',
          items: [
            ['46 + 20', 66], ['74 − 30', 44], ['67 + 10', 77], ['59 − 50', 9],
            ['50 + 35', 85], ['60 + 20', 80], ['57 − 32', 25], ['36 − 24', 12]
          ]
        },
        {
          n: 3,
          type: 'self-check',
          prompt: L('Qisqa yozuv bo‘yicha masala tuzing va uni yeching: 1-savatda 8 kg, ' +
                    '2-savatda 10 kg uzum bor.',
                    'Make up a problem from the short notes and solve it: basket 1 holds ' +
                    '8 kg of grapes, basket 2 holds 10 kg.'),
          figure: () => Figures.twoAmountsTotal('🍇', '8 kg', '10 kg', '? kg'),
          answer: 18
        },
        {
          n: 4,
          part: 1,
          type: 'word-problem',
          text: L('Shaklning perimetrini toping (sm).',
                  'Find the perimeter of the shape (in sm).'),
          figure: () => Figures.sideLabeledShape('trap', '4 sm', '3 sm', '3 sm', '5 sm'),
          answer: 15
        },
        {
          n: 4,
          part: 2,
          type: 'word-problem',
          text: L('Shaklning perimetrini toping (sm).',
                  'Find the perimeter of the shape (in sm).'),
          figure: () => Figures.sideLabeledShape('rect', '5 sm', '2 sm', '2 sm', '5 sm'),
          answer: 14
        },
        {
          n: 5,
          type: 'compare',
          prompt: L('Mos belgini qo‘ying: >, < yoki =',
                    'Put the right sign: >, < or ='),
          items: [
            ['90 − 50', '40', '='], ['60 + 40', '50', '>'], ['57 + 3', '70', '<'],
            ['38 + 20', '70', '<'], ['48 + 20', '30', '>'], ['53 + 7', '60', '=']
          ]
        },
        {
          n: 6,
          type: 'word-problem',
          text: L('Bir to‘pda 48 m, ikkinchi to‘pda undan 8 m kam shoyi bor. ' +
                  'Ikkala to‘pda necha metr shoyi bor?',
                  'One roll has 48 m of silk, and the second has 8 m less. ' +
                  'How many metres of silk are on both rolls?'),
          answer: 88
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['43 + 30', 73], ['64 − 20', 44], ['57 + 3', 60], ['28 − 8', 20],
            ['43 − 30', 13], ['64 + 20', 84], ['57 − 7', 50], ['20 + 8', 28]
          ]
        }
      ]
    },

    {
      id: 'L10',
      no: 10,
      section: 's1',
      pages: '14–15',
      topic: L('O‘tilganlarni takrorlash', 'Revision'),
      exercises: [
        {
          n: 1,
          type: 'fill-blank',
          prompt: L('Quyidagi jadvalni to‘ldiring', 'Fill in the table'),
          items: [
            ['60 +', 40], ['57 +', 43], ['50 +', 50], ['75 +', 25], ['83 +', 17],
            ['+ 30', 70], ['+ 26', 74], ['+ 48', 52], ['+ 68', 32]
          ]
        },
        {
          n: 2,
          type: 'fill-blank',
          prompt: L('Shunday son qo‘yingki, tenglik to‘g‘ri bo‘lsin', 'Put a number so the equation is true'),
          items: [
            ['70 +', 6], ['44 −', 4], ['30 +', 9],
            ['28 −', 8], ['90 +', 0], ['67 −', 7]
          ]
        },
        {
          n: 3,
          type: 'compute',
          prompt: L('4, 5, 9 raqamlari yordamida 9 ta ikki xonali sonni yozish mumkin: 44, 45, 49, 54, 55, 59, 94, 95, 99. ' +
                    '3, 7, 8 raqamlari yordamida hosil qilish mumkin bo‘lgan barcha ikki xonali sonlarni yozing (masalan, 33)',
                    'Using 4, 5, 9 we can write 9 two-digit numbers. ' +
                    'Write all the two-digit numbers that can be made using the digits 3, 7, 8 (e.g. 33)'),
          items: [
            ['', 33], ['', 37], ['', 38], ['', 73], ['', 77], ['', 78], ['', 83], ['', 87], ['', 88]
          ]
        },
        {
          n: 4,
          type: 'self-check',
          prompt: L('Siniq chiziqda nechta bo‘g‘in borligini aniqlang va barcha bo‘g‘in uzunliklarining yig‘indisini toping',
                    'Determine how many segments are in the broken line and find the sum of their lengths'),
          figure: () => ''
        },
        {
          n: 5,
          type: 'self-check',
          prompt: L('Rasm asosida masala tuzing va uni yeching', 'Make up a problem from the picture and solve it'),
          figure: () => Figures.twoAmountsTotal('🧣', '42 m', '34 m', '? m'),
          answer: 24
        },
        {
          n: 6,
          type: 'word-problem',
          text: L('Traktorning bakida ish boshlanganda 48 litr yonilg‘i bor edi, ' +
                  'ish oxiriga kelib 8 litr yonilg‘i qoldi. Necha litr yonilg‘i ishlatilgan?',
                  'The tractor had 48 litres of fuel at the start of work, ' +
                  'and 8 litres at the end. How many litres were used?'),
          answer: 40
        },
        {
          n: 7,
          type: 'compute',
          items: [
            ['(40 + 10) + 6', 56], ['(16 + 14) + 7', 37], ['83 + 10', 93],
            ['(30 − 20) + 9', 19], ['(70 − 30) + 5', 45], ['25 + 25', 50],
            ['(20 + 20) + 5', 45], ['(50 − 30) + 4', 24], ['67 + 20', 87]
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

  /** The book sometimes numbers sub-problems inside one exercise
   *  ("Masalalarni yeching: 1) … 2) …"); `part` keeps their step ids apart. */
  const exId = (ex) => (ex.part ? `${ex.n}.${ex.part}` : `${ex.n}`);

  function compile(lesson) {
    const steps = [];
    const T = () => STRINGS[Store.lang];

    for (const ex of lesson.exercises) {
      const base = { exercise: ex.n };

      if (ex.type === 'namuna') {
        steps.push({ ...base, id: exId(ex), kind: 'info', blocks: ex.blocks,
                     figure: ex.figure ? ex.figure() : null,
                     note: ex.note ? pick(ex.note) : null });

      } else if (ex.type === 'neighbours') {
        const answerOf = (mode, num) => (mode === 'before' ? num - 1 : num + 1);
        // The number after 99 is 100 — never assume two digits.
        const md = maxDigitsOf(ex.parts.flatMap(p => p.numbers.map(n => answerOf(p.mode, n))));
        for (const part of ex.parts) {
          for (const num of part.numbers) {
            steps.push({
              ...base,
              id: `${exId(ex)}.${part.mode}.${num}`,
              kind: 'numeric',
              prompt: part.mode === 'before' ? T().exNeighbourBefore(num) : T().exNeighbourAfter(num),
              expr: null,
              answer: answerOf(part.mode, num),
              maxDigits: md,
              timed: false
            });
          }
        }

      } else if (ex.type === 'compute') {
        const md = maxDigitsOf(ex.items.map(i => i[1]));
        ex.items.forEach(([expr, answer], i) => {
          steps.push({
            ...base, id: `${exId(ex)}.${i}`, kind: 'numeric',
            prompt: ex.prompt ? pick(ex.prompt) : null,
            expr, answer, maxDigits: md,
            timed: true                     // fluency matters for drills
          });
        });

      } else if (ex.type === 'fill-blank') {
        const md = maxDigitsOf(ex.items.map(i => i[1]));
        ex.items.forEach(([expr, answer], i) => {
          steps.push({
            ...base, id: `${exId(ex)}.${i}`, kind: 'numeric',
            prompt: pick(ex.prompt), namuna: ex.namuna,
            expr, answer, maxDigits: md, timed: true
          });
        });

      } else if (ex.type === 'word-problem') {
        steps.push({
          ...base, id: exId(ex), kind: 'numeric',
          prompt: pick(ex.text), expr: null,
          figure: ex.figure ? ex.figure() : null,
          answer: ex.answer, maxDigits: digits(ex.answer) + 1,
          timed: false                      // reading time is not fluency
        });

      } else if (ex.type === 'match-pairs') {
        steps.push({
          ...base, id: exId(ex), kind: 'match',
          prompt: pick(ex.prompt), items: ex.items
        });

      } else if (ex.type === 'order') {
        steps.push({
          ...base, id: exId(ex), kind: 'order',
          prompt: pick(ex.prompt), numbers: ex.numbers
        });

      } else if (ex.type === 'shapes-sides') {
        steps.push({
          ...base, id: `${exId(ex)}.say`, kind: 'selfcheck',
          prompt: pick(ex.sayPrompt), figure: ex.allFigure(),
          hint: T().sayShapeNamesHint
        });
        ex.shapes.forEach((s, i) => {
          steps.push({
            ...base, id: `${exId(ex)}.${i}`, kind: 'numeric',
            prompt: T().sidesOfShape, figure: Figures.shape(s.kind),
            expr: null, answer: s.sides, maxDigits: 1, timed: false
          });
        });

      } else if (ex.type === 'choice') {
        steps.push({
          ...base, id: exId(ex), kind: 'choice',
          prompt: pick(ex.prompt), figure: ex.figure(),
          options: ex.options.map(pick), answer: ex.answer
        });

      } else if (ex.type === 'compare') {
        // "90 − 50 □ 40" — pick >, < or =. Options are HTML entities because
        // the renderer inserts them with innerHTML.
        const SIGNS = ['>', '<', '='];
        const SHOWN = ['&gt;', '&lt;', '='];
        ex.items.forEach(([lhs, rhs, sign], i) => {
          steps.push({
            ...base, id: `${exId(ex)}.${i}`, kind: 'choice',
            prompt: pick(ex.prompt), expr: `${lhs} □ ${rhs}`,
            options: SHOWN, answer: SIGNS.indexOf(sign)
          });
        });

      } else if (ex.type === 'classify-angles') {
        // One card per angle. The options are shared, so the set of possible
        // answers never hints at which one this angle is.
        const options = ex.options.map(pick);
        ex.angles.forEach((a, i) => {
          steps.push({
            ...base, id: `${exId(ex)}.${i}`, kind: 'choice',
            prompt: pick(ex.prompt), figure: Figures.angleCard(a.kind),
            options, answer: a.answer
          });
        });

      } else if (ex.type === 'count-figures') {
        ex.figures.forEach((f, i) => {
          steps.push({
            ...base, id: `${exId(ex)}.${i}`, kind: 'numeric',
            prompt: pick(ex.prompt), figure: f.draw(),
            expr: null, answer: f.answer, why: pick(f.why),
            maxDigits: 2, timed: false
          });
        });

      } else if (ex.type === 'self-check') {
        steps.push({
          ...base, id: `${exId(ex)}.say`, kind: 'selfcheck',
          prompt: pick(ex.prompt), figure: ex.figure(),
          hint: ex.hint ? pick(ex.hint) : null
        });
        if (ex.answer != null) {
          steps.push({
            ...base, id: `${exId(ex)}.solve`, kind: 'numeric',
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
