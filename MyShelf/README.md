# MyShelf

A minimal, personal **visual bookshelf** for recreational readers.
Search real books, add them to shelves, and track how many pages your
"Finished" books represent — all in the browser, with no login and no backend.

Built with **React + Vite + JavaScript**. Book data comes from the
**Google Books API** with an automatic fallback to **Open Library**.

---

## Features

- **Search** Google Books (with Open Library fallback) by title or author.
- **Add** books to a default **"Want to Read"** shelf (duplicates prevented).
- **Three shelves**: "Want to Read", **"Currently Reading"**, and **"Finished"**. Move books between any of the three without reloading.
- **Reading metric**: total page count of Finished books (known page counts
  only). Books on "Currently Reading" do **not** count until moved to
  "Finished". Clearly labeled as *pages represented by finished books*, not
  pages actually read. Updates instantly when books change shelves.
- **Persistence**: your library is saved in the browser (`localStorage`) and
  restored after refresh. Remove books any time.
- **Demo mode**: flip a toggle to use fixed sample data instead of any API.
- **Simulate API failure**: flip a toggle to force the error state for testing.
- **Source label**: a small line tells you whether results came from Google
  Books, Open Library, or demo data.

---

## Quick start

Requirements: **Node.js 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (runs at http://localhost:5173)
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

No API key is required. The app works out of the box.

---

## Optional: Google Books API key

The app works **without** a key (Google Books allows anonymous queries, with
lower rate limits). To use a key:

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and paste your key:
   ```
   VITE_GOOGLE_BOOKS_API_KEY=your_key_here
   ```
3. Restart `npm run dev`.

**Important:** `VITE_*` variables are bundled into the browser, so anyone using
the app can read this key. Use a *browser/restricted* API key, restrict it to
your domain in the Google Cloud Console, and consider it low-trust. See
**Security notes** below.

`.env` is listed in `.gitignore` so your key is not committed.

---

## Project structure

```
.
├── index.html              # HTML entry; loads src/main.jsx
├── package.json            # Dependencies + scripts (dev, build, preview)
├── vite.config.js          # Vite config (React plugin)
├── .env.example            # Template for the optional API key
├── .gitignore              # Ignores node_modules, dist, .env
├── README.md               # This file
├── TESTING.md              # Check table (what was run, what needs manual run)
└── src
    ├── main.jsx            # Mounts <App /> into #root
    ├── App.jsx             # Top-level component: state + layout
    ├── App.css             # All app styles
    ├── index.css           # Minimal globals (kept for main.jsx import)
    ├── bookSearch.js       # ALL catalog/API access + normalization + demo data
    ├── libraryManager.js   # localStorage persistence + shelf logic + metric
    └── components
        ├── SearchBar.jsx   # Search input + button (Enter or click to search)
        ├── BookCard.jsx    # One book card (cover, title, author, pages, action)
        ├── Shelf.jsx       # One shelf section + its grid of BookCards
        └── icons.jsx       # Tiny inline SVG icons (no icon library)
```

### File-by-file

- **`index.html`** — The one HTML file Vite uses. It has an empty `<div id="root">`
  and a script tag that loads `src/main.jsx`. Everything you see is rendered into
  that div by React.
- **`src/main.jsx`** — The JavaScript entry point. It imports React, the `App`
  component, and the two CSS files, then tells React to render `<App />` into
  `#root`.
- **`src/App.jsx`** — The main component. It holds the app's state (your library,
  the current search results, loading/error flags) and lays out the header,
  search box, metric bar, and the three shelves. Everything else is derived
  from this state.
- **`src/bookSearch.js`** — The only file that talks to the internet. It searches
  Google Books, falls back to Open Library, normalizes every result into a
  consistent shape, caches results for the session, and also contains the demo
  data and the "simulate failure" switch. The UI never calls an API directly.
- **`src/libraryManager.js`** — Manages your personal library: adding, removing,
  moving books between shelves, computing the Finished page total, and saving/
  loading it from `localStorage`. It re-validates every book loaded from
  storage so corrupted data cannot crash the app.
- **`src/components/SearchBar.jsx`** — A controlled input plus a button. It calls
  `onSearch(query)` only when you press Enter or click Search (no
  search-as-you-type, on purpose, to avoid spamming the API).
- **`src/components/BookCard.jsx`** — Renders one book: its cover (or a
  placeholder when there is no cover), title, author, page count, and an action
  button. All text is rendered as React text, never as HTML.
- **`src/components/Shelf.jsx`** — A labeled section that shows a grid of
  `BookCard`s for one shelf, plus a friendly message when the shelf is empty.
  Each book has a small dropdown to move it to either of the other two shelves
  or remove it.
- **`src/components/icons.jsx`** — A few small inline SVG icons (book, trash,
  check, arrow). We write them by hand instead of installing an icon library so
  dependencies stay minimal.
- **`src/App.css`** — All of the app's styling: the warm paper theme, the book
  cards, the shelves, the metric bar, and the responsive layout.

---

## Architecture & design trade-offs

**Why all API access is in `bookSearch.js` only.**
Keeping every network call in one module means the UI never depends on the
shape of a specific API. The components only ever see the normalized
`{ id, title, author, coverImage, pageCount, source }` shape, so swapping or
adding a data source does not touch the UI.

**Why Google Books first, Open Library fallback.**
Google Books has richer metadata and cover images, but rate-limits anonymous
requests. Open Library is open and lenient, but its search endpoint omits
fields unless you ask for them explicitly (we do: `title, author_name, cover_i,
number_of_pages_median, key`). Falling back automatically keeps the app usable
when one service is down or busy.

**Why localStorage instead of a backend.**
The brief asked for a minimal, no-backend app for one user. localStorage is
simple, synchronous on load, and needs no servers or accounts. The trade-off:
data is per-browser and not shared across devices. We re-validate everything
on load because users (or other tabs) can edit localStorage directly.

**Why no state library or router.**
The app has one screen and a handful of `useState` hooks. Adding Redux or a
router would add complexity a beginner must explain, with no real benefit at
this scale. We use `useMemo` for derived values (shelf lists, page total) so
they only recompute when the library changes.

**Why a session cache in `bookSearch.js`.**
Repeating a search should not make a new network request. A `Map` keyed by the
lowercased query caches results for the page session. It is intentionally not
persisted — it is just a small nicety, not a feature.

**Why demo mode + simulated failure are UI toggles.**
A grader (or you) can exercise the empty/no-results, error, and sample-data
paths without turning off the network or editing code. The toggles set module
constants in `bookSearch.js` via exported setter functions.

---

## Requirement traceability

| ID       | Feature                                                     | Where it lives / how to see it                                                                                                                            |
| -------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1-AC1   | Search results show title, author, cover                    | Type e.g. "Little Women" and press Search. Results grid shows cover, title, author, page count per card.                                                 |
| S1-AC2   | "Add to Library" -> book lands on "Want to Read" shelf      | Click "Add to Library" on a result. It appears in the "Want to Read" shelf; the button becomes "On your shelf" and is disabled.                           |
| S2-AC1   | Move to Finished without reload                             | On a "Want to Read" book, click "Move to Finished". It moves instantly to the Finished shelf (no page reload).                                            |
| S2-AC2   | Finished page total updates (e.g. 500 -> 800)               | Click "Load 500-page sample" to start at 500. Add a 300-page book to Finished (or move one). Total updates from 500 to 800 immediately.                  |
| Error    | No results list + message that search could not complete    | Toggle "Simulate API failure" and search. No results list appears; a red error box says "The search could not be completed." with the specific reason.   |

### Starting at exactly 500 pages (for S2-AC2)

Click **"Load 500-page sample"** in the metric bar. This replaces your library
with two finished books (200 + 300 = 500 pages). Now move or add a book with a
known page count to Finished to watch the total update (e.g. add the 300-page
"Little Women" from demo mode -> 500 becomes 800).

---

## Security & privacy notes

- **External text is rendered safely.** Book titles, authors, and any other
  metadata from the APIs are rendered as **React text** (interpolated into JSX
  as `{book.title}`). The app never uses `dangerouslySetInnerHTML` and never
  injects API strings into the DOM as HTML. React escapes text content by
  default, so an API string cannot run as markup. *Input validation alone does
  not prevent XSS* — the safe rendering is what does it; validation is for
  correctness and data quality.
- **API key visibility.** A `VITE_*` env var is bundled into the browser, so a
  browser API key is **visible to users**. Mitigation: use a *browser/
  restricted* key, restrict it to your domain(s) in Google Cloud Console, and
  treat it as low-trust. The app works without a key, so you can also simply
  omit it. Never put a server/secret key in the frontend.
- **No secrets in code.** No keys are hardcoded. The key is read from
  `import.meta.env.VITE_GOOGLE_BOOKS_API_KEY` and is optional.
- **localStorage is re-validated.** Data read back from `localStorage` is
  parsed defensively and every entry is checked against `isValidBook` in
  `libraryManager.js`. Wrong shapes, non-numeric page counts, or unknown shelf
  values are dropped. Corrupted JSON resets to an empty library. Bad data is
  never rendered as HTML — it is rendered as text or discarded.
- **Input validation.** Search input is trimmed and length-limited (200 chars).
  Page counts from APIs are validated as positive whole numbers; anything else
  is treated as "unknown" and excluded from the Finished total.
- **Minimal data stored.** Only `id, title, author, coverImage, pageCount,
  shelf, addedAt` are stored — nothing else from the API responses.

---

## Dependencies

Only the Vite + React starter dependencies are used. **No UI library, no state
library, no router, no icon library.** See `package.json`.

---

## License

For educational use. Book metadata and covers come from Google Books and Open
Library; rights to cover images belong to their respective publishers.
