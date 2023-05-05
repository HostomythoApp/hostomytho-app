import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from 'services/auth/UserContext';

const CustomHeaderInGame = ({
  title,
  navigation,
}: {
  title: string;
  navigation: any;
}) => {
  const tw = useTailwind();
  const { user } = useUser();

  return (
    <View style={tw('flex-row justify-between items-center p-3 bg-white')}>
      <TouchableOpacity style={tw(' pl-4')}
       onPress={navigation.goBack}>
        <MaterialCommunityIcons name="backburger" size={24} color="black" />
      </TouchableOpacity>
      <Text style={tw('font-primary text-center flex-grow text-2xl')}>{title}</Text>

      <Text style={tw('font-primary')}>
        <MaterialIcons style={tw('mr-1')}
         name="person-search" size={16} color="black" />
        {user?.points} points</Text>
    </View>
  );
};

export default CustomHeaderInGame;
