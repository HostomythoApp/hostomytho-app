import React from "react";
import { useAuth } from "../services/auth/AuthContext";
import FunctionButton from "components/FunctionButton";
import { useNavigation } from "@react-navigation/native";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    navigation.navigate("Main");

  };
  return <FunctionButton text={"Déconnexion"} func={handleLogout} />;
};

export default LogoutButton;
