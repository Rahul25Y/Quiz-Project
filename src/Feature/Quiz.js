//Quiz
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Quiz.css';
import Navbar from "./Navbar";
// import Navbar from "./Navbar";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      if (response.data.results && response.data.results.length > 0) {
        setQuestions(response.data.results);
      } else {
        console.log("No questions found the API Response.");
      }
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };

  const handleAnswerButtonClick = (answer) => {
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    fetchQuestions();
  };

  return (
    <div className="Main-box">
    <Navbar/>
    <div className="container">
      <h1 className="Gk-Quiz"> Gk Quiz App </h1>
      {showScore ? (
        <div>
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={restartQuiz} id="Restart-Quiz">Restart Quiz</button>
        </div>
      ) : questions.length === 0 ? (
      
        <p> Loading...</p>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].incorrect_answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerButtonClick(answer)}
              className="answerButton"
            >
              {answer}
            </button>
          ))}
          <button
            onClick={() =>
        handleAnswerButtonClick(questions[currentQuestion].correct_answer)
            }
            className="answerButton"
          >
            {questions[currentQuestion].correct_answer}
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default Quiz;