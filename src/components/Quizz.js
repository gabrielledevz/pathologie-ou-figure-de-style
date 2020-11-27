import React, { useState } from "react";
import { useGameState } from "../hooks/gameState";
import Answer from "./Answer/Answer";
import AnswerButton from "./AnswerButton";
import ShareButtons from "./ShareButtons";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

// Trouver un moyen de faire apparaître le composant réponse avec tuto Pierre
// Créer des tests
// Ajouter des raccourcis clavier pour répondre (1-2-Enter par exemple)
// Changer favicon et titre
// Changer écran fin

const Quizz = (props) => {
  const {
    score,
    answerFunction,
    displayNextQuestion,
    answerIsCorrect,
    question,
  } = useGameState();

  const [showAnswer, setShowAnswer] = useState(false);

  const [typeOfButtonClicked, setTypeOfButtonClicked] = useState(
    QUESTION_TYPES.NONE
  );

  const handleButton = (type) => () => {
    if (typeOfButtonClicked === QUESTION_TYPES.NONE) {
      answerFunction(type, setTypeOfButtonClicked);
      setShowAnswer(true);
    }
  };

  const displayNext = () => {
    setTypeOfButtonClicked(QUESTION_TYPES.NONE);
    setShowAnswer(false);

    if (!displayNextQuestion()) {
      props.endTheGame();
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
          in={showAnswer}
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
