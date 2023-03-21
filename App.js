// import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "tailwind/styles.json";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "navigation/StackNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <StackNavigator />
        </TailwindProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
