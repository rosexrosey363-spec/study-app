# 📚 Study App

A modern web application for learning with flashcards, quizzes, and detailed explanations.

## Features

- 🗂️ **Flashcards** - Create and review flashcards with explanations
- 📝 **Quizzes** - Take multiple-choice quizzes and track scores
- 📊 **Progress** - Monitor your learning progress and statistics
- 💾 **Persistent Data** - All your study materials are saved locally
- 🎨 **Beautiful UI** - Modern, responsive design

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/rosexrosey363-spec/study-app.git
cd study-app
```

2. Install dependencies
```bash
npm install
```

3. Start the backend server (in one terminal)
```bash
npm run server
```

4. Start the React app (in another terminal)
```bash
npm start
```

5. Open http://localhost:3000 in your browser

### Development Mode

To run both frontend and backend together:
```bash
npm run dev
```

## Project Structure

```
study-app/
├── server.js                 # Backend API
├── package.json              # Dependencies
├── data.json                 # Database (auto-created)
├── src/
│   ├── App.jsx              # Main component
│   ├── App.css              # Main styles
│   ├── index.js             # React entry point
│   ├── index.css            # Global styles
│   └── components/
│       ├── FlashcardSection.jsx
│       ├── FlashcardSection.css
│       ├── QuizSection.jsx
│       ├── QuizSection.css
│       ├── ProgressSection.jsx
│       └── ProgressSection.css
└── public/
    └── index.html           # HTML entry point
```

## API Endpoints

### Flashcards
- `GET /api/flashcards` - Get all flashcards
- `POST /api/flashcards` - Create new flashcard
- `GET /api/flashcards/:id` - Get specific flashcard
- `PUT /api/flashcards/:id` - Update flashcard
- `DELETE /api/flashcards/:id` - Delete flashcard

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create new quiz
- `GET /api/quizzes/:id` - Get specific quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Progress
- `GET /api/progress` - Get user progress history

## Technologies Used

- **Frontend**: React 18
- **Backend**: Node.js + Express
- **Styling**: CSS3
- **Data Storage**: JSON file (can upgrade to MongoDB/PostgreSQL)

## How to Use

### 📚 Flashcards Tab
1. Click the Flashcards tab
2. Click "➕ Add New Flashcard"
3. Enter your question, answer, and optional explanation
4. Click "Add Flashcard"
5. Review your cards by clicking to flip them
6. Click "Show Explanation" to see detailed explanations

### 📝 Quizzes Tab
1. Click the Quizzes tab
2. Select a quiz to start
3. Answer each multiple-choice question
4. Use Previous/Next to navigate
5. Submit when done to see results
6. Review your answers with explanations

### 📊 Progress Tab
1. View statistics of all your quiz attempts
2. Track your average score
3. See your best performance
4. Monitor improvement over time

## Example Data Format

### Flashcard
```json
{
  "question": "What is React?",
  "answer": "A JavaScript library for building UIs",
  "explanation": "React is a declarative library that makes creating interactive UIs painless.",
  "category": "JavaScript"
}
```

### Quiz
```json
{
  "title": "JavaScript Basics",
  "category": "Programming",
  "questions": [
    {
      "question": "What does useState do?",
      "options": ["Manages state", "Renders DOM", "Makes API calls"],
      "correctAnswer": "Manages state",
      "explanation": "useState is a React Hook that lets you add state to functional components."
    }
  ]
}
```

## License

MIT License - feel free to use this project!

## Author

Created with ❤️ for learners
