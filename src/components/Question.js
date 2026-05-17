import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

/**
 * Question component displaying the current question
 * with a difficulty badge and animated entrance.
 */
export default function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  const difficultyColors = {
    easy: "badge--easy",
    medium: "badge--medium",
    hard: "badge--hard",
  };

  return (
    <div className="question glass-card" id={`question-${index}`} key={index}>
      <div className="question__header">
        <span className="question__number">Q{index + 1}</span>
        {question.difficulty && (
          <span
            className={`badge ${
              difficultyColors[question.difficulty] || ""
            }`}
          >
            {question.difficulty}
          </span>
        )}
        <span className="question__points">{question.points} pts</span>
      </div>
      <h4 className="question__text">{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
