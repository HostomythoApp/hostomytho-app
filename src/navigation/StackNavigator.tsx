import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import PausibilityGameScreen from "screens/PausibilityGameScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
     >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PausibilityGame" component={PausibilityGameScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
