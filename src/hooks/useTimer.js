import { useEffect, useRef } from "react";
import { useQuiz } from "../context/QuizContext";
import { ACTION_TYPES } from "../constants/actionTypes";

/**
 * Custom hook that manages the countdown timer.
 * Uses useRef to keep a stable interval reference and
 * only depends on `dispatch` to avoid re-creating the interval every tick.
 */
export function useTimer() {
  const { dispatch, secondsRemaining, status } = useQuiz();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (status !== "active") return;

    intervalRef.current = setInterval(() => {
      dispatch({ type: ACTION_TYPES.TICK });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [dispatch, status]);

  // Auto-stop when time runs out
  useEffect(() => {
    if (secondsRemaining === 0) {
      clearInterval(intervalRef.current);
    }
  }, [secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isWarning = secondsRemaining <= 30;
  const isCritical = secondsRemaining <= 10;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return { minutes, seconds, isWarning, isCritical, formattedTime };
}
