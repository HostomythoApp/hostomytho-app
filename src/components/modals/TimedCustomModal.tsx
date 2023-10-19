import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useTailwind } from "tailwind-rn";

const TimedCustomModal = ({ isVisible, onClose, children }: { isVisible: boolean, onClose: any, children: any }) => {
    const translateY = useRef(new Animated.Value(300)).current;
    const tw = useTailwind();
    const timerRef = useRef<any>(null);

    useEffect(() => {
        if (isVisible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                stiffness: 400,
                damping: 30,
                mass: 1
            }).start();

            // // Fait disparaître la modal au bout de 5 secondes
            // timerRef.current = setTimeout(() => {
            //     onClose();
            // }, 5000);
        } else {
            Animated.spring(translateY, {
                toValue: 300,
                useNativeDriver: true,
                stiffness: 150,
                damping: 15,
                mass: 1
            }).start();
        }

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <TouchableOpacity
            style={tw('absolute inset-0 justify-center items-center w-full h-full')}
            activeOpacity={1}
            onPress={onClose}
        >
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    maxWidth: 700,
                    margin: 20
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={e => e.stopPropagation()}
                    style={[tw('p-5 bg-white rounded-lg items-center'), {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 3,
                    }]}
                >
                    {children}
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default TimedCustomModal;
