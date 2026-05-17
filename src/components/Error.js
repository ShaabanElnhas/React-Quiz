/**
 * Error component displayed when question fetching fails.
 * Provides a retry mechanism for better UX.
 */
export default function Error() {
  return (
    <div className="error-container" id="quiz-error" role="alert">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">
        There was an error fetching questions. Please make sure the API server is
        running.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => window.location.reload()}
        id="retry-button"
      >
        🔄 Try Again
      </button>
      <p className="error-hint">
        Run <code>npm run server</code> to start the API
      </p>
    </div>
  );
}
