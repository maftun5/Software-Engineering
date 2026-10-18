// Shelf.jsx
// Shows one shelf (a labeled section + a grid of books). Used for all three
// shelves: "Want to Read", "Currently Reading", and "Finished". Empty shelves
// show a friendly hint. Each book can be moved to either of the OTHER two
// shelves via a small inline dropdown — no page reload.
import BookCard from './BookCard.jsx';
import { Trash } from './icons.jsx';
import { SHELF_LABELS } from '../libraryManager.js';

export default function Shelf({
  title,
  subtitle,
  books,
  onMove,
  onRemove,
  fromShelf,
  otherShelves = [],
}) {
  return (
    <section className="shelf" aria-label={title}>
      <header className="shelf-header">
        <h2 className="shelf-title">{title}</h2>
        <span className="shelf-count">{books.length}</span>
      </header>
      {subtitle && <p className="shelf-subtitle">{subtitle}</p>}

      {books.length === 0 ? (
        <p className="shelf-empty">No books here yet.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              footer={
                <MoveMenu
                  book={book}
                  fromShelf={fromShelf}
                  otherShelves={otherShelves}
                  onMove={onMove}
                  onRemove={onRemove}
                />
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

// A small native <select> that lets the user move the book to either of the
// other shelves, or remove it. Native select = no extra dependencies and works
// on mobile. The first option is a non-actionable label.
function MoveMenu({ book, fromShelf, otherShelves, onMove, onRemove }) {
  const currentLabel = SHELF_LABELS[fromShelf] || 'Shelf';
  return (
    <div className="move-menu">
      <label className="move-label">
        Move:
        <select
          className="move-select"
          value={fromShelf}
          onChange={(e) => {
            const next = e.target.value;
            // Reset back to the current shelf visually after acting, so the
            // menu always reads as the book's actual shelf.
            e.target.value = fromShelf;
            if (next === '__remove') {
              onRemove(book);
            } else if (next !== fromShelf) {
              onMove(book, next);
            }
          }}
          aria-label={`Move or remove ${book.title}`}
        >
          <option value={fromShelf} disabled>
            On: {currentLabel}
          </option>
          {otherShelves.map((shelf) => (
            <option key={shelf} value={shelf}>
              Move to {SHELF_LABELS[shelf]}
            </option>
          ))}
          <option value="__remove">Remove from library</option>
        </select>
      </label>
      <button
        type="button"
        className="btn btn-ghost btn-remove"
        onClick={() => onRemove(book)}
        aria-label={`Remove ${book.title}`}
      >
        <Trash /> Remove
      </button>
    </div>
  );
}
