import React, { useContext } from "react";
import ScoreContext from "../context/scoreContext";
import "./playagain.css";
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
    <div className="game-done">
      <div className="game-done-panel">
        <div className="score-comment">
          <ScoreComment />
        </div>
        <div className="final-score">
          <p>Votre score</p>
          <div className="final-score-number">
            {" "}
            {score}/{NB_QUESTIONS_PER_GAME}
          </div>
        </div>
        {MAX_GAME_NUMBER === gameNumber + 1 && (
          <p>Vous avez répondu à toutes les questions du jeu !</p>
        )}
        <button
          className="restart-button hvr-underline-from-left"
          onClick={startAgain}
        >
          {isLastGame ? "Rejouer au jeu" : "Continuer à jouer"}
        </button>
      </div>
    </div>
  );
};

export default PlayAgain;
