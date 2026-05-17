import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTION_TYPES } from "../constants/actionTypes";
import { QUIZ_STATUS } from "../constants/quizStatus";
import {
  SECS_PER_QUESTION,
  API_BASE_URL,
  DIFFICULTY,
  HIGHSCORE_STORAGE_KEY,
} from "../constants/config";

/**
 * Loads persisted high scores from localStorage.
 * @returns {Object} Map of difficulty keys to high score values.
 */
function loadHighScores() {
  try {
    const stored = localStorage.getItem(HIGHSCORE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Persists high scores to localStorage.
 * @param {Object} scores - Map of difficulty keys to high score values.
 */
function saveHighScores(scores) {
  try {
    localStorage.setItem(HIGHSCORE_STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

const storedHighScores = loadHighScores();

/** @type {import('react').Reducer} Initial state for the quiz reducer */
const initialState = {
  /** @type {Array} All fetched questions (unfiltered) */
  allQuestions: [],
  /** @type {Array} Currently active questions (filtered by difficulty) */
  questions: [],
  /** @type {string} Current quiz lifecycle status */
  status: QUIZ_STATUS.LOADING,
  /** @type {number} Current question index */
  index: 0,
  /** @type {number|null} User's selected answer for current question */
  answer: null,
  /** @type {number} Accumulated points */
  points: 0,
  /** @type {Object} High scores per difficulty level */
  highscores: storedHighScores,
  /** @type {number|null} Remaining seconds on the timer */
  secondsRemaining: null,
  /** @type {string} Selected difficulty filter */
  difficulty: DIFFICULTY.ALL.key,
  /** @type {Array} Record of all user answers for review */
  userAnswers: [],
  /** @type {boolean} Whether the review mode is active */
  isReviewing: false,
  /** @type {number} Current index in review mode */
  reviewIndex: 0,
};

/**
 * Filters questions by the selected difficulty level.
 * @param {Array} questions - All available questions.
 * @param {string} difficulty - The selected difficulty key.
 * @returns {Array} Filtered questions array.
 */
function filterQuestions(questions, difficulty) {
  if (difficulty === DIFFICULTY.ALL.key) return questions;
  return questions.filter((q) => q.difficulty === difficulty);
}

/**
 * Gets the timer multiplier for a given difficulty level.
 * @param {string} difficulty - The selected difficulty key.
 * @returns {number} The time multiplier.
 */
function getTimerMultiplier(difficulty) {
  const entry = Object.values(DIFFICULTY).find((d) => d.key === difficulty);
  return entry ? entry.timerMultiplier : 1;
}

/**
 * Quiz reducer managing all state transitions.
 * Uses a centralized switch pattern with ACTION_TYPES constants.
 *
 * @param {Object} state - Current quiz state.
 * @param {Object} action - Dispatched action with type and optional payload.
 * @returns {Object} New state after applying the action.
 */
function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.DATA_RECEIVED: {
      const filtered = filterQuestions(action.payload, state.difficulty);
      return {
        ...state,
        allQuestions: action.payload,
        questions: filtered,
        status: QUIZ_STATUS.READY,
      };
    }

    case ACTION_TYPES.DATA_FAILED:
      return { ...state, status: QUIZ_STATUS.ERROR };

    case ACTION_TYPES.SET_DIFFICULTY: {
      const filtered = filterQuestions(state.allQuestions, action.payload);
      return {
        ...state,
        difficulty: action.payload,
        questions: filtered,
      };
    }

    case ACTION_TYPES.START: {
      const multiplier = getTimerMultiplier(state.difficulty);
      return {
        ...state,
        status: QUIZ_STATUS.ACTIVE,
        secondsRemaining: Math.round(
          state.questions.length * SECS_PER_QUESTION * multiplier
        ),
        userAnswers: new Array(state.questions.length).fill(null),
      };
    }

    case ACTION_TYPES.NEW_ANSWER: {
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;
      const newAnswers = [...state.userAnswers];
      newAnswers[state.index] = action.payload;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
        userAnswers: newAnswers,
      };
    }

    case ACTION_TYPES.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };

    case ACTION_TYPES.FINISH: {
      const currentHighscore = state.highscores[state.difficulty] || 0;
      const newHighscore = Math.max(currentHighscore, state.points);
      const updatedHighscores = {
        ...state.highscores,
        [state.difficulty]: newHighscore,
      };
      saveHighScores(updatedHighscores);

      return {
        ...state,
        status: QUIZ_STATUS.FINISHED,
        highscores: updatedHighscores,
      };
    }

    case ACTION_TYPES.RESTART:
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        questions: filterQuestions(state.allQuestions, state.difficulty),
        difficulty: state.difficulty,
        status: QUIZ_STATUS.READY,
        highscores: state.highscores,
      };

    case ACTION_TYPES.TICK:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status:
          state.secondsRemaining === 0
            ? QUIZ_STATUS.FINISHED
            : state.status,
      };

    case ACTION_TYPES.TOGGLE_REVIEW:
      return {
        ...state,
        isReviewing: !state.isReviewing,
        reviewIndex: 0,
      };

    case ACTION_TYPES.SET_REVIEW_INDEX:
      return {
        ...state,
        reviewIndex: action.payload,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const QuizContext = createContext();

/**
 * QuizProvider wraps the app and provides quiz state + dispatch
 * via React Context. Handles data fetching on mount.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 */
export default function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    allQuestions,
    status,
    index,
    answer,
    points,
    highscores,
    secondsRemaining,
    difficulty,
    userAnswers,
    isReviewing,
    reviewIndex,
  } = state;

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  const highscore = highscores[difficulty] || 0;

  // Fetch questions from JSON Server on mount
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`${API_BASE_URL}/questions`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        dispatch({ type: ACTION_TYPES.DATA_RECEIVED, payload: data });
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        dispatch({ type: ACTION_TYPES.DATA_FAILED });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        allQuestions,
        status,
        index,
        answer,
        points,
        highscore,
        highscores,
        secondsRemaining,
        numQuestions,
        maxPoints,
        difficulty,
        userAnswers,
        isReviewing,
        reviewIndex,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

/**
 * Custom hook to access the Quiz context.
 * Throws an error if used outside of QuizProvider.
 *
 * @returns {Object} Quiz context value containing state and dispatch.
 */
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
