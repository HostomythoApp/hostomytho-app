import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import { useUser } from "services/context/UserContext";
import { useTailwind } from "tailwind-rn/dist";
import StatBox from "components/StatBox";
import { getTotalUsersCount, getUserAnnotationsCount, getTotalAnnotationsCount } from "services/api/stats";

const StatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const { user } = useUser();

  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [userAnnotations, setUserAnnotations] = useState<number | null>(null);
  const [totalAnnotations, setTotalAnnotations] = useState<number | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const usersCount = await getTotalUsersCount();
      const userAnnots = await getUserAnnotationsCount();
      const totalAnnots = await getTotalAnnotationsCount();

      setTotalUsers(usersCount);
      setUserAnnotations(userAnnots);
      setTotalAnnotations(totalAnnots);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
    }
  };

  return (
    <ImageBackground source={require('images/bg_office.jpg')} style={tw('flex-1')}>
      <SafeAreaView style={tw("flex-1")}>
        <ScrollView contentContainerStyle={tw("flex-grow justify-center")} style={tw('w-full')}>
          <CustomHeaderEmpty title="Statistiques" backgroundColor="bg-whiteTransparent" />
          <View style={tw('w-full flex justify-center pt-20')}>
            <View style={tw('w-auto m-auto max-w-6xl')}>

              <Text style={tw('font-primary text-2xl text-white font-bold mt-4 mb-2 text-center ')}>Statistiques personnelles</Text>
              <View style={tw('justify-center flex-row rounded-xl p-4 pt-0 flex-wrap')}>
                <StatBox title="Jours consécutifs joués :" value={user?.consecutiveDaysPlayed} color="border-l-4 border-blue-500" />
                <StatBox title="Fiabilité :" value={`${user?.trust_index} %`} color="border-l-4 border-green-500" />
                <StatBox title="Coefficient multiplicateur :" value={user?.coeffMulti} color="border-l-4 border-purple-500" />
                <StatBox title="Nombre de fois 1er à un classement mensuel :" value={user?.nb_first_monthly} color="border-l-4 border-yellow-500" />
                <StatBox title="Annotations créées :" value={userAnnotations !== null ? userAnnotations : "Chargement..."} color="border-l-4 border-red-500" />
                <StatBox title="Compte créé le :" value={user?.created_at} color="border-l-4 border-blue-500" />
              </View>

              <Text style={tw('font-primary text-2xl text-white font-bold mt-4 mb-2 text-center ')}>Statistiques de l'application</Text>
              <View style={tw('justify-center flex-row rounded-xl shadow-lg p-4 pt-0 flex-wrap')}>
                <StatBox title="Nombre de joueurs :" value={totalUsers !== null ? totalUsers : "Chargement..."} color="border-l-4 border-orange-500" />
                <StatBox title="Annotations totales créées :" value={totalAnnotations !== null ? totalAnnotations : "Chargement..."} color="border-l-4 border-pink-500" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StatisticsScreen;
