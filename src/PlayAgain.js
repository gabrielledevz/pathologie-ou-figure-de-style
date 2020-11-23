import React from "react";

const PlayAgain = (props) => (
  <div className="game-done">
    <div className="game-done-panel">
      <div className="message">Merci d'avoir joué !</div>
      <div className="final-score"> {props.score} </div>
      <button onClick={props.startNewGame}>Recommencer</button>
    </div>
  </div>
);

export default PlayAgain;
