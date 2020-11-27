import GAME_DATA from "./gamedata";
import GAME_DATA_TEST from "./gamedata-test";
import { shuffleArray } from "../utils/shuffleArray";

export const GAME_QUESTIONS = shuffleArray(GAME_DATA);
export const NB_QUESTIONS = GAME_QUESTIONS.length;