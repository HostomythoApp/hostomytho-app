import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import successImage from 'images/correct.png';
const SuccessModal = ({ isVisible, onDismiss }: { isVisible: boolean, onDismiss: () => void }) => {
    const tw = useTailwind();
    const scale = useRef(new Animated.Value(0)).current;
    const rotate = scale.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    const opacity = scale.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const timerRef = useRef<any>(null);

    useEffect(() => {
        if (isVisible) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
            timerRef.current = setTimeout(() => {
                // Début animation de disparition
                Animated.spring(scale, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start(onDismiss);
            }, 2000);
        } else {
            scale.setValue(0); // Réinitialisation de l'animation
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [isVisible, onDismiss, scale]);

    return isVisible ? (
        <TouchableOpacity
            style={tw('absolute inset-0 justify-center items-center w-full h-full z-40')}
            activeOpacity={1}
            onPress={onDismiss}
        >
            <Animated.Image
                source={successImage}
                style={{
                    width: 150,
                    height: 150,
                    opacity,
                    transform: [{ scale }, { rotate }],
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    ) : null;
};

export default SuccessModal;
