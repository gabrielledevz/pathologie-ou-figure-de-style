import styles from "./wikipedialink.module.css";

const WikipediaLink = ({ request }) => {
  return (
    <a
      href={`https://fr.wikipedia.org/wiki/${request}`}
      className={styles.wikipediaLink}
      target="_blank"
      rel="noreferrer"
    >
      Aller sur l'article Wikipédia
    </a>
  );
};

export default WikipediaLink;
