import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import { TouchableOpacity } from 'react-native';
import LoginScreen from "../screens/LoginScreen";
import SignIn from "../screens/SignIn";
import PlausibilityGameScreen from "../screens/PlausibilityGameScreen";
import NotifScreen from "../screens/settingsScreens/NotifScreen";
import HelpScreen from "../screens/settingsScreens/HelpScreen";
import PrivacyPolicyScreen from "../screens/settingsScreens/PrivacyPolicyScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ThemeScreen from "../screens/settingsScreens/ThemeScreen";
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
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PausibilityGame" component={PlausibilityGameScreen} />
      <Stack.Screen name="Notif" component={NotifScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
