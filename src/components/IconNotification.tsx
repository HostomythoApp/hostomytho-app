import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const IconNotification = ({ size, top, right }: { size: number; top: string; right: string }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fonction pour démarrer l'animation
    const startAnimation = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(rotateAnim, {
            toValue: 2,
            duration: 800,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      ]).start(() => setTimeout(startAnimation, 5000));
    };

    startAnimation();
  }, [scaleAnim, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    // @ts-ignore
    <Animated.View style={{
      position: 'absolute',
      top: top,
      right: right,
      width: size,
      height: size,
      borderRadius: 100,
      backgroundColor: "rgb(221, 49, 7)",
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ scale: scaleAnim }, { rotate: rotation }]
    }}>
      <Entypo name="magnifying-glass" size={size - 5} color={"white"} />
    </Animated.View>
  );
};

export default IconNotification;
