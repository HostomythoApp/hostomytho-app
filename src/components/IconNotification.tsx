import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
      backgroundColor: "rgb(223, 94, 28)",
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <FontAwesome
        name="exclamation"
        size={size - 5}
        color="white"
      />
    </View>
  );
};

export default IconNotification;
