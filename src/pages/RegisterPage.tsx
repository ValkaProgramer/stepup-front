import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        password,
        confirmPassword,
      });

      toast.success("Account registered successfully!");

      setConfirmPassword("");

      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Registration failed.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="text-black grow">
      <div className="top-0 pt-[20vh] pb-[10vh] text-2xl">
        <h1 className="mb-10 font-semibold">Sign Up</h1>
      </div>
      <form onSubmit={handleRegister}>
        <div>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border-[#E8E8E8] border-2 rounded-[8px] bg-[#F6F6F6] p-1"
            placeholder="Username"
          />
        </div>
        <div>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-[#E8E8E8] border-2 rounded-[8px] bg-[#F6F6F6] p-1"
            placeholder="Password"
          />
        </div>
        <div>
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border-[#E8E8E8] border-2 rounded-[8px] bg-[#F6F6F6] p-1"
            placeholder="Confirm password"
          />
        </div>
        <button
          disabled={!validateCredentials(username, password, confirmPassword)}
          type="submit"
          style={{ marginTop: 10 }}
          className={`mb-8 rounded-[100px] bg-[#FFDF2B] ${
            !validateCredentials(username, password, confirmPassword)
              ? ""
              : "hover:bg-[#00DF2B] cursor-pointer"
          }`}
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
