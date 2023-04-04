import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import { TouchableOpacity } from 'react-native';
import LoginScreen from "../screens/LoginScreen";
import SignIn from "../screens/SignIn";
import PlausibilityGameScreen from "../screens/PlausibilityGameScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = ({ }) => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: 'modal',
          headerLeft: () => <TouchableOpacity onPress={navigation.goBack} />,
        })}
      >
      </Stack.Group>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Connected" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PausibilityGame" component={PlausibilityGameScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
