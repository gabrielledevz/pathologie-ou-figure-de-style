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

const YourAnswer = (props) => (
  <div className="message">
    {props.correctAnswer
      ? "C'est la bonne réponse !"
      : "Vous vous êtes trompé."}
  </div>
);

const Gotowikipage = (props) => (
  <button className="infoButton" onClick={() => props.onClick(props.keyword)}>
    Chercher {props.keyword} sur Wikipedia
  </button>
);

const NextButton = (props) => (
  <button className="nextButton" onClick={props.onClick}>
    Suivant
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
  const [isCorrect, setIsCorrect] = useState(true);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const answerFunction = (nature) => {
    const answerIsCorrect = nature === GAME_QUESTIONS[questionId].type;

    setIsCorrect(answerIsCorrect);
    setScore(answerIsCorrect ? score + 1 : score);
    setQuestionAnswered(true);

    if (questionId < MAX_ID - 1) {
      setQuestionId(questionId + 1);
    }
  };

  const resetQuestionAnswered = () => {
    setQuestionAnswered(false);
  };

  return {
    questionId,
    score,
    answerFunction,
    isCorrect,
    questionAnswered,
    resetQuestionAnswered,
  };
};

const Figures = () => {
  const {
    questionId,
    score,
    isCorrect,
    answerFunction,
    questionAnswered,
    resetQuestionAnswered,
  } = useGameState();

  const gameStatus = questionId === MAX_ID ? "fini" : "actif";

  const onButtonClick = (nature) => {
    if (gameStatus === "actif" && !questionAnswered) {
      answerFunction(nature);
    }
  };

  const question = GAME_QUESTIONS[questionId];

  const goToPage = (keyword) => {
    const url = "https://fr.wikipedia.org/wiki/" + keyword;
    console.log("url " + url);
    window.open(url, "_blank");
  };

  const displayNext = () => {
    resetQuestionAnswered();
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
              gameStatus === "actif"
                ? questionAnswered
                  ? GAME_QUESTIONS[questionId - 1].value
                  : question.value
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
        <div className="answerzone">
          <FigureButton onClick={onButtonClick} />
          <PathologieButton onClick={onButtonClick} />
        </div>
        {questionAnswered && (
          <div className="information">
            <YourAnswer correctAnswer={isCorrect} />
            <div className="wikizone">
              <div className="definition">
                {GAME_QUESTIONS[questionId - 1].definition}
              </div>
              <Gotowikipage
                onClick={goToPage}
                keyword={GAME_QUESTIONS[questionId - 1].value}
              />
            </div>
            <NextButton onClick={displayNext} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Figures;
