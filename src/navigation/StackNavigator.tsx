import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import MainScreenBoard from "screens/MainScreenBoard";
import MainScreenEmptyBoard from "screens/MainScreenEmptyBoard";
import ProfileScreen from "screens/profilScreens/ProfileScreen";
import SignInScreen from "screens/authScreens/SignInScreen";
import SignUpScreen from "screens/authScreens/SignUpScreen";
import ForgetPasswordScreen from "screens/authScreens/ForgetPasswordScreen";
import PlausibilityGameScreen from "screens/gamesScreens/PlausibilityGameScreen";
import PlausibilityGameDetailedScreen from "screens/gamesScreens/PlausibilityGameDetailedScreen";
import TemporalEntityScreen from "screens/gamesScreens/TemporalEntityGameScreen";
import AdminLoginScreen from "screens/adminScreens/AdminLoginScreen";
import AdminHomeScreen from "screens/adminScreens/AdminHomeScreen";
import EditRewardsSreen from "screens/adminScreens/EditRewardsSreen";
import ExportDataSreen from "screens/adminScreens/ExportDataSreen";
import ManageTextsScreen from "screens/adminScreens/ManageTextsScreen";
import ManageUsersSreen from "screens/adminScreens/ManageUsersSreen";
import AdminStatisticsScreen from "screens/adminScreens/AdminStatisticsScreen";
import UserMessagingScreen from "screens/adminScreens/UserMessagingScreen";
import HypothesisGameScreen from "screens/gamesScreens/HypothesisGameScreen";
import ConditionGameScreen from "screens/gamesScreens/ConditionGameScreen";
import NegationGameScreen from "screens/gamesScreens/NegationGameScreen";
import AchievementsScreen from "screens/profilScreens/AchievementsScreen";
import RankingScreen from "screens/profilScreens/RankingScreen";
import NotifScreen from "screens/settingsScreens/NotifScreen";
import HelpScreen from "screens/settingsScreens/HelpScreen";
import PrivacyPolicyScreen from "screens/settingsScreens/PrivacyPolicyScreen";
import SettingsScreen from "screens/settingsScreens/SettingsScreen";
import ThemeScreen from "screens/settingsScreens/ThemeScreen";
import ProfileSettingsScreen from "screens/profilScreens/ProfileSettingsScreen";
import TemporalLinkGameScreen from "screens/gamesScreens/TemporalLinkGameScreen";
import StatisticsScreen from "screens/profilScreens/StatisticsScreen";
import TypeSentenceGameScreen from "screens/gamesScreens/TypeSentenceGameScreen";
import CustomHeader from "components/header/CustomHeader";
import AdminNavigator from "./AdminNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFF'
        },
        headerShown: false
      }}
    >
      <Stack.Group
        screenOptions={({ navigation }) => ({
          // presentation: 'modal',
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
        <Stack.Screen name="Profile" component={ProfileScreen} />

        <Stack.Screen name="PlausibilityGameDetailed" component={PlausibilityGameDetailedScreen} />

        <Stack.Screen name="NegationGame" component={NegationGameScreen} />

        <Stack.Screen name="HypothesisGame" component={HypothesisGameScreen} />

        <Stack.Screen name="ConditionGame" component={ConditionGameScreen} />

        <Stack.Screen name="PlausibilityGame" component={PlausibilityGameScreen} />

        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />

        <Stack.Screen name="Achievements" component={AchievementsScreen} />

        <Stack.Screen name="TemporalLinkGame" component={TemporalLinkGameScreen} />

        <Stack.Screen name="TemporalEntity" component={TemporalEntityScreen} />

        <Stack.Screen name="TypeSentenceGame" component={TypeSentenceGameScreen} />

        <Stack.Screen name="Login" component={SignInScreen} />

        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />

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


        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />

        <Stack.Screen name="EditRewards" component={EditRewardsSreen} />

        <Stack.Screen name="ExportData" component={ExportDataSreen} />

        <Stack.Screen name="ManageTexts" component={ManageTextsScreen} />

        <Stack.Screen name="ManageUsers" component={ManageUsersSreen} />

        <Stack.Screen name="Statistics" component={AdminStatisticsScreen} />

        <Stack.Screen name="UserMessaging" component={UserMessagingScreen} />
      </Stack.Group>

    </Stack.Navigator>
  );
};

export default StackNavigator;
