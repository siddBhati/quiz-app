const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Question = require("./models/questionSchema");
const port = 5000;

// mongodb+srv://siddharth:<password>@cluster0.f6bfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose
  .connect("mongodb+srv://digitUP:WKfnSFSPEMhTrNvd@cluster0.f6bfz.mongodb.net/Quiz?retryWrites=true&w=majority&appName=Cluster0")
  .then(console.log("db connected"))
  .catch((err) => console.error("Mongodb not connected", err));

app.use(cors());
app.get("/", async (req, res) => {
  res.send("Home Page");
});

const gkQuestions = [
  {
    question_text: "What is the capital of France?",
    option_a: "London",
    option_b: "Berlin",
    option_c: "Paris",
    option_d: "Madrid",
    correction_answer: "option_c",
  },
  {
    question_text: "Who wrote 'To Kill a Mockingbird'?",
    option_a: "Mark Twain",
    option_b: "Harper Lee",
    option_c: "J.K. Rowling",
    option_d: "Charles Dickens",
    correction_answer: "option_b",
  },
  {
    question_text: "What is the largest mammal in the world?",
    option_a: "Elephant",
    option_b: "Blue Whale",
    option_c: "Giraffe",
    option_d: "Hippo",
    correction_answer: "option_b",
  },
];

app.post("/question", async (req, res) => {
  try {
    const questions = [];

    for (const gkQuestion of gkQuestions) {
      const savedQuestion = await Question.create(gkQuestion);
      questions.push(savedQuestion);
    }

    res.json(questions);
  } catch (err) {
    console.error("Error creating questions:", err);
    res.status(500).json({ error: "Error creating questions" });
  }
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Error fetching questions" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port ${port}`);
});
