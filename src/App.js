import React, { useState } from "react";
//import GAME_DATA from "./data/gamedata";
import GAME_DATA_TEST from "./data/gamedata-test";
import "./App.css";
import { shuffleArray } from "./utils";

// Styles de bouton : signifier que tel bouton a été cliqué en affichant les infos (griser par ex)
// Gérer la fin de partie !

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = shuffleArray(GAME_DATA_TEST);
const MAX_ID = GAME_QUESTIONS.length - 1;

const GAME_STATES = {
  BEGIN: "begin",
  END: "end",
  CORRECT: "correct",
  WRONG: "wrong",
  PENDING: "pending",
};

const Titre = () => <div>Pathologie ou figure de style ?</div>;

const Question = (props) => <div>{props.question}</div>;

const AnswerResult = (props) => (
  <div className="answer-result">
    {props.answerStatus === GAME_STATES.CORRECT && "C'est la bonne réponse !"}
    {props.answerStatus === GAME_STATES.WRONG && "C'est raté !"}
  </div>
);

const AnswerInfo = (props) => {
  const question = props.question;
  return (
    <div className="answer-information">
      <AnswerResult answerStatus={props.result} />
      <div className="infozone">
        <div className="definition">
          {question.word}, {question.genre} : {question.definition}
        </div>
        {question.type === "figure" && (
          <div className="exemple">Exemple : {question.example}</div>
        )}
        <Gotowikipage keyword={question.word} />
      </div>
      <button className="nextButton" onClick={props.displayNext}>
        Question suivante
      </button>
    </div>
  );
};

const Gotowikipage = (props) => {
  return (
    <button
      className="infoButton"
      onClick={() =>
        window.open("https://fr.wikipedia.org/wiki/" + props.keyword, "_blank")
      }
    >
      Chercher {props.keyword} sur Wikipedia
    </button>
  );
};

const FigureButton = (props) => (
  <button className="answerButton" onClick={() => props.onClick("figure")}>
    Figure de style
  </button>
);

const PathologieButton = (props) => (
  <button className="answerButton" onClick={() => props.onClick("pathologie")}>
    Pathologie
  </button>
);

const useGameState = () => {
  const [questionId, setQuestionId] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATES.BEGIN);

  const answerFunction = (nature) => {
    const answerIsCorrect = nature === GAME_QUESTIONS[questionId].type;

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
    score,
    answerFunction,
    displayNextQuestion,
    gameStatus,
  };
};

const Figures = () => {
  const {
    questionId,
    score,
    answerFunction,
    displayNextQuestion,
    gameStatus,
  } = useGameState();

  const onButtonClick = (nature) => {
    if (
      gameStatus === GAME_STATES.BEGIN ||
      gameStatus === GAME_STATES.PENDING
    ) {
      answerFunction(nature);
    }
  };

  const question = GAME_QUESTIONS[questionId];

  const displayNext = () => {
    displayNextQuestion();
  };

  return (
    <div className="window">
      <div className="title">
        <Titre />
      </div>
      <div className="middle">
        <div className="secretzone">blabla</div>
        <div className="question">
          <Question
            question={
              gameStatus !== GAME_STATES.END
                ? question.word
                : "Merci d'avoir joué !"
            }
          />
        </div>
        <div className="score">
          <p>Score</p>
          <div className="scoreNumber">{score}</div>
        </div>
      </div>
      <div className="lower">
        <div className="buttonzone">
          <FigureButton onClick={onButtonClick} />
          <PathologieButton onClick={onButtonClick} />
        </div>
        {gameStatus !== GAME_STATES.PENDING &&
          gameStatus !== GAME_STATES.BEGIN && (
            <AnswerInfo
              question={question}
              result={gameStatus}
              displayNext={displayNext}
            />
          )}
      </div>
    </div>
  );
};

export default Figures;
