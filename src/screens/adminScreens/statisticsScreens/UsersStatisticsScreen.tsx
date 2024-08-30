import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getUserRegistrationsDate, getCumulativeUserRegistrations, getUserTypesCount } from "services/api/stats";

const screenWidth = Dimensions.get("window").width;

const UsersStatisticsScreen = ({ }) => {
  const tw = useTailwind();
  const [weeklyData, setWeeklyData] = useState<any>([]);
  const [cumulativeData, setCumulativeData] = useState<any>([]);
  const [userTypesData, setUserTypesData] = useState<any>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const dailyResult = await getUserRegistrationsDate();
      const cumulativeResult = await getCumulativeUserRegistrations();
      const userTypesResult = await getUserTypesCount();
      setWeeklyData(dailyResult);
      setCumulativeData(cumulativeResult);
      setUserTypesData(userTypesResult);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };


  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    // @ts-ignore
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {payload.count}
      </text>
    );
  };
  

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Statistiques des utilisateurs" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-20 items-center')}>
          <View style={tw('mb-2 p-6 rounded-lg')}>
            <Text style={tw('text-lg mb-4')}>Nombre total d'utilisateurs inscrits</Text>
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

            <Text style={tw('text-lg mt-12 mb-4')}>Nombre de créations de comptes par semaine et type</Text>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="medecin" stackId="a" fill="#8884d8" name="Médecin" />
                <Bar dataKey="autre" stackId="a" fill="#82ca9d" name="Autre" />
                <Bar dataKey="inconnu" stackId="a" fill="#ffc658" name="Inconnu" />
              </BarChart>
            </ResponsiveContainer>

            <Text style={tw('text-lg mt-12 mb-4')}>Statuts des utilisateurs</Text>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={userTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                >
                  {/* @ts-ignore */}
                  {userTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UsersStatisticsScreen;
