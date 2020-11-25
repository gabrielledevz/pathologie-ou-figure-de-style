import React, { useState } from "react";
import GAME_DATA from "./data/gamedata";
import GAME_DATA_TEST from "./data/gamedata-test";
import { shuffleArray } from "./utils";

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = shuffleArray(GAME_DATA);
const MAX_ID = GAME_QUESTIONS.length - 1;

const QUESTION_TYPES = {
  FIGURE: "figure",
  PATHOLOGIE: "pathologie",
};

// remettre une seule classe pour les boutons de réponse

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

const WikipediaLink = (props) => {
  return (
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
};

const AnswerButton = (props) => (
  <button
    disabled={props.disabled}
    className={`answer-button ${props.className}`}
    onClick={props.onClick}
  >
    {props.type === QUESTION_TYPES.FIGURE ? "Figure de style" : "Pathologie"}
  </button>
);

const useGameState = () => {
  const [questionId, setQuestionId] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);

  const answerFunction = (buttonType, score, setScore) => {
    const answerIsCorrect = buttonType === GAME_QUESTIONS[questionId].type;
    setGameStatus(answerIsCorrect ? GAME_STATES.CORRECT : GAME_STATES.WRONG);
    setScore(answerIsCorrect ? score + 1 : score);
  };

  const displayNextQuestion = () => {
    if (questionId < MAX_ID) {
      setQuestionId(questionId + 1);
      setGameStatus(GAME_STATES.PENDING);
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
    if (gameStatus === null || gameStatus === GAME_STATES.PENDING) {
      answerFunction(type, score, setScore);
    }
  };

  console.log("game status : " + gameStatus);

  // Ne marche pas pour la gestion du style : en mettant le même style aux deux boutons alors les deux seront bleus après click sur l'un des deux
  // il faudrait un style pour le bouton cliqué, même si ça n'empêche pas de désactiver les boutons...
  // Peut-être pas très propre de faire comme ça, cf au-dessus

  const disableButtons =
    gameStatus === GAME_STATES.CORRECT || gameStatus === GAME_STATES.WRONG;

  console.log("buttons disabled ? " + disableButtons);

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
            className="pathologie-button"
            onClick={handleButton(
              QUESTION_TYPES.PATHOLOGIE,
              props.score,
              props.updateScore
            )}
            disabled={disableButtons}
            type={QUESTION_TYPES.PATHOLOGIE}
          />
          <AnswerButton
            className="figure-button"
            onClick={handleButton(
              QUESTION_TYPES.FIGURE,
              props.score,
              props.updateScore
            )}
            disabled={disableButtons}
            type={QUESTION_TYPES.FIGURE}
          />
        </div>
        {(gameStatus === GAME_STATES.CORRECT ||
          gameStatus === GAME_STATES.WRONG) && (
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
