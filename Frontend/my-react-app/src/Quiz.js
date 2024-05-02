import React, { useState, useEffect } from "react";
import axios from "axios";
import "./quiz.css"; // Import CSS file

function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get("http://localhost:5000/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    let newScore = 0;
    const newAnswerStatus = {};
    questions.forEach((question) => {
      if (answers[question._id] === question.correction_answer) {
        newScore++;
        newAnswerStatus[question._id] = "correct";
      } else {
        newAnswerStatus[question._id] = "incorrect";
      }
    });
    setScore(newScore);
    setShow(true);
    setAnswerStatus(newAnswerStatus);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>
      {questions.map((question) => (
        <div key={question._id} className="question-container">
          <h3>{question.question_text}</h3>
          <form className="options-form">
            {["option_a", "option_b", "option_c", "option_d"].map((option) => (
              <label
                key={option}
                className={`option-label ${
                  answerStatus[question._id] === "correct"
                    ? "correct"
                    : answerStatus[question._id] === "incorrect" &&
                      answers[question._id] === option
                    ? "incorrect"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={question._id}
                  value={option}
                  onChange={() => handleAnswer(question._id, option)}
                  className="option-input"
                />
                {question[option]}
              </label>
            ))}
          </form>
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-button">
        Submit Answers
      </button>
      {show && (
        <div className="score-text">
          <p>Summary:</p>
          <p>Total questions: {questions.length}</p>
          <p>Correct answers: {score}</p>
          <p>Incorrect answers: {questions.length - score}</p>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
