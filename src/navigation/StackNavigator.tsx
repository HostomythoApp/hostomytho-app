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
import MythoOuPasScreen from "screens/gamesScreens/MythoOuPasScreen";
import TemporalEntityScreen from "screens/gamesScreens/TemporalEntityGameScreen";
import AdminLoginScreen from "screens/adminScreens/AdminLoginScreen";
import EditRewardsSreen from "screens/adminScreens/EditRewardsSreen";
import ExportDataSreen from "screens/adminScreens/ExportDataSreen";
import ManageTextsScreen from "screens/adminScreens/ManageTextsScreen";
import ManageUsersSreen from "screens/adminScreens/ManageUsersSreen";
import AdminStatisticsScreen from "screens/adminScreens/AdminStatisticsScreen";
import UserMessagingScreen from "screens/adminScreens/UserMessagingScreen";
import HypothesisGameScreen from "screens/gamesScreens/HypothesisGameScreen";
import MythoTypoScreen from "screens/gamesScreens/MythoTypoScreen";
import ConditionGameScreen from "screens/gamesScreens/ConditionGameScreen";
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
import InvestigationScreen from "screens/criminals/InvestigationScreen";
import CriminalsCaughtScreen from "screens/criminals/CriminalsCaughtScreen";
import { View } from 'react-native';
import React, { useState } from 'react';
import ModalContext from "services/context/ModalContext";
import TimedModalContext from "components/modals/TimedModalContext";
import { UserProvider } from "services/context/UserContext";

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
              <Stack.Screen name="HypoMytho" component={HypothesisGameScreen} />
              <Stack.Screen name="CondiMytho" component={ConditionGameScreen} />
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
              <Stack.Screen name="Statistics" component={AdminStatisticsScreen} />
              <Stack.Screen name="ProfilJoueur" component={OtherProfileScreen} />

              {/* Auth */}
              <Stack.Screen name="Connexion" component={SignInScreen} />
              <Stack.Screen name="Login" component={SignUpScreen} />
              <Stack.Screen name="MotDePasseOublie" component={ForgetPasswordScreen} />
              <Stack.Screen name="NouveauMotDePasse" component={ResetPasswordScreen} />

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

              <Stack.Screen name="ManageTexts" component={ManageTextsScreen} />
              <Stack.Screen name="ManageUsers" component={ManageUsersSreen} />
              <Stack.Screen name="UserMessaging" component={UserMessagingScreen} />
              <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
              <Stack.Screen name="EditRewards" component={EditRewardsSreen} />
              <Stack.Screen name="ExportData" component={ExportDataSreen} />

            </Stack.Group>

          </Stack.Navigator>

          <TimedModalContext />
        </View>
      </UserProvider>

    </ModalContext.Provider>
  );
};

export default StackNavigator;
