describe("template spec", () => {
  //TEST A AGREGAR:
  /*
  Verificar si la tabla tiene datos
  */
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it.only('Should verify that table rows have valid content in each column', () => {
    const validIcons = ['IconPlus', 'IconQuestionMark', 'IconCheck'];
  
    cy.get('[data-testid="tableBody"] tr')
      .should('exist')
      .its('length')
      .should('be.greaterThan', 0);
  
    cy.get('[data-testid="tableBody"] tr').each(($row, index) => {
      const rowEl = $row.get(0); // Convertir jQuery a DOM nativo
  
      const firstColText = rowEl.children[0]?.innerText.trim();
      const secondColText = rowEl.children[1]?.innerText.trim();
      const iconElement = rowEl.children[2]?.querySelector('[data-testid^="Icon"]');
      const iconTestId = iconElement?.getAttribute('data-testid');
  
      // Validar texto en columnas 1 y 2
      expect(firstColText, `Row ${index + 1} - Column 1`).to.not.be.empty;
      expect(secondColText, `Row ${index + 1} - Column 2`).to.not.be.empty;
  
      // Validar ícono en columna 3
      //expect(iconElement, `Row ${index + 1} - Column 3 icon`).to.exist;
      expect(validIcons, `Row ${index + 1} - Column 3`).to.include(iconTestId);
    });
  });
  
  

  it("Should CREATE a Query on a random BLANK row", () => {
    cy.clickRandomIcon("IconPlus").then(() => {
      const index = Cypress.env("selectedIconIndex");
      if (index != -1) {
        cy.get(".mantine-Modal-content").should("be.visible");
        cy.get('[data-testid="submitButton"]').click();

        cy.get('[data-testid^="Icon"]')
          .eq(index)
          .invoke("attr", "data-testid")
          .should("equal", "IconQuestionMark");
      }
    });
  });

  it("Should RESOLVE a random OPEN Query", () => {
    cy.clickRandomIcon("IconQuestionMark").then(() => {
      const index = Cypress.env("selectedIconIndex");
      if (index != -1) {
        cy.get(".mantine-Modal-content").should("be.visible");
        cy.get('[data-testid="resolveSubmit"]').click();

        cy.get('[data-testid^="Icon"]')
          .eq(index)
          .invoke("attr", "data-testid")
          .should("equal", "IconCheck");
      }
    });
  });
  
  it("Should DELETE a random RESOLVED Query", () => {
    cy.clickRandomIcon("IconCheck").then(() => {
      const index = Cypress.env("selectedIconIndex");
      if (index != -1) {
        cy.get(".mantine-Modal-content").should("be.visible");
        cy.get('[data-testid="deleteSubmit"]').click();

        cy.get('[data-testid^="Icon"]')
          .eq(index)
          .invoke("attr", "data-testid")
          .should("equal", "IconPlus");
      }
    });
  });
  /**/

  it("Question in the row should match the modal title (regardless of query state)", () => {
    cy.get('[data-testid="tableBody"] tr').each(($row, index) => {
      const getQuestionFromRow = () => {
        return cy
          .wrap($row)
          .children()
          .first()
          .invoke("text")
          .then((text) => text.trim());
      };

      const clickCorrespondingIcon = () => {
        return cy.get('[data-testid^="Icon"]').eq(index).click();
      };

      const getCleanedModalTitle = () => {
        return cy
          .get(".mantine-Modal-title")
          .invoke("text")
          .then((title) =>
            title
              .replace(
                /^(Create a Query \| |Query \| Query for |Query \| )/,
                ""
              )
              .trim()
          );
      };

      getQuestionFromRow().then((questionText) => {
        clickCorrespondingIcon();
        cy.get(".mantine-Modal-content").should("be.visible");

        getCleanedModalTitle().then((modalTitle) => {
          expect(modalTitle).to.equal(questionText);
          cy.log(`✅ Matched: "${modalTitle}"`);
        });

        cy.get(".mantine-Modal-overlay").click({ force: true });
      });
    });
  });
});
