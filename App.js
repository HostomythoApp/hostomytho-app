import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "navigation/StackNavigator";
import * as SplashScreen from "expo-splash-screen";
import { useLoadFonts } from "fonts/useLoadFonts";
import { AuthProvider } from "services/context/AuthContext";
import { UserProvider } from "services/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import utilities from "./src/utils/tailwind/styles.json";
import { StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

SplashScreen.preventAutoHideAsync();

const linking = {
  config: {
    screens: {
      Admin: "HMe1sj",
      NouveauMotDePasse: 'NouveauMotDePasse', 
      PrivacyPolicy: 'PrivacyPolicy',
    },
  },
};

export default function App() {
  const { fontsLoaded, onLayoutRootView } = useLoadFonts();
  const queryClient = new QueryClient();
  NavigationBar.setVisibilityAsync("hidden");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar hidden />
            <NavigationContainer linking={linking}>
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
