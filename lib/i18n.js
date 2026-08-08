/* ==========================================================================
   i18n.js — Uzbek is primary, English is the toggle.
   Uzbek uses the textbook's orthography (o‘, g‘) and notation (• for ×, : for ÷),
   and its vocabulary: ko‘paytuvchi / ko‘paytma.
   ========================================================================== */

const STRINGS = {

  uz: {
    langButton:   'EN',
    htmlLang:     'uz',

    /* ---- home ---- */
    greeting:     'Salom, Imona!',
    subtitle:     '2-sinf matematika darsligi',

    streakLabel:  'kunlik seriya',
    trophyLabel:  'kubok',
    factsLabel:   'misol',

    lessonsTitle: 'Darslar',
    tablesEntry:    'Ko‘paytirish jadvali',
    tablesEntrySub: '2 dan 9 gacha',
    lessonLabel:  (n) => `${n}-dars`,
    lessonPages:  (p) => `${p}-betlar`,
    lessonDone:   'Tugallandi ✓',
    lessonLocked: 'Avvalgi darsni tugat',
    moreSoon:     'Keyingi darslar tez orada qo‘shiladi',

    exerciseNo:   (n) => `${n}-mashq`,
    namuna:       'Namuna',
    understood:   'Tushundim',
    sayAloud:     'Ovoz chiqarib ayt',
    selfCheckHint:'Masalani o‘zing tuzib, ovoz chiqarib yech. Tayyor bo‘lsang, tugmani bos.',
    didIt:        'Bajardim ✓',
    theAnswerIs:  (a) => `To‘g‘ri javob: ${a}`,
    exNeighbourBefore: (n) => `${n} dan bitta oldin keladigan son qaysi?`,
    exNeighbourAfter:  (n) => `${n} dan bitta keyin keladigan son qaysi?`,

    lessonDoneTitle: (n) => `${n}-dars tugadi!`,
    lessonDoneBody:  'Zo‘r ish! Keyingi dars ochildi.',
    lessonDoneLast:  'Zo‘r ish! Keyingi darslar tez orada qo‘shiladi.',
    sumWrong:     'xato',
    sumExercises: 'mashq',

    tablesTitle:  'Jadvallar',
    tableCaption: (n) => `${n} ning jadvali`,
    tableLocked:  'Yopiq',
    progressText: (done, total) => `${done} / ${total} ta misol`,

    installTitle:  'Bosh ekranga qo‘shish',
    installAction: 'O‘rnatish',
    installBody: {
      ready:   'Bir marta bosing — ilova o‘rnatiladi',
      android: 'Chrome’da: ⋮ menyu → «Ilovani o‘rnatish»',
      huawei:  'Brauzer menyusi (⋮) → «Bosh ekranga qo‘shish»',
      ios:     'Safari’da: Ulashish tugmasi → «Bosh ekranga qo‘shish»',
      generic: 'Brauzer menyusidan «Bosh ekranga qo‘shish» ni tanlang'
    },

    soonTitle:    'Tez orada!',
    soonBody:     'Bu qism hozir tayyorlanmoqda. Tez kunda o‘ynay olasan!',
    lockedTitle:  'Hali yopiq',
    lockedBody:   (n) => `Avval oldingi jadvalni tugat, keyin ${n} ning jadvali ochiladi.`,
    sheetOk:      'Yaxshi',

    footerNote:   'Abdurahmonova & O‘rinboyeva • 2-sinf matematika',

    /* ---- table menu ---- */
    back:          'Orqaga',
    menuLearn:     'O‘rganish',
    menuLearnSub:  'Jadvalni tushuntiramiz',
    menuPractice:  'Mashq',
    menuPracticeSub: (n) => `${n} ta misol`,
    menuLearnDone: 'O‘rganilgan ✓',
    learnFirstHint:'Avval «O‘rganish» ni bosgin',

    /* ---- learn ---- */
    learnStepOf:  (i, total) => `${i} / ${total}`,
    next:         'Davom etish',
    finishLearn:  'Mashqni boshlash',

    l1Title:      (n) => `${n} tadan olamiz`,
    l1Caption:    (n) => `${n} ta va yana ${n} ta. Hammasi bo‘lib ${n * 2} ta.`,

    l2Title:      'Qisqacha yozamiz',
    l2Caption:    (n) => `${n} ni 2 marta oldik. Buni ${n} • 2 deb yozamiz.`,
    l2Read:       (n) => `«${n} ni 2 ga ko‘paytiramiz»`,

    l3Title:      'Jadvalni tuzamiz',
    l3Caption:    (n) => `Har safar yana ${n} ta qo‘shiladi.`,
    l3AddRow:     'Yana qo‘shish',

    l4Title:      'Nomlarini bilib olamiz',
    l4Factor:     'ko‘paytuvchi',
    l4Product:    'ko‘paytma',

    l5Title:      'Jadvalni yodda tuting',
    l5Caption:    (n) => `Mana ${n} ning to‘liq jadvali.`,

    l6Title:      'Endi sen sinab ko‘r',
    l6Caption:    'Javobni yozib, ✓ tugmasini bos.',
    l6Scaffold:   (expr) => `Eslatma: ${expr}`,

    /* ---- practice ---- */
    practiceOf:   (i, total) => `${i} / ${total}`,
    checkAnswer:  'Tekshirish',
    correct:      'To‘g‘ri!',
    wrongIs:      (q, a) => `${q} = ${a}`,
    tryAgain:     'Yana bir bor',
    quitTitle:    'Mashqni to‘xtatamizmi?',
    quitBody:     'Hozirgacha yechganlaring saqlanadi.',
    quitYes:      'Ha, to‘xtatamiz',
    quitNo:       'Davom etaman',

    /* ---- summary ---- */
    sumTitle:     'Zo‘r ish!',
    sumCorrect:   'to‘g‘ri javob',
    sumSpeed:     'o‘rtacha vaqt',
    sumNewFacts:  'yangi o‘rganilgan',
    sumSeconds:   (s) => `${s} soniya`,
    sumAgain:     'Yana mashq',
    sumHome:      'Bosh sahifa',
    sumStreak:    (d) => `${d} kunlik seriya! 🔥`,

    trophyTitle:  (n) => `${n} ning jadvali tugadi!`,
    trophyBody:   (next) => `Kubok qo‘lga kiritding! Endi ${next} ning jadvali ochildi.`,
    trophyBodyLast: 'Kubok qo‘lga kiritding! Hamma jadvallarni tugatding! 🎉'
  },

  en: {
    langButton:   'UZ',
    htmlLang:     'en',

    greeting:     'Hi, Imona!',
    subtitle:     'Grade 2 maths textbook',

    streakLabel:  'day streak',
    trophyLabel:  'trophies',
    factsLabel:   'facts',

    lessonsTitle: 'Lessons',
    tablesEntry:    'Times tables',
    tablesEntrySub: '2 to 9',
    lessonLabel:  (n) => `Lesson ${n}`,
    lessonPages:  (p) => `pages ${p}`,
    lessonDone:   'Completed ✓',
    lessonLocked: 'Finish the previous lesson',
    moreSoon:     'More lessons coming soon',

    exerciseNo:   (n) => `Exercise ${n}`,
    namuna:       'Example',
    understood:   'Got it',
    sayAloud:     'Say it out loud',
    selfCheckHint:'Make up the problem yourself and solve it out loud. Tap the button when you’re done.',
    didIt:        'Done ✓',
    theAnswerIs:  (a) => `The answer is ${a}`,
    exNeighbourBefore: (n) => `Which number comes just before ${n}?`,
    exNeighbourAfter:  (n) => `Which number comes just after ${n}?`,

    lessonDoneTitle: (n) => `Lesson ${n} complete!`,
    lessonDoneBody:  'Great work! The next lesson is open.',
    lessonDoneLast:  'Great work! More lessons are coming soon.',
    sumWrong:     'mistakes',
    sumExercises: 'exercises',

    tablesTitle:  'Tables',
    tableCaption: (n) => `${n} times table`,
    tableLocked:  'Locked',
    progressText: (done, total) => `${done} / ${total} facts`,

    installTitle:  'Add to Home Screen',
    installAction: 'Install',
    installBody: {
      ready:   'One tap and it installs',
      android: 'In Chrome: ⋮ menu → “Install app”',
      huawei:  'Browser menu (⋮) → “Add to home screen”',
      ios:     'In Safari: Share button → “Add to Home Screen”',
      generic: 'Choose “Add to Home screen” from your browser menu'
    },

    soonTitle:    'Coming soon!',
    soonBody:     'This part is still being built. You’ll be able to play very soon!',
    lockedTitle:  'Still locked',
    lockedBody:   (n) => `Finish the previous table first, then the ${n} times table opens up.`,
    sheetOk:      'OK',

    footerNote:   'Abdurahmonova & O‘rinboyeva • Grade 2 Maths',

    back:          'Back',
    menuLearn:     'Learn',
    menuLearnSub:  'We explain the table',
    menuPractice:  'Practice',
    menuPracticeSub: (n) => `${n} questions`,
    menuLearnDone: 'Learned ✓',
    learnFirstHint:'Tap “Learn” first',

    learnStepOf:  (i, total) => `${i} / ${total}`,
    next:         'Continue',
    finishLearn:  'Start practising',

    l1Title:      (n) => `Taking ${n} at a time`,
    l1Caption:    (n) => `${n} and another ${n}. That makes ${n * 2} altogether.`,

    l2Title:      'Writing it shorter',
    l2Caption:    (n) => `We took ${n} two times. We write that as ${n} • 2.`,
    l2Read:       (n) => `“${n} multiplied by 2”`,

    l3Title:      'Building the table',
    l3Caption:    (n) => `Each time, another ${n} is added.`,
    l3AddRow:     'Add another',

    l4Title:      'Learning the names',
    l4Factor:     'factor',
    l4Product:    'product',

    l5Title:      'Memorise the table',
    l5Caption:    (n) => `Here is the full ${n} times table.`,

    l6Title:      'Now you try',
    l6Caption:    'Type the answer and press ✓.',
    l6Scaffold:   (expr) => `Hint: ${expr}`,

    practiceOf:   (i, total) => `${i} / ${total}`,
    checkAnswer:  'Check',
    correct:      'Correct!',
    wrongIs:      (q, a) => `${q} = ${a}`,
    tryAgain:     'Once more',
    quitTitle:    'Stop practising?',
    quitBody:     'What you’ve answered so far is saved.',
    quitYes:      'Yes, stop',
    quitNo:       'Keep going',

    sumTitle:     'Great work!',
    sumCorrect:   'correct',
    sumSpeed:     'average time',
    sumNewFacts:  'newly learned',
    sumSeconds:   (s) => `${s} seconds`,
    sumAgain:     'Practise again',
    sumHome:      'Home',
    sumStreak:    (d) => `${d} day streak! 🔥`,

    trophyTitle:  (n) => `${n} times table complete!`,
    trophyBody:   (next) => `You earned a trophy! The ${next} times table is now open.`,
    trophyBodyLast: 'You earned a trophy! You finished every table! 🎉'
  }

};
