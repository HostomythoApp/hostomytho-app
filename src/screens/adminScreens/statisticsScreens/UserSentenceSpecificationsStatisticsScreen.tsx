import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { getUserSentenceSpecificationDate, getCumulativeUserSentenceSpecification } from "services/api/stats";

const screenWidth = Dimensions.get("window").width;

const UserSentenceSpecificationsStatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const [dailyData, setDailyData] = useState<any>([]);
  const [cumulativeData, setCumulativeData] = useState<any>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const dailyResult = await getUserSentenceSpecificationDate();
      const cumulativeResult = await getCumulativeUserSentenceSpecification();

      setDailyData(dailyResult);
      setCumulativeData(cumulativeResult);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Statistiques de MythoNo" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-20 items-center')}>
          <View style={tw('mb-2 p-6 rounded-lg')}>
            <Text style={tw('text-lg mb-4')}>Nombre total de négations annotées</Text>
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
              <Line type="monotone" dataKey="cumulativeCount" stroke="#82ca9d" name="Comptes au total" isAnimationActive={false} />
            </LineChart>

            <Text style={tw('text-lg mt-12 mb-4')}>Nombre de négations annotées par semaine</Text>
            <BarChart
              width={Math.min(Math.max(screenWidth * 0.8, 300), 1200)}
              height={400}
              data={dailyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Création de comptes" />
            </BarChart>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserSentenceSpecificationsStatisticsScreen;
