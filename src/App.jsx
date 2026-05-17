import React, { useState, useEffect } from 'react';
import FlashcardSection from './components/FlashcardSection';
import QuizSection from './components/QuizSection';
import ProgressSection from './components/ProgressSection';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('flashcards');

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Study App</h1>
        <p>Learn with Flashcards, Quizzes & Explanations</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcards')}
        >
          🗂️ Flashcards
        </button>
        <button
          className={`nav-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          📝 Quizzes
        </button>
        <button
          className={`nav-btn ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Progress
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'flashcards' && <FlashcardSection />}
        {activeTab === 'quizzes' && <QuizSection />}
        {activeTab === 'progress' && <ProgressSection />}
      </main>
    </div>
  );
}

export default App;
