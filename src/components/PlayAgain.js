import React, { useContext } from "react";
import ScoreContext from "../context/ScoreContext";
import { NB_QUESTIONS } from "../repositories/Questions.js";

const PlayAgain = (props) => {
  const { score, setScore } = useContext(ScoreContext);

  const startAgain = () => {
    setScore(0);
    props.startNewGame();
  };

  return (
    <div className="game-done">
      <div className="game-done-panel">
        <div className="message">Merci d'avoir joué !</div>
        <div className="final-score">
          <p>Votre score</p>
          <div className="final-score-number">
            {" "}
            {score} / {NB_QUESTIONS}
          </div>
        </div>
        <button onClick={startAgain}>Recommencer</button>
      </div>
    </div>
  );
};

export default PlayAgain;
