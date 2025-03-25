// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
   * Clicks a random icon with data-testid="IconPlus", data-testid="IconQuestionMark", data-testid="IconCheck"
   * and stores the index for later validation.
   */
Cypress.Commands.add("clickRandomIcon", (expectedTestId) => {
  cy.get('[data-testid^="Icon"]').then(($icons) => {
    const totalIcons = $icons.length;
    var actualIndex = 0;

    const tryClick = () => {
      const index = Math.floor(Math.random() * totalIcons);
      const $icon = $icons.eq(index);
      const testId = $icon.attr("data-testid");

      if (testId === expectedTestId) {
        Cypress.env("selectedIconIndex", index); // Save index for later use
        cy.log(`✅ Found ${expectedTestId} at row #${index + 1}`);
        cy.wrap($icon).click();
      } else {
        actualIndex++;
        if (actualIndex < totalIcons) {
          cy.log(`⏭️ Skipping ${testId} at row #${index + 1}`);
          tryClick(); // Try again
        } else {
            Cypress.env("selectedIconIndex", -1); // Save index for later use
          cy.log(`⏭️ Skipping all rows`);
        }
      }
    };

    tryClick();
  });
});
