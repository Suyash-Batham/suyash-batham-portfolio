import { useState, useEffect } from "react";
import "./Games.css";

export default function MemoryMatch() {
  const symbols = ["🎨", "🎭", "🎪", "🎯", "🎲", "🎸", "🎺", "🎻"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index) => {
    if (
      flipped.includes(index) ||
      matched.includes(index) ||
      flipped.length === 2
    ) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      if (cards[newFlipped[0]].symbol === cards[newFlipped[1]].symbol) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);

        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">Memory Match</h2>

      <div className="memory-grid">
        {cards.map((card, index) => (
          <button
            key={card.id}
            className={`memory-card ${
              flipped.includes(index) || matched.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() => handleCardClick(index)}
            disabled={gameWon}
          >
            <div className="memory-card-inner">
              {flipped.includes(index) || matched.includes(index) ? (
                <span className="memory-symbol">{card.symbol}</span>
              ) : (
                <span className="memory-back">?</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Matched:</span>
          <span className="stat-value">{matched.length / 2}</span>
        </div>
      </div>

      {gameWon && (
        <p className="winner-text">🎉 You Won in {moves} moves!</p>
      )}

      <button className="reset-button" onClick={initializeGame}>
        {gameWon ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
}