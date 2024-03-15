import React from 'react';
import { View, Image, StyleSheet, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
// import LottieView from 'lottie-react-native';

const Loader = () => {
    const tw = useTailwind();

    return (
        <View style={tw('flex-1 justify-center items-center bg-[#9BD7FF] absolute h-full w-full z-50')}>
            <Image source={require('images/logo_loader.png')} style={tw('w-24 h-24')} />
            <Text style={tw('font-primary text-sm text-white')}
            >Chargement...</Text>
            <View style={tw('w-28 mt-44 absolute')}>
                {/* <LottieView style={tw('w-full h-full ')}
                    source={require('lotties/loader.json')} autoPlay loop /> */}
            </View>
        </View>
    );
};

export default Loader;
