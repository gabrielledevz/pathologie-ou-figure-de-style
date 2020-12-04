import QUIZZ_DATA from "./quizz-data";
//import QUIZZ_DATA_TEST from "./quizz-data-test";
import QUIZZ_DATA_TEST from "./test-small";
import { shuffleArray } from "../utils/shuffleArray";

const urlParams = new URLSearchParams(window.location.search);
const testMode = urlParams.get("testMode");

export const QUESTION_DATABASE = testMode
  ? QUIZZ_DATA_TEST
  : shuffleArray(QUIZZ_DATA);

export const NB_QUESTIONS_PER_GAME = 5;
export const MAX_GAME_NUMBER = Math.trunc(
  QUESTION_DATABASE.length / NB_QUESTIONS_PER_GAME
);

console.log("GAME_QUESTIONS");
console.log(QUESTION_DATABASE);
