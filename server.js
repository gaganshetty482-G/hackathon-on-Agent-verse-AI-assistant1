// ----------------------------
// EduMate Backend (server.js)
// ----------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ----------------------------
// API: Study Plan
// ----------------------------
app.post("/api/plan", (req, res) => {
  const topics = [
    "C Basics",
    "Arrays & Functions",
    "Pointers & Structures",
    "Revision + Practice",
  ];
  const plan = topics.map((topic, index) => ({
    day: index + 1,
    topic,
    duration: `${(2 + Math.random()).toFixed(1)} hrs`,
  }));
  res.json({ success: true, plan });
});

// ----------------------------
// API: Chat (Mock AI Reply)
// ----------------------------
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  const responses = [
    `That's an interesting topic: ${message}! Let's explore it.`,
    `I think ${message} is a great concept to study.`,
    `Let me help you understand ${message} in simple terms.`,
    `Studying ${message} with examples will help you master it!`,
  ];
  const reply = responses[Math.floor(Math.random() * responses.length)];
  res.json({ reply });
});

// ----------------------------
// API: Quiz
// ----------------------------
app.post("/api/quiz", (req, res) => {
  const { topic } = req.body;
  const quizzes = {
    arrays: [
      { q: "What is the index of the first element?", a: "0" },
      { q: "Which data structure stores multiple values?", a: "Array" },
    ],
    pointers: [
      { q: "What does a pointer store?", a: "Memory address" },
      { q: "Which operator is used for dereferencing?", a: "*" },
    ],
  };
  const quiz = quizzes[topic?.toLowerCase()] || [
    { q: `What is ${topic}?`, a: "A key programming concept" },
  ];
  res.json({ quiz });
});

// ----------------------------
// Serve Frontend (index.html)
// ----------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ----------------------------
app.listen(PORT, () => {
  console.log(`✅ EduMate server running on port ${PORT}`);
});
