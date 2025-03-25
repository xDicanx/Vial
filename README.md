Cypress E2E Test Suite – Query Table Interaction

This project demonstrates an end-to-end test suite using **Cypress** to validate the behavior of a table-based UI component. The table allows users to **create**, **resolve**, and **delete** "queries" by interacting with icons representing different states.

## What is Tested?

- **Table Content Validation**
  - Ensures the table renders and contains data.
  - Each row must have valid text in the first two columns.
  - The third column must contain a valid state icon: `IconPlus`, `IconQuestionMark`, or `IconCheck`.

- **Query State Transitions**
  -  **Create Query**: Randomly clicks on a `+` icon (IconPlus), opens the modal, submits a query, and expects the state to change to `?` (IconQuestionMark).
  -  **Resolve Query**: Randomly selects an open query (IconQuestionMark), resolves it, and expects the state to change to a checkmark (IconCheck).
  -  **Delete Query**: Randomly selects a resolved query (IconCheck), deletes it, and expects the state to return to a `+` (IconPlus).

- **Modal Validation**
  - Ensures that the question shown in the table row matches the title in the modal, regardless of the current query state.

##  Why Random?

To simulate real-world user behavior and ensure that the logic works across **any** row, not just hardcoded ones. This approach validates robustness and avoids false positives based on static test cases.

##  Tech Stack

- **Cypress** – E2E Testing Framework
- **JavaScript (ES6)** – Test Logic
- **Mantine** – Modal and UI component framework (used by the app under test)

## How to Run the Tests

1. Pull this github rep (https://github.com/xDicanx/Vial) to your local machine
2. [Download the latest app version](https://drive.google.com/file/d/1Cyfyz78arBbYvGvZ1Lq9P9GpJsdbQ-yG/view?usp=drive_link)
3. Start the local application at  `http://localhost:3000`
4. In a separate terminal:
   ```bash
   npx cypress open
5. Run the test
  The actual process is:
  a. Create random query
  b. Resolve random query
  c. Delete random query
  e. Verify if ALL the questions match with the modal questions (regardless of the state of the query)


Please go ahead and try the tests.
Im open to suggestions!
