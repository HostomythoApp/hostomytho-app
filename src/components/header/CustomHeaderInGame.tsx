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
import Explosion from 'components/Explosion';

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
  const [showExplosion, setShowExplosion] = useState(false);
  const fontSize = useSharedValue(16);
  const [animatedColor, setAnimatedColor] = useState(textColor);
  const achievements = 5;
  const multiplier = 1 + achievements * 0.1;

  // @ts-ignore
  const animatedCommonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fontSize.value / 16 }],
      alignSelf: 'center'
    };
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let initialInterval = 60;
    let intervalIncrement = 30;

    if (user?.points !== undefined && user.points !== displayPoints) {
      let currentPoints = displayPoints;
      setShowExplosion(true);
      fontSize.value = withSpring(18);

      const incrementPoints = () => {
        if (currentPoints < user.points) {
          currentPoints++;
          setDisplayPoints(currentPoints);
          clearInterval(intervalId);
          initialInterval += intervalIncrement;
          intervalId = setInterval(incrementPoints, initialInterval);
        } else {
          clearInterval(intervalId);
          setShowExplosion(false);
          fontSize.value = withSpring(16);
        }
      };

      intervalId = setInterval(incrementPoints, initialInterval);
    }

    return () => clearInterval(intervalId);

  }, [user?.points, textColor]);


  useEffect(() => {
    if (showExplosion) {
      setAnimatedColor('green');
    } else {
      setAnimatedColor(textColor);
    }
  }, [showExplosion, textColor]);

  useEffect(() => {
    setDisplayPoints(user?.points ?? 0);
  }, [user]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
      color: animatedColor,
      alignSelf: 'center'
    };
  });

  return (
    <View style={tw(`flex-row justify-between items-center ${backgroundColor} p-0`)}>
      <TouchableOpacity style={[tw('p-5'), isMobile ? tw('p-3') : tw('p-[18px]')]} onPress={() => navigation.goBack()}>
        <View >
          <Ionicons name="chevron-back" size={30} color={textColor} />
        </View>
      </TouchableOpacity>
      <Text style={[tw(`font-primary text-center flex-grow font-bold text-${textColor}`), isMobile ? tw('text-xl') : tw('text-2xl')]}>{title}</Text>
      {user?.points !== undefined &&
        <Animated.View style={tw('flex-row items-center justify-center w-32')}>
          <Animated.View style={animatedCommonStyle}>
            <MaterialIcons style={tw(`mr-2`)} name="person-search" size={18} color={animatedColor} />

          </Animated.View>
          <Animated.Text style={[tw(`font-primary`), animatedTextStyle]}>{Math.round(displayPoints)} points</Animated.Text>
          <View

            style={[tw('absolute bottom-0 right-0 bg-green-700 rounded-full w-6 h-5 flex items-center justify-center left-0'), {
              transform: [{ translateX: 19 }, { translateY: -16 }],
            }]}
          >
            <Text style={tw('text-white text-xs font-primary font-bold')}>
              x{multiplier.toFixed(1)}
            </Text>
          </View>
          {showExplosion && <Explosion x={0} y={0} />}
        </Animated.View>
      }
    </View>
  );
};

export default CustomHeaderInGame;
