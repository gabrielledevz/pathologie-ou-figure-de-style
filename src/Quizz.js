import React, { useState, useContext, useEffect } from "react";
import GAME_DATA from "./data/gamedata";
import GAME_DATA_TEST from "./data/gamedata-test";
import { shuffleArray } from "./utils";
import ScoreContext from "./ScoreContext";

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = shuffleArray(GAME_DATA_TEST);
const MAX_ID = GAME_QUESTIONS.length - 1;

const QUESTION_TYPES = {
  PATHOLOGIE: 0,
  FIGURE: 1,
};

const GAME_STATES = {
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
          <em>
            {question.word}, {question.genre} :
          </em>{" "}
          {question.definition}
        </div>
        {question.type === QUESTION_TYPES.FIGURE && (
          <p className="exemple">Exemple : {question.example}</p>
        )}
        <WikipediaLink request={question.word} />
      </div>
      <button className="next-button" onClick={props.displayNext}>
        Suivant
      </button>
    </div>
  );
};

const WikipediaLink = (props) => (
  <p>
    <a
      href={`https://fr.wikipedia.org/wiki/${props.request}`}
      className="wikipedia-link"
      target="_blank"
      rel="noreferrer"
    >
      Chercher {props.keyword} sur Wikipedia
    </a>
  </p>
);

const AnswerButton = (props) => {
  const [hasBeenSelected, setHasBeenSelected] = useState(false);

  const handleClick = () => {
    props.onClick();
    setHasBeenSelected(true);
  };

  return (
    <button
      disabled={props.disabled}
      className={`answer-button ${
        props.disabled && hasBeenSelected ? "button-selected" : ""
      }`}
      onClick={handleClick}
    >
      {props.type === QUESTION_TYPES.FIGURE ? "Figure de style" : "Pathologie"}
    </button>
  );
};

const useGameState = () => {
  const { score, setScore } = useContext(ScoreContext);

  const [questionId, setQuestionId] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);

  // Introduits parce que seule méthode trouvée pour reset l'état du bouton après le clic sur le bouton Suivant
  // Mais lourd, et cette solution d'initialiser la clé de figure à 1000 euh...
  const [buttonKeys, setButtonKeys] = useState([0, 1000]);

  const answerFunction = (buttonType, score, setScore) => {
    const answerIsCorrect = buttonType === GAME_QUESTIONS[questionId].type;
    setGameStatus(answerIsCorrect ? GAME_STATES.CORRECT : GAME_STATES.WRONG);
    setScore(answerIsCorrect ? score + 1 : score);
  };

  const displayNextQuestion = () => {
    if (questionId < MAX_ID) {
      setQuestionId(questionId + 1);
      setGameStatus(GAME_STATES.PENDING);
      setButtonKeys(buttonKeys.map((k) => k + 1));
    }
  };

  return {
    score,
    setScore,
    questionId,
    answerFunction,
    displayNextQuestion,
    gameStatus,
    buttonKeys,
  };
};

const Quizz = (props) => {
  const {
    score,
    setScore,
    questionId,
    answerFunction,
    displayNextQuestion,
    gameStatus,
    buttonKeys,
  } = useGameState();

  const question = GAME_QUESTIONS[questionId];

  const handleButton = (type) => () => {
    if (gameStatus === null || gameStatus === GAME_STATES.PENDING) {
      answerFunction(type, score, setScore);
    }
  };

  const answerSubmitted =
    gameStatus === GAME_STATES.CORRECT || gameStatus === GAME_STATES.WRONG;

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
            disabled={answerSubmitted}
            type={QUESTION_TYPES.PATHOLOGIE}
            key={buttonKeys[QUESTION_TYPES.PATHOLOGIE]}
          />
          <AnswerButton
            onClick={handleButton(QUESTION_TYPES.FIGURE)}
            disabled={answerSubmitted}
            type={QUESTION_TYPES.FIGURE}
            key={buttonKeys[QUESTION_TYPES.FIGURE]}
          />
        </div>
        {answerSubmitted && (
          <AnswerPart
            question={question}
            answerStatus={gameStatus}
            displayNext={
              questionId < MAX_ID ? displayNextQuestion : props.endTheGame
            }
          />
        )}
      </div>
    </div>
  );
};

export default Quizz;
