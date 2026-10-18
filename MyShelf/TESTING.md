# Testing

This file lists the checks for MyShelf. "Actually executed" is **yes** only for
checks I really ran and observed; anything else is **no**.

See the columns:

- **Check** — what is being verified
- **Steps** — how to reproduce it
- **Expected result** — what should happen
- **Actually executed** — yes/no
- **Real result** — what actually happened when I ran it (or "not run")

## Functional checks (require a browser)

| ID | Check | Expected | Executed | Actual (what we saw) | Evidence |
|----|-------|----------|----------|----------------------|----------|
| T1 | Search "Little Women" (S1-AC1) | Results list; each result has title, author, cover | yes | ... | evidence/01_S1-AC1_search-little-women.png |
| T2 | Search with no results | No list; clear "no results" message | yes | ... | evidence/02_search-no-results.png |
| T3 | Simulated API failure (M2 alternate case) | No results list; message that the search could not be completed; app still usable | yes | ... | evidence/04_S1-error-simulated.png |
| T4 | Add book to library (S1-AC2) | Book appears on "Want to Read" | yes | ... | evidence/add%20to%20library%20click.png, evidence/all_three_shelves.png |
| T5 | Move Want to Read to Finished (S2-AC1) | Book leaves Want to Read, appears on Finished, no page reload | yes | ... | evidence/07_S2-AC1_before-move.png, evidence/08_S2-AC1_after-move.png |
| T6 | Finished page total updates (S2-AC2) | Total increases by the book's page count (e.g. 500 to 800) | yes | ... | evidence/09_S2-AC2_total-before.png, evidence/10_S2-AC2_total-after.png |
| T7 | Move book to Reading shelf | Book appears on Reading | yes | ... | evidence/move_to_currently_reading.png |
| T8 | Non-English search | Results shown with correct characters | yes | ... | evidence/another_lang_result.png |
| T9 | Very long search input | Input limited or handled, no crash | yes | ... | evidence/14_security_long-input.png |
| T10 | localStorage contents | Only essential book fields stored | yes | ... | evidence/15_security_localstorage.png |
| T11 | Empty search input | Message shown, no request sent | yes | when clicked on the search, nothing happened | none |
| T12 | Duplicate book blocked | Only one copy remains | yes | the clicking on add to shelf again was blocked | none |
| T13 | Remove a book | Book disappears and stays removed | yes | yes | none |
| T14 | Refresh keeps library | Same books after F5 | yes | like it was expected | none |
| T15 | HTML text in search shown as plain text | Text displayed literally, not interpreted | yes | not executed | <img width="297" height="610" alt="image" src="https://github.com/user-attachments/assets/2248e6d7-1941-425b-bfbc-19b038c0ddd2" />
 |

