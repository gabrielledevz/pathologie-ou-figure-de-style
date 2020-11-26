const QUESTION_TYPES = {
  PATHOLOGIE: "pathologie",
  FIGURE: "figure",
  NONE: "none",
};

const AnswerDetails = (props) => (
  <div className="info-zone">
    <div className="definition">
      <em>
        {props.question.word}, {props.question.genre} :
      </em>{" "}
      {props.question.definition}
    </div>
    {props.question.type === QUESTION_TYPES.FIGURE && (
      <p className="example">
        Exemple : {props.question.example} — {props.question.author},{" "}
        <em>{props.question.book}</em>
      </p>
    )}
    <WikipediaLink request={props.question.word} />
  </div>
);

const WikipediaLink = (props) => (
  <a
    href={`https://fr.wikipedia.org/wiki/${props.request}`}
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
