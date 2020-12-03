import React, { useState } from "react";
import { useGameState } from "../hooks/gameState";
import Answer from "./Answer/Answer";
import AnswerButton from "./AnswerButton";
import ShareButtons from "./ShareButtons";
import { CSSTransition } from "react-transition-group";
import "./quizz.css";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const NO_QUESTION_LEFT = false;

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
          <CSSTransition
            in={!answerDisplayed}
            timeout={1000}
            classNames="question"
          >
            <div>{question.word}</div>
          </CSSTransition>
        </div>

        <div className="score">
          <p>Score</p>
          <CSSTransition
            in={answerIsCorrect && answerDisplayed}
            timeout={500}
            classNames="score"
          >
            <div className="score-number">{score}</div>
          </CSSTransition>
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
