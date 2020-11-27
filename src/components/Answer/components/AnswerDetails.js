import WikipediaLink from "./WikipediaLink";

const WIKI_ENABLE = false;
const esp = "\u00a0";

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
        Exemple : «{esp}
        {example}
        {esp}» —{esp}
        {author}, <em>{source}</em>
      </p>
    )}
    {WIKI_ENABLE && <WikipediaLink request={word} />}
  </div>
);

export default AnswerDetails;
