import React from "react";
import { AuthLayout } from "../components/auth_layout";
import { LoginForm } from "../components/login_form";
import { SignupForm } from "../components/signup_form";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export function AuthPage() {
  const [activeView, setActiveView] = React.useState<"login" | "signup">(
    "login"
  );
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If user is already authenticated, redirect to the page they tried to access
  // or to the home page if they came directly to auth
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <AuthLayout>
      {activeView === "login" ? (
        <LoginForm onSwitchView={() => setActiveView("signup")} />
      ) : (
        <SignupForm onSwitchView={() => setActiveView("login")} />
      )}
    </AuthLayout>
  );
}
