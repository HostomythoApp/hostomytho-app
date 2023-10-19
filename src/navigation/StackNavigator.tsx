import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import MainBoardScreen from "screens/MainBoardScreen";
import ProfileScreen from "screens/profilScreens/ProfileScreen";
import ContentProfileScreen from "screens/profilScreens/ContentProfileScreen";
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
import ErrorTypeGameScreen from "screens/gamesScreens/ErrorTypeGameScreen";
import ConditionGameScreen from "screens/gamesScreens/ConditionGameScreen";
import NegationGameScreen from "screens/gamesScreens/NegationGameScreen";
import AchievementsScreen from "screens/profilScreens/AchievementsScreen";
import RankingScreen from "screens/profilScreens/RankingScreen";
import SkinsManagementScreen from "screens/profilScreens/SkinsManagementScreen";
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
import InvestigationScreen from "screens/criminals/InvestigationScreen";
import CriminalsCaughtScreen from "screens/criminals/CriminalsCaughtScreen";
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useRef, useEffect } from 'react';
import { useTailwind } from "tailwind-rn";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ }) => {
  const translateY = useRef(new Animated.Value(300)).current;
  const tw = useTailwind();


  useEffect(() => {
    if (false) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        stiffness: 400,
        damping: 30,
        mass: 1
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 300,
        useNativeDriver: true,
        stiffness: 150,
        damping: 15,
        mass: 1
      }).start();
    }
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: '#FFF',

          },
          headerShown: false
        }}
      >
        <Stack.Group
          screenOptions={({ navigation }) => ({
            headerShown: false
          })}
        >

          <Stack.Screen name="MainBoard"
            component={MainBoardScreen}
            options={({ }) => ({
              headerShown: false
            })} />

          <Stack.Screen name="Main"
            component={MainScreen}
            options={({ navigation }) => ({
              header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
            })} />
          <Stack.Screen name="PlausibilityGameDetailed" component={PlausibilityGameDetailedScreen} />

          <Stack.Screen name="Investigation" component={InvestigationScreen} />

          <Stack.Screen name="CriminalsCaught" component={CriminalsCaughtScreen} />

          <Stack.Screen name="HypothesisGame" component={HypothesisGameScreen} />

          <Stack.Screen name="Profile" component={ProfileScreen} />

          <Stack.Screen name="ContentProfile" component={ContentProfileScreen} />

          <Stack.Screen name="SkinsManagement" component={SkinsManagementScreen} />

          <Stack.Screen name="NegationGame" component={NegationGameScreen} />

          <Stack.Screen name="ConditionGame" component={ConditionGameScreen} />

          <Stack.Screen name="PlausibilityGame" component={PlausibilityGameScreen} />

          <Stack.Screen name="ErrorTypeGame" component={ErrorTypeGameScreen} />

          <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} options={{ headerShown: false }} />

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

      {/* <TouchableOpacity
            style={tw('absolute inset-0 justify-center items-center w-full h-full')}
            activeOpacity={1}
        >
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    maxWidth: 700,
                    margin: 20
                }}>
                <TouchableOpacity
                    style={[tw('absolute top-0 right-0 z-10 rounded-full h-8 w-8 justify-center items-center'), {
                        transform: [{ translateX: 13 }, { translateY: -12 }],
                        backgroundColor: 'transparent'
                    }]}
                >
                    <View style={[tw('absolute rounded-full'), {
                        height: 26,
                        width: 26,
                        backgroundColor: 'white',
                        zIndex: 1
                    }]} />

                    <AntDesign name="closecircle" size={31} color="seagreen" style={{ zIndex: 2 }} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={e => e.stopPropagation()}
                    style={[tw('p-5 bg-white rounded-lg items-center'), {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 3,
                    }]}
                >
                   <Text>Text de la modale</Text>
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity> */}
    </View>
  );
};

export default StackNavigator;
