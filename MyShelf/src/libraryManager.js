// libraryManager.js
// Owns the user's personal library: the list of books they have added and
// which shelf each book is on. Persisted to localStorage only (no backend).
//
// Design notes (the "why"):
// - We never trust data read back from localStorage. It can be edited by the
//   user, by another tab, or corrupted. Every book is re-validated on load.
// - We never store raw API responses; only the few fields the features need.
// - Rendering is done by React as TEXT, so even if a bad string slipped past
//   validation it cannot run as HTML.

const STORAGE_KEY = 'myshelf:library:v1';

// The three shelves the app supports. KEPT IN A CONSTANT so we never mistype
// a shelf name anywhere in the codebase. The order also defines the order
// the shelves appear in the UI.
export const SHELVES = {
  WANT: 'want',
  READING: 'reading',
  FINISHED: 'finished',
};

// Ordered list (for rendering + move menus) and human-readable labels.
export const SHELF_ORDER = [SHELVES.WANT, SHELVES.READING, SHELVES.FINISHED];
export const SHELF_LABELS = {
  [SHELVES.WANT]: 'Want to Read',
  [SHELVES.READING]: 'Currently Reading',
  [SHELVES.FINISHED]: 'Finished',
};

// The exact shape a stored book must have. Anything else is dropped on load.
function isValidBook(value) {
  if (!value || typeof value !== 'object') return false;
  if (typeof value.id !== 'string' || value.id === '') return false;
  if (typeof value.title !== 'string') return false;
  if (typeof value.author !== 'string') return false;
  if (typeof value.coverImage !== 'string') return false;
  // pageCount must be null OR a positive whole number.
  if (value.pageCount !== null) {
    if (typeof value.pageCount !== 'number' || !Number.isFinite(value.pageCount) || value.pageCount <= 0) {
      return false;
    }
    if (!Number.isInteger(value.pageCount)) return false;
  }
  if (value.shelf !== SHELVES.WANT && value.shelf !== SHELVES.READING && value.shelf !== SHELVES.FINISHED) return false;
  if (typeof value.addedAt !== 'number') return false;
  return true;
}

// Convert a normalized search result into a stored book (adds shelf + addedAt).
// This is the ONLY place a search result becomes a library entry.
function toStoredBook(book, shelf) {
  return {
    id: String(book.id),
    title: String(book.title || 'Untitled'),
    author: String(book.author || 'Unknown author'),
    coverImage: String(book.coverImage || ''),
    pageCount:
      typeof book.pageCount === 'number' && Number.isFinite(book.pageCount) && book.pageCount > 0
        ? Math.floor(book.pageCount)
        : null,
    shelf,
    addedAt: Date.now(),
  };
}

// ---------- Persistence ----------
// Wrapping JSON.parse / localStorage in try/catch so a corrupted entry never
// throws an uncaught exception that breaks the app on load.
export function loadLibrary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Corrupted JSON: reset to empty rather than crash.
      return [];
    }
    if (!Array.isArray(parsed)) return [];
    // Drop any entry that does not match the expected shape.
    return parsed.filter(isValidBook);
  } catch {
    // localStorage itself can throw (private mode / quota). Fail safe.
    return [];
  }
}

export function saveLibrary(books) {
  try {
    // Only store valid books, so a bad entry can never be written on save.
    const clean = Array.isArray(books) ? books.filter(isValidBook) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    return true;
  } catch {
    return false;
  }
}

// ---------- Mutations ----------
// Each helper returns a NEW array (no mutation) so React state updates work.
// Callers are responsible for calling saveLibrary() with the result.

export function addBook(books, book, shelf = SHELVES.WANT) {
  // Prevent duplicates by id.
  if (books.some((b) => b.id === book.id)) return books;
  return [...books, toStoredBook(book, shelf)];
}

export function removeBook(books, id) {
  return books.filter((b) => b.id !== id);
}

export function moveBook(books, id, shelf) {
  // Reject any shelf that is not one of the three known shelves.
  if (shelf !== SHELVES.WANT && shelf !== SHELVES.READING && shelf !== SHELVES.FINISHED) return books;
  return books.map((b) => (b.id === id ? { ...b, shelf } : b));
}

export function isInLibrary(books, id) {
  return books.some((b) => b.id === id);
}

// ---------- The reading metric ----------
// Sum of page counts of FINISHED books ONLY, using ONLY known valid page
// counts. Books on 'Currently Reading' are intentionally excluded — they do
// not count until they are moved to 'Finished'. Books with pageCount === null
// are excluded on purpose.
export function finishedPageTotal(books) {
  return books.reduce((sum, b) => {
    if (b.shelf !== SHELVES.FINISHED) return sum;
    if (typeof b.pageCount === 'number' && b.pageCount > 0) return sum + b.pageCount;
    return sum;
  }, 0);
}

// ---------- Demo/sample library ----------
// Loads a tiny finished library so the Finished total starts at exactly 500
// pages — useful for demonstrating the S2-AC2 metric update (500 -> 800).
export function sampleLibrary() {
  return [
    { ...toStoredBook({ id: 'sample:book-200', title: 'Sample Novel', author: 'Author A', coverImage: 'https://covers.openlibrary.org/b/id/240726-L.jpg', pageCount: 200 }, SHELVES.FINISHED), addedAt: Date.now() },
    { ...toStoredBook({ id: 'sample:book-300', title: 'Sample Collection', author: 'Author B', coverImage: 'https://covers.openlibrary.org/b/id/694529-L.jpg', pageCount: 300 }, SHELVES.FINISHED), addedAt: Date.now() },
  ];
}
