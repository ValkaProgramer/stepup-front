import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [selectedPage, setSelectedPage] = useState("home");

  return (
    <div className="flex justify-around relative bottom-0">
      <Link to="/reminder">
        <button
          className={
            selectedPage == "reminder" ? "bg" : ""
          }
          onClick={() => setSelectedPage("reminder")}
        >
          Reminders
        </button>
      </Link>
      <Link to="/home">
        <button
          className={
            selectedPage === "home" ? "bg-amber-600" : ""
          }
          onClick={() => {
            setSelectedPage("home");
          }}
        >
          Home
        </button>
      </Link>
      <Link to="/profile">
        <button
          className={
            selectedPage === "profile" ? "bg-blue-500 text-blue-100" : ""
          }
          onClick={() => setSelectedPage("profile")}
        >
          Me
        </button>
      </Link>
    </div>
  );
}

export default Footer;
