import React from "react";

const ScoreContext = React.createContext({
  score: 0,
  setScore: () => {},
  gameNumber: 1,
  setGameNumber: () => {},
});

export const ScoreProvider = ScoreContext.Provider;
export const ScoreConsumer = ScoreContext.Consumer;

export default ScoreContext;
