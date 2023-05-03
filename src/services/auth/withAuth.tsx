import React from "react";
import { useAuth } from "services/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { authState } = useAuth();
    const navigation = useNavigation();

    React.useEffect(() => {
      if (!authState.isAuthenticated && !authState.isLoading) {
        navigation.navigate("Main");
      }
    }, [authState.isAuthenticated, authState.isLoading, navigation]);

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuthComponent;
};

export default withAuth;