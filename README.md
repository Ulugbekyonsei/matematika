# Imona — Ko‘paytirish jadvali

A times-tables app for one 2nd-grader, following the Uzbek 2-sinf textbook
(Abdurahmonova & O‘rinboyeva, 2018).

Runs as an installed web app on her tablet: offline, no login, no server.

## Design decisions

| | |
|---|---|
| **Scope v1** | Multiplication tables ×2 → ×9 only. 64 facts (`2•2`…`9•9`). ×0, ×1, ×10 are a separate textbook chapter; division is v2 |
| **Notation** | The textbook's, not the international one: `2•3`, `24 : 3`. Vocabulary is *ko‘paytuvchi / ko‘paytma* |
| **Language** | Uzbek primary, English toggle. Uzbek ships first; English strings follow |
| **Learn mode** | *O‘rganish* — once per table: repeated addition → `•` notation → animated build-up → guided attempts |
| **Practice mode** | *Mashq* — 5-minute daily drill, current table mixed with review |
| **Mastery** | Tables unlock 2→3→…→9. A fact is mastered after ~3 correct answers under 5s |
| **Motivation** | Forgiving streak (weekly goal + one freeze), 8 table trophies, per-table progress |
| **Storage** | `localStorage` is the source of truth; results also POST to a Google Apps Script → Sheet for the parent dashboard |

## Layout

```
index.html                 home screen shell
app.css                    theme (shared with the older 1st-grade review app)
app.js                     state, ladder rendering, language, install, SW registration
lib/fx.js                  canvas confetti + WebAudio sounds, zero dependencies
lib/i18n.js                uz / en strings
sw.js                      offline cache — bump CACHE_VERSION on every deploy
manifest.webmanifest       PWA manifest
tools/make_icons.py        regenerates icons/
```

## Develop

```bash
python3 -m http.server 8765 --directory .
```

A service worker needs `http://` or `https://` — opening `index.html` as a
`file://` URL will not register it.

## Deploy

Push to `main`; GitHub Pages serves it. **Bump `CACHE_VERSION` in `sw.js`**
first, or installed devices keep serving the cached old build.

GitHub Pages sends `Cache-Control: max-age=600`, so a new build can take up to
10 minutes to reach a device. The service worker precaches with
`cache: 'reload'` so that a version bump never fills the new cache with stale
files — without it, bumping the version ships nothing.

Target device is an Android (Honor) tablet, so Chrome fires
`beforeinstallprompt` and the app offers a one-tap Install button. The
per-browser fallback wording only matters on browsers that don't.

## Build order

1. ~~Repo, PWA skeleton, confirm it installs on her tablet~~
2. ×2 end to end: Learn + Practice + mastery + trophy
3. **Give it to her and watch.** Everything after this is only worth building if she comes back the next day
4. Tables ×3–×9 on the same engine
5. Apps Script + Sheet sync
6. Streamlit parent dashboard
7. Division pass

## Related

- `2-sinf 2-Sinf Matematika.pdf` — the textbook (kept in Google Drive, not in this repo)
- `math_review_1st_grade.html` — the earlier 1st-grade review app this one borrows its look from
