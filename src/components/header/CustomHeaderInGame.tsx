import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from 'services/context/UserContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const CustomHeaderInGame = ({
  title,
  navigation,
}: {
  title: string;
  navigation: any;
}) => {
  const tw = useTailwind();
  const { user } = useUser();

  const points = useSharedValue(user?.points || 0);
  const scale = useSharedValue(1);

  const [displayPoints, setDisplayPoints] = useState(user?.points || 0);

  useEffect(() => {
    if (user?.points !== points.value) {
      points.value = user?.points || 0;
      scale.value = withSpring(1.2, { overshootClamping: true }, () => {
        scale.value = withSpring(1);
      });
    }
    setDisplayPoints(user?.points || 0);
  }, [user?.points]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={tw('flex-row justify-between items-center p-3 bg-white')}>
      <TouchableOpacity style={tw(' pl-4')} onPress={navigation.goBack}>
        <MaterialCommunityIcons name="backburger" size={24} color="black" />
      </TouchableOpacity>
      <Text style={tw('font-primary text-center flex-grow text-2xl')}>{title}</Text>
      {user?.points !== undefined &&
        <Animated.Text style={[tw('font-primary'), animatedStyle]}>
          <MaterialIcons style={tw('mr-1')} name="person-search" size={16} color="black" />
          {Math.round(displayPoints)} points
        </Animated.Text>
      }
    </View>
  );
};

export default CustomHeaderInGame;
