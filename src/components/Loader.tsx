import React from 'react';
import { ActivityIndicator, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import LottieView from 'lottie-react-native';

const Loader = () => {
    const tw = useTailwind();
    return (
        <View style={tw('flex-1 justify-center items-center bg-[#a5c9a5]')}>
            <LottieView source={require('lotties/loader.json')} autoPlay loop />
        </View>
    )
};

export default Loader;
