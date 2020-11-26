import React, { useState, useContext } from "react";
//import { shuffleArray } from "./utils";
import ScoreContext from "../ScoreContext";
import { GAME_QUESTIONS, NB_QUESTIONS } from "./Questions.js";

const MAX_ID = NB_QUESTIONS - 1;

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
};

const Question = (props) => <div>{props.question}</div>;

const AnswerResult = (props) => (
  <div className="answer-result">
    {props.isCorrect ? "C'est la bonne réponse !" : "C'est raté !"}
  </div>
);

const AnswerInfo = (props) => (
  <div className="info-zone">
    <div className="definition">
      <em>
        {props.question.word}, {props.question.genre} :
      </em>{" "}
      {props.question.definition}
    </div>
    {props.question.type === QUESTION_TYPES.FIGURE && (
      <p className="exemple">Exemple : {props.example}</p>
    )}

    <WikipediaLink request={props.word} />
  </div>
);

// Ajouter animation pour apparition de la réponse ? Plus difficile

const AnswerPart = (props) => {
  return (
    <div className="answer-information">
      <AnswerResult isCorrect={props.isCorrect} />
      <AnswerInfo question={props.question} />
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

// + animations sur les boutons
const AnswerButton = (props) => {
  const deactivateButton = props.typeClicked !== "none";
  return (
    <button
      disabled={deactivateButton}
      className={`answer-button ${
        deactivateButton && props.typeClicked === props.buttonType
          ? "button-selected"
          : ""
      }`}
      onClick={props.onClick}
    >
      {props.buttonType === QUESTION_TYPES.FIGURE
        ? "Figure de style"
        : "Pathologie"}
    </button>
  );
};

const useGameState = () => {
  const { score, setScore } = useContext(ScoreContext);

  const [questionId, setQuestionId] = useState(0);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const answerFunction = (buttonType, setTypeOfButtonClicked) => {
    const correctlyAnswered = buttonType === GAME_QUESTIONS[questionId].type;
    setAnswerIsCorrect(correctlyAnswered);
    setScore(correctlyAnswered ? score + 1 : score);
    setTypeOfButtonClicked(buttonType);
  };

  const displayNextQuestion = () => {
    setQuestionId(questionId + 1);
  };

  return {
    score,
    questionId,
    answerFunction,
    displayNextQuestion,
    answerIsCorrect,
  };
};

const Quizz = (props) => {
  const {
    score,
    questionId,
    answerFunction,
    displayNextQuestion,
    answerIsCorrect,
  } = useGameState();

  const [typeOfButtonClicked, setTypeOfButtonClicked] = useState("none");

  const question = GAME_QUESTIONS[questionId];

  const handleButton = (type) => () => {
    if (typeOfButtonClicked === "none") {
      answerFunction(type, setTypeOfButtonClicked);
    }
  };

  const displayNext = () => {
    displayNextQuestion();
    setTypeOfButtonClicked("none");
  };

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
            buttonType={QUESTION_TYPES.PATHOLOGIE}
            typeClicked={typeOfButtonClicked}
          />
          <AnswerButton
            onClick={handleButton(QUESTION_TYPES.FIGURE)}
            buttonType={QUESTION_TYPES.FIGURE}
            typeClicked={typeOfButtonClicked}
          />
        </div>
        {typeOfButtonClicked !== "none" && (
          <AnswerPart
            question={question}
            isCorrect={answerIsCorrect}
            displayNext={questionId < MAX_ID ? displayNext : props.endTheGame}
          />
        )}
      </div>
    </div>
  );
};

export default Quizz;
