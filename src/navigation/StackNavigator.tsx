import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import PausibilityGameScreen from "screens/PausibilityGameScreen";
import {ActionSheetIOS, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LoginScreen from "../screens/LoginScreen";
const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
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
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="PausibilityGame" component={PausibilityGameScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
