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
      <p className="exemple">Exemple : {props.question.example}</p>
    )}

    <WikipediaLink request={props.question.word} />
  </div>
);

const WikipediaLink = (props) => (
  <p>
    <a
      href={`https://fr.wikipedia.org/wiki/${props.request}`}
      className="wikipedia-link"
      target="_blank"
      rel="noreferrer"
    >
      Aller sur l'article Wikipédia
    </a>
  </p>
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
