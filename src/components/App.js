import React, { useState } from "react";
import styles from "./app.module.css";
import Quizz from "./Quizz";
import PlayAgain from "./PlayAgain";
import GameContext from "../context/gameContext";

const App = () => {
  const [gameIsOn, setGameIsOn] = useState(true);
  const [score, setScore] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const value = { score, setScore, gameNumber, setGameNumber };

  return (
    <GameContext.Provider value={value}>
      <div className={styles.window}>
        <header>
          <a
            href="https://github.com/gabrielledevz"
            target="_blank"
            rel="noreferrer"
          >
            ✎ par gaboule
          </a>
        </header>
        <div className={styles.title}>
          <div>Pathologie ou figure de style ?</div>
        </div>
        <div className={styles.game}>
          {gameIsOn ? (
            <Quizz endTheGame={() => setGameIsOn(false)} />
          ) : (
            <PlayAgain startNewGame={() => setGameIsOn(true)} />
          )}
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default App;
