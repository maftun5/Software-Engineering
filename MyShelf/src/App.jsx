// App.jsx
// The top-level component. It holds the only pieces of state the app needs:
//   - library: the user's saved books (persisted to localStorage)
//   - results: the current search results
//   - loading / error / source: search status
// Everything else is derived from these.
import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import BookCard from './components/BookCard.jsx';
import Shelf from './components/Shelf.jsx';
import {
  searchBooks,
  setDemoMode,
  setSimulateFailure,
} from './bookSearch.js';
import {
  SHELVES,
  loadLibrary,
  saveLibrary,
  addBook,
  removeBook,
  moveBook,
  isInLibrary,
  finishedPageTotal,
  sampleLibrary,
} from './libraryManager.js';
import './App.css';

export default function App() {
  const [library, setLibrary] = useState(() => loadLibrary());
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [demoOn, setDemoOn] = useState(false);
  const [failOn, setFailOn] = useState(false);

  // Persist the library whenever it changes. This is the ONLY place we write
  // to localStorage, so we always save the validated, canonical list.
  useEffect(() => {
    saveLibrary(library);
  }, [library]);

  // Keep the demo / failure switches in bookSearch.js in sync with the toggles.
  useEffect(() => {
    setDemoMode(demoOn);
  }, [demoOn]);
  useEffect(() => {
    setSimulateFailure(failOn);
  }, [failOn]);

  const wantBooks = useMemo(
    () => library.filter((b) => b.shelf === SHELVES.WANT),
    [library]
  );
  const readingBooks = useMemo(
    () => library.filter((b) => b.shelf === SHELVES.READING),
    [library]
  );
  const finishedBooks = useMemo(
    () => library.filter((b) => b.shelf === SHELVES.FINISHED),
    [library]
  );
  const finishedTotal = useMemo(() => finishedPageTotal(library), [library]);

  // Run a search. Catches every error from bookSearch.js and turns it into a
  // user-visible message. Never silently pretends success.
  async function handleSearch(query) {
    setLoading(true);
    setError(null);
    setResults([]);
    setSource('');
    setLastQuery(query);
    try {
      const { books, source: src } = await searchBooks(query);
      setResults(books);
      setSource(src);
    } catch (err) {
      // err.kind tells us which message to show; fall back to a generic one.
      const message =
        (err && err.message) ||
        'The search could not be completed. Please try again.';
      setError({ message, kind: err && err.kind });
    } finally {
      setLoading(false);
    }
  }

  function handleAdd(book) {
    setLibrary((prev) => addBook(prev, book, SHELVES.WANT));
  }
  function handleRemove(book) {
    setLibrary((prev) => removeBook(prev, book.id));
  }
  function handleMove(book, toShelf) {
    setLibrary((prev) => moveBook(prev, book.id, toShelf));
  }

  function handleLoadSample() {
    // Loads a finished library totaling exactly 500 pages so the S2-AC2
    // metric update (500 -> 800) can be demonstrated. Replaces the library.
    setLibrary(sampleLibrary());
  }
  function handleClearLibrary() {
    if (window.confirm('Remove all books from your library? This cannot be undone.')) {
      setLibrary([]);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">📚</span>
          <div>
            <h1 className="brand-name">MyShelf</h1>
            <p className="brand-tag">A minimal visual bookshelf for recreational readers</p>
          </div>
        </div>

        <div className="header-controls">
          <label className="toggle" title="Use fixed sample data instead of calling any API">
            <input
              type="checkbox"
              checked={demoOn}
              onChange={(e) => setDemoOn(e.target.checked)}
            />
            Demo mode
          </label>
          <label className="toggle" title="Force every search to fail, to test the error UI">
            <input
              type="checkbox"
              checked={failOn}
              onChange={(e) => setFailOn(e.target.checked)}
            />
            Simulate API failure
          </label>
        </div>
      </header>

      <main className="app-main">
        <section className="search-section" aria-label="Search for books">
          <SearchBar onSearch={handleSearch} loading={loading} />

          <div className="search-meta">
            {loading && <p className="status loading">Searching…</p>}
            {!loading && source && results.length > 0 && (
              <p className="status source">Results from {source}.</p>
            )}
            {!loading && error && (
              <div className="status error" role="alert">
                <strong>The search could not be completed.</strong>
                <span>{error.message}</span>
              </div>
            )}
            {!loading && !error && results.length === 0 && lastQuery && (
              <p className="status empty">No books found for “{lastQuery}”.</p>
            )}
          </div>

          {results.length > 0 && (
            <div className="book-grid" aria-label="Search results">
              {results.map((book) => {
                const added = isInLibrary(library, book.id);
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    actionLabel={added ? 'On your shelf' : 'Add to Library'}
                    disableAction={added}
                    actionKind={added ? 'ghost' : 'primary'}
                    onAction={handleAdd}
                  />
                );
              })}
            </div>
          )}
        </section>

        <section className="metric-bar" aria-label="Reading metric">
          <div className="metric">
            <span className="metric-number">{finishedTotal.toLocaleString()}</span>
            <span className="metric-label">
              pages represented by finished books
              <br />
              <small>(not pages actually read)</small>
            </span>
          </div>
          <div className="metric-actions">
            <button type="button" className="btn btn-ghost" onClick={handleLoadSample}>
              Load 500-page sample
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleClearLibrary}>
              Clear library
            </button>
          </div>
        </section>

        <section className="shelves" aria-label="Your shelves">
          <Shelf
            title="Want to Read"
            books={wantBooks}
            fromShelf={SHELVES.WANT}
            otherShelves={[SHELVES.READING, SHELVES.FINISHED]}
            onMove={handleMove}
            onRemove={handleRemove}
          />
          <Shelf
            title="Currently Reading"
            books={readingBooks}
            fromShelf={SHELVES.READING}
            otherShelves={[SHELVES.WANT, SHELVES.FINISHED]}
            onMove={handleMove}
            onRemove={handleRemove}
          />
          <Shelf
            title="Finished"
            subtitle={`Total: ${finishedTotal.toLocaleString()} pages (known page counts only)`}
            books={finishedBooks}
            fromShelf={SHELVES.FINISHED}
            otherShelves={[SHELVES.WANT, SHELVES.READING]}
            onMove={handleMove}
            onRemove={handleRemove}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>MyShelf — a software engineering demo. Book data from Google Books & Open Library.</p>
      </footer>
    </div>
  );
}
