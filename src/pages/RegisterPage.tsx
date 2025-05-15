import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateCredentials = (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    return (
      username.length >= 5 &&
      password.length >= 8 &&
      username.length <= 24 &&
      password.length <= 24 &&
      confirmPassword === password
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
        confirmPassword,
      });

      setMessage(response.data.message);
      setConfirmPassword("");

      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Registration failed.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 40 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password:</label>
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          disabled={!validateCredentials(username, password, confirmPassword)}
          type="submit"
          style={{ marginTop: 10 }}
        >
          Register
        </button>
      </form>
      {!validateCredentials(username, password, confirmPassword) ? (
        <>
          <p className="mt-0">
            Username should not be more than 24 or less than 5 characters
          </p>
          <p>Password should not be more than 24 or less than 8 characters</p>
          <p>Password should be confirmed</p>
        </>
      ) : (
        ""
      )}
      {message && <p style={{ color: "crimson" }}>{message}</p>}
    </div>
  );
};

export default RegisterPage;
