import React, { useState } from "react";
import { useGameState } from "../hooks/gameState";
import Answer from "./Answer";
import AnswerButton from "./AnswerButton";
import ShareButtons from "./ShareButtons";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const Question = (props) => <div>{props.question}</div>;

// Trouver un moyen de faire apparaître le composant réponse avec tuto Pierre
// Créer des tests
// Redécouper le code
// Corriger la css car bug quand redimension
// Renommer les fichiers non composants en camelCase
// Ajouter des raccourcis clavier pour répondre (1-2-Enter par exemple)
// Changer favicon et titre

const Quizz = (props) => {
  const {
    score,
    answerFunction,
    displayNextQuestion,
    answerIsCorrect,
    question,
  } = useGameState();

  const [typeOfButtonClicked, setTypeOfButtonClicked] = useState(
    QUESTION_TYPES.NONE
  );

  const handleButton = (type) => () => {
    if (typeOfButtonClicked === QUESTION_TYPES.NONE) {
      answerFunction(type, setTypeOfButtonClicked);
    }
  };

  const displayNext = () => {
    setTypeOfButtonClicked(QUESTION_TYPES.NONE);
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
          <Question question={question.word} />
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
        {typeOfButtonClicked !== QUESTION_TYPES.NONE && (
          <Answer
            question={question}
            isCorrect={answerIsCorrect}
            displayNext={displayNext}
          />
        )}
      </div>
    </div>
  );
};

export default Quizz;
