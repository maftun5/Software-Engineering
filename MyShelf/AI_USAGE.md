# AI Usage & Verification Log

## 1. Tool Declaration & Code Generation
- **Bolt.new**: Used to generate the initial React client scaffolding, `bookSearch.js` catalog adapter, and `libraryManager.js` shelf state manager.
- **Gemini**: Used as a thought partner to structure technical documentation, format verification matrices, and write report templates compliant with ISE4133 specifications.

## 2. What Was Generated vs. What Was Verified & Changed
- **Generated**: Component layout (`App.jsx`, `SearchBar.jsx`, `BookCard.jsx`, `Shelf.jsx`), Google Books API `fetch` call, and basic array manipulation functions[cite: 58, 64].
- **Verified Manually**: 
  1. Executed searches for "Little Women" and "Harry Potter" to verify schema mapping (title, author, cover, page count).
  2. Verified Google Books HTTP 429 quota error handling and fallback behavior to Open Library.
  3. Verified `localStorage` rehydration on browser reloads.
  4. Performed security verification against XSS and double-encoding issues.
- **Changed / Refactored**: 
  1. Refactored string handling to rely on React's native JSX escaping, eliminating double-encoded entities (such as `&#x27;` or `&amp;`) in rendered book titles.
  2. Added explicit fallback defaults (`0` for missing `pageCount` and placeholder image URLs for missing covers) to prevent `NaN` counter calculations.
