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
  const animatedColor = useSharedValue(textColor);

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
      animatedColor.value = withSpring('green');

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
          animatedColor.value = textColor;
        }
      };

      intervalId = setInterval(incrementPoints, initialInterval);
    }

    return () => clearInterval(intervalId);

  }, [user?.points, textColor]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
      color: animatedColor.value,
      alignSelf: 'center'
    };
  });

  return (
    <View style={tw(`flex-row justify-between items-center ${backgroundColor} p-0`)}>
      <TouchableOpacity style={[tw('p-5'), isMobile ? tw('p-3') : tw('p-[18px]')]} onPress={() => navigation.goBack()}>
        <Animated.View style={animatedCommonStyle}>
          <Ionicons name="chevron-back" size={30} color={animatedColor.value} />
        </Animated.View>
      </TouchableOpacity>
      <Text style={[tw(`font-primary text-center flex-grow font-bold text-${textColor}`), isMobile ? tw('text-xl') : tw('text-2xl')]}>{title}</Text>
      {user?.points !== undefined &&
        <Animated.View style={tw('flex-row items-center justify-center w-32')}>
          <Animated.View style={animatedCommonStyle}>
            <MaterialIcons style={tw(`mr-1`)} name="person-search" size={16} color={animatedColor.value} />
          </Animated.View>
          <Animated.Text style={[tw(`font-primary`), animatedTextStyle]}>{Math.round(displayPoints)} points</Animated.Text>
          {showExplosion && <Explosion x={0} y={0} />}
        </Animated.View>
      }
    </View>
  );
};

export default CustomHeaderInGame;
