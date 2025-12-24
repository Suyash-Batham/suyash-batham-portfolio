import { useState } from "react";
import "./Playground.css";
import TicTacToe from "../../components/Games/TicTacToe";
import ColorGuesser from "../../components/Games/ColorGuesser";
import MemoryMatch from "../../components/Games/MemoryMatch";
import QuizGame from "../../components/Games/QuizGame";
import KanbanBoard from "../../components/Games/KanbanBoard";

export default function Playground() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: "tictactoe",
      name: "Tic Tac Toe",
      icon: "⭕",
      description: "Classic game, play against AI",
      functionality: "useState, Conditional Rendering",
      component: TicTacToe
    },
    {
      id: "colorguesser",
      name: "Color Guesser",
      icon: "🎨",
      description: "Guess the correct RGB color",
      functionality: "useState, useEffect, setTimeout",
      component: ColorGuesser
    },
    {
      id: "memorymatch",
      name: "Memory Match",
      icon: "🧠",
      description: "Match pairs of cards",
      functionality: "useState, useEffect, Array Methods",
      component: MemoryMatch
    },
    // {
    //   id: "quiz",
    //   name: "Tech Quiz",
    //   icon: "🚀",
    //   description: "Test your tech knowledge",
    //   functionality: "useState, Conditional Rendering, Ternary Operators",
    //   component: QuizGame
    // },
    {
      id: "kanban",
      name: "Gamified Kanban",
      icon: "📊",
      description: "Task management with points and streaks",
      functionality: "useReducer, useMemo, useCallback, LocalStorage, Drag & Drop",
      component: KanbanBoard
    }
  ];

  const SelectedComponent = selectedGame
    ? games.find((g) => g.id === selectedGame)?.component
    : null;

  return (
    <div className="playground-container">
      {!selectedGame ? (
        <>
          {/* Header */}
          <div className="playground-header fade-in">
            <h1 className="playground-title">Game Playground</h1>
            <p className="playground-subtitle">
              Take a break and play some fun games while you're here
            </p>
          </div>

          {/* Games Grid */}
          <div className="games-grid">
            {games.map((game, index) => (
              <button
                key={game.id}
                className="game-card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedGame(game.id)}
              >
                <div className="game-icon">{game.icon}</div>
                <h3 className="game-name">{game.name}</h3>
                <p className="game-description">{game.description}</p>
                <div className="game-functionality">
                  <small className="functionality-label">Uses: {game.functionality}</small>
                </div>
                <div className="game-cta">Play Now →</div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Game View */}
          <div className="game-view">
            <button
              className="back-button"
              onClick={() => setSelectedGame(null)}
            >
              ← Back to Games
            </button>
            <SelectedComponent />
          </div>
        </>
      )}

      {/* Background Elements */}
      <div className="skills-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </div>
  );
}