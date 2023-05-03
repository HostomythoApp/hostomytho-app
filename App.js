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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <UserProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <TailwindProvider utilities={utilities}>
              <StackNavigator />
            </TailwindProvider>
          </NavigationContainer>
        </View>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
