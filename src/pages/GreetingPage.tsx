import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";

const GreetingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  // !isAuthenticated ?  : (<Navigate to="/home" replace />)
  return (
    <>
      <div>
        {isAuthenticated ? (
          <Link to="/home">
            <button>Home</button>
          </Link>
        ) : (
          ""
        )}
        <span>
          <h1>Welcome to</h1>
          <h1 className="use-mionta">STEPUP</h1>
        </span>
        <p>Your personal reminder app.</p>
        <p>Get started by creating an account or logging in.</p>
        <div className="home-page-buttons">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GreetingPage;
