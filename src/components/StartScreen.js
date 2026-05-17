import { useQuiz } from "../context/QuizContext";
import { ACTION_TYPES } from "../constants/actionTypes";
import { DIFFICULTY } from "../constants/config";

/**
 * Start screen displayed before the quiz begins.
 * Features a difficulty selector and animated call-to-action.
 */
export default function StartScreen() {
  const { numQuestions, dispatch, difficulty } = useQuiz();

  const difficulties = Object.values(DIFFICULTY);

  return (
    <div className="start" id="start-screen">
      <div className="start__card glass-card">
        <div className="start__emoji">🧠</div>
        <h2 className="start__title">Welcome to the React Quiz!</h2>
        <p className="start__description">
          Challenge yourself with{" "}
          <strong>{numQuestions} question{numQuestions !== 1 ? "s" : ""}</strong>{" "}
          to test your React mastery. Choose your difficulty and start when
          you're ready.
        </p>

        <div className="difficulty-selector" id="difficulty-selector">
          <p className="difficulty-selector__label">Select Difficulty</p>
          <div className="difficulty-selector__options">
            {difficulties.map((d) => (
              <button
                key={d.key}
                className={`difficulty-btn ${
                  difficulty === d.key ? "difficulty-btn--active" : ""
                }`}
                onClick={() =>
                  dispatch({
                    type: ACTION_TYPES.SET_DIFFICULTY,
                    payload: d.key,
                  })
                }
                id={`difficulty-${d.key}`}
              >
                <span className="difficulty-btn__icon">{d.icon}</span>
                <span className="difficulty-btn__label">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary btn-start"
          onClick={() => dispatch({ type: ACTION_TYPES.START })}
          id="start-button"
          disabled={numQuestions === 0}
        >
          <span>Let's Start</span>
          <span className="btn-start__arrow">→</span>
        </button>

        {numQuestions === 0 && (
          <p className="start__warning">
            No questions available for this difficulty. Try another level.
          </p>
        )}
      </div>
    </div>
  );
}
