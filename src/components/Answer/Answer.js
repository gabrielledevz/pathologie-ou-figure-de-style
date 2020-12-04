import AnswerDetails from "./components/AnswerDetails";
import "./answer.css";

const Answer = ({ question, isCorrect, displayNext }) => {
  return (
    <div className="answer-information">
      <div className="answer-result">
        {isCorrect ? "C'est la bonne réponse !" : "C'est raté !"}
      </div>
      <AnswerDetails question={question} />
      <button
        className="next-button"
        onClick={displayNext}
        data-cy="next-button"
      >
        Suivant
      </button>
    </div>
  );
};

export default Answer;
