import { useContext, useState } from "react";
import GameContext from "../context/gameContext";
import {
  QUESTION_DATABASE,
  NB_QUESTIONS_PER_GAME,
} from "../repositories/questions";

export const useGameState = () => {
  const { score, setScore, gameNumber } = useContext(GameContext);
  const [questionId, setQuestionId] = useState(0);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

  const GAME_QUESTIONS = QUESTION_DATABASE.slice(
    gameNumber * NB_QUESTIONS_PER_GAME,
    gameNumber * NB_QUESTIONS_PER_GAME + NB_QUESTIONS_PER_GAME
  );

  const answerFunction = (buttonType) => {
    const correctlyAnswered = buttonType === question.type;
    setAnswerIsCorrect(correctlyAnswered);
    setScore(correctlyAnswered ? score + 1 : score);
  };

  const moveOnNextQuestion = () => {
    if (questionId === NB_QUESTIONS_PER_GAME - 1) {
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
    moveOnNextQuestion,
    answerIsCorrect,
    question,
  };
};
