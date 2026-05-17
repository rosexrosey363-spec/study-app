const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());

// Study data file
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file
async function initializeData() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      flashcards: [],
      quizzes: [],
      userProgress: []
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read data
async function readData() {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write data
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create flashcard
app.post('/api/flashcards', async (req, res) => {
  try {
    const { question, answer, explanation, category } = req.body;
    const data = await readData();
    
    const flashcard = {
      id: Date.now(),
      question,
      answer,
      explanation,
      category,
      createdAt: new Date(),
      reviewCount: 0
    };
    
    data.flashcards.push(flashcard);
    await writeData(data);
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get flashcard by ID
app.get('/api/flashcards/:id', async (req, res) => {
  try {
    const data = await readData();
    const flashcard = data.flashcards.find(f => f.id === parseInt(req.params.id));
    if (!flashcard) return res.status(404).json({ error: 'Not found' });
    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update flashcard
app.put('/api/flashcards/:id', async (req, res) => {
  try {
    const { question, answer, explanation, category } = req.body;
    const data = await readData();
    const index = data.flashcards.findIndex(f => f.id === parseInt(req.params.id));
    
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    
    data.flashcards[index] = {
      ...data.flashcards[index],
      question,
      answer,
      explanation,
      category
    };
    
    await writeData(data);
    res.json(data.flashcards[index]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  try {
    const data = await readData();
    data.flashcards = data.flashcards.filter(f => f.id !== parseInt(req.params.id));
    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create quiz
app.post('/api/quizzes', async (req, res) => {
  try {
    const { title, questions, category } = req.body;
    const data = await readData();
    
    const quiz = {
      id: Date.now(),
      title,
      questions,
      category,
      createdAt: new Date()
    };
    
    data.quizzes.push(quiz);
    await writeData(data);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const data = await readData();
    const quiz = data.quizzes.find(q => q.id === parseInt(req.params.id));
    if (!quiz) return res.status(404).json({ error: 'Not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit quiz answers
app.post('/api/quizzes/:id/submit', async (req, res) => {
  try {
    const { answers } = req.body;
    const data = await readData();
    const quiz = data.quizzes.find(q => q.id === parseInt(req.params.id));
    
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;
      
      return {
        questionId: index,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });
    
    const progress = {
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      percentage: (score / quiz.questions.length * 100).toFixed(2),
      completedAt: new Date(),
      results
    };
    
    data.userProgress.push(progress);
    await writeData(data);
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
app.get('/api/progress', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.userProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Study App Server running on port ${PORT}`);
  });
});
