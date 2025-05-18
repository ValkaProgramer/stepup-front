import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReminderPage from "./pages/ReminderPage";
import GreetingPage from "./pages/GreetingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import "./App.css";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Layout from "./components/Layout";
import ReminderChecker from "./middleware/ReminderChecker";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <>
      <ReminderChecker />
      <BrowserRouter>
        <Routes>
          {/*  Public  */}
          <Route path="/" element={<GreetingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/*  Private  */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/reminder" element={<ReminderPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
