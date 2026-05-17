/**
 * Footer layout component for the quiz active state.
 * Contains the timer and next/finish button in a flex layout.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Timer and NextButton components.
 */
export default function Footer({ children }) {
  return (
    <footer className="quiz-footer" id="quiz-footer">
      {children}
    </footer>
  );
}
