import { useState } from "react";
import "./Games.css";

export default function QuizGame() {
  const quizQuestions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "High Tech Modern Language"
      ],
      correct: 0
    },
    {
      question: "Which one is NOT a JavaScript framework?",
      options: ["React", "Vue", "Angular", "Laravel"],
      correct: 3
    },
    {
      question: "What is CSS used for?",
      options: [
        "Styling web pages",
        "Server-side scripting",
        "Database management",
        "Creating APIs"
      ],
      correct: 0
    },
    {
      question: "Which is the correct CSS syntax?",
      options: [
        "body {color: blue;}",
        "{body color: blue;}",
        "body: color blue;",
        "body [color: blue;]"
      ],
      correct: 0
    },
    {
      question: "What is the purpose of Git?",
      options: [
        "Version control",
        "Database management",
        "Web server",
        "Frontend framework"
      ],
      correct: 0
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  const handleAnswerClick = (index) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setGameEnded(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setGameEnded(false);
  };

  if (gameEnded) {
    return (
      <div className="game-container">
        <h2 className="game-title">Quiz Completed!</h2>

        <div className="quiz-results">
          <div className="result-score">
            <p className="result-label">Your Score</p>
            <p className="result-value">
              {score} / {quizQuestions.length}
            </p>
          </div>

          <p className="result-percentage">
            {Math.round((score / quizQuestions.length) * 100)}%
          </p>

          {score === quizQuestions.length ? (
            <p className="result-message">🎉 Perfect Score!</p>
          ) : score >= quizQuestions.length * 0.7 ? (
            <p className="result-message">🎊 Great Job!</p>
          ) : (
            <p className="result-message">💪 Keep Practicing!</p>
          )}
        </div>

        <button className="reset-button" onClick={resetQuiz}>
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="game-container">
      <h2 className="game-title">Tech Quiz</h2>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`
            }}
          ></div>
        </div>
        <p className="progress-text">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>

      <div className="quiz-content">
        <h3 className="quiz-question">{question.question}</h3>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === index ? "selected" : ""
              } ${
                answered && index === question.correct
                  ? "correct"
                  : answered && selectedAnswer === index
                  ? "incorrect"
                  : ""
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={answered}
            >
              <span className="option-text">{option}</span>
              {answered && index === question.correct && (
                <span className="option-icon">✓</span>
              )}
              {answered && selectedAnswer === index && index !== question.correct && (
                <span className="option-icon">✗</span>
              )}
            </button>
          ))}
        </div>

        {answered && (
          <button className="next-button" onClick={handleNextQuestion}>
            {currentQuestion + 1 === quizQuestions.length
              ? "See Results"
              : "Next Question"}
          </button>
        )}
      </div>

      <div className="quiz-score">Score: {score}</div>
    </div>
  );
}