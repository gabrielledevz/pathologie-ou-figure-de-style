import WikipediaLink from "./WikipediaLink";

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

export default AnswerDetails;
