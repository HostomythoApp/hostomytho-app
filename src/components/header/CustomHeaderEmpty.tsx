import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from "tailwind-rn";
import { Ionicons } from '@expo/vector-icons';
import { RootStackNavigationProp } from 'navigation/Types';

const CustomHeaderEmpty = ({
  title,
  backgroundColor = 'bg-white',
  textColor = 'black',
  backToMain = false,
}: {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  backToMain?: boolean;
}) => {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackNavigationProp<"TableauDeBord">>();
  const window = Dimensions.get('window');
  const isMobile = window.width < 960;

  const handleBackPress = () => {
    if (backToMain) {
      navigation.navigate("TableauDeBord");
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[tw(`flex-row justify-between items-center z-10 ${backgroundColor} absolute w-full top-0`), isMobile ? tw('h-14') : tw('h-[68px]')]}>
      <TouchableOpacity style={tw('pl-4 absolute z-10')} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={30} color={textColor} />
      </TouchableOpacity>
      <Text style={tw(`font-primary text-center flex-grow text-xl text-${textColor}`)}>{title}</Text>
      <View style={tw('pl-4')} />
    </View>
  );
};

export default CustomHeaderEmpty;