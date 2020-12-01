import React, { useState } from "react";
import "./app.css";
import Quizz from "./Quizz";
import PlayAgain from "./PlayAgain";
import ScoreContext from "../context/scoreContext";

const Game = () => {
  const [gameIsOn, setGameIsOn] = useState(true);
  const [score, setScore] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const value = { score, setScore, gameNumber, setGameNumber };

  return (
    <ScoreContext.Provider value={value}>
      <div className="window">
        <div className="title">
          <div>Pathologie ou figure de style ?</div>
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
