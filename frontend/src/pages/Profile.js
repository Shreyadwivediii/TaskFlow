import { useEffect, useState } from "react";

function Profile({ activePage, setActivePage }) {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchProfile = async () => {
    try {
      if (!token) {
        setUser(null);
        return;
      }

      const res = await fetch("http://localhost:5000/api/user/profile", {
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
          <button
            className={
              activePage === "dashboard"
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={
              activePage === "add"
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
            onClick={() => setActivePage("add")}
          >
            Add Task
          </button>

          <button
            className={
              activePage === "profile"
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
            onClick={() => setActivePage("profile")}
          >
            Profile
          </button>
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