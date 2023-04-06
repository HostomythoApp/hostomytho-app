import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import { TouchableOpacity } from 'react-native';
import LoginScreen from "screens/LoginScreen";
import SignIn from "screens/SignIn";
import PlausibilityGameScreen from "screens/PlausibilityGameScreen";
import CustomHeader from "components/CustomHeader";
import CustomHeaderInGame from "components/CustomHeaderInGame";
import CustomHeaderEmpty from "components/CustomHeaderEmpty";

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

      <Stack.Screen name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
        })} />
      <Stack.Screen name="PausibilityGame"
        component={PlausibilityGameScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Plausibilité de textes" navigation={navigation} />,
        })} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Connected"
        component={ProfileScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Mon profil" navigation={navigation} />,
        })} />

      <Stack.Screen name="Login"
        component={LoginScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderEmpty title="Connexion" navigation={navigation} />,
        })} />

      <Stack.Screen name="SignIn"
        component={SignIn} options={({ navigation }) => ({
          header: () => <CustomHeaderEmpty title="Je crée mon compte" navigation={navigation} />,
        })} />

      <Stack.Screen name="Profile"
        component={ProfileScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Mon profil" navigation={navigation} />,
        })} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
