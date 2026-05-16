import React from "react";

function Home() {
  return (
    <div className="page-card">
      <h2>Home</h2>

      <p>
        Welcome to TaskFlow — a simple place to manage your tasks.
      </p>

      <div style={{ marginTop: 18 }}>
        <p className="empty-state">
          This is the Home page. Use the sidebar to navigate
          through your dashboard, add tasks, or view your profile.
        </p>
      </div>
    </div>
  );
}

export default Home;
