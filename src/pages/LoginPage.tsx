import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateCredentials = (username: string, password: string) => {
    return (
      username.length >= 5 &&
      password.length >= 8 &&
      username.length <= 24 &&
      password.length <= 24
    );
  };

  //   const validateUsername = (username: string) => {
  //     return username.length >= 8 && username.length <= 24;
  //   };

  //   const validatePassword = (password: string) => {
  //     return password.length >= 8 && password.length <= 24;
  //   };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      setMessage("Login successful!");
      navigate("/home");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Login failed.");
      } else {
        setMessage("Unexpected error during login.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 40 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          disabled={!validateCredentials(username, password)}
          type="submit"
          style={{ marginTop: 10 }}
        >
          Login
        </button>
      </form>
      {!validateCredentials(username, password) ?
        <>
          <p className="mt-0">Username should not be more than 24 or less than 5 characters</p>
          <p>Password should not be more than 24 or less than 8 characters</p>
        </> : ""
      }
      {message && <p style={{ color: "crimson" }}>{message}</p>}
    </div>
  );
};

export default LoginPage;
