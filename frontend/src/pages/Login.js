import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      window.location.reload();
    } else {
      toast.error(data.message || "Login failed");
    }
  };

  return (
    <div className="page-card">
      <h2>Welcome Back</h2>

      <div className="field-group">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="primary-button"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="card-note">
        Continue organizing your productivity.
      </p>
    </div>
  );
}

export default Login;