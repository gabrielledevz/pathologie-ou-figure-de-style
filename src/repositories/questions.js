import GAME_DATA from "./gamedata";
import GAME_DATA_TEST from "./gamedata-test";
import { shuffleArray } from "../utils/shuffleArray";

export const QUESTION_DATABASE = shuffleArray(GAME_DATA_TEST);
export const NB_QUESTIONS_PER_GAME = 15;
export const MAX_GAME_NUMBER = Math.trunc(
  QUESTION_DATABASE.length / NB_QUESTIONS_PER_GAME
);

console.log("GAME_QUESTIONS");
console.log(QUESTION_DATABASE);
