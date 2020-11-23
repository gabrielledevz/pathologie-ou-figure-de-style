import React, { useState } from "react";
import "./App.css";
import Quizz from "./Quizz";
import PlayAgain from "./PlayAgain";

// Styles de bouton : signifier que tel bouton a été cliqué en affichant les infos (griser par ex)

const Game = () => {
  const Titre = () => <div>Pathologie ou figure de style ?</div>;

  const [gameIsOn, setGameIsOn] = useState(true);
  const [score, setScore] = useState(0);

  const startAgain = () => {
    setScore(0);
    setGameIsOn(true);
  };

  return (
    <div className="window">
      <div className="title">
        <Titre />
      </div>
      <div className="game">
        {gameIsOn ? (
          <Quizz
            score={score}
            updateScore={setScore}
            endTheGame={() => setGameIsOn(false)}
          />
        ) : (
          <PlayAgain
            score={score}
            updateScore={setScore}
            startNewGame={startAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
