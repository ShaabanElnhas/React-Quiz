import { useQuiz } from "../context/QuizContext";
import { ACTION_TYPES } from "../constants/actionTypes";

const OPTION_LETTERS = ["A", "B", "C", "D"];

/**
 * Options component rendering answer choices for a question.
 * Each option shows a letter label, correct/wrong feedback after answering,
 * and staggered entrance animations.
 *
 * @param {Object} props
 * @param {Object} props.question - The current question object.
 */
export default function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div className="options" id="options-list">
      {question.options.map((option, index) => {
        const isSelected = index === answer;
        const isCorrect = index === question.correctOption;

        let statusClass = "";
        if (hasAnswered) {
          if (isCorrect) statusClass = "correct";
          else if (isSelected) statusClass = "wrong";
        }

        return (
          <button
            key={option}
            className={`btn btn-option ${isSelected ? "selected" : ""} ${statusClass}`}
            style={{ animationDelay: `${index * 0.08}s` }}
            onClick={() =>
              dispatch({ type: ACTION_TYPES.NEW_ANSWER, payload: index })
            }
            disabled={hasAnswered}
            id={`option-${index}`}
          >
            <span className="btn-option__letter">{OPTION_LETTERS[index]}</span>
            <span className="btn-option__text">{option}</span>
            {hasAnswered && isCorrect && (
              <span className="btn-option__icon">✓</span>
            )}
            {hasAnswered && isSelected && !isCorrect && (
              <span className="btn-option__icon">✗</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
