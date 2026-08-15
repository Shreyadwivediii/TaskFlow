import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Profile() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const fetchProfile = async () => {
    try {
      if (!token) {
        setUser(null);
        return;
      }

      const res = await fetch(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }

        return;
      }

      setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <aside className="sidebar">
      <div>
        <h1 className="sidebar-logo">
          Task<span>Flow</span>
        </h1>

        <div className="sidebar-user-card">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="sidebar-user">
            <h3>{user?.name || "User"}</h3>
            <p>{user?.email || "user@email.com"}</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              isActive ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Add Task
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "sidebar-link active-link" : "sidebar-link"
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Profile;