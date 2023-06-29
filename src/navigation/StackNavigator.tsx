import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import MainScreenBoard from "screens/MainScreenBoard";
import MainScreenEmptyBoard from "screens/MainScreenEmptyBoard";
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
import AdminStatisticsScreen from "screens/AdminScreens/AdminStatisticsScreen";
import UserMessagingScreen from "screens/AdminScreens/UserMessagingScreen";
import HypothesisGameScreen from "screens/HypothesisGameScreen";
import ConditionGameScreen from "screens/ConditionGameScreen";
import NegationGameScreen from "screens/NegationGameScreen";
import AchievementsScreen from "screens/AchievementsScreen";
import RankingScreen from "screens/RankingScreen";
import NotifScreen from "screens/settingsScreens/NotifScreen";
import HelpScreen from "screens/settingsScreens/HelpScreen";
import PrivacyPolicyScreen from "screens/settingsScreens/PrivacyPolicyScreen";
import SettingsScreen from "screens/SettingsScreen";
import ThemeScreen from "screens/settingsScreens/ThemeScreen";
import TemporalLinkGameScreen from "screens/TemporalLinkGameScreen";
import StatisticsScreen from "screens/StatisticsScreen";
import TypeSentenceGameScreen from "screens/TypeSentenceGameScreen";
import CustomHeader from "components/header/CustomHeader";
import AdminNavigator from "./AdminNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFF'
        }
      }}
    >
      <Stack.Group
        screenOptions={({ navigation }) => ({
          presentation: 'modal',
          // headerLeft: () => <TouchableOpacity onPress={navigation.goBack} />,
          headerShown: false

        })}
      >
        <Stack.Screen name="MainEmptyBoard"
          component={MainScreenEmptyBoard}
          options={({ }) => ({
            headerShown: false
          })} />

        <Stack.Screen name="Main"
          component={MainScreen}
          options={({ navigation }) => ({
            header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
          })} />

        <Stack.Screen name="MainBoard"
          component={MainScreenBoard}
          options={({ }) => ({
            headerShown: false
          })} />

        <Stack.Screen name="HypothesisGame" component={HypothesisGameScreen} />

        <Stack.Screen name="NegationGame" component={NegationGameScreen} />

        <Stack.Screen name="ConditionGame" component={ConditionGameScreen} />

        <Stack.Screen name="PlausibilityGame" component={PlausibilityGameScreen} />

        <Stack.Screen name="PlausibilityGameDetailed" component={PlausibilityGameDetailedScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />

        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />

        <Stack.Screen name="Achievements" component={AchievementsScreen} />

        <Stack.Screen name="TemporalLinkGame" component={TemporalLinkGameScreen} />

        <Stack.Screen name="TemporalEntity" component={TemporalEntityScreen} />

        <Stack.Screen name="TypeSentenceGame" component={TypeSentenceGameScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Login" component={SignInScreen} />

        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="Notif" component={NotifScreen} />

        <Stack.Screen name="Help" component={HelpScreen} />

        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

        <Stack.Screen name="Theme" component={ThemeScreen} />

        <Stack.Screen name="Ranking" component={RankingScreen} />
        
        <Stack.Screen name="Stats" component={StatisticsScreen} />

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
          component={AdminStatisticsScreen} options={({ navigation }) => ({
            header: () => <CustomHeader title="Statistiques générales de l'application" navigation={navigation} />,
          })} />

        <Stack.Screen name="UserMessaging"
          component={UserMessagingScreen} options={({ navigation }) => ({
            header: () => <CustomHeader title="Contact avec les utilisateurs" navigation={navigation} />,
          })} />
      </Stack.Group>

    </Stack.Navigator>
  );
};

export default StackNavigator;
