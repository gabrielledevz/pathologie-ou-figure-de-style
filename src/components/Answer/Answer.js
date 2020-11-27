import WikipediaLink from "./components/WikipediaLink";

const AnswerDetails = ({
  question: { word, genre, definition, example, author, source },
}) => (
  <div className="info-zone">
    <div className="definition">
      <em>
        {word}, {genre} :
      </em>{" "}
      {definition}
    </div>
    {example && (
      <p className="example">
        Exemple : {example} — {author}, <em>{source}</em>
      </p>
    )}
    <WikipediaLink request={word} />
  </div>
);

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
