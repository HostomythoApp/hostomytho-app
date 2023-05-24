import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "tailwind/styles.json";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "navigation/StackNavigator";
// import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import { useCallback } from "react";
import { useLoadFonts } from "fonts/useLoadFonts";
import { AuthProvider } from "services/auth/AuthContext";
import { UserProvider } from "services/auth/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useLoadFonts();
  const queryClient = new QueryClient();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <NavigationContainer>
              <TailwindProvider utilities={utilities}>
                <StackNavigator />
              </TailwindProvider>
            </NavigationContainer>
          </View>
        </QueryClientProvider>
      </AuthProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
