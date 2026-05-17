import React, { useState, useEffect } from 'react';
import './QuizSection.css';

function QuizSection() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [newQuiz, setNewQuiz] = useState({ title: '', category: '', questions: [] });
  const [isCreating, setIsCreating] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${API_URL}/quizzes`);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setShowResults(false);
  };

  const handleAnswerChange = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await fetch(`${API_URL}/quizzes/${selectedQuiz.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const result = await response.json();
      setResults(result);
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="quiz-section">
        <h2>📝 Quizzes</h2>
        <div className="quiz-list">
          {quizzes.length === 0 ? (
            <p className="empty-state">No quizzes available yet.</p>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.title}</h3>
                <p className="category">{quiz.category}</p>
                <p className="question-count">{quiz.questions.length} questions</p>
                <button onClick={() => startQuiz(quiz)} className="btn-primary">
                  Start Quiz →
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-section">
        <h2>📊 Quiz Results</h2>
        <div className="results-summary">
          <h3>{selectedQuiz.title}</h3>
          <div className="score-display">
            <p className="score">{results.score} / {results.totalQuestions}</p>
            <p className="percentage">{results.percentage}%</p>
          </div>
        </div>

        <div className="results-details">
          {results.results.map((result, index) => (
            <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
              <h4>Question {index + 1}: {result.question}</h4>
              <p>
                <strong>Your answer:</strong> {result.userAnswer || 'Not answered'}
              </p>
              <p>
                <strong>Correct answer:</strong> {result.correctAnswer}
              </p>
              {result.explanation && (
                <p className="explanation">
                  <strong>Explanation:</strong> {result.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setSelectedQuiz(null);
            setShowResults(false);
          }}
          className="btn-primary"
        >
          ← Back to Quizzes
        </button>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQuestion];

  return (
    <div className="quiz-section">
      <h2>{selectedQuiz.title}</h2>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
        ></div>
      </div>
      <p className="progress-text">
        Question {currentQuestion + 1} of {selectedQuiz.questions.length}
      </p>

      <div className="question-container">
        <h3>{question.question}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswerChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-controls">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="btn-nav"
        >
          ← Previous
        </button>

        {currentQuestion < selectedQuiz.questions.length - 1 ? (
          <button onClick={handleNextQuestion} className="btn-nav">
            Next →
          </button>
        ) : (
          <button onClick={submitQuiz} className="btn-submit">
            Submit Quiz ✓
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizSection;
