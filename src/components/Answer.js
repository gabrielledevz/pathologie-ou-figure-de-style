const AnswerDetails = (props) => (
  <div className="info-zone">
    <div className="definition">
      <em>
        {props.question.word}, {props.question.genre} :
      </em>{" "}
      {props.question.definition}
    </div>
    {props.question.example && (
      <p className="example">
        Exemple : {props.question.example} — {props.question.author},{" "}
        <em>{props.question.book}</em>
      </p>
    )}
  </div>
);

const WikipediaLink = (word) => (
  <a
    href={`https://fr.wikipedia.org/wiki/${word}`}
    className="wikipedia-link"
    target="_blank"
    rel="noreferrer"
  >
    Aller sur l'article Wikipédia
  </a>
);

// Ajouter animation pour apparition de la réponse ? Plus difficile

const Answer = (props) => {
  return (
    <div className="answer-information">
      <div className="answer-result">
        {props.isCorrect ? "C'est la bonne réponse !" : "C'est raté !"}
      </div>
      <AnswerDetails question={props.question} />
      <button className="next-button" onClick={props.displayNext}>
        Suivant
      </button>
    </div>
  );
};

export default Answer;
