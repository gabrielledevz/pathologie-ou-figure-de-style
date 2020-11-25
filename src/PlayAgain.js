import React, { useContext, useEffect } from "react";
import ScoreContext from "./ScoreContext";
// Enlever le nombre de questions en dur !

const PlayAgain = (props) => {
  const { score, setScore } = useContext(ScoreContext);

  useEffect(() => {
    return () => {
      setScore(0);
    };
  });

  return (
    <div className="game-done">
      <div className="game-done-panel">
        <div className="message">Merci d'avoir joué !</div>
        <div className="final-score">
          <p>Votre score</p>
          <div className="final-score-number"> {score} / X</div>
        </div>
        <button onClick={props.startNewGame}>Recommencer</button>
      </div>
    </div>
  );
};

export default PlayAgain;
