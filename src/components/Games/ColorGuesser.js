import { useState, useEffect } from "react";
import "./Games.css";

export default function ColorGuesser() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);

  const generateColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const target = generateColor();
    const wrongColors = [generateColor(), generateColor()];
    const allOptions = [target, ...wrongColors].sort(() => Math.random() - 0.5);

    setTargetColor(target);
    setOptions(allOptions);
    setMessage("");
    setGameWon(false);
  };

  const handleGuess = (color) => {
    setAttempts(attempts + 1);

    if (color === targetColor) {
      setScore(score + 1);
      setMessage("🎉 Correct!");
      setGameWon(true);
      setTimeout(startNewRound, 1500);
    } else {
      setMessage("❌ Wrong! Try again");
    }
  };

  const resetScore = () => {
    setScore(0);
    setAttempts(0);
    setMessage("");
    startNewRound();
  };

  return (
    <div className="game-container">
      <h2 className="game-title">Color Guesser</h2>

      <div className="color-guesser-wrapper">
        <div className="target-color-box">
          <div
            className="target-color"
            style={{ backgroundColor: targetColor }}
          ></div>
          <p className="color-label">Guess this color</p>
        </div>

        <div className="color-options">
          {options.map((color, index) => (
            <button
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              disabled={gameWon}
              title={color}
            ></button>
          ))}
        </div>
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Attempts:</span>
          <span className="stat-value">{attempts}</span>
        </div>
        {score > 0 && (
          <div className="stat">
            <span className="stat-label">Accuracy:</span>
            <span className="stat-value">
              {Math.round((score / attempts) * 100)}%
            </span>
          </div>
        )}
      </div>

      {message && <p className="message">{message}</p>}

      <button className="reset-button" onClick={resetScore}>
        Reset Game
      </button>
    </div>
  );
}