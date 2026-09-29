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

## 2. Story 1 (S1) — [Writer Lead]

* **User Story:**  
  * **As a** recreational reader,  
  * **I want** to search for a book by title or author and add it to my personal library,  
  * **So that** I can track my reading collection without manual data entry.

* **Criterion S1-AC1:**  
  * **Given** a user is on the book search page and types "Little Women" into the search bar,  
  * **When** they execute the search,  
  * **Then** the system displays a list of matching books retrieved from the API with their titles, authors, and cover images.

* **Criterion S1-AC2:**  
  * **Given** a user selects a book from the search results,  
  * **When** they click "Add to Library",  
  * **Then** the selected book is placed in the library's default shelf ("Want to Read") and appears on the visual bookshelf display.

---

## 3. Story 2 (S2) — [Person B Lead]

* **User Story:**  
  * **As a**  recreational reader,  
  * **I want**  to move a book from my default shelf to my "Finished" shelf,  
  * **So that** my visual bookshelf and reading progress reflect my current reading status. 

* **Criterion S2-AC1:**  
  * **Given**  a user has "Little Women" stored in their default "Want to Read" shelf,  
  * **When**  they select the book options and change its status to "Finished",  
  * **Then**  the book moves to the "Finished" shelf, and the visual bookshelf instantly updates its position. 

* **Criterion S2-AC2:**  
  * **Given** a book status is successfully updated to "Finished",  
  * **When**  the user views their personal dashboard,   
  * **Then** their total page-count milestone updates to include the page length of the newly finished book.

---

## 4. Priorities, Scope & Edge Cases

* **Priority & Rationale:** S1 comes first because a user must search for and add a book to their library before they can manage its shelf status or update milestone metrics.
* **Alternate / Invalid Case:** [Describe 1 edge case/error condition and its expected outcome, OR record an unresolved rule that needs agreement]
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
* **Saved Location / Commit:** [Link to file in repo or branch commit details]
* **Verification Check:** Reopened and verified by Maftuna
* **AI Usage:** See [link]{miscellaneous/AI_USAGE.md}
