# Testing

This file lists the checks for MyShelf. "Actually executed" is **yes** only for
checks I really ran and observed; anything else is **no**.

See the columns:

- **Check** — what is being verified
- **Steps** — how to reproduce it
- **Expected result** — what should happen
- **Actually executed** — yes/no
- **Real result** — what actually happened when I ran it (or "not run")

## Automated / build checks

| Check | Steps | Expected result | Actually executed | Real result |
| ----- | ----- | --------------- | ----------------- | ----------- |
| Project builds | `npm run build` | Build completes with no errors | yes | Build succeeded: 38 modules transformed, dist/index.html + assets produced, exit 0. Lint also clean. |

## Functional checks (require a browser)

| Check | Steps | Expected result | Actually executed | Real result |
| ----- | ----- | --------------- | ----------------- | ----------- |
| S1-AC1 Search shows title/author/cover | Start dev server, search "Little Women" | Cards show cover image, title, author, page count | no | not run |
| Search "Little Women" returns results | Search "Little Women" | At least one result (Little Women by Louisa May Alcott) | no | not run |
| Search with no results | Search "zzznomatch" in demo mode (or a nonsense live query) | Empty results + "No books found" message | no | not run |
| Error state (S1 error case) | Turn on "Simulate API failure", search anything | No results list; red error box "The search could not be completed." | no | not run |
| Demo mode returns sample data | Turn on "Demo mode", search "Little Women" | Results from demo; Little Women with 300 pages shown | no | not run |
| Demo mode has a no-cover book | Demo mode on, search "cover" | "A Book Without a Cover" card shows a placeholder, no broken image | no | not run |
| Demo mode has a no-page-count book | Demo mode on, search "Pages" | "Pages Unknown" card shows "Page count unknown" | no | not run |
| Demo mode zero-results query | Demo mode on, search "zzznomatch" | "No books found" message, no cards | no | not run |
| Empty input message | Click Search with empty input | "Please enter something to search for." (validation) | no | not run |
| S1-AC2 Add to Library -> Want to Read | Search, click "Add to Library" on a result | Book appears on "Want to Read"; button becomes "On your shelf" and is disabled | no | not run |
| Duplicate prevention | Add the same book twice | Second click does nothing (button already disabled) | no | not run |
| S2-AC1 Move to Finished (no reload) | On a Want to Read book, click "Move to Finished" | Book moves to Finished shelf instantly; no page reload | no | not run |
| Move back to Want to Read | On a Finished book, click "Move back to Want to Read" | Book moves back to Want to Read instantly | no | not run |
| Move to Currently Reading | On a Want to Read book, use the dropdown -> "Move to Currently Reading" | Book moves to the Currently Reading shelf instantly | no | not run |
| Currently Reading does not affect Finished total | Move a 300-page book to Currently Reading | Finished total is unchanged (does not include Currently Reading pages) | no | not run |
| Move from Currently Reading to Finished | On a Currently Reading book, dropdown -> "Move to Finished" | Book moves to Finished; Finished total increases by its page count | no | not run |
| S2-AC2 Finished total updates 500 -> 800 | Click "Load 500-page sample" (total = 500). Add a 300-page finished book. | Total updates from 500 to 800 immediately | no | not run |
| Finished total ignores unknown page counts | Add a book with "Page count unknown" to Finished | Total does not change (unknown pages excluded) | no | not run |
| Remove a book | Click "Remove" on any shelf book | Book disappears from the shelf and the library | no | not run |
| Persistence after refresh | Add books, then reload the page | Library is restored from localStorage; shelves and total unchanged | no | not run |
| localStorage corruption does not crash | In DevTools, set `localStorage['myshelf:library:v1']` to `garbage`, reload | App loads with empty library, no crash | no | not run |
| Source label shows | Run a live search | "Results from google." or "Results from openlibrary." under the search bar | no | not run |
| Open Library fallback | Block googleapis.com in DevTools (or go offline for Google), search | Results from Open Library with "Results from openlibrary." label | no | not run |
| HTTP 429 message | (Hard to reproduce live) Trigger rate limit or simulate | "The book service is busy. Try again in a minute." | no | not run |
| Search button disables while loading | Search a slow query | Button shows "Searching…" and is disabled until results arrive | no | not run |
| Cache: repeat search makes no new request | Search a term, then search it again | Second search returns instantly from cache (no network in DevTools) | no | not run |
| Responsive layout | Resize browser from desktop to mobile width | Shelves stack to one column; book grid reflows | no | not run |

## Notes

- Checks marked **no** still need to be run by you in a browser. The app
  provides the controls to run all of them (Demo mode, Simulate API failure,
  Load 500-page sample).
- I did not mark any check as passed that I did not actually run.
