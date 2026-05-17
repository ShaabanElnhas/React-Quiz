/**
 * Header component displaying the app logo and title
 * with a subtle entrance animation.
 */
function Header() {
  return (
    <header className="app-header" id="quiz-header">
      <img src="logo512.png" alt="React logo" className="app-header__logo" />
      <div className="app-header__text">
        <h1>React Quiz</h1>
        <p className="app-header__subtitle">Test your knowledge</p>
      </div>
    </header>
  );
}

export default Header;
