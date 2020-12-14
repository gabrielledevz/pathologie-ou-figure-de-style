import WikipediaLink from "./WikipediaLink";
import styles from "./answerdetails.module.css";

const WIKI_ENABLED = false;
const esp = "\u00a0";

const AnswerDetails = ({
  question: { word, genre, definition, example, author, source },
}) => (
  <div className={styles.infoZone}>
    <div className={styles.definition}>
      <em>
        {word}, {genre}
        {esp}:
      </em>{" "}
      {definition}
    </div>
    {example && (
      <p className={styles.example}>
        Exemple : «{esp}
        {example}
        {esp}» —{esp}
        {author ? `${author}, ` : ""}
        <em>{source}</em>
      </p>
    )}
    {WIKI_ENABLED && <WikipediaLink request={word} />}
  </div>
);

export default AnswerDetails;
