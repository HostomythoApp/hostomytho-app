import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTailwind } from "tailwind-rn";

const CustomHeader = ({
  title,
  navigation,
}: {
  title: string;
  navigation: any;
}) => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-row justify-between items-center p-3 bg-white')}>
      <TouchableOpacity onPress={navigation.goBack}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={tw('font-primary text-center flex-grow text-2xl')}>{title}</Text>

      {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

export default CustomHeader;
