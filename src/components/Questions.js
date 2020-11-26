import GAME_DATA from "../data/gamedata";
import GAME_DATA_TEST from "../data/gamedata-test";
import { shuffleArray } from "../utils/shuffleArray";

export const GAME_QUESTIONS = shuffleArray(GAME_DATA_TEST);
export const NB_QUESTIONS = GAME_QUESTIONS.length;
