import { useContext, useState } from "react";
import ScoreContext from "../context/ScoreContext";
import { GAME_QUESTIONS, NB_QUESTIONS } from "../repositories/Questions.js";

export const useGameState = () => {
  const { score, setScore } = useContext(ScoreContext);
  const [questionId, setQuestionId] = useState(0);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const answerFunction = (buttonType, setTypeOfButtonClicked) => {
    const correctlyAnswered = buttonType === question.type;
    setAnswerIsCorrect(correctlyAnswered);
    setScore(correctlyAnswered ? score + 1 : score);
    setTypeOfButtonClicked(buttonType);
  };

  const displayNextQuestion = () => {
    if (questionId === NB_QUESTIONS - 1) {
      return false;
    } else {
      setQuestionId(questionId + 1);
      return true;
    }
  };

  const question = GAME_QUESTIONS[questionId];

  return {
    score,
    answerFunction,
    displayNextQuestion,
    answerIsCorrect,
    question,
  };
};
