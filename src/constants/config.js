/**
 * Application configuration constants.
 */

/** Seconds allocated per question in the quiz timer */
export const SECS_PER_QUESTION = 30;

/** Base URL for the JSON Server API */
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

/** Difficulty levels with display labels and time multipliers */
export const DIFFICULTY = {
  ALL: { key: "all", label: "All Questions", icon: "📚", timerMultiplier: 1 },
  EASY: { key: "easy", label: "Easy", icon: "🟢", timerMultiplier: 1.2 },
  MEDIUM: { key: "medium", label: "Medium", icon: "🟡", timerMultiplier: 1 },
  HARD: { key: "hard", label: "Hard", icon: "🔴", timerMultiplier: 0.8 },
};

/** localStorage key for persisting high scores */
export const HIGHSCORE_STORAGE_KEY = "react-quiz-highscores";
