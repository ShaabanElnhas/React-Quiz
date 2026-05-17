/**
 * Loading indicator component displayed while
 * questions are being fetched from the API.
 */
export default function Loader() {
  return (
    <div className="loader-container" id="quiz-loader" role="status">
      <div className="loader-spinner">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
      </div>
      <p className="loader-text">Loading questions...</p>
    </div>
  );
}
