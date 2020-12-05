import React, { useState } from "react";
import { useGameState } from "../hooks/gameState";
import Answer from "./Answer/Answer";
import AnswerButton from "./AnswerButton";
import ShareButtons from "./ShareButtons";
import { CSSTransition } from "react-transition-group";
import styles from "./quizz.module.css";

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
    <div className={styles.quizz}>
      <div className={styles.upperPart}>
        <div className={styles.share}>
          <ShareButtons />
        </div>
        <div className={styles.question}>
          <CSSTransition
            in={!answerDisplayed}
            timeout={1000}
            classNames={{
              enter: styles.questionEnter,
              enterActive: styles.questionEnterActive,
            }}
          >
            <div data-cy="question">{question.word}</div>
          </CSSTransition>
        </div>

        <div className={styles.score}>
          <p>Score</p>
          <CSSTransition
            in={answerIsCorrect && answerDisplayed}
            timeout={500}
            classNames={{
              enter: styles.scoreEnter,
              enterActive: styles.scoreEnterActive,
            }}
          >
            <div className={styles.scoreNumber} data-cy="score">
              {score}
            </div>
          </CSSTransition>
        </div>
      </div>
      <div className={styles.lowerPart}>
        <div className={styles.playerChoice}>
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
          classNames={{
            enter: styles.answerEnter,
            enterActive: styles.answerEnterActive,
            exit: styles.answerExit,
            exitActive: styles.answerExitActive,
          }}
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
