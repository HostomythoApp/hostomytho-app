import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

const WeirdButton = () => {
    const tw = useTailwind();
    const scaleY = useRef(new Animated.Value(1)).current;

    const onPressHandler = () => {
        Animated.timing(scaleY, {
            // @ts-ignore
            toValue: scaleY._value + 0.1,
            duration: 200,
            useNativeDriver: true 
        }).start();
    };

    return (
        <Animated.View style={[tw('w-[32%] py-2  bg-secondary rounded mx-2 '), { transform: [{ scaleY }] }]}>
            <TouchableOpacity
                style={tw(`flex-row items-center justify-center `)}
                onPress={onPressHandler}
            >
                <FontAwesome5
                    name='meh-blank'
                    size={24}
                    color="white"
                    style={{ alignSelf: 'center' }}
                />
                <Text style={tw('text-white ml-2 font-primary')}>Bouton étrange</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default WeirdButton;
