describe("Quizz flow test", function () {
  it("Answers questions and gets correct feedback", function () {
    cy.visit("localhost:3000?testMode=true");

    cy.questionIs("lithiase");
    cy.answerPathologie();
    cy.shouldBeCorrect(0);
    cy.goToNextQuestion();

    cy.questionIs("dipygus");
    cy.answerPathologie();
    cy.shouldBeCorrect(1);
    cy.goToNextQuestion();

    cy.questionIs("porphyrie");
    cy.answerPathologie();
    cy.shouldBeCorrect(2);
    cy.goToNextQuestion();

    cy.questionIs("apraxie");
    cy.answerFigure();
    cy.shouldBeWrong(3);
    cy.goToNextQuestion();

    cy.questionIs("arythmie");
    cy.answerPathologie();
    cy.shouldBeCorrect(3);
    cy.goToNextQuestion();

    cy.playAgain();

    cy.questionIs("lipogramme");
    cy.answerFigure();
    cy.shouldBeCorrect(0);
    cy.goToNextQuestion();

    cy.questionIs("amphibologie");
    cy.answerFigure();
    cy.shouldBeCorrect(1);
    cy.goToNextQuestion();

    cy.questionIs("hystérologie");
    cy.answerFigure();
    cy.shouldBeCorrect(2);
    cy.goToNextQuestion();

    cy.questionIs("éthopée");
    cy.answerFigure();
    cy.shouldBeCorrect(3);
    cy.goToNextQuestion();

    cy.questionIs("symploque");
    cy.answerPathologie();
    cy.shouldBeWrong(4);
    cy.goToNextQuestion();

    cy.contains("Rejouer au jeu");
    cy.playAgain();

    cy.questionIs("lithiase");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("dipygus");
  });

  it("Answers questions wrong and gets correct feedback", function () {
    cy.visit("localhost:3000?testMode=true");

    cy.questionIs("lithiase");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("dipygus");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("porphyrie");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("apraxie");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("arythmie");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.playAgain();

    cy.questionIs("lipogramme");
    cy.answerPathologie();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("amphibologie");
    cy.answerPathologie();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("hystérologie");
    cy.answerPathologie();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("éthopée");
    cy.answerPathologie();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("symploque");
    cy.answerPathologie();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.contains("Rejouer au jeu");
    cy.playAgain();

    cy.questionIs("lithiase");
    cy.answerFigure();
    cy.shouldBeWrong(0);
    cy.goToNextQuestion();

    cy.questionIs("dipygus");
  });
});
