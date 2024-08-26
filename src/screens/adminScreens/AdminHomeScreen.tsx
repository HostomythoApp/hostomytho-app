import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { useUser } from "services/context/UserContext";
import { useAuth } from "services/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from 'navigation/Types';
import Loader from 'components/Loader';

const AdminHomeScreen = () => {
  const tw = useTailwind();
  const { user } = useUser();
  const { authState } = useAuth();
  const navigation = useNavigation<RootStackNavigationProp<"MotDePasseOublie">>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authState.isLoading) {
      if (!authState.isAuthenticated || !user?.moderator) {
        navigation.navigate("TableauDeBord");
      }
      if (authState.isAuthenticated || user?.moderator) {
        setIsLoading(false);
      }
    }
  }, [authState, user, navigation]);

  const AdminLink = ({ title, destination, icon }: { title: string, destination: string, icon: any }) => (
    <TouchableOpacity
      style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')}
      // @ts-ignore
      onPress={() => navigation.navigate(destination)}
    >
      <MaterialIcons name={icon} size={24} color="blue" />
      <Text style={tw('text-lg text-blue-800 ml-2')}>{title}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={tw("flex-1")}>
      {isLoading && <Loader />}

      <CustomHeaderEmpty title="Paramètres" />
      <View style={tw('p-20 pt-24')}>
        <AdminLink title="Gérer les textes" destination="ManageTexts" icon="text-format" />
        <AdminLink title="Gérer les utilisateurs" destination="ManageUsers" icon="people" />
        <AdminLink title="Statistiques de l'application" destination="Statistics" icon="analytics" />
        <AdminLink title="Exporter les données" destination="ExportData" icon="file-download" />
        {/* <AdminLink title="Modifier les variables de l'application" destination="EditRewards" icon="add-task" />
        <AdminLink title="Messagerie et échanges avec les utilisateurs" destination="UserMessaging" icon="message" /> */}

        {/* <View style={tw('border-t border-gray-200 pt-4 mt-4')}>
          <AdminLink title="Gérer les modérateurs" destination="ManageModerators" icon="security" />
        </View> */}
      </View>
    </View>
  );
};

export default AdminHomeScreen;
