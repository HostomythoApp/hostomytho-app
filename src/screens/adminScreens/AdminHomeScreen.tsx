import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { MaterialIcons } from '@expo/vector-icons';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';

const AdminHomeScreen = ({ navigation }: { navigation: any }) => {
  const tw = useTailwind();

  const AdminLink = ({ title, destination, icon }: { title: string, destination: string, icon: string }) => (
    <TouchableOpacity
      style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')}
      onPress={() => navigation.navigate(destination)}
    >
      {/* @ts-ignore  */}
      <MaterialIcons name={icon} size={24} color="blue" />
      <Text style={tw('text-lg text-blue-800 ml-2')}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw("flex-1")}>
      <CustomHeaderEmpty title="Paramètres" />
      <View style={tw('p-20 pt-24')}>
        <AdminLink title="Gérer les textes" destination="ManageTexts" icon="text-format" />
        <AdminLink title="Gérer les utilisateurs" destination="ManageUsers" icon="people" />
        <AdminLink title="Messagerie et échanges avec les utilisateurs" destination="UserMessaging" icon="message" />
        <AdminLink title="Accéder aux statistiques" destination="Statistics" icon="analytics" />
        <AdminLink title="Modifier les récompenses" destination="EditRewards" icon="add-task" />
        <AdminLink title="Exporter les données" destination="ExportData" icon="file-download" />

        <View style={tw('border-t border-gray-200 pt-4 mt-4')}>
          <AdminLink title="Gérer les modérateurs" destination="ManageModerators" icon="security" />
          <AdminLink title="Accès à la base de données" destination="AccessDatabase" icon="storage" />
        </View>
      </View>
    </View>
  );
};

export default AdminHomeScreen;
