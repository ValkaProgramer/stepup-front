import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReminderPage from "./pages/ReminderPage";
import GreetingPage from "./pages/GreetingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ExamplePage from "./pages/ExamplePage";
import "./App.css";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
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
            <Route path="/reminder" element={<ReminderPage />} />
            <Route path="/example" element={<ExamplePage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
