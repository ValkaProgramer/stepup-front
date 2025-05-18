import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";

const GreetingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="text-black flex flex-col justify-center items-center">
        <span>
          <h1 className="pb-10">Welcome to</h1>
          <h1 className="use-mionta text-with-stroke pb-10">STEPUP</h1>
        </span>
        <p>Your personal reminder app.</p>
        <p className="pb-10">
          Get started by creating an account or logging in.
        </p>
        <div className="flex justify-around max-w-[60vw] gap-10">
          <Link to="/register">
            <button className="cursor-pointer rounded-[100px] bg-[#FFDF2B]">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="cursor-pointer rounded-[100px] bg-[#FFDF2B]">
              Login
            </button>
          </Link>
        </div>
        {isAuthenticated ? (
          <Link to="/home">
            <button className="cursor-pointer rounded-[100px] bg-[#FFDF2B]">
              Home
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GreetingPage;
