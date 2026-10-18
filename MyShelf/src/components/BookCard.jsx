// BookCard.jsx
// One book shown as a card: cover image (or a placeholder block when there is
// no cover), title, author, page count, and an action button.
//
// All text (title, author, page count) is rendered as React TEXT, so external
// metadata from the APIs can never run as HTML.
import { Book as BookIcon } from './icons.jsx';

export default function BookCard({
  book,
  actionLabel,
  onAction,
  disableAction,
  actionKind = 'primary',
  secondaryLabel,
  onSecondary,
  footer,
}) {
  return (
    <article className="book-card" aria-label={`Book: ${book.title}`}>
      <div className="book-cover">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            onError={(e) => {
              // If the external cover fails to load, swap to the placeholder
              // block so the card still looks right.
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('no-cover');
            }}
          />
        ) : (
          <div className="cover-placeholder" aria-hidden="true">
            <BookIcon />
            <span>No cover</span>
          </div>
        )}
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-pages">
          {book.pageCount
            ? `${book.pageCount} pages`
            : 'Page count unknown'}
        </p>
      </div>

      <div className="book-actions">
        {actionLabel && (
          <button
            type="button"
            className={`btn btn-${actionKind}`}
            onClick={() => onAction && onAction(book)}
            disabled={disableAction}
          >
            {actionLabel}
          </button>
        )}
        {secondaryLabel && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onSecondary && onSecondary(book)}
          >
            {secondaryLabel}
          </button>
        )}
        {footer}
      </div>
    </article>
  );
}
