// SearchBar.jsx
// The search input + button. It only fires a search on Enter or button click
// (no search-as-you-type, on purpose — to avoid hammering the API).
//
// Props:
//   onSearch(query)  called with the trimmed query string
//   loading          true while a request is running -> disables the button
import { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  function submit(event) {
    event.preventDefault();
    const q = value.trim();
    if (!q || loading) return;
    onSearch(q);
  }

  return (
    <form className="search-bar" onSubmit={submit} role="search" aria-label="Book search">
      <input
        type="text"
        className="search-input"
        placeholder="Search by title or author (e.g. Little Women)"
        value={value}
        maxLength={200}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search query"
        disabled={loading}
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
}
