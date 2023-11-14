import React, { useContext } from "react";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext"; // Assurez-vous d'importer UserContext
import FunctionButton from "components/FunctionButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Si vous utilisez AsyncStorage

const LogoutButton = () => {
  const { setAuthState } = useAuth();    
  const { setUser } = useUser(); // Obtenez la fonction setUser de UserContext
  const navigation = useNavigation<RootStackNavigationProp<"Menu">>();

  const handleLogout = async () => {
    // Mettre en place la logique de déconnexion
    try {
      await AsyncStorage.clear(); // Efface toutes les données d'AsyncStorage, à utiliser avec prudence
      setUser(null); // Réinitialise l'état de l'utilisateur dans UserContext
      setAuthState({ isAuthenticated: false, token: null, isLoading: false }); // Réinitialise l'état d'authentification dans AuthContext
      navigation.navigate("TableauDeBord"); // Navigue vers l'écran principal après la déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return <FunctionButton text={"Déconnexion"} func={handleLogout} />;
};

export default LogoutButton;
