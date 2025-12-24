import { useState } from "react";
import "./Games.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (newBoard.every((square) => square !== null)) {
      setGameOver(true);
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  const isBoardFull = board.every((square) => square !== null);

  return (
    <div className="game-container">
      <h2 className="game-title">Tic Tac Toe</h2>

      <div className="tictactoe-wrapper">
        <div className="tictactoe-board">
          {board.map((value, index) => (
            <button
              key={index}
              className={`tictactoe-cell ${value}`}
              onClick={() => handleClick(index)}
              disabled={gameOver || value !== null}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="game-status">
        {winner ? (
          <p className="winner-text">🎉 Player {winner} Wins!</p>
        ) : isBoardFull ? (
          <p className="draw-text">🤝 It's a Draw!</p>
        ) : (
          <p className="current-player">
            Current Player: <span className="player-mark">{isXNext ? "X" : "O"}</span>
          </p>
        )}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}