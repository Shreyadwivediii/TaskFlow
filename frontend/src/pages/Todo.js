import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Todo({ activePage, setActivePage }) {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const loadTodos = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTodos([]);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Unable to load tasks");
        return;
      }

      setTodos(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      toast.error("Server not reachable");
    }
  };

  const addTodo = async () => {
    if (!text.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    const url = editId
      ? `http://localhost:5000/api/todo/${editId}`
      : "http://localhost:5000/api/todo";

    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          priority,
          category,
          dueDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(
        editId
          ? "Task updated successfully"
          : "Task added successfully"
      );

      setText("");
      setPriority("Medium");
      setCategory("General");
      setDueDate("");
      setEditId(null);
      setActivePage("dashboard");

      loadTodos();
    } catch (error) {
      toast.error("Server not reachable");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/todo/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Unable to delete task");
        return;
      }

      toast.success("Task deleted");
      loadTodos();
    } catch (error) {
      toast.error("Server not reachable");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/todo/${id}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Unable to update task");
        return;
      }

      toast.success("Task updated");
      loadTodos();
    } catch (error) {
      toast.error("Server not reachable");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const completedTasks = todos.filter((t) => t.completed).length;
  const pendingTasks = todos.length - completedTasks;

  const highPriorityTasks = todos.filter(
    (t) => t.priority === "High"
  ).length;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filter === "All"
        ? true
        : filter === "Completed"
        ? todo.completed
        : !todo.completed;

    const matchesPriority =
      priorityFilter === "All"
        ? true
        : todo.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="todo-page">
      {activePage === "add" && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>{editId ? "Edit Task" : "Add New Task"}</h2>

              <button
                className="close-btn"
                onClick={() => {
                  setActivePage("dashboard");
                  setEditId(null);
                  setText("");
                  setPriority("Medium");
                  setCategory("General");
                  setDueDate("");
                }}
              >
                ×
              </button>
            </div>

            <div className="todo-controls">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter task"
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <button
                className="primary-button"
                onClick={addTodo}
              >
                {editId ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Tasks</h3>
          <p>{todos.length}</p>
        </div>

        <div className="stats-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stats-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="stats-card">
          <h3>High Priority</h3>
          <p>{highPriorityTasks}</p>
        </div>
      </div>

      <div className="page-card">
        <div className="filters-grid">
          <input
            type="text"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="page-card">
          <p className="empty-state">No tasks found</p>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((t) => (
            <li key={t._id} className="todo-item">
              <div
                style={{
                  textDecoration: t.completed
                    ? "line-through"
                    : "none",
                  opacity: t.completed ? 0.6 : 1,
                }}
              >
                <strong>{t.text}</strong>

                <div className="task-badges">
                  <div className="badge">{t.priority}</div>

                  <div className="badge">{t.category}</div>

                  {t.dueDate && (
                    <div className="badge">
                      Due{" "}
                      {new Date(t.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="todo-actions">
                <button
                  className="primary-button"
                  onClick={() => toggleTodo(t._id)}
                >
                  {t.completed ? "Undo" : "Complete"}
                </button>

                <button
                  className="secondary-button"
                  onClick={() => {
                    setText(t.text);
                    setPriority(t.priority);
                    setCategory(t.category);
                    setDueDate(
                      t.dueDate ? t.dueDate.slice(0, 10) : ""
                    );
                    setEditId(t._id);
                    setActivePage("add");
                  }}
                >
                  Edit
                </button>

                <button
                  className="secondary-button"
                  onClick={() => deleteTodo(t._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todo;