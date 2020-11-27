import React, { useState } from "react";
import { useGameState } from "../hooks/gameState";
import Answer from "./Answer/Answer";
import AnswerButton from "./AnswerButton";
import ShareButtons from "./ShareButtons";
import { CSSTransition } from "react-transition-group";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const NO_QUESTION_LEFT = false;

// Trouver un moyen de faire apparaître le composant réponse avec tuto Pierre
// Créer des tests
// Ajouter des raccourcis clavier pour répondre (1-2-Enter par exemple)
// Changer favicon et titre
// Changer écran fin

const Quizz = ({ endTheGame }) => {
  const {
    score,
    answerFunction,
    moveOnNextQuestion,
    answerIsCorrect,
    question,
  } = useGameState();

  const [answerDisplayed, setAnswerDisplayed] = useState(false);

  const [typeOfButtonClicked, setTypeOfButtonClicked] = useState(
    QUESTION_TYPES.NONE
  );

  const handleButton = (type) => () => {
    if (answerDisplayed === false) {
      setTypeOfButtonClicked(type);
      answerFunction(type);
      setAnswerDisplayed(true);
    }
  };

  const displayNext = () => {
    setTypeOfButtonClicked(QUESTION_TYPES.NONE);
    setAnswerDisplayed(false);

    if (moveOnNextQuestion() === NO_QUESTION_LEFT) {
      endTheGame();
    }
  };

  return (
    <div className="whole">
      <div className="middle">
        <div className="secret-zone">
          <ShareButtons />
        </div>
        <div className="question">
          <div>{question.word}</div>
        </div>
        <div className="score">
          <p>Score</p>
          <div className="score-number">{score}</div>
        </div>
      </div>
      <div className="lower">
        <div className="button-zone">
          <AnswerButton
            onClick={handleButton(QUESTION_TYPES.PATHOLOGIE)}
            buttonType={QUESTION_TYPES.PATHOLOGIE}
            typeClicked={typeOfButtonClicked}
          />
          <AnswerButton
            onClick={handleButton(QUESTION_TYPES.FIGURE)}
            buttonType={QUESTION_TYPES.FIGURE}
            typeClicked={typeOfButtonClicked}
          />
        </div>
        <CSSTransition
          in={answerDisplayed}
          timeout={500}
          classNames="answer"
          unmountOnExit
        >
          <Answer
            question={question}
            isCorrect={answerIsCorrect}
            displayNext={displayNext}
          />
        </CSSTransition>
      </div>
    </div>
  );
};

export default Quizz;
