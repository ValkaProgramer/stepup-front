import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import useAuth from "../hooks/useAuth.tsx";
import { useEffect } from "react";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Use React Router's navigation hook

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Navigate to the home page
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <main className="flex flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
