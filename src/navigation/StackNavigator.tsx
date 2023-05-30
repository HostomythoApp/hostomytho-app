import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import ProfileScreen from "screens/ProfileScreen";
import HomeScreen from "screens/HomeScreen";
import { TouchableOpacity } from 'react-native';
import SignInScreen from "screens/authScreens/SignInScreen";
import SignUpScreen from "screens/authScreens/SignUpScreen";
import PlausibilityGameScreen from "screens/PlausibilityGameScreen";
import PlausibilityGameDetailedScreen from "screens/PlausibilityGameDetailedScreen";
import TemporalEntityScreen from "screens/TemporalEntityGameScreen";
import ProfileSettingsScreen from "screens/ProfileSettingsScreen";
import AdminLoginScreen from "screens/AdminScreens/AdminLoginScreen";
import AdminHomeScreen from "screens/AdminScreens/AdminHomeScreen";
import EditRewardsSreen from "screens/AdminScreens/EditRewardsSreen";
import ExportDataSreen from "screens/AdminScreens/ExportDataSreen";
import ManageTextsScreen from "screens/AdminScreens/ManageTextsScreen";
import ManageUsersSreen from "screens/AdminScreens/ManageUsersSreen";
import StatisticsSreen from "screens/AdminScreens/StatisticsSreen";
import UserMessagingScreen from "screens/AdminScreens/UserMessagingScreen";
import AchievementsScreen from "screens/AchievementsScreen";
import RankingScreen from "screens/RankingScreen";
import NotifScreen from "screens/settingsScreens/NotifScreen";
import HelpScreen from "screens/settingsScreens/HelpScreen";
import PrivacyPolicyScreen from "screens/settingsScreens/PrivacyPolicyScreen";
import SettingsScreen from "screens/SettingsScreen";
import ThemeScreen from "screens/settingsScreens/ThemeScreen";
import TemporalLinkGameScreen from "screens/TemporalLinkGameScreen";
import TypeSentenceGameScreen from "screens/TypeSentenceGameScreen";
import CustomHeader from "components/header/CustomHeader";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import AdminNavigator from "./AdminNavigator";

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

      <Stack.Screen name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
        })} />
      <Stack.Screen name="PlausibilityGameDetailed"
        component={PlausibilityGameDetailedScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Plausibilité de textes" navigation={navigation} />,
        })} />
      <Stack.Screen name="Profile"
        component={ProfileScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Profil" navigation={navigation} />,
        })} />
      <Stack.Screen name="ProfileSettings"
        component={ProfileSettingsScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Paramètre du profil" navigation={navigation} />,
        })} />
      <Stack.Screen name="Achievements"
        component={AchievementsScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Tous les hauts faits" navigation={navigation} />,
        })} />
      <Stack.Screen name="TemporalLinkGame"
        component={TemporalLinkGameScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Spécifier les liens temporelles" navigation={navigation} />,
        })} />
      <Stack.Screen name="PlausibilityGame"
        component={PlausibilityGameScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Plausibilité de textes" navigation={navigation} />,
        })} />
      <Stack.Screen name="TemporalEntity"
        component={TemporalEntityScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Trouver les entités et expressions temporelles" navigation={navigation} />,
        })} />
      <Stack.Screen name="TypeSentenceGame"
        component={TypeSentenceGameScreen} options={({ navigation }) => ({
          header: () => <CustomHeaderInGame title="Spécifier le type des phrases" navigation={navigation} />,
        })} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login"
        component={SignInScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Connexion" navigation={navigation} />,
        })} />
      <Stack.Screen name="SignUpScreen"
        component={SignUpScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Je crée mon compte" navigation={navigation} />,
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
      <Stack.Screen name="Ranking" component={RankingScreen}
        options={({ navigation }) => ({
          header: () => <CustomHeader title="Classements" navigation={navigation} />,
        })} />

      {/* Partie admin */}
      <Stack.Screen name="Admin"
        options={{
          headerShown: false
        }}
      >
        {/* @ts-ignore */}
        {(props) => <AdminNavigator {...props} />}
      </Stack.Screen>

      <Stack.Screen name="AdminHome"
        component={AdminHomeScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Espace administrateur" navigation={navigation} />,
        })} />
      <Stack.Screen name="AdminLogin"
        component={AdminLoginScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Connexion admin" navigation={navigation} />,
        })} />
      <Stack.Screen name="EditRewards"
        component={EditRewardsSreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Gérer les récompenses" navigation={navigation} />,
        })} />

      <Stack.Screen name="ExportData"
        component={ExportDataSreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Exporter des données" navigation={navigation} />,
        })} />

      <Stack.Screen name="ManageTexts"
        component={ManageTextsScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Gestion des textes" navigation={navigation} />,
        })} />

      <Stack.Screen name="ManageUsers"
        component={ManageUsersSreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Gestion des utilisateurs" navigation={navigation} />,
        })} />

      <Stack.Screen name="Statistics"
        component={StatisticsSreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Statistiques générales de l'application" navigation={navigation} />,
        })} />

      <Stack.Screen name="UserMessaging"
        component={UserMessagingScreen} options={({ navigation }) => ({
          header: () => <CustomHeader title="Contact avec les utilisateurs" navigation={navigation} />,
        })} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
