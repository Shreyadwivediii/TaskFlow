import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="app-shell">
        {!token ? (
          <Routes>
            <Route
              path="/login"
              element={
                <div className="auth-panel">
                  <div className="auth-left">
                    <h2>Welcome back</h2>

                    <p>
                      Sign in to continue managing your tasks.
                    </p>
                  </div>

                  <div className="auth-right">
                    <Login />
                  </div>
                </div>
              }
            />

            <Route
              path="/signup"
              element={
                <div className="auth-panel">
                  <div className="auth-left">
                    <h2>Create your account</h2>

                    <p>
                      Start organizing your tasks with TaskFlow.
                    </p>
                  </div>

                  <div className="auth-right">
                    <Signup />
                  </div>
                </div>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <div className="main-layout">
            <Profile />

            <div className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Todo />} />
                <Route path="/add-task" element={<Todo showForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;