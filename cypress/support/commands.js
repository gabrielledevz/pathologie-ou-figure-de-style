Cypress.Commands.add("answerPathologie", () => {
  cy.get("[data-cy=answer-button]").contains("Pathologie").click();
});

Cypress.Commands.add("answerFigure", () => {
  cy.get("[data-cy=answer-button]").contains("Figure").click();
});

Cypress.Commands.add("goToNextQuestion", () => {
  cy.get("[data-cy=next-button]").click();
});

Cypress.Commands.add("playAgain", () => {
  cy.get("[data-cy=play-again-button]").click();
});

Cypress.Commands.add("checkScoreIs", (num) => {
  cy.get("[data-cy=score]").should("have.text", num);
});

Cypress.Commands.add("shouldBeGoodAnswer", (score, shouldBeGood) => {
  if (shouldBeGood) {
    cy.checkScoreIs(score + 1);
    cy.contains("C'est la bonne réponse !");
  } else {
    cy.checkScoreIs(score);
    cy.contains("C'est raté !");
  }
});

Cypress.Commands.add("questionIs", (word) => {
  cy.get("[data-cy=question]").should("have.text", word);
});
