import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from "tailwind-rn";
import { Ionicons } from '@expo/vector-icons';
import { RootStackNavigationProp } from 'navigation/Types';

const AnimHeader = ({
  title,
  backgroundColor = 'bg-white',
  textColor = 'black',
  backToMain = false,
  animation = false,
}: {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  backToMain?: boolean;
  animation?: boolean;
}) => {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackNavigationProp<"TableauDeBord">>();
  const window = Dimensions.get('window');
  const isMobile = window.width < 960;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    if (backToMain) {
      navigation.navigate("TableauDeBord");
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (animation) {
      const pulse = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.5,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(colorAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }),
            Animated.timing(colorAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ]),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [animation, scaleAnim, colorAnim]);

  const interpolatedColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#dd3107'],
  });

  return (
    <View style={[tw(`flex-row justify-between items-center z-10 ${backgroundColor} absolute w-full top-0`), isMobile ? tw('h-14') : tw('h-[68px]')]}>
      <TouchableOpacity style={tw('pl-4 absolute z-10 ml-4')} onPress={handleBackPress}>
        <Animated.View
          style={{
            transform: [{ scale: animation ? scaleAnim : 1 }],
          }}
        >
          <Animated.Text
            style={{
              color: interpolatedColor,
            }}
          >
            <Ionicons name="arrow-back" size={34}/>
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={tw(`font-primary text-center flex-grow text-xl text-${textColor}`)}>{title}</Text>
      <View style={tw('pl-4')} />
    </View>
  );
};

export default AnimHeader;
