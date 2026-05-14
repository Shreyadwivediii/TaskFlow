import { useState } from "react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";
import ProfilePage from "./pages/ProfilePage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const token = localStorage.getItem("token");

  const [activePage, setActivePage] =
    useState("dashboard");

  return (
    <div className="app-shell">

      {!token ? (

        <div className="auth-panel">

          <div className="auth-left">

            <h2>Welcome back</h2>

            <p>
              Sign in to continue managing your tasks.
            </p>

          </div>

          <div className="auth-right">

            <Signup />
            <Login />

          </div>

        </div>

      ) : (

        <div className="main-layout">

          <Profile
            activePage={activePage}
            setActivePage={setActivePage}
          />

          <div className="main-content">

            {activePage === "profile" ? (

              <ProfilePage />

            ) : (

              <Todo
                activePage={activePage}
                setActivePage={setActivePage}
              />

            )}

          </div>

        </div>

      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

    </div>
  );
}

export default App;