import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import WelcomePage from "../pages/WelcomePage";
import ResetPassword from "../pages/ResetPasswordPage";
import EditBlog from "../pages/EditBlog";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/welcome-page" element={<WelcomePage />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/blogs" element={<EditBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
