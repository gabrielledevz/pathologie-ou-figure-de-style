import styles from "./answerbutton.module.css";

const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const AnswerButton = ({ typeClicked, buttonType, onClick, goodAnswer }) => {
  const clickedButton = typeClicked === buttonType;
  return (
    <div className={styles.answerButtonZone}>
      {goodAnswer && clickedButton && (
        <p className={styles.scoreIncrease}>+1</p>
      )}
      <button
        disabled={typeClicked !== QUESTION_TYPES.NONE}
        className={`${styles.answerButton} ${
          clickedButton
            ? `${styles.buttonSelected} ${
                goodAnswer ? "" : `${styles.wobbling}`
              }`
            : ""
        }`}
        onClick={onClick}
        data-cy="answer-button"
      >
        {buttonType === QUESTION_TYPES.FIGURE
          ? "Figure de style"
          : "Pathologie"}
      </button>
    </div>
  );
};

export default AnswerButton;
