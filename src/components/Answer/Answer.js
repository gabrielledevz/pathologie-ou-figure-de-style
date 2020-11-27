import AnswerDetails from "./components/AnswerDetails";
// Ajouter animation pour apparition de la réponse ? Plus difficile

const Answer = ({ question, isCorrect, displayNext }) => {
  return (
    <div className="answer-information">
      <div className="answer-result">
        {isCorrect ? "C'est la bonne réponse !" : "C'est raté !"}
      </div>
      <AnswerDetails question={question} />
      <button className="next-button" onClick={displayNext}>
        Suivant
      </button>
    </div>
  );
};

export default Answer;
