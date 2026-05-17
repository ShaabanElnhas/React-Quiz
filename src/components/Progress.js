import { useQuiz } from "../context/QuizContext";

/**
 * Progress bar component showing quiz advancement.
 * Displays a stepped progress indicator, current question number,
 * and accumulated points with smooth animations.
 */
export default function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz();
  const progressPercent =
    ((index + Number(answer !== null)) / numQuestions) * 100;

  return (
    <div className="progress" id="quiz-progress">
      <div className="progress__bar-container">
        <div
          className="progress__bar-fill"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={index + Number(answer !== null)}
          aria-valuemin={0}
          aria-valuemax={numQuestions}
        ></div>
        {/* Step indicators */}
        <div className="progress__steps">
          {Array.from({ length: numQuestions }, (_, i) => (
            <div
              key={i}
              className={`progress__step ${
                i < index ? "progress__step--done" : ""
              } ${i === index ? "progress__step--active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
      <div className="progress__info">
        <p className="progress__question">
          Question <strong>{index + 1}</strong>
          <span className="progress__separator">/</span>
          {numQuestions}
        </p>
        <p className="progress__points">
          <strong>{points}</strong>
          <span className="progress__separator">/</span>
          {maxPoints} points
        </p>
      </div>
    </div>
  );
}
