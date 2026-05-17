import { useTimer } from "../hooks/useTimer";

/**
 * Countdown timer component.
 * Uses the useTimer custom hook for logic separation.
 * Visual feedback changes as time runs low:
 * - Warning state (yellow) below 30 seconds
 * - Critical state (red + pulsing) below 10 seconds
 */
export default function Timer() {
  const { formattedTime, isWarning, isCritical } = useTimer();

  return (
    <div
      className={`timer ${isWarning ? "timer--warning" : ""} ${
        isCritical ? "timer--critical" : ""
      }`}
      id="quiz-timer"
      role="timer"
      aria-live="polite"
    >
      <span className="timer__icon">⏱️</span>
      <span className="timer__time">{formattedTime}</span>
    </div>
  );
}
