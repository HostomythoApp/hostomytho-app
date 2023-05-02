import { useAuth } from "services/auth/AuthContext";

// TODO: Composant à faire
const LogoutScreen = () => {
  const { removeToken } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      await removeToken();
      // Redirigez l'utilisateur vers l'écran de connexion ou d'accueil
    };
    logoutUser();
  }, []);

};