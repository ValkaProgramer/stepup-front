import { Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="stripe-pattern flex flex-row justify-center">
      <div>
        <h1 className="use-mionta">STEPUP</h1>
      </div>
      <Link to="/settings" className="inline-flex">
        <button className="p-2">
          <Settings />
        </button>
      </Link>
      <Link to="/" className="inline-flex">
        <button onClick={() => handleLogout()} className="p-2">
          <LogOut />
        </button>
      </Link>
      <div></div>
    </div>
  );
}

export default Header;
