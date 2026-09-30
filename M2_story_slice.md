# M2 Story Slice: MyShelf

**Team:** Team 5
**Team Members:** Maftuna 12236681, Nilufar 12244989  
**Date:** 2026-09-29  

---

## 1. Context & Inputs

* **M1 Input (User & Problem):** Readers who regularly read for personal interest struggle to track their personal library without maintaining over-engineered social apps (like Goodreads) or plain notes apps that lack visual enjoyment.
* **M1 Feedback:** No feedback yet.
* **Direction Decision:** Retaining the current direction. Our M1 survey (n=5) showed users currently fragment their tracking across notes apps, Goodreads, memory, or nothing—supporting our focus on a minimal, non-social, personal visual bookshelf.
* **User Profile:** 
  * **Role:** Recreational Reader / Personal Book Collector
  * **Situation:** Has several books finished, currently being read, or on a wish list, and wants an easy personal library organizer.
  * **Skills / Constraints:** Wants a low-friction system; prefers personal aesthetics over social feeds, reviews, or public reading challenges.
  * **Evidence Source:** Grounded in user research (Google Form survey, n=5) combined with clearly labeled assumptions regarding visual shelf preference.
* **Scenario (2-3 sentences):**  
  Emily is an avid reader who just finished reading a novel and wants to update her personal reading records. She opens MyShelf on her device, searches for the book title via the integrated catalog search, and adds it to her collection. She then moves the book to her "Finished" shelf, instantly updating her visual bookshelf display and personal page-count milestone.
---

## 2. Story 1 (S1) — [Writer: Maftuna]

* **User Story:**  
  * **As a** recreational reader,  
  * **I want** to search for a book by title or author and add it to my personal library,  
  * **So that** I can track my reading collection without manual data entry.

* **Criterion S1-AC1:**  
  * **Given** a user is on the book search page and types "Little Women" into the search bar,  
  * **When** they execute the search,  
  * **Then** the system displays a list of results retrieved from the API, at least one result has the title "Little Women", and every result shows a title, an author, and a cover image.

* **Criterion S1-AC2:**  
  * **Given** a user selects a book from the search results,  
  * **When** they click "Add to Library",  
  * **Then** the selected book is placed in the library's default shelf ("Want to Read") and appears on the visual bookshelf display.

---

## 3. Story 2 (S2) — [Reviewer: Nilufar]

* **User Story:**  
  * **As a**  recreational reader,  
  * **I want**  to move a book from my default shelf "Want to Read" to my "Finished" shelf,  
  * **So that** my visual bookshelf and reading progress reflect my current reading status. 

* **Criterion S2-AC1:**  
  * **Given**  a user has "Little Women" stored in their default "Want to Read" shelf,  
  * **When**  they select the book options and change its status to "Finished",  
  * **Then**  the book no longer appears on the Want to Read shelf and appears on the Finished shelf without reloading the page. 

* **Criterion S2-AC2:**  
  * **Given** the total pages of the user's finished books is 500, and "Little Women" has 300 pages in its book data, 
  * **When** the user changes its status to "Finished",   
  * **Then** the total page count shown on the bookshelf screen changes from 500 to 800.
---

## 4. Priorities, Scope & Edge Cases

* **Priority & Rationale:** S1 comes first because a user must search for and add a book to their library before they can manage its shelf status or update milestone metrics.
* **Alternate / Invalid Case:**
* **Given** a user is on the book search page and the external catalog API is unavailable or returns an error,
* **When** they execute a search,
* **Then** no results list is shown and the user sees a message that the search could not be completed.
* **Unresolved rule (needs team agreement):** whether the message includes a "Try again" option, and whether previously loaded results stay visible.
* **Excluded Capability:** Social activity feeds and public user reviews are explicitly excluded from this slice to keep the focus strictly on minimal, private library tracking.

---

## 5. Team Review & Submission Verification

### Checklist
- [✓] Both stories relate to the same stated user task and scenario.
- [✓] Each criterion has a result another person could inspect.
- [✓] Assumptions, agreed draft rules, and open questions are distinguishable.
- [✓] The document describes expected behavior without inventing test results.

### Review Log
* **Reviewer Name:** Nilufar
* **Ambiguity Found:** Criterion S1-AC2 originally stated "placed in the library" without specifying which default shelf or visual state the book should go upon adding.
* **Change Made:**  Clarified S1-AC2 to explicitly state that newly added books are placed into the default "Want to Read" shelf and immediately render on the visual display.

### Verification & AI Usage
* **Saved Location / Commit:** https://github.com/maftun5/Software-Engineering.git
* **Verification Check:** Reopened and verified by Maftuna
* **AI Usage:** See [AI_USAGE.md](miscellaneous/AI_USAGE.md)
