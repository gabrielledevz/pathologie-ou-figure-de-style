import React, { useState } from "react";
import { useGameState } from "../hooks/GameState";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
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

    <WikipediaLink request={props.question.word} />
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

const AnswerButton = (props) => {
  const deactivateButton = props.typeClicked !== QUESTION_TYPES.NONE;
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

const Quizz = (props) => {
  const {
    score,
    answerFunction,
    displayNextQuestion,
    answerIsCorrect,
    question,
  } = useGameState();

  const [typeOfButtonClicked, setTypeOfButtonClicked] = useState(
    QUESTION_TYPES.NONE
  );

  const handleButton = (type) => () => {
    if (typeOfButtonClicked === QUESTION_TYPES.NONE) {
      answerFunction(type, setTypeOfButtonClicked);
    }
  };

  const displayNext = () => {
    setTypeOfButtonClicked(QUESTION_TYPES.NONE);
    if (!displayNextQuestion()) {
      props.endTheGame();
    }
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
        {typeOfButtonClicked !== QUESTION_TYPES.NONE && (
          <AnswerPart
            question={question}
            isCorrect={answerIsCorrect}
            displayNext={displayNext}
          />
        )}
      </div>
    </div>
  );
};

export default Quizz;
