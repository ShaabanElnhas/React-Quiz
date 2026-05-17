import { useEffect, useCallback } from "react";
import { useQuiz } from "../context/QuizContext";
import { ACTION_TYPES } from "../constants/actionTypes";

/**
 * Custom hook for keyboard navigation throughout the quiz.
 * Supports number keys (1-4) for option selection,
 * Enter/Space for next question, and Escape for restart.
 */
export function useKeyboardNavigation() {
  const { dispatch, answer, index, numQuestions, status } = useQuiz();

  const handleKeyDown = useCallback(
    (e) => {
      if (status !== "active") return;

      // Number keys 1-4 to select options
      if (answer === null && e.key >= "1" && e.key <= "4") {
        dispatch({
          type: ACTION_TYPES.NEW_ANSWER,
          payload: Number(e.key) - 1,
        });
      }

      // Enter or Space to go next / finish
      if (answer !== null && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        if (index === numQuestions - 1) {
          dispatch({ type: ACTION_TYPES.FINISH });
        } else {
          dispatch({ type: ACTION_TYPES.NEXT_QUESTION });
        }
      }
    },
    [dispatch, answer, index, numQuestions, status]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
