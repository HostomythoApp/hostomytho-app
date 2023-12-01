import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from "tailwind-rn";
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderEmpty = ({
  title,
  backgroundColor = 'bg-white',
  textColor = 'black',
}: {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
}) => {
  const tw = useTailwind();
  const navigation = useNavigation();


  return (
    <View style={tw(`flex-row justify-between items-center p-[18px] z-10 ${backgroundColor} absolute w-full top-0`)}>
      <TouchableOpacity style={tw('pl-4')} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color={textColor} />
      </TouchableOpacity>
      <Text style={tw(`font-primary text-center flex-grow text-2xl font-bold text-${textColor}`)}>{title}</Text>
      <View style={tw('pl-4')} />
    </View>
  );
};

export default CustomHeaderEmpty;