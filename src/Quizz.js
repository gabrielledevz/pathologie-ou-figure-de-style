import React, { useState } from "react";
import GAME_DATA from "./data/gamedata";
import GAME_DATA_TEST from "./data/gamedata-test";
import { shuffleArray } from "./utils";

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = shuffleArray(GAME_DATA_TEST);
const MAX_ID = GAME_QUESTIONS.length - 1;

const QUESTION_TYPES = {
  FIGURE: "figure",
  PATHOLOGIE: "pathologie",
};

const GAME_STATES = {
  BEGIN: "begin",
  END: "end",
  CORRECT: "correct",
  WRONG: "wrong",
  PENDING: "pending",
};

const Question = (props) => <div>{props.question}</div>;

const AnswerResult = (props) => (
  <div className="answer-result">
    {props.answerStatus === GAME_STATES.CORRECT && "C'est la bonne réponse !"}
    {props.answerStatus === GAME_STATES.WRONG && "C'est raté !"}
  </div>
);

const AnswerPart = (props) => {
  const question = props.question;
  return (
    <div className="answer-information">
      <AnswerResult answerStatus={props.answerStatus} />
      <div className="info-zone">
        <div className="definition">
          {question.word}, {question.genre} : {question.definition}
        </div>
        {question.type === QUESTION_TYPES.FIGURE && (
          <div className="exemple">Exemple : {question.example}</div>
        )}
        <WikipediaLink request={question.word} />
      </div>
      <button onClick={props.displayNext}> Suivant</button>
    </div>
  );
};

const WikipediaLink = (props) => {
  return (
    <button
      className="info-button"
      onClick={() =>
        window.open("https://fr.wikipedia.org/wiki/" + props.request, "_blank")
      }
    >
      Chercher {props.keyword} sur Wikipedia
    </button>
  );
};

const AnswerButton = (props) => (
  <button className="answer-button" onClick={props.onClick}>
    {props.type === QUESTION_TYPES.FIGURE ? "Figure de style" : "Pathologie"}
  </button>
);

const useGameState = () => {
  const [questionId, setQuestionId] = useState(0);
  //  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATES.BEGIN);

  const answerFunction = (buttonType, score, setScore) => {
    const answerIsCorrect = buttonType === GAME_QUESTIONS[questionId].type;
    setGameStatus(answerIsCorrect ? GAME_STATES.CORRECT : GAME_STATES.WRONG);
    setScore(answerIsCorrect ? score + 1 : score);
  };

  const displayNextQuestion = () => {
    if (questionId < MAX_ID) {
      setQuestionId(questionId + 1);
      setGameStatus(GAME_STATES.PENDING);
    } else {
      setGameStatus(GAME_STATES.END);
    }
  };

  return {
    questionId,
    answerFunction,
    displayNextQuestion,
    gameStatus,
  };
};

const Quizz = (props) => {
  const {
    questionId,
    answerFunction,
    displayNextQuestion,
    gameStatus,
  } = useGameState();

  const question = GAME_QUESTIONS[questionId];

  const displayNext = () => {
    displayNextQuestion();
  };

  const handleButton = (type, score, setScore) => () => {
    if (
      gameStatus === GAME_STATES.BEGIN ||
      gameStatus === GAME_STATES.PENDING
    ) {
      answerFunction(type, score, setScore);
    }
  };

  console.log("game status : " + gameStatus);

  return (
    <div className="whole">
      <div className="middle">
        <div className="secret-zone">blabla</div>
        <div className="question">
          <Question question={question.word} />
        </div>
        <div className="score">
          <p>Score</p>
          <div className="score-number">{props.score}</div>
        </div>
      </div>
      <div className="lower">
        <div className="button-zone">
          <AnswerButton
            onClick={handleButton(
              QUESTION_TYPES.FIGURE,
              props.score,
              props.updateScore
            )}
            type={QUESTION_TYPES.FIGURE}
          />
          <AnswerButton
            onClick={handleButton(
              QUESTION_TYPES.PATHOLOGIE,
              props.score,
              props.updateScore
            )}
            type={QUESTION_TYPES.PATHOLOGIE}
          />
        </div>
        {gameStatus !== GAME_STATES.PENDING &&
          gameStatus !== GAME_STATES.BEGIN && (
            <AnswerPart
              question={question}
              answerStatus={gameStatus}
              displayNext={questionId < MAX_ID ? displayNext : props.endTheGame}
            />
          )}
      </div>
    </div>
  );
};

export default Quizz;
