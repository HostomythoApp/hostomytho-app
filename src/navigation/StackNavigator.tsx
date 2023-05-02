import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import { TouchableOpacity } from 'react-native';
import SignInScreen from "screens/SignInScreen";
import SignUpScreen from "screens/SignUpScreen";
import PlausibilityGameScreen from "screens/PlausibilityGameScreen";
import TemporalEntityScreen from "screens/TemporalEntityGameScreen";
import NotifScreen from "screens/settingsScreens/NotifScreen";
import HelpScreen from "screens/settingsScreens/HelpScreen";
import PrivacyPolicyScreen from "screens/settingsScreens/PrivacyPolicyScreen";
import SettingsScreen from "screens/SettingsScreen";
import ThemeScreen from "screens/settingsScreens/ThemeScreen";
import TemporalLinkGameScreen from "screens/TemporalLinkGameScreen";
import CustomHeader from "components/header/CustomHeader";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import data from "data/fakeUserData.js";
import user from "../globalState";
import UserScreen from "screens/UserScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ }) => {
  return (
    <Stack.Navigator
    >
      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: 'modal',
          headerLeft: () => <TouchableOpacity onPress={navigation.goBack} />,
        })}
      >
      </Stack.Group>

      <Stack.Screen name="Profile"
        component={ProfileScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title={data.member[user.idUser].login} navigation={navigation} />,
        })} />
      <Stack.Screen name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
        })} />
      <Stack.Screen name="TemporalLinkGameScreen"
        component={TemporalLinkGameScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Spécifier les liens temporelles" navigation={navigation} />,
        })} />
      <Stack.Screen name="PlausibilityGame"
        component={PlausibilityGameScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Plausibilité de textes" navigation={navigation} />,
        })} />
      <Stack.Screen name="TemporalEntityScreen"
        component={TemporalEntityScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Trouver les entités et expressions temporelles" navigation={navigation} />,
        })} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Connected"
        component={ProfileScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Mon profil" navigation={navigation} />,
        })} />
      <Stack.Screen name="Login"
        component={SignInScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderEmpty title="Connexion" navigation={navigation} />,
        })} />
      <Stack.Screen name="SignUpScreen"
        component={SignUpScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderEmpty title="Je crée mon compte" navigation={navigation} />,
        })} />
      <Stack.Screen name="Settings" component={SettingsScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Paramètres" navigation={navigation} />,
        })} />
      <Stack.Screen name="Notif" component={NotifScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Notification" navigation={navigation} />,
        })} />
      <Stack.Screen name="Help" component={HelpScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Contact" navigation={navigation} />,
        })} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Politique de confidentialité" navigation={navigation} />,
        })} />
      <Stack.Screen name="Theme" component={ThemeScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Thème" navigation={navigation} />,
        })} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
