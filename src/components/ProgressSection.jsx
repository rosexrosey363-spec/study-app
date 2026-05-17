import React, { useState, useEffect } from 'react';
import './ProgressSection.css';

function ProgressSection() {
  const [progress, setProgress] = useState([]);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`${API_URL}/progress`);
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const averageScore = progress.length > 0
    ? (progress.reduce((sum, p) => sum + parseFloat(p.percentage), 0) / progress.length).toFixed(2)
    : 0;

  return (
    <div className="progress-section">
      <h2>📊 Your Progress</h2>

      {progress.length === 0 ? (
        <p className="empty-state">No quiz attempts yet. Start taking quizzes to track your progress!</p>
      ) : (
        <>
          <div className="progress-summary">
            <div className="stat-card">
              <h3>Quizzes Completed</h3>
              <p className="stat-value">{progress.length}</p>
            </div>
            <div className="stat-card">
              <h3>Average Score</h3>
              <p className="stat-value">{averageScore}%</p>
            </div>
            <div className="stat-card">
              <h3>Best Score</h3>
              <p className="stat-value">
                {Math.max(...progress.map(p => parseFloat(p.percentage)))}%
              </p>
            </div>
          </div>

          <div className="progress-history">
            <h3>Quiz Attempts</h3>
            {progress.map((attempt, index) => (
              <div key={index} className="progress-item">
                <div className="item-header">
                  <h4>Quiz #{index + 1}</h4>
                  <span className="date">
                    {new Date(attempt.completedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="item-score">
                  <p>Score: <strong>{attempt.score}/{attempt.totalQuestions}</strong></p>
                  <p>Percentage: <strong>{attempt.percentage}%</strong></p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProgressSection;
