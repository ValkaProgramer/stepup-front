import { AlarmClockCheck, ChartColumn, House, UserRound, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState("home");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setSelectedPage(path || "home");
  }, [location]);

  return (
    <div className="inset-shadow-sm flex justify-around items-center sticky bottom-0 h-[10vh] bg-[#F6F5F5]">
      <Link to="/reminder">
        <button
          className={`${
            selectedPage === "reminder" ? "bg-[#FFDF2B]" : "bg-[#E8E5E5]"
          } cursor-pointer rounded-full`}
          onClick={() => setSelectedPage("reminder")}
        >
          <AlarmClockCheck color="black"></AlarmClockCheck>
        </button>
      </Link>
      <Link to="/statistics">
        <button
          className={`${
            selectedPage === "statistics" ? "bg-[#FFDF2B]" : "bg-[#E8E5E5]"
          } cursor-pointer rounded-full`}
          onClick={() => setSelectedPage("statistics")}
        >
          <ChartColumn color="black"></ChartColumn>
        </button>
      </Link>
      <Link to="/home">
        <button
          className={`${
            selectedPage === "home" ? "bg-[#FFDF2B]" : "bg-[#E8E5E5]"
          } cursor-pointer rounded-full`}
          onClick={() => {
            setSelectedPage("home");
          }}
        >
          <House color="black"></House>
        </button>
      </Link>
      <Link to="/friends">
        <button
          className={`${
            selectedPage === "friends" ? "bg-[#FFDF2B]" : "bg-[#E8E5E5]"
          } cursor-pointer rounded-full`}
          onClick={() => {
            setSelectedPage("/friends");
          }}
        >
          <UsersRound color="black"></UsersRound>
        </button>
      </Link>
      <Link to="/profile">
        <button
          className={`${
            selectedPage === "profile" ? "bg-[#FFDF2B]" : "bg-[#E8E5E5]"
          } cursor-pointer rounded-full `}
          onClick={() => setSelectedPage("profile")}
        >
          <UserRound color="black"></UserRound>
        </button>
      </Link>
    </div>
  );
}

export default Footer;
