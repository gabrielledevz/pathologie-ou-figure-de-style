import React, { useState } from "react";
import "./App.css";
import Quizz from "./Quizz";
import PlayAgain from "./PlayAgain";
import ScoreContext from "../ScoreContext";

const Game = () => {
  const Titre = () => <div>Pathologie ou figure de style ?</div>;

  const [gameIsOn, setGameIsOn] = useState(true);
  const [score, setScore] = useState(0);
  const value = { score, setScore };

  return (
    <ScoreContext.Provider value={value}>
      <div className="window">
        <div className="title">
          <Titre />
        </div>
        <div className="game">
          {gameIsOn ? (
            <Quizz endTheGame={() => setGameIsOn(false)} />
          ) : (
            <PlayAgain startNewGame={() => setGameIsOn(true)} />
          )}
        </div>
      </div>
    </ScoreContext.Provider>
  );
};

export default Game;
