import React, { useState } from "react";
import GAME_DATA from "./data/gamedata";
//import GAME_DATA_TEST from "./data/gamedata-test";
import "./App.css";
import { shuffleArray } from "./utils";

// Styles de bouton : signifier que tel bouton a été cliqué en affichant les infos (griser par ex)

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = shuffleArray(GAME_DATA);
const MAX_ID = GAME_QUESTIONS.length - 1;

const Titre = () => <div>Pathologie ou figure de style ?</div>;

const Question = (props) => <div>{props.question}</div>;

const AnswerResult = (props) => (
  <div className="answer-result">
    {props.answerStatus === "correct"
      ? "C'est la bonne réponse !"
      : props.answerStatus === "wrong"
      ? "Vous vous êtes trompé."
      : ""}
  </div>
);

const AnswerInfo = (props) => (
  <div className="answer-information">
    <AnswerResult answerStatus={props.result} />
    <div className="infozone">
      <div className="definition">
        {props.question.value}, {props.question.genre} :{" "}
        {props.question.definition}
      </div>
      {props.question.type === "figure" && (
        <div className="exemple">Exemple : {props.question.exemple}</div>
      )}
      <Gotowikipage keyword={props.question.value} />
    </div>
    <button className="nextButton" onClick={props.displayNext}>
      Question suivante
    </button>
  </div>
);

const Gotowikipage = (props) => {
  const goToPage = (keyword) => {
    const url = "https://fr.wikipedia.org/wiki/" + keyword;
    window.open(url, "_blank");
  };
  return (
    <button className="infoButton" onClick={() => goToPage(props.keyword)}>
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
  const [gameStatus, setGameStatus] = useState("begin");

  const answerFunction = (nature) => {
    const answerIsCorrect = nature === GAME_QUESTIONS[questionId].type;

    setGameStatus(answerIsCorrect ? "correct" : "wrong");
    setScore(answerIsCorrect ? score + 1 : score);
  };

  const displayNextQuestion = () => {
    if (questionId < MAX_ID - 1) {
      setQuestionId(questionId + 1);
      setGameStatus("pending");
    } else {
      setGameStatus("end");
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

  //  const gameStatus = questionId === MAX_ID ? "fini" : "actif";

  const onButtonClick = (nature) => {
    if (gameStatus === "begin" || gameStatus === "pending") {
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
              gameStatus !== "end" ? question.value : "Merci d'avoir joué !"
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
        {gameStatus !== "pending" && gameStatus !== "begin" && (
          <AnswerInfo
            result={gameStatus}
            question={question}
            displayNext={displayNext}
          />
        )}
      </div>
    </div>
  );
};

export default Figures;
