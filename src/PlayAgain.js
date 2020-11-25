import React from "react";

// Enlever le nombre de questions en dur !

const PlayAgain = (props) => (
  <div className="game-done">
    <div className="game-done-panel">
      <div className="message">Merci d'avoir joué !</div>
      <div className="final-score">
        <p>Votre score</p>
        <div className="final-score-number"> {props.score} / X</div>
      </div>
      <button onClick={props.startNewGame}>Recommencer</button>
    </div>
  </div>
);

export default PlayAgain;
