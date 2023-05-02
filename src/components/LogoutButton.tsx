import React from "react";
import { useAuth } from "../services/auth/AuthContext";
import FunctionButton from "components/FunctionButton";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return <FunctionButton text={"Déconnexion"} func={handleLogout} />;
};

export default LogoutButton;
