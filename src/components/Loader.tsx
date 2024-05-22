import React, { useEffect, useState } from 'react';
import { View, Image, Text, Animated } from "react-native";
import { useTailwind } from "tailwind-rn";

const Loader = () => {
    const tw = useTailwind();
    const [fadeAnim1] = useState(new Animated.Value(0));
    const [fadeAnim2] = useState(new Animated.Value(0));
    const [fadeAnim3] = useState(new Animated.Value(0));

    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(fadeAnim1, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(fadeAnim1, { toValue: 0, duration: 400, useNativeDriver: true })
            ]).start();

            setTimeout(() => {
                Animated.sequence([
                    Animated.timing(fadeAnim2, { toValue: 1, duration: 400, useNativeDriver: true }),
                    Animated.timing(fadeAnim2, { toValue: 0, duration: 400, useNativeDriver: true })
                ]).start();
            }, 200);

            setTimeout(() => {
                Animated.sequence([
                    Animated.timing(fadeAnim3, { toValue: 1, duration: 400, useNativeDriver: true }),
                    Animated.timing(fadeAnim3, { toValue: 0, duration: 400, useNativeDriver: true })
                ]).start();
            }, 400);

            setTimeout(animate, 1200);
        };

        animate();
    }, []);

    return (
        <View style={tw('flex-1 justify-center items-center bg-[#9BD7FF] absolute h-full w-full z-50')}>
            <Image source={require('images/logo_loader.png')} style={tw('w-36 h-36')} />
            <View style={{ flexDirection: 'row' }}>
                <Text style={tw('font-primary text-xl text-white')}>Chargement</Text>
                <View style={tw(' flex-row -mt-[3px] ml-[2px]')}>
                    <Animated.Text style={[tw('font-primary text-2xl text-white mr-[1px]'), { opacity: fadeAnim1 }]}>.</Animated.Text>
                    <Animated.Text style={[tw('font-primary text-2xl text-white mr-[1px]'), { opacity: fadeAnim2 }]}>.</Animated.Text>
                    <Animated.Text style={[tw('font-primary text-2xl text-white mr-[1px]'), { opacity: fadeAnim3 }]}>.</Animated.Text>
                </View>
            </View>
        </View>
    );
};

export default Loader;
