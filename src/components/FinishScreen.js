import { useQuiz } from "../context/QuizContext";
import { ACTION_TYPES } from "../constants/actionTypes";

const OPTION_LETTERS = ["A", "B", "C", "D"];

/**
 * Finish screen displayed after the quiz is completed.
 * Shows score breakdown, high score status, emoji feedback,
 * and a review mode to revisit all questions with answers.
 */
export default function FinishScreen() {
  const {
    points,
    maxPoints,
    highscore,
    dispatch,
    questions,
    userAnswers,
    isReviewing,
    reviewIndex,
  } = useQuiz();

  const percentage = (points / maxPoints) * 100;
  const isNewHighScore = points >= highscore && points > 0;

  // Emoji + message based on score
  let emoji, message;
  if (percentage === 100) {
    emoji = "🏆";
    message = "Perfect score! You're a React master!";
  } else if (percentage >= 80) {
    emoji = "🎉";
    message = "Excellent work! Almost perfect!";
  } else if (percentage >= 60) {
    emoji = "👏";
    message = "Great job! Solid React knowledge!";
  } else if (percentage >= 40) {
    emoji = "🤔";
    message = "Not bad! Keep learning and try again.";
  } else if (percentage >= 20) {
    emoji = "📖";
    message = "Room for improvement. Review the docs!";
  } else {
    emoji = "💪";
    message = "Don't give up! Practice makes perfect.";
  }

  if (isReviewing) {
    const question = questions[reviewIndex];
    const userAnswer = userAnswers[reviewIndex];
    const isCorrect = userAnswer === question.correctOption;

    return (
      <div className="review glass-card" id="review-screen">
        <div className="review__header">
          <h3>
            Review — Question {reviewIndex + 1} of {questions.length}
          </h3>
          <button
            className="btn btn-secondary btn-small"
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_REVIEW })}
            id="exit-review"
          >
            ✕ Close
          </button>
        </div>

        <div
          className={`review__status ${
            isCorrect ? "review__status--correct" : "review__status--wrong"
          }`}
        >
          {isCorrect ? "✓ Correct" : "✗ Incorrect"} — {question.points} pts
        </div>

        <h4 className="review__question">{question.question}</h4>

        <div className="options options--review">
          {question.options.map((option, i) => {
            let className = "btn btn-option btn-option--review";
            if (i === question.correctOption) className += " correct";
            if (i === userAnswer && !isCorrect) className += " wrong";
            if (i === userAnswer) className += " selected";

            return (
              <button key={option} className={className} disabled>
                <span className="btn-option__letter">{OPTION_LETTERS[i]}</span>
                <span className="btn-option__text">{option}</span>
                {i === question.correctOption && (
                  <span className="btn-option__icon">✓</span>
                )}
                {i === userAnswer && i !== question.correctOption && (
                  <span className="btn-option__icon">✗</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="review__nav">
          <button
            className="btn btn-secondary"
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.SET_REVIEW_INDEX,
                payload: reviewIndex - 1,
              })
            }
            disabled={reviewIndex === 0}
            id="review-prev"
          >
            ← Previous
          </button>
          <div className="review__dots">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`review__dot ${
                  i === reviewIndex ? "review__dot--active" : ""
                } ${
                  userAnswers[i] === questions[i].correctOption
                    ? "review__dot--correct"
                    : "review__dot--wrong"
                }`}
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPES.SET_REVIEW_INDEX,
                    payload: i,
                  })
                }
                aria-label={`Go to question ${i + 1}`}
              ></button>
            ))}
          </div>
          <button
            className="btn btn-secondary"
            onClick={() =>
              dispatch({
                type: ACTION_TYPES.SET_REVIEW_INDEX,
                payload: reviewIndex + 1,
              })
            }
            disabled={reviewIndex === questions.length - 1}
            id="review-next"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="finish" id="finish-screen">
      {isNewHighScore && (
        <div className="confetti-container" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="finish__card glass-card">
        <div className="finish__emoji">{emoji}</div>
        <h2 className="finish__title">Quiz Complete!</h2>
        <p className="finish__message">{message}</p>

        <div className="finish__score-ring">
          <svg viewBox="0 0 120 120" className="score-ring">
            <circle
              cx="60"
              cy="60"
              r="52"
              className="score-ring__bg"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="score-ring__fill"
              style={{
                strokeDasharray: `${2 * Math.PI * 52}`,
                strokeDashoffset: `${
                  2 * Math.PI * 52 * (1 - percentage / 100)
                }`,
              }}
            />
          </svg>
          <div className="finish__score-text">
            <span className="finish__percent">{Math.round(percentage)}%</span>
          </div>
        </div>

        <div className="finish__stats">
          <div className="finish__stat">
            <span className="finish__stat-value">{points}</span>
            <span className="finish__stat-label">Points</span>
          </div>
          <div className="finish__stat-divider"></div>
          <div className="finish__stat">
            <span className="finish__stat-value">{maxPoints}</span>
            <span className="finish__stat-label">Max Points</span>
          </div>
          <div className="finish__stat-divider"></div>
          <div className="finish__stat">
            <span className="finish__stat-value">{highscore}</span>
            <span className="finish__stat-label">High Score</span>
          </div>
        </div>

        {isNewHighScore && (
          <p className="finish__highscore-badge">
            🎯 New High Score!
          </p>
        )}

        <div className="finish__actions">
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: ACTION_TYPES.RESTART })}
            id="restart-button"
          >
            🔄 Play Again
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_REVIEW })}
            id="review-button"
          >
            📋 Review Answers
          </button>
        </div>
      </div>
    </div>
  );
}
