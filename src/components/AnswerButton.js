import React from "react";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const AnswerButton = (props) => (
  <button
    disabled={props.typeClicked !== QUESTION_TYPES.NONE}
    className={`answer-button ${
      props.typeClicked === props.buttonType ? "button-selected" : ""
    }`}
    onClick={props.onClick}
  >
    {props.buttonType === QUESTION_TYPES.FIGURE
      ? "Figure de style"
      : "Pathologie"}
  </button>
);

export default AnswerButton;
