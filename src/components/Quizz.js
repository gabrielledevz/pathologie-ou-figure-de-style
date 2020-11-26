import React, { useState } from "react";
import { useGameState } from "../hooks/GameState";
import Answer from "./Answer";
import AnswerButton from "./AnswerButton";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const Question = (props) => <div>{props.question}</div>;

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
        <div className="secret-zone"></div>
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
