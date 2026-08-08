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

    installTitle: 'Bosh ekranga qo‘shish',
    installBody:  'Safari’da: Ulashish tugmasi → «Bosh ekranga qo‘shish»',

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

    installTitle: 'Add to Home Screen',
    installBody:  'In Safari: Share button → “Add to Home Screen”',

    soonTitle:    'Coming soon!',
    soonBody:     'This part is still being built. You’ll be able to play very soon!',
    lockedTitle:  'Still locked',
    lockedBody:   (n) => `Finish the previous table first, then the ${n} times table opens up.`,
    sheetOk:      'OK',

    footerNote:   'Grade 2 • Times tables'
  }

};
