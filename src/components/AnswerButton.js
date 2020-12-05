import styles from "./answerbutton.module.css";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const AnswerButton = ({ typeClicked, buttonType, onClick }) => (
  <button
    disabled={typeClicked !== QUESTION_TYPES.NONE}
    className={`${styles.answerButton} ${
      typeClicked === buttonType ? `${styles.buttonSelected}` : ""
    }`}
    onClick={onClick}
    data-cy="answer-button"
  >
    {buttonType === QUESTION_TYPES.FIGURE ? "Figure de style" : "Pathologie"}
  </button>
);

export default AnswerButton;
