import { useQuiz } from "../context/QuizContext";
import { ACTION_TYPES } from "../constants/actionTypes";

/**
 * Next/Finish button component.
 * Shows "Next" for intermediate questions and "Finish Quiz" for the last one.
 * Only visible after the user has answered the current question.
 */
export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  const isLastQuestion = index === numQuestions - 1;

  return (
    <button
      className="btn btn-primary btn-ui"
      onClick={() =>
        dispatch({
          type: isLastQuestion ? ACTION_TYPES.FINISH : ACTION_TYPES.NEXT_QUESTION,
        })
      }
      id={isLastQuestion ? "finish-button" : "next-button"}
    >
      {isLastQuestion ? "Finish Quiz 🏁" : "Next →"}
    </button>
  );
}
