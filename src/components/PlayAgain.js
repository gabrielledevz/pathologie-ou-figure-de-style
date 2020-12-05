import React, { useContext } from "react";
import GameContext from "../context/gameContext";
import styles from "./playagain.module.css";
import {
  NB_QUESTIONS_PER_GAME,
  MAX_GAME_NUMBER,
} from "../repositories/questions";

const PlayAgain = ({ startNewGame }) => {
  const { score, setScore, gameNumber, setGameNumber } = useContext(
    GameContext
  );

  const startAgain = () => {
    setScore(0);
    setGameNumber((gameNumber + 1) % MAX_GAME_NUMBER);
    startNewGame();
  };

  const isLastGame = MAX_GAME_NUMBER === gameNumber + 1;

  const ScoreComment = () => {
    if (score > 13) {
      return <p>Belle performance !</p>;
    } else if (score > 10) {
      return <p>Pas mal du tout !</p>;
    } else {
      return <p>Pas simple n'est-ce pas ?</p>;
    }
  };

  return (
    <div className={styles.gameDone}>
      <div className={styles.gameDonePanel}>
        <div className={styles.scoreComment}>
          <ScoreComment />
        </div>
        <div className={styles.finalScore}>
          <p>Votre score</p>
          <div className={styles.finalScoreNumber}>
            {" "}
            {score}/{NB_QUESTIONS_PER_GAME}
          </div>
        </div>
        {MAX_GAME_NUMBER === gameNumber + 1 && (
          <p>Vous avez répondu à toutes les questions du jeu !</p>
        )}
        <button
          className={`${styles.restartButton} ${styles.hvrUnderlineFromLeft}`}
          onClick={startAgain}
          data-cy="play-again-button"
        >
          {isLastGame ? "Rejouer au jeu" : "Continuer à jouer"}
        </button>
      </div>
    </div>
  );
};

export default PlayAgain;
