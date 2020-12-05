import AnswerDetails from "./components/AnswerDetails";
import styles from "./answer.module.css";

const Answer = ({ question, isCorrect, displayNext }) => {
  return (
    <div className={styles.answerInformation}>
      <div className={styles.answerResult}>
        {isCorrect ? "C'est la bonne réponse !" : "C'est raté !"}
      </div>
      <AnswerDetails question={question} />
      <button
        className={styles.nextButton}
        onClick={displayNext}
        data-cy="next-button"
      >
        Suivant
      </button>
    </div>
  );
};

export default Answer;
