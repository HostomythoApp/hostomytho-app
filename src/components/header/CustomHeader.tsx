import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn";

const CustomHeader = ({
  title,
  navigation,
  textColor = 'black',
}: {
  title: string;
  navigation: any;
  textColor?: string;
}) => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-row justify-between items-center p-3 bg-white')}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Ionicons name="chevron-back" size={30} color={textColor} />
      </TouchableOpacity>
      <Text style={tw('font-primary text-center flex-grow text-2xl')}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
