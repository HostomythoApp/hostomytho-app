import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import PlausibilityGameScreen from "screens/PlausibilityGameScreen";
import { TouchableOpacity } from 'react-native';
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
      <Stack.Screen name="PlausibilityGame" component={PlausibilityGameScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={ProfileScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
