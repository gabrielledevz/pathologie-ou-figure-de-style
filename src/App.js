import React, { useState } from "react";
import GAME_DATA from "./data/gamedata";
//import GAME_DATA_TEST from "../data/gamedata-test";
import utils from "./math-utils";

// Replace GAME_DATA_TEST with GAME_DATA for actual questions
const GAME_QUESTIONS = utils.shuffleArray(GAME_DATA);
const MAX_ID = GAME_QUESTIONS.length - 1;

const Question = (props) => <div>{props.question}</div>;

const YourAnswer = (props) => (
  <div className="message">
    {props.correctAnswer
      ? "C'est la bonne réponse !"
      : "Vous vous êtes trompé."}
  </div>
);

const Gotowikipage = (props) => (
  <button className="infoButton" onClick={() => props.clic(props.keyword)}>
    Chercher {props.keyword} sur Wikipedia
  </button>
);

const FigureButton = (props) => (
  <button className="answerButton" onClick={() => props.perform("figure")}>
    Figure de style
  </button>
);

const PathologieButton = (props) => (
  <button className="answerButton" onClick={() => props.perform("pathologie")}>
    Pathologie
  </button>
);

const useGameState = () => {
  const [questionId, setQuestionId] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);

  const answerFunction = (nature) => {
    const answerIsCorrect = nature === GAME_QUESTIONS[questionId].type;

    setIsCorrect(answerIsCorrect);
    setScore(answerIsCorrect ? score + 1 : score);

    if (questionId < MAX_ID - 1) {
      setQuestionId(questionId + 1);
    }
  };

  return {
    questionId,
    score,
    answerFunction,
    isCorrect,
  };
};

const Figures = () => {
  const { questionId, score, isCorrect, answerFunction } = useGameState();

  const gameStatus = questionId === MAX_ID ? "fini" : "actif";

  const onButtonClicka = (nature) => {
    if (gameStatus === "actif") {
      answerFunction(nature);
    }
  };

  const question = GAME_QUESTIONS[questionId];

  const goToPage = (keyword) => {
    const url = "https://fr.wikipedia.org/wiki/" + keyword;
    console.log("url " + url);
    window.open(url, "_blank");
  };

  return (
    <div className="body">
      <div className="score">Score : {score}</div>
      <div>
        <Question
          question={
            gameStatus === "actif" ? question.value : "Merci d'avoir joué !"
          }
        />
      </div>
      <div className="answerzone">
        <FigureButton perform={onButtonClicka} />
        <PathologieButton perform={onButtonClicka} />
        {gameStatus === "actif" && <YourAnswer correctAnswer={isCorrect} />}
      </div>
      <div>
        {questionId > 0 && (
          <Gotowikipage
            clic={goToPage}
            keyword={GAME_QUESTIONS[questionId - 1].value}
          />
        )}
      </div>
    </div>
  );
};

export default Figures;
