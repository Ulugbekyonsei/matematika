/* ==========================================================================
   i18n.js — Uzbek is primary, English is the toggle.
   Uzbek uses the textbook's orthography (o‘, g‘) and notation (• for ×, : for ÷).
   ========================================================================== */

const STRINGS = {

  uz: {
    langButton:   'EN',
    htmlLang:     'uz',

    greeting:     'Salom, Imona!',
    subtitle:     'Ko‘paytirish jadvalini o‘rganamiz',

    streakLabel:  'kunlik seriya',
    trophyLabel:  'kubok',
    factsLabel:   'misol',

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

    footerNote:   '2-sinf • Ko‘paytirish jadvali'
  },

  en: {
    langButton:   'UZ',
    htmlLang:     'en',

    greeting:     'Hi, Imona!',
    subtitle:     'Let’s learn the times tables',

    streakLabel:  'day streak',
    trophyLabel:  'trophies',
    factsLabel:   'facts',

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

    footerNote:   'Grade 2 • Times tables'
  }

};
