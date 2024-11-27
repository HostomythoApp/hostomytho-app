import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "screens/MainScreen";
import MainBoardScreen from "screens/MainBoardScreen";
import ProfileScreen from "screens/profilScreens/ProfileScreen";
import OtherProfileScreen from "screens/profilScreens/OtherProfileScreen";
import ContentProfileScreen from "screens/profilScreens/ContentProfileScreen";
import SignInScreen from "screens/authScreens/SignInScreen";
import SignUpScreen from "screens/authScreens/SignUpScreen";
import ForgetPasswordScreen from "screens/authScreens/ForgetPasswordScreen";
import ResetPasswordScreen from "screens/authScreens/ResetPasswordScreen";
import ChangePasswordScreen from "screens/authScreens/ChangePasswordScreen";
import MythoOuPasScreen from "screens/gamesScreens/MythoOuPasScreen";
import TemporalEntityScreen from "screens/gamesScreens/TemporalEntityGameScreen";
import AdminLoginScreen from "screens/adminScreens/AdminLoginScreen";
import EditVariablesScreen from "screens/adminScreens/EditVariablesScreen";
import ExportDataScreen from "screens/adminScreens/ExportDataScreen";
import ManageTextsScreen from "screens/adminScreens/manageTexts/ManageTextsScreen";
import CreateTextScreen from "screens/adminScreens/manageTexts/CreateTextScreen";
import TextDetailsScreen from "screens/adminScreens/manageTexts/TextDetailsScreen";
import ManageTestNegationScreen from "screens/adminScreens/manageTexts/ManageTestNegationScreen";
import ManageUsersSreen from "screens/adminScreens/usersScreens/ManageUsersSreen";
import AdminStatisticsScreen from "screens/adminScreens/AdminStatisticsScreen";
import UsersStatisticsScreen from "screens/adminScreens/statisticsScreens/UsersStatisticsScreen";
import TextRatingStatisticsScreen from "screens/adminScreens/statisticsScreens/TextRatingStatisticsScreen";
import UserTypingErrorsStatisticsScreen from "screens/adminScreens/statisticsScreens/UserTypingErrorsStatisticsScreen";
import UserSentenceSpecificationsStatisticsScreen from "screens/adminScreens/statisticsScreens/UserSentenceSpecificationsStatisticsScreen";
import GamesStatisticsScreen from "screens/adminScreens/statisticsScreens/GamesStatisticsScreen";
import UserMessagingScreen from "screens/adminScreens/UserMessagingScreen";
import ManageHomeMessagesScreen from "screens/adminScreens/ManageHomeMessagesScreen";
import UserDetailsScreen from "screens/adminScreens/usersScreens/UserDetailsScreen";
import MythoTypoScreen from "screens/gamesScreens/MythoTypoScreen";
import MythoNoScreen from "screens/gamesScreens/MythoNoScreen";
import AchievementsScreen from "screens/profilScreens/AchievementsScreen";
import RankingScreen from "screens/profilScreens/RankingScreen";
import RankingMonthScreen from "screens/profilScreens/RankingMonthScreen";
import SkinsManagementScreen from "screens/profilScreens/SkinsManagementScreen";
import NotifScreen from "screens/settingsScreens/NotifScreen";
import ObjectivesScreen from "screens/settingsScreens/ObjectivesScreen";
import HelpScreen from "screens/settingsScreens/HelpScreen";
import GameRulesScreen from "screens/settingsScreens/GameRulesScreen";
import PrivacyPolicyScreen from "screens/settingsScreens/PrivacyPolicyScreen";
import SettingsScreen from "screens/settingsScreens/SettingsScreen";
import AboutScreen from "screens/settingsScreens/AboutScreen";
import ProfileSettingsScreen from "screens/profilScreens/ProfileSettingsScreen";
import TemporalLinkGameScreen from "screens/gamesScreens/TemporalLinkGameScreen";
import StatisticsScreen from "screens/profilScreens/StatisticsScreen";
import TypeSentenceGameScreen from "screens/gamesScreens/TypeSentenceGameScreen";
import CustomHeader from "components/header/CustomHeader";
import AdminNavigator from "./AdminNavigator";
import PrivacyPolicyNavigator from "./PrivacyPolicyNavigator";
import InvestigationScreen from "screens/criminals/InvestigationScreen";
import CriminalsCaughtScreen from "screens/criminals/CriminalsCaughtScreen";
import { View } from 'react-native';
import React, { useState } from 'react';
import ModalContext from "services/context/ModalContext";
import TimedModalContext from "components/modals/TimedModalContext";
import { UserProvider } from "services/context/UserContext";
import ErrorDetailsScreen from "screens/adminScreens/manageErrors/ErrorDetailsScreen";
import ManageListErrorScreen from "screens/adminScreens/manageErrors/ManageListErrorScreen";
import AddTestErrorScreen from "screens/adminScreens/manageErrors/AddTestErrorScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = ({ }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState(null);

  return (
    <ModalContext.Provider
      value={{
        isModalVisible: isModalVisible,
        showModal: () => setModalVisible(true),
        hideModal: () => setModalVisible(false),
        content: content,
        setContent: setContent
      }}>

      <UserProvider>
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

              <Stack.Screen name="TableauDeBord"
                component={MainBoardScreen}
                options={({ }) => ({
                  headerShown: false
                })} />

              <Stack.Screen name="Menu"
                component={MainScreen}
                options={({ navigation }) => ({
                  header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
                })} />

              <Stack.Screen name="Investigation" component={InvestigationScreen} />
              <Stack.Screen name="Criminels" component={CriminalsCaughtScreen} />

              {/* Games */}
              <Stack.Screen name="MythoNo" component={MythoNoScreen} />
              <Stack.Screen name="MythoTypo" component={MythoTypoScreen} />
              <Stack.Screen name="MythoTempo" component={TemporalLinkGameScreen} />
              <Stack.Screen name="TemporalEntity" component={TemporalEntityScreen} />
              <Stack.Screen name="TypeSentenceGame" component={TypeSentenceGameScreen} />
              <Stack.Screen name="MythoOuPas" component={MythoOuPasScreen} />

              {/* Profil */}
              <Stack.Screen name="Profil" component={ProfileScreen} />
              <Stack.Screen name="ProfilC" component={ContentProfileScreen} />
              <Stack.Screen name="ParametreProfil" component={ProfileSettingsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="GestionApparence" component={SkinsManagementScreen} />
              <Stack.Screen name="HautsFaits" component={AchievementsScreen} />
              <Stack.Screen name="Classement" component={RankingScreen} />
              <Stack.Screen name="ClassementMensuel" component={RankingMonthScreen} />
              <Stack.Screen name="Statistiques" component={StatisticsScreen} />
              <Stack.Screen name="ProfilJoueur" component={OtherProfileScreen} />

              {/* Auth */}
              <Stack.Screen name="Connexion" component={SignInScreen} />
              <Stack.Screen name="Login" component={SignUpScreen} />
              <Stack.Screen name="MotDePasseOublie" component={ForgetPasswordScreen} />
              <Stack.Screen name="NouveauMotDePasse" component={ResetPasswordScreen} />
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

              {/* Params */}
              <Stack.Screen name="Parametres" component={SettingsScreen} />
              <Stack.Screen name="Notif" component={NotifScreen} />
              <Stack.Screen name="Objectifs" component={ObjectivesScreen} />
              <Stack.Screen name="Aide" component={HelpScreen} />
              <Stack.Screen name="PolitiqueDeConfidentialite" component={PrivacyPolicyScreen} />
              <Stack.Screen name="ReglesDuJeu" component={GameRulesScreen} />
              <Stack.Screen name="APropos" component={AboutScreen} />


              {/* Part admin */}
              <Stack.Screen name="Admin"
                options={{
                  headerShown: false
                }}
              >
                {/* @ts-ignore */}
                {(props) => <AdminNavigator {...props} />}
              </Stack.Screen>
              <Stack.Screen name="Statistics" component={AdminStatisticsScreen} />
              <Stack.Screen name="UserStatistics" component={UsersStatisticsScreen} />
              <Stack.Screen name="ManageTestNegation" component={ManageTestNegationScreen} />
              <Stack.Screen name="TextDetails" component={TextDetailsScreen} />
              <Stack.Screen name="UserMessaging" component={UserMessagingScreen} />
              <Stack.Screen name="ManageHomeMessages" component={ManageHomeMessagesScreen} />
              <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
              <Stack.Screen name="EditVariables" component={EditVariablesScreen} />
              <Stack.Screen name="ExportData" component={ExportDataScreen} />
              <Stack.Screen name="TextRatingStatistics" component={TextRatingStatisticsScreen} />
              <Stack.Screen name="UserSentenceSpecificationsStatistics" component={UserSentenceSpecificationsStatisticsScreen} />
              <Stack.Screen name="UserTypingErrorsStatistics" component={UserTypingErrorsStatisticsScreen} />
              <Stack.Screen name="GamesStatistics" component={GamesStatisticsScreen} />
              <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
              <Stack.Screen name="ManageUsers" component={ManageUsersSreen} />
              <Stack.Screen name="ManageTexts" component={ManageTextsScreen} />
              <Stack.Screen name="CreateText" component={CreateTextScreen} />
              <Stack.Screen name="ErrorDetails" component={ErrorDetailsScreen} />
              <Stack.Screen name="ManageListError" component={ManageListErrorScreen} />
              <Stack.Screen name="AddTestError" component={AddTestErrorScreen} />

              {/* Part politique confidentialité */}
              <Stack.Screen name="PrivacyPolicy"
                options={{
                  headerShown: false
                }}
              >
                {/* @ts-ignore */}
                {(props) => <PrivacyPolicyNavigator {...props} />}
              </Stack.Screen>
            </Stack.Group>

          </Stack.Navigator>

          <TimedModalContext />
        </View>
      </UserProvider>

    </ModalContext.Provider>
  );
};

export default StackNavigator;
