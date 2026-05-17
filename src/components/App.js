import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../context/QuizContext";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { QUIZ_STATUS } from "../constants/quizStatus";

/**
 * Root application component.
 * Renders the appropriate screen based on the current quiz status.
 * Integrates keyboard navigation for accessibility.
 */
export default function App() {
  const { status } = useQuiz();

  // Enable keyboard shortcuts (1-4 for answers, Enter for next)
  useKeyboardNavigation();

  return (
    <div className="app" id="quiz-app">
      {/* Animated background particles */}
      <div className="bg-particles" aria-hidden="true">
        <div className="particle particle--1"></div>
        <div className="particle particle--2"></div>
        <div className="particle particle--3"></div>
        <div className="particle particle--4"></div>
        <div className="particle particle--5"></div>
      </div>

      <Header />
      <Main>
        {status === QUIZ_STATUS.LOADING && <Loader />}
        {status === QUIZ_STATUS.ERROR && <Error />}
        {status === QUIZ_STATUS.READY && <StartScreen />}
        {status === QUIZ_STATUS.ACTIVE && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === QUIZ_STATUS.FINISHED && <FinishScreen />}
      </Main>

      <footer className="app-footer">
        <p>
          Built with <span className="heart">♥</span> using React &bull; Use{" "}
          <kbd>1</kbd>-<kbd>4</kbd> to answer, <kbd>Enter</kbd> to continue
        </p>
      </footer>
    </div>
  );
}
