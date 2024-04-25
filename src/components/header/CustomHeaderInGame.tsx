import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from "tailwind-rn";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useUser } from 'services/context/UserContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}

const CustomHeaderInGame: React.FC<Props> = ({
  title,
  backgroundColor = 'bg-white',
  textColor = 'black',
}) => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const { user } = useUser();
  const [displayPoints, setDisplayPoints] = useState<number>(user?.points ?? 0);
  const window = Dimensions.get('window');
  const isMobile = window.width < 960;
  const [animatedColor, setAnimatedColor] = useState(textColor);
  const [pointsGained, setPointsGained] = useState<number>(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (user?.points !== undefined && user.points !== displayPoints) {
      const pointsDiff = user.points - displayPoints;
  
      if (pointsDiff > 0) {
        setPointsGained(pointsDiff);
        opacity.value = withSpring(1, { stiffness: 100, damping: 15 });
  
        const timeoutId = setTimeout(() => {
          setDisplayPoints(user.points);
          opacity.value = withSpring(0, { stiffness: 100, damping: 15 });
        }, 2000);
  
        return () => clearTimeout(timeoutId);
      } else {
        setDisplayPoints(user.points);
      }
    }
  }, [user?.points, displayPoints]);
  
  
  const pointsGainedStyle = useAnimatedStyle(() => {
    return {
      fontSize: 16,
      color: 'white',
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      padding: 4,
      marginLeft: 25,
      borderRadius: 10,
      opacity: opacity.value,
      transform: [{ scale: opacity.value }],
      position: 'absolute',
      alignSelf: 'center',
      zIndex: 20
    };
  });

  const totalPointsStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value === 1 ? 0 : 1,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: animatedColor,
      alignSelf: 'center',
    };
  });

  return (
    <View style={tw(`flex-row justify-between items-center ${backgroundColor} p-0`)}>
      <TouchableOpacity style={[tw('p-5'), isMobile ? tw('p-3') : tw('p-[18px]')]} onPress={() => navigation.goBack()}>
        <View >
          <Ionicons name="arrow-back" size={30} color={textColor} />
        </View>
      </TouchableOpacity>
      <Text style={[tw(`font-primary text-center flex-grow text-${textColor}`), isMobile ? tw('text-xl') : tw('text-2xl')]}>{title}</Text>
      {user?.points !== undefined &&
        <Animated.View style={tw('flex-row items-center justify-center w-32')}>
          <Animated.View style={tw('text-lg')}>
            <MaterialIcons style={tw(`mr-2`)} name="person-search" size={18} color={animatedColor} />

          </Animated.View>
          <Animated.Text style={[tw(`font-primary text-lg`), pointsGainedStyle]}>
            +{Math.round(pointsGained)} points
          </Animated.Text>
          <Animated.Text style={[tw(`font-primary`), animatedTextStyle, totalPointsStyle]}>
            {Math.round(displayPoints)} points
          </Animated.Text>

          <View

            style={[tw('absolute bottom-0 right-0 bg-green-700 rounded-full w-6 h-5 flex items-center justify-center left-0'), {
              transform: [{ translateX: 19 }, { translateY: -16 }],
            }]}
          >
            <Text style={tw('text-white text-xs font-primary font-bold')}>
              x{user.coeffMulti}
            </Text>
          </View>
        </Animated.View>
      }
    </View>
  );
};

export default CustomHeaderInGame;
