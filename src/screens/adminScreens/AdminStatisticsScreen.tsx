import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from 'navigation/Types';


const AdminStatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackNavigationProp<"MotDePasseOublie">>();


  return (
    <View style={tw("flex-1")}>

      <CustomHeaderEmpty title="Statistiques" />
      <View style={tw('p-20 pt-32 bg-gray-100 h-full')}>
        <TouchableOpacity style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')} onPress={() => navigation.navigate("UserStatistics")}>
          <Text style={tw('text-lg text-blue-800 ml-2')}>Statistiques des utilisateurs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')} onPress={() => navigation.navigate("GamesStatistics")}>
          <Text style={tw('text-lg text-blue-800 ml-2')}>Statistiques des jeux</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')} onPress={() => navigation.navigate("TextRatingStatistics")}>
          <Text style={tw('text-lg text-blue-800 ml-2')}>Statistiques de MythoOuPas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')} onPress={() => navigation.navigate("UserTypingErrorsStatistics")}>
          <Text style={tw('text-lg text-blue-800 ml-2')}>Statistiques de MythoTypo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw('flex-row items-center p-3 mb-2 bg-blue-200 rounded')} onPress={() => navigation.navigate("UserSentenceSpecificationsStatistics")}>
          <Text style={tw('text-lg text-blue-800 ml-2')}>Statistiques de MythoNo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminStatisticsScreen;
