# 🧠 React Quiz

An interactive React quiz application to test your React knowledge. Features multiple difficulty levels, a countdown timer, persistent high scores, keyboard navigation, and a beautiful glassmorphism UI.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## ✨ Features

- **🎯 Difficulty Levels** — Choose between Easy, Medium, Hard, or All questions
- **⏱️ Countdown Timer** — Time pressure with visual warnings (yellow/red states)
- **🏆 Persistent High Scores** — Saved to localStorage per difficulty level
- **📋 Answer Review** — Review all answers after completing the quiz
- **⌨️ Keyboard Navigation** — Use `1-4` to answer, `Enter` to continue
- **🎨 Glassmorphism UI** — Premium dark theme with animated particles
- **📱 Responsive Design** — Works on mobile, tablet, and desktop
- **♿ Accessible** — ARIA roles, semantic HTML, keyboard support

##😊 To Open
(https://shaabanelnhas.github.io/React-Quiz/)


## 🏗️ Architecture

```
src/
├── components/          # UI Components
│   ├── App.js           # Root component with status-based rendering
│   ├── Header.js        # App header with animated logo
│   ├── Main.js          # Layout wrapper
│   ├── Loader.js        # Loading spinner
│   ├── Error.js         # Error state with retry
│   ├── StartScreen.js   # Welcome screen with difficulty selector
│   ├── Question.js      # Question card with difficulty badge
│   ├── Options.js       # Answer options with A-D labels
│   ├── Progress.js      # Progress bar with step indicators
│   ├── NextButton.js    # Next/Finish navigation
│   ├── Timer.js         # Countdown with warning states
│   ├── FinishScreen.js  # Results with score ring & review mode
│   └── Footer.js        # Layout footer
├── context/
│   └── QuizContext.jsx  # Global state with useReducer + Context API
├── hooks/
│   ├── useTimer.js      # Timer logic with stable interval management
│   └── useKeyboardNavigation.js  # Keyboard shortcut handler
├── constants/
│   ├── actionTypes.js   # Centralized reducer action types
│   ├── quizStatus.js    # Quiz lifecycle status constants
│   └── config.js        # App configuration (API URL, difficulty, etc.)
└── index.js             # Entry point
```

### Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| `useReducer` + Context API | Complex state transitions managed in a single predictable reducer |
| Constants for action types | Prevents typos, enables IDE autocomplete, clearer code review |
| Custom hooks (`useTimer`, `useKeyboardNavigation`) | Separation of concerns, reusable logic, testable in isolation |
| `localStorage` for high scores | Persistence without a backend, per-difficulty tracking |
| CSS Custom Properties | Maintainable theming, easy dark/light mode switching |
| `useRef` for timer interval | Prevents interval recreation on every tick (performance fix) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/react-quiz.git
cd react-quiz

# Install dependencies
npm install
```

### Running Locally

You need two terminals — one for the React app and one for the API server:

```bash
# Terminal 1: Start the JSON Server API
npm run server

# Terminal 2: Start the React dev server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000) and the API runs on port 8000.

## 🎮 How to Play

1. Select a difficulty level (or choose "All Questions")
2. Click **Let's Start** to begin the quiz
3. Answer each question by clicking an option or pressing `1-4`
4. Press **Next** (or `Enter`) to advance
5. Complete all questions before the timer runs out
6. Review your answers and try to beat your high score!

## 🧰 Tech Stack

- **React 19** — UI library with hooks
- **useReducer** — State management pattern
- **Context API** — Global state distribution
- **JSON Server** — Mock REST API for questions
- **CSS3** — Glassmorphism, animations, custom properties
- **localStorage** — Client-side persistence

## 📝 What I Learned

- Managing complex state transitions with `useReducer` and finite state machines
- Extracting reusable logic into custom React hooks
- Performance optimization (stable refs, proper dependency arrays)
- Modern CSS techniques: glassmorphism, CSS animations, custom properties
- Accessibility best practices (ARIA, keyboard navigation, semantic HTML)
- Clean architecture with constants, separation of concerns, and JSDoc

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
