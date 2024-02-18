import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const IconNotification = ({ size, top, right }: { size: number; top: string; right: string }) => {
  return (
    // @ts-ignore
    <View style={{
      position: 'absolute',
      top: top,
      right: right,
      width: size,
      height: size,
      borderRadius: 100,
      backgroundColor: "rgb(221, 49, 7)",
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Entypo name="magnifying-glass" size={size - 5} color={"white"} />
    </View>
  );
};

export default IconNotification;
