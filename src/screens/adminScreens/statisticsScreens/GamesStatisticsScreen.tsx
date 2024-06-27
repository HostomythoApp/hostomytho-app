import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { getCumulativeAnnotationsGames } from "services/api/stats";

const screenWidth = Dimensions.get("window").width;

const GamesStatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const [cumulativeData, setCumulativeData] = useState<any>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const cumulativeResult = await getCumulativeAnnotationsGames();
      setCumulativeData(cumulativeResult);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Statistiques des jeux" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-20 items-center')}>
          <View style={tw('mb-2 p-6 rounded-lg')}>
            <Text style={tw('text-lg mb-4')}>Nombre d'annotations dans chaque jeu</Text>
            <LineChart
              width={Math.min(Math.max(screenWidth * 0.8, 300), 1200)}
              height={400}
              data={cumulativeData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cumulativeTextRating" stroke="#8884d8" name="Notations dans MythoOuPas" isAnimationActive={false} />
              <Line type="monotone" dataKey="cumulativeTypingErrors" stroke="#82ca9d" name="Types d'erreurs dans MythoTypo" isAnimationActive={false} />
              <Line type="monotone" dataKey="cumulativeSentenceSpecification" stroke="#ffa500" name="Négations dans MythoNo" isAnimationActive={false} />
            </LineChart>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GamesStatisticsScreen;
