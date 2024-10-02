import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { getRatingPlausibilityDate, getCumulativeRatingPlausibility, getUserErrorDetailDate, getCumulativeUserErrorDetail } from "services/api/stats";
import ExportButton from "components/button/ExportButton";

const screenWidth = Dimensions.get("window").width;

const TextRatingStatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const [dailyData, setDailyData] = useState<any>([]);
  const [cumulativeData, setCumulativeData] = useState<any>([]);
  const [monthlyDataErrorDetail, setMonthlyDataErrorDetail] = useState<any>([]);
  const [cumulativeDataErrorDetail, setCumulativeDataErrorDetail] = useState<any>([]);
  const monthlyChartRef = useRef(null);
  const cumulativeChartRef = useRef(null);
  const monthlyErrorChartRef = useRef(null);
  const cumulativeErrorChartRef = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const monthlyResult = await getRatingPlausibilityDate();
      const cumulativeResult = await getCumulativeRatingPlausibility();
      const monthlyErrorDetail = await getUserErrorDetailDate();
      const cumulativeErrorDetail = await getCumulativeUserErrorDetail();
      setDailyData(monthlyResult);
      setCumulativeData(cumulativeResult);
      setMonthlyDataErrorDetail(monthlyErrorDetail);
      setCumulativeDataErrorDetail(cumulativeErrorDetail);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Statistiques de MythoOuPas" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-20 items-center')}>
          <View style={tw('mb-2 p-6 rounded-lg')}>
            <Text style={tw('text-lg mb-4')}>Nombre total de notations de plausibilité faites dans MythoOuPas</Text>
            <View ref={monthlyChartRef}>
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
            </View>
            <ExportButton chartRef={monthlyChartRef} fileName="line_chart" />

            <Text style={tw('text-lg mt-12 mb-4')}>Nombre total de notations de plausibilité par semaine</Text>
            <View ref={cumulativeChartRef}>
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
                <Bar dataKey="count" fill="#8884d8" name="Notations" />
              </BarChart>
            </View>
            <ExportButton chartRef={cumulativeChartRef} fileName="line_chart" />


            <Text style={tw('text-lg mt-12 mb-4')}>Nombre total d'erreurs spécifiées dans MythoOuPas</Text>
            <View ref={monthlyErrorChartRef}>
              <LineChart
                width={Math.min(Math.max(screenWidth * 0.8, 300), 1200)}
                height={400}
                data={cumulativeDataErrorDetail}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cumulativeCount" stroke="#82ca9d" name="Comptes au total" isAnimationActive={false} />
              </LineChart>
            </View>
            <ExportButton chartRef={monthlyErrorChartRef} fileName="line_chart" />

            <Text style={tw('text-lg mt-12 mb-4')}>Nombre total d'erreurs spécifiées par semaine</Text>
            <View ref={cumulativeErrorChartRef}>
              <BarChart
                width={Math.min(Math.max(screenWidth * 0.8, 300), 1200)}
                height={400}
                data={monthlyDataErrorDetail}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Erreurs spécifiées" />
              </BarChart>
            </View>
            <ExportButton chartRef={cumulativeErrorChartRef} fileName="line_chart" />

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TextRatingStatisticsScreen;
