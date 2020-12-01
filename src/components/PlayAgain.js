import React, { useContext } from "react";
import ScoreContext from "../context/scoreContext";
import {
  NB_QUESTIONS_PER_GAME,
  MAX_GAME_NUMBER,
} from "../repositories/questions";

const PlayAgain = ({ startNewGame }) => {
  const { score, setScore, gameNumber, setGameNumber } = useContext(
    ScoreContext
  );

  const startAgain = () => {
    setScore(0);
    setGameNumber((gameNumber + 1) % MAX_GAME_NUMBER);
    startNewGame();
  };

  const playAgainText =
    MAX_GAME_NUMBER === gameNumber + 1 ? "Rejouer au jeu" : "Continuer à jouer";

  const thankPlayerText =
    MAX_GAME_NUMBER === gameNumber + 1
      ? "Vous avez répondu à toutes les questions du jeu !"
      : "Merci d'avoir joué !";

  return (
    <div className="game-done">
      <div className="game-done-panel">
        <div className="message-fin">{thankPlayerText}</div>
        <div className="final-score">
          <p>Votre score</p>
          <div className="final-score-number">
            {" "}
            {score}/{NB_QUESTIONS_PER_GAME}
          </div>
        </div>
        <button
          className="restart-button hvr-underline-from-left"
          onClick={startAgain}
        >
          {playAgainText}
        </button>
      </div>
    </div>
  );
};

export default PlayAgain;
