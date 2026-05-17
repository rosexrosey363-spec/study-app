import React, { useState, useEffect } from 'react';
import './FlashcardSection.css';

function FlashcardSection() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '', explanation: '', category: '' });
  const [isAdding, setIsAdding] = useState(false);

  const API_URL = 'http://localhost:5000/api';

  // Fetch flashcards
  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await fetch(`${API_URL}/flashcards`);
      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const addFlashcard = async (e) => {
    e.preventDefault();
    if (!newCard.question || !newCard.answer) {
      alert('Please fill in question and answer');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/flashcards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard)
      });
      const card = await response.json();
      setFlashcards([...flashcards, card]);
      setNewCard({ question: '', answer: '', explanation: '', category: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await fetch(`${API_URL}/flashcards/${id}`, { method: 'DELETE' });
      setFlashcards(flashcards.filter(f => f.id !== id));
      if (currentIndex >= flashcards.length - 1) {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flashcard-section">
        <h2>📚 Flashcards</h2>
        <p className="empty-state">No flashcards yet. Create one to get started!</p>
        <form onSubmit={addFlashcard} className="add-flashcard-form">
          <input
            type="text"
            placeholder="Question"
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
          <textarea
            placeholder="Explanation (optional)"
            value={newCard.explanation}
            onChange={(e) => setNewCard({ ...newCard, explanation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newCard.category}
            onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
          />
          <button type="submit">Add Flashcard</button>
        </form>
      </div>
    );
  }

  const card = flashcards[currentIndex];

  return (
    <div className="flashcard-section">
      <h2>📚 Flashcards ({currentIndex + 1} / {flashcards.length})</h2>

      <div className="flashcard-container">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <p className="label">Question</p>
              <p className="content">{card.question}</p>
            </div>
            <div className="flashcard-back">
              <p className="label">Answer</p>
              <p className="content">{card.answer}</p>
            </div>
          </div>
        </div>

        {card.explanation && (
          <button
            className="explanation-btn"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            💡 {showExplanation ? 'Hide' : 'Show'} Explanation
          </button>
        )}
      </div>

      {showExplanation && card.explanation && (
        <div className="explanation-box">
          <h4>Explanation:</h4>
          <p>{card.explanation}</p>
        </div>
      )}

      <div className="controls">
        <button onClick={handlePrev} className="btn-nav">← Previous</button>
        <span className="progress">{currentIndex + 1} / {flashcards.length}</span>
        <button onClick={handleNext} className="btn-nav">Next →</button>
      </div>

      <button
        className="delete-btn"
        onClick={() => deleteFlashcard(card.id)}
      >
        🗑️ Delete Card
      </button>

      <hr />

      <details className="add-card-section">
        <summary>➕ Add New Flashcard</summary>
        <form onSubmit={addFlashcard} className="add-flashcard-form">
          <input
            type="text"
            placeholder="Question"
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
          <textarea
            placeholder="Explanation (optional)"
            value={newCard.explanation}
            onChange={(e) => setNewCard({ ...newCard, explanation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newCard.category}
            onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
          />
          <button type="submit">Add Flashcard</button>
        </form>
      </details>
    </div>
  );
}

export default FlashcardSection;
