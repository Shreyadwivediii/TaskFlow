import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
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
        navigate("/dashboard");
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Server not reachable");
    }
  };

  return (
    <form className="page-card" onSubmit={handleLogin}>
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

      <button className="primary-button" type="submit">
        Login
      </button>

      <p className="card-note">
        New to TaskFlow? <Link to="/signup">Create an account</Link>
      </p>
    </form>
  );
}

export default Login;