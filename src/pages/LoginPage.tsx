import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      toast.success("You have successfully logged in!");

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
    <div className="text-black grow">
      <div className="top-0 pt-[20vh] pb-[10vh] text-2xl ">
        <h1 className="mb-10 font-semibold">Login</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <br />
          <input
            className="border-[#E8E8E8] border-2 rounded-[8px] bg-[#F7F6F6] p-1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>
        <div>
          <br />
          <input
            className="border-[#E8E8E8] border-2 rounded-[8px] bg-[#F6F6F6] p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <button
          disabled={!validateCredentials(username, password)}
          type="submit"
          style={{ marginTop: 10 }}
          className={`mb-8 rounded-[100px] bg-[#FFDF2B] ${
            !validateCredentials(username, password)
              ? ""
              : "hover:bg-[#00DF2B] cursor-pointer"
          }`}
        >
          Login
        </button>
      </form>
      {!validateCredentials(username, password) ? (
        <>
          <p className="mt-0">
            Username should not be more than 24 or less than 5 characters
          </p>
          <p>Password should not be more than 24 or less than 8 characters</p>
        </>
      ) : (
        ""
      )}
      {message && <p style={{ color: "crimson" }}>{message}</p>}
    </div>
  );
};

export default LoginPage;
