import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn";

const CustomHeaderEmpty = ({
  title,
}: {
  title: string;
  navigation: any;
}) => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-row justify-between items-center p-3 bg-white')}>
      <Text style={tw('font-primary text-center flex-grow text-2xl')}>{title}</Text>
    </View>
  );
};

export default CustomHeaderEmpty;
