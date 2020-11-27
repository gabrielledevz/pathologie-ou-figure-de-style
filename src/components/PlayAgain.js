import React, { useContext } from "react";
import ScoreContext from "../context/scoreContext";
import { NB_QUESTIONS } from "../repositories/questions";

const PlayAgain = ({ startNewGame }) => {
  const { score, setScore } = useContext(ScoreContext);

  const startAgain = () => {
    setScore(0);
    startNewGame();
  };

  return (
    <div className="game-done">
      <div className="game-done-panel">
        <div className="message-fin">Merci d'avoir joué !</div>
        <div className="final-score">
          <p>Votre score</p>
          <div className="final-score-number">
            {" "}
            {score}/{NB_QUESTIONS}
          </div>
        </div>
        <button
          className="restart-button hvr-underline-from-left"
          onClick={startAgain}
        >
          Refaire une partie
        </button>
      </div>
    </div>
  );
};

export default PlayAgain;
