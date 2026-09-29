# M2 Story Slice: MyShelf

**Team:** Team 5
**Team Members:** Maftuna 12236681, [Member 2 (Person B)]  
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

## 2. Story 1 (S1) — [Person A Lead]

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
  * **As a** [role],  
  * **I want** [action],  
  * **So that** [reason].

* **Criterion S2-AC1:**  
  * **Given** [initial context/starting state],  
  * **When** [action or event occurs],  
  * **Then** [observable outcome/result].

* **Criterion S2-AC2:**  
  * **Given** [initial context/starting state],  
  * **When** [action or event occurs],  
  * **Then** [observable outcome/result].

---

## 4. Priorities, Scope & Edge Cases

* **Priority & Rationale:** S1 comes first.
* **Alternate / Invalid Case:** [Describe 1 edge case/error condition and its expected outcome, OR record an unresolved rule that needs agreement]
* **Excluded Capability:** [State 1 capability explicitly excluded from this slice and give a reason why]

---

## 5. Team Review & Submission Verification

### Checklist
- [x] Both stories relate to the same stated user task and scenario.
- [x] Each criterion has a result another person could inspect.
- [x] Assumptions, agreed draft rules, and open questions are distinguishable.
- [x] The document describes expected behavior without inventing test results.

### Review Log
* **Reviewer Name:** [Reviewer]
* **Ambiguity Found:** [State 1 specific ambiguity discovered in the criteria wording during peer review]
* **Change Made:** [Describe the exact change made to fix the ambiguity, or explain why no change was needed]

### Verification & AI Usage
* **Saved Location / Commit:** [Link to file in repo or branch commit details]
* **Verification Check:** Reopened and verified by [Member Name]
* **AI Usage:** [State "Not used" OR provide reference to your `AI_USAGE.md` entry]
