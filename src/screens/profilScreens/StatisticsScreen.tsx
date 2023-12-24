import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React from "react";
import { View, Text, ScrollView, ImageBackground, SafeAreaView } from "react-native";
import { useUser } from "services/context/UserContext";
import { useTailwind } from "tailwind-rn/dist";

const StatBox = ({ title, value, color }: { title: string, value: any, color: string }) => {
  const tw = useTailwind();
  return (
    <View style={tw(`max-w-64 w-[25%] min-w-[180] flex justify-between p-4 my-2 rounded-lg ${color} m-4 bg-white`)}>
      <Text style={tw('font-primary text-lg text-black')}>{title}</Text>
      <Text style={tw('font-primary text-lg text-black font-extrabold')}>{value}</Text>
    </View>
  );
};

const SectionHeader = ({ title }: { title: string }) => {
  const tw = useTailwind();
  return (
    <View style={tw('w-full')}>
      <Text style={tw('font-primary text-2xl text-white font-bold my-4 text-center')}>{title}</Text>
    </View>
  );
};

const StatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const { user } = useUser();

  return (
    <ImageBackground source={require('images/bg_bureau.webp')} style={tw('flex-1')}>
      <SafeAreaView style={tw("flex-1")}>
        <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
          <CustomHeaderEmpty title="Statistiques" backgroundColor="bg-whiteTransparent" />
          <View style={tw('mt-16')}>
            {/* TODO Revoir le centrage */}
            <SectionHeader title="Statistiques personnelles" />
            <View style={tw('items-center flex-row rounded-xl shadow-lg p-4 flex-wrap')}>
              <StatBox title="Jours consécutifs joués :" value={user?.consecutiveDaysPlayed} color="border-l-4 border-blue-500" />
              <StatBox title="Fiabilité :" value={`${user?.trust_index} %`} color="border-l-4 border-green-500" />
              <StatBox title="Coefficient multiplicateur :" value={user?.coeffMulti} color="border-l-4 border-purple-500" />
              <StatBox title="Annotations crées :" value="15" color="border-l-4 border-yellow-500" />
              <StatBox title="Personnes parrainées :" value="0" color="border-l-4 border-red-500" />
            </View>

            <SectionHeader title="Statistiques de l'application" />
            <View style={tw('items-center flex-row rounded-xl shadow-lg p-4 flex-wrap')}>
              <StatBox title="Nombre de joueurs :" value="83" color="border-l-4 border-teal-500" />
              <StatBox title="Textes stockés dans l'application:" value="45" color="border-l-4 border-orange-500" />
              <StatBox title="Annotations totales crées :" value="615" color="border-l-4 border-pink-500" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StatisticsScreen;
