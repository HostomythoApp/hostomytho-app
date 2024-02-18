// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

// const Particle = ({ x, y, angle, index, shape }: { x: number, y: number, angle: number, index: number, shape: string }) => {
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const opacity = useSharedValue(0.3);

//   useEffect(() => {
//     const duration = 800;
//     const distance = Math.random() * 100 + 80;

//     translateX.value = withTiming(x + Math.cos(angle) * distance, { duration, easing: Easing.linear });
//     translateY.value = withTiming(y + Math.sin(angle) * distance, { duration, easing: Easing.linear });

//     opacity.value = withTiming(0, { duration: 700 });
//   }, []);

//   // @ts-ignore
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//       opacity: opacity.value,
//     };
//   });

//   return (
//     <Animated.View style={[
//       {
//         position: 'absolute',
//         width: 5,
//         height: 5,
//         left: 50,
//         marginTop: 10,
//         borderRadius: 5,
//         backgroundColor: 'green',
//       },
//       animatedStyle,
//     ]} />
//   );
// };

// const Explosion = ({ x, y }: { x: number, y: number }) => {
//   const shapes = ['circle'];

//   return (
//     <View style={{ position: 'absolute', left: x, top: y }}>
//       {[...Array(12)].map((_, index) => (
//         <Particle
//           key={index}
//           x={0}
//           y={0}
//           angle={(index * 30 * Math.PI) / 180}
//           index={index}
//           shape='circle'
//         />
//       ))}
//     </View>
//   );
// };

// export default Explosion;
