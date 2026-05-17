/**
 * Main layout wrapper providing consistent width and spacing
 * for quiz content with fade-in animation.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside main.
 */
export default function Main({ children }) {
  return (
    <main className="main" id="quiz-main">
      {children}
    </main>
  );
}
