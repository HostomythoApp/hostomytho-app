import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn";

const CustomHeaderEmpty = ({
  title,
  navigation,
}: {
  title: string;
  navigation: any;
}) => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-row items-center justify-between p-3 bg-transparent')}>
      <TouchableOpacity onPress={navigation.goBack}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={tw('font-primary text-center flex-grow text-2xl')}
      >{title}</Text>

      <View style={tw('w-6')} />
    </View>

  );
};

export default CustomHeaderEmpty;
