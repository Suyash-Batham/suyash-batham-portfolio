import { useState, useReducer, useMemo, useCallback, useEffect } from "react";
import "./KanbanBoard.css";

const COLUMNS = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done"
};

const COLUMN_TITLES = {
  [COLUMNS.TODO]: "To Do",
  [COLUMNS.IN_PROGRESS]: "In Progress",
  [COLUMNS.DONE]: "Done"
};

const POINTS = {
  CREATE: 5,
  MOVE_TO_IN_PROGRESS: 10,
  COMPLETE: 25,
  STREAK_BONUS: 15
};

const initialState = {
  tasks: [],
  taskIdCounter: 0,
  points: 0,
  completedToday: 0,
  streak: 0,
  history: [],
  historyStep: -1,
  draggedTask: null,
  lastCompletedTime: null
};

function kanbanReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = {
        id: state.taskIdCounter,
        title: action.payload.title,
        description: action.payload.description || "",
        column: COLUMNS.TODO,
        createdAt: new Date().toISOString(),
        completedAt: null,
        timeSpent: 0
      };

      const newTasks = [...state.tasks, newTask];
      const newState = {
        ...state,
        tasks: newTasks,
        taskIdCounter: state.taskIdCounter + 1,
        points: state.points + POINTS.CREATE
      };

      return {
        ...newState,
        history: [...state.history.slice(0, state.historyStep + 1), newTasks],
        historyStep: state.historyStep + 1
      };
    }

    case "MOVE_TASK": {
      const { taskId, newColumn } = action.payload;
      const taskIndex = state.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return state;

      const updatedTasks = [...state.tasks];
      const oldColumn = updatedTasks[taskIndex].column;
      updatedTasks[taskIndex].column = newColumn;

      let pointsEarned = 0;
      let newCompletedToday = state.completedToday;
      let newStreak = state.streak;
      let newLastCompletedTime = state.lastCompletedTime;

      if (newColumn === COLUMNS.IN_PROGRESS && oldColumn === COLUMNS.TODO) {
        pointsEarned = POINTS.MOVE_TO_IN_PROGRESS;
      }

      if (newColumn === COLUMNS.DONE && oldColumn !== COLUMNS.DONE) {
        updatedTasks[taskIndex].completedAt = new Date().toISOString();
        pointsEarned = POINTS.COMPLETE;
        newCompletedToday = state.completedToday + 1;

        const now = new Date();
        const lastCompleted = state.lastCompletedTime
          ? new Date(state.lastCompletedTime)
          : null;

        if (
          lastCompleted &&
          now.getDate() === lastCompleted.getDate() &&
          now.getMonth() === lastCompleted.getMonth()
        ) {
          newStreak = state.streak + 1;
          pointsEarned += POINTS.STREAK_BONUS;
        } else {
          newStreak = 1;
        }

        newLastCompletedTime = now.toISOString();
      }

      const newState = {
        ...state,
        tasks: updatedTasks,
        points: state.points + pointsEarned,
        completedToday: newCompletedToday,
        streak: newStreak,
        lastCompletedTime: newLastCompletedTime
      };

      return {
        ...newState,
        history: [...state.history.slice(0, state.historyStep + 1), updatedTasks],
        historyStep: state.historyStep + 1
      };
    }

    case "DELETE_TASK": {
      const newTasks = state.tasks.filter((t) => t.id !== action.payload.taskId);
      return {
        ...state,
        tasks: newTasks,
        history: [...state.history.slice(0, state.historyStep + 1), newTasks],
        historyStep: state.historyStep + 1
      };
    }

    case "UNDO": {
      if (state.historyStep <= 0) return state;
      return {
        ...state,
        tasks: state.history[state.historyStep - 1],
        historyStep: state.historyStep - 1
      };
    }

    case "REDO": {
      if (state.historyStep >= state.history.length - 1) return state;
      return {
        ...state,
        tasks: state.history[state.historyStep + 1],
        historyStep: state.historyStep + 1
      };
    }

    case "LOAD_FROM_STORAGE": {
      return action.payload;
    }

    case "RESET": {
      return initialState;
    }

    default:
      return state;
  }
}

export default function KanbanBoard() {
  const [state, dispatch] = useReducer(kanbanReducer, initialState);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColumn, setFilteredColumn] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [showStats, setShowStats] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("kanbanBoard");
    if (saved) {
      try {
        dispatch({ type: "LOAD_FROM_STORAGE", payload: JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify(state));
  }, [state]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault();
          dispatch({ type: "UNDO" });
        }
        if (e.key === "y") {
          e.preventDefault();
          dispatch({ type: "REDO" });
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch({
        type: "ADD_TASK",
        payload: {
          title: taskTitle,
          description: taskDescription
        }
      });
      setTaskTitle("");
      setTaskDescription("");
    }
  };

  const handleDragStart = (e, task, column) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("fromColumn", column);
    setDraggedFrom(column);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, toColumn) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    dispatch({
      type: "MOVE_TASK",
      payload: { taskId, newColumn: toColumn }
    });
    setDraggedFrom(null);
  };

  const handleDeleteTask = useCallback((taskId) => {
    dispatch({ type: "DELETE_TASK", payload: { taskId } });
  }, []);

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColumn = !filteredColumn || task.column === filteredColumn;
      return matchesSearch && matchesColumn;
    });
  }, [state.tasks, searchQuery, filteredColumn]);

  const tasksByColumn = useMemo(() => {
    return {
      [COLUMNS.TODO]: filteredTasks.filter((t) => t.column === COLUMNS.TODO),
      [COLUMNS.IN_PROGRESS]: filteredTasks.filter(
        (t) => t.column === COLUMNS.IN_PROGRESS
      ),
      [COLUMNS.DONE]: filteredTasks.filter((t) => t.column === COLUMNS.DONE)
    };
  }, [filteredTasks]);

  const stats = useMemo(() => {
    const completionRate =
      state.tasks.length > 0
        ? Math.round((tasksByColumn[COLUMNS.DONE].length / state.tasks.length) * 100)
        : 0;

    return {
      totalTasks: state.tasks.length,
      completedTasks: tasksByColumn[COLUMNS.DONE].length,
      inProgressTasks: tasksByColumn[COLUMNS.IN_PROGRESS].length,
      completionRate,
      avgTimePerTask:
        tasksByColumn[COLUMNS.DONE].length > 0
          ? Math.round(
              state.points / (tasksByColumn[COLUMNS.DONE].length * POINTS.COMPLETE)
            )
          : 0
    };
  }, [state.tasks, tasksByColumn]);

  return (
    <div className="kanban-container">
      {/* Header */}
      <div className="kanban-header">
        <h2 className="kanban-title">Gamified Kanban Board</h2>
        <div className="kanban-stats-bar">
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{state.points}</span>
            <span className="stat-label">Points</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{state.streak}</span>
            <span className="stat-label">Streak</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{state.completedToday}</span>
            <span className="stat-label">Today</span>
          </div>
          <button
            className="stats-toggle-btn"
            onClick={() => setShowStats(!showStats)}
            aria-label="Toggle detailed stats"
          >
            {showStats ? "Hide Stats" : "Show Stats"}
          </button>
        </div>
      </div>

      {/* Detailed Stats */}
      {showStats && (
        <div className="detailed-stats">
          <div className="stat-card">
            <h4>Progress</h4>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${stats.completionRate}%` }}
              ></div>
            </div>
            <p className="stat-text">
              {stats.completedTasks} / {stats.totalTasks} tasks ({stats.completionRate}%)
            </p>
          </div>

          <div className="stat-card">
            <h4>Activity</h4>
            <p className="stat-text">In Progress: {stats.inProgressTasks}</p>
            <p className="stat-text">Completed: {stats.completedTasks}</p>
          </div>

          <div className="stat-card">
            <h4>Points Breakdown</h4>
            <p className="stat-text small">Create: +{POINTS.CREATE} pts</p>
            <p className="stat-text small">Start: +{POINTS.MOVE_TO_IN_PROGRESS} pts</p>
            <p className="stat-text small">Complete: +{POINTS.COMPLETE} pts</p>
            <p className="stat-text small">Streak: +{POINTS.STREAK_BONUS} bonus</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="kanban-controls">
        <div className="input-group">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            className="task-input"
            aria-label="New task title"
          />
          <textarea
            placeholder="Add description (optional)"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="task-description"
            rows="2"
            aria-label="New task description"
          />
          <button
            className="add-task-btn"
            onClick={handleAddTask}
            aria-label="Add new task"
          >
            + Add Task (+{POINTS.CREATE} pts)
          </button>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search tasks"
          />

          <div className="filter-buttons">
            <button
              className={`filter-btn ${!filteredColumn ? "active" : ""}`}
              onClick={() => setFilteredColumn(null)}
              aria-label="Show all columns"
            >
              All
            </button>
            {Object.values(COLUMNS).map((col) => (
              <button
                key={col}
                className={`filter-btn ${filteredColumn === col ? "active" : ""}`}
                onClick={() => setFilteredColumn(filteredColumn === col ? null : col)}
                aria-label={`Filter by ${COLUMN_TITLES[col]}`}
              >
                {COLUMN_TITLES[col]}
              </button>
            ))}
          </div>

          <div className="action-buttons">
            <button
              className="icon-btn"
              onClick={() => dispatch({ type: "UNDO" })}
              disabled={state.historyStep <= 0}
              title="Ctrl+Z"
              aria-label="Undo (Ctrl+Z)"
            >
              ↶
            </button>
            <button
              className="icon-btn"
              onClick={() => dispatch({ type: "REDO" })}
              disabled={state.historyStep >= state.history.length - 1}
              title="Ctrl+Y"
              aria-label="Redo (Ctrl+Y)"
            >
              ↷
            </button>
            <button
              className="reset-btn"
              onClick={() =>
                window.confirm("Reset all tasks?") && dispatch({ type: "RESET" })
              }
              aria-label="Reset board"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {Object.values(COLUMNS).map((column) => (
          <div key={column} className="kanban-column">
            <div className="column-header">
              <h3 className="column-title">{COLUMN_TITLES[column]}</h3>
              <span className="task-count">{tasksByColumn[column].length}</span>
            </div>

            <div
              className={`column-content ${draggedFrom === column ? "dragging-from" : ""}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
              aria-label={`${COLUMN_TITLES[column]} column`}
            >
              {tasksByColumn[column].length === 0 ? (
                <div className="empty-state">
                  {searchQuery ? "No matching tasks" : "Drop tasks here"}
                </div>
              ) : (
                tasksByColumn[column].map((task) => (
                  <div
                    key={task.id}
                    className="task-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column)}
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight") {
                        const columns = Object.values(COLUMNS);
                        const currentIdx = columns.indexOf(column);
                        if (currentIdx < columns.length - 1) {
                          dispatch({
                            type: "MOVE_TASK",
                            payload: {
                              taskId: task.id,
                              newColumn: columns[currentIdx + 1]
                            }
                          });
                        }
                      } else if (e.key === "Delete") {
                        handleDeleteTask(task.id);
                      }
                    }}
                  >
                    <h4 className="task-title">{task.title}</h4>
                    {task.description && (
                      <p className="task-description-text">{task.description}</p>
                    )}
                    <div className="task-meta">
                      <small className="task-id">ID: {task.id}</small>
                      {column === COLUMNS.DONE && (
                        <span className="task-completed">✓ Completed</span>
                      )}
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label={`Delete task ${task.title}`}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="kanban-help">
        <p>💡 Drag tasks between columns | 🎮 Earn points for progress | ⌨️ Ctrl+Z to undo</p>
      </div>
    </div>
  );
}
