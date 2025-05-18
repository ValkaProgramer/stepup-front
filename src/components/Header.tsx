import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="shadow-sm bg-white flex flex-row justify-center rounded-b-4xl p-5">
      <div>
        <h1 className="use-mionta text-with-stroke">
          STEP <br /> UP
        </h1>
      </div>
      {/* <Link to="/settings" className="inline-flex">
        <button className="p-2">
          <Settings color="black" />
        </button>
      </Link> */}
      <Link to="/" className="inline-flex">
        <button onClick={() => handleLogout()} className="p-1 cursor-pointer">
          <LogOut color="black" />
        </button>
      </Link>
      <div></div>
    </div>
  );
}

export default Header;
