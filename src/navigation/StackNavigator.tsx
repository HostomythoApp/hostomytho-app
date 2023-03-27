import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Login" component={ProfileScreen} />
      <Stack.Screen name="Chat" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
