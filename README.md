# Imona — 2-sinf matematika

A maths app for one 2nd-grader that follows the Uzbek 2-sinf textbook
(Abdurahmonova & O‘rinboyeva, 2018) lesson by lesson.

Runs as an installed web app on her Android tablet: offline, no login, no server.

## What a "lesson" is

The book has no numbered lessons. Its unit of work is a **block of numbered
exercises that restarts at 1**, and a block straddles page boundaries.

| | |
|---|---|
| Exercise blocks in the book | **159** |
| Total exercises | **1,101** |
| Exercises per block | ~7 |
| Built so far | **8** (pages 3–13) |

## Design decisions

| | |
|---|---|
| **Faithfulness** | The book's exercises as printed, plus its own *namuna* worked examples. The app adds no teaching of its own — at 159 lessons anything more is unfinishable |
| **Language** | Uzbek primary, English toggle. Textbook orthography (o‘, g‘) and notation (`•` for ×, `:` for ÷) |
| **Progress** | A lesson is done when every step has been attempted. A wrong answer shows the right one and returns **once** at the end of the lesson — never a loop |
| **Speed** | Only computation drills are timed. Speed says nothing useful about a word problem |
| **Open-ended** | *Masala tuzing* exercises are self-check cards: say it aloud, tap *Bajardim*. No fake grading |
| **Figures** | Redrawn as inline SVG. The PDF's own artwork is 4,457 fragments at ~100 ppi with Uzbek text baked in |
| **Times tables** | The earlier ×2–×9 app is kept alongside, reachable from the home screen, with its trophies intact. It becomes the implementation for the lessons covering pages 107–132 |

## Exercise types

`namuna` · `compute` · `fill-blank` · `word-problem` · `neighbours` ·
`choice` · `count-figures` · `self-check` · `match-pairs` · `order` ·
`shapes-sides` · `classify-angles`

Each is a self-contained renderer, so further lessons are pure JSON in
`lib/lessons.js`. Types repeat heavily after the first dozen lessons.

`fill-blank` takes `_` anywhere in the expression, so `59 − _ = 50` works as
well as `57 = 50 +`.

When the book numbers sub-problems inside one exercise ("Masalalarni yeching:
1) … 2) …"), give each its own entry with the same `n` and a `part:` — step ids
stay unique while the screen still shows one exercise number. Every type derives
its ids from `part`, so an exercise can mix card kinds: lesson 8's exercise 1 is
two `namuna` cards plus a `count-figures` set. A `namuna` may carry a `note:`
(the book's boxed rule) and a `figure:`, so it also serves the geometry pages
where the book teaches with a picture rather than a worked example.

**Keypad width is derived per exercise from its widest answer.** Never hardcode
it: lesson 1 has `60 + 40 = 100` and lesson 5 asks for the number after 99.
A guard for this is worth re-running after adding lessons —
every numeric step's answer must fit its `maxDigits`.

## Layout

```
index.html                 all views
app.css                    theme, shared with the older 1st-grade review app
app.js                     router, home, lesson list, table menu, summary
lib/lessons.js             textbook content + the step compiler
lib/lessonrunner.js        walks a lesson, one step per screen
lib/figures.js             textbook diagrams as inline SVG
lib/store.js               persistence, lesson progress, mastery, streak
lib/keypad.js              number pad
lib/learn.js               ×-tables lesson  (times-tables app)
lib/practice.js            ×-tables drill   (times-tables app)
lib/fx.js                  canvas confetti + WebAudio sounds
lib/i18n.js                uz / en strings
sw.js                      offline cache — bump CACHE_VERSION on every deploy
tools/make_icons.py        regenerates icons/
```

## Develop

```bash
python3 -m http.server 8765 --directory .
```

A service worker needs `http://` or `https://` — opening `index.html` as a
`file://` URL will not register it. During development, unregister the worker
and clear caches before reloading, or you will keep seeing the old build.

## Deploy

Push to `main`; GitHub Pages serves it. **Bump `CACHE_VERSION` in `sw.js`**
first, or installed devices keep serving the cached old build.

GitHub Pages sends `Cache-Control: max-age=600`, so a new build can take up to
10 minutes to reach a device. The service worker precaches with
`cache: 'reload'` so that a version bump never fills the new cache with stale
files — without it, bumping the version ships nothing.

## Adding a lesson

1. `pdftoppm -r 320 -f <page> -l <page> -png "<textbook>.pdf" out` and read it —
   the figures matter and the text layer scrambles across columns
2. Add an entry to `LESSONS` in `lib/lessons.js`
3. Draw any new figures in `lib/figures.js`
4. Only write a new exercise type if none of the existing ones fit

The book's artwork is raster at ~100 ppi, so a figure whose *answer* depends on
its geometry cannot be read off by eye — measure it. Lesson 8 asks which angles
exceed a right angle, and its third angle is 90° exactly, belonging to neither
of the book's two lists; only a pixel measurement of the ray directions settled
that. Isolate the saturated strokes (the pale arc shading skews any fit), take
the two dominant lines, and read the angle at their intersection.

## Related

- `2-sinf 2-Sinf Matematika.pdf` — the textbook (in Google Drive, not in this repo)
- `math_review_1st_grade.html` — the earlier 1st-grade review app this one borrows its look from
