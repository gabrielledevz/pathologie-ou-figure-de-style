import React, { useState } from "react";
//import GAME_DATA from "./data/gamedata";
import GAME_DATA_TEST from "./data/gamedata-test";
import "./App.css";
import { shuffleArray } from "./utils";

// Styles de bouton : signifier que tel bouton a été cliqué en affichant les infos (griser par ex)

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = shuffleArray(GAME_DATA_TEST);
const MAX_ID = GAME_QUESTIONS.length - 1;

const Titre = () => <div>Pathologie ou figure de style ?</div>;

const Question = (props) => <div>{props.question}</div>;

const AnswerResult = (props) => (
  <div className="message">
    {props.correctAnswer === "correct"
      ? "C'est la bonne réponse !"
      : props.correctAnswer === "wrong"
      ? "Vous vous êtes trompé."
      : ""}
  </div>
);

const AnswerInfo = (props) => (
  <div className="answer-information">
    <AnswerResult correctAnswer={props.correctAnswer} />
    <div className="infozone">
      <div className="definition">{props.definition}</div>
      <Gotowikipage onClick={props.wikiPageAction} keyword={props.keyword} />
    </div>
    <button className="nextButton" onClick={props.displayNext}>
      Question suivante
    </button>
  </div>
);

const Gotowikipage = (props) => (
  <button className="infoButton" onClick={() => props.onClick(props.keyword)}>
    Chercher {props.keyword} sur Wikipedia
  </button>
);

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
  const [answerStatus, setAnswerStatus] = useState("pending");

  const answerFunction = (nature) => {
    const answerIsCorrect = nature === GAME_QUESTIONS[questionId].type;

    setAnswerStatus(answerIsCorrect ? "correct" : "wrong");
    setScore(answerIsCorrect ? score + 1 : score);
  };

  const displayNextQuestion = () => {
    setAnswerStatus("pending");
    if (questionId < MAX_ID - 1) {
      setQuestionId(questionId + 1);
    }
  };

  return {
    questionId,
    score,
    answerFunction,
    answerStatus,
    displayNextQuestion,
  };
};

const Figures = () => {
  const {
    questionId,
    score,
    answerFunction,
    answerStatus,
    displayNextQuestion,
  } = useGameState();

  const gameStatus = questionId === MAX_ID ? "fini" : "actif";

  const onButtonClick = (nature) => {
    if (gameStatus === "actif" && answerStatus === "pending") {
      answerFunction(nature);
    }
  };

  const question = GAME_QUESTIONS[questionId];

  const goToPage = (keyword) => {
    const url = "https://fr.wikipedia.org/wiki/" + keyword;
    window.open(url, "_blank");
  };

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
              gameStatus === "actif" ? question.value : "Merci d'avoir joué !"
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
        {answerStatus !== "pending" && (
          <AnswerInfo
            correctAnswer={answerStatus}
            definition={question.definition}
            wikiPageAction={goToPage}
            keyword={question.value}
            displayNext={displayNext}
          />
        )}
      </div>
    </div>
  );
};

export default Figures;
