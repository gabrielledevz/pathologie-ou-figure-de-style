import React from "react";

const GameContext = React.createContext({
  score: 0,
  setScore: () => {},
  gameNumber: 1,
  setGameNumber: () => {},
});

export const GameProvider = GameContext.Provider;
export const GameConsumer = GameContext.Consumer;

export default GameContext;
