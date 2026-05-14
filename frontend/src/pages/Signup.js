import { useState } from "react";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    toast.success(data.message);
  };

  return (
    <div className="page-card">
      <h2>Create Account</h2>

      <div className="field-group">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

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
        onClick={handleSignup}
      >
        Signup
      </button>

      <p className="card-note">
        Start managing your tasks efficiently.
      </p>
    </div>
  );
}

export default Signup;