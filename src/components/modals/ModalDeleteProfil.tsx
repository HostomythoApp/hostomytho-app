import React, { useRef, useEffect } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from "tailwind-rn";

const ModalDeleteProfil = ({ isVisible, onClose, children }: { isVisible: boolean, onClose: any, children: any }) => {
    const translateY = useRef(new Animated.Value(300)).current;
    const tw = useTailwind();

    useEffect(() => {
        if (isVisible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                stiffness: 400,
                damping: 30,
                mass: 1
            }).start();
        } else {
            Animated.spring(translateY, {
                toValue: 300,
                useNativeDriver: true,
                stiffness: 150,
                damping: 15,
                mass: 1
            }).start();
        }
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <Animated.View style={[tw('absolute inset-0 justify-center items-center'), { transform: [{ translateY }] }]}>
            <View style={[tw('p-5 bg-white rounded-lg items-center'), {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }]}>
                {children}
                <TouchableOpacity onPress={onClose} style={tw('mt-5')}>
                    <Text style={tw('text-red-500 font-primary text-lg')}>Fermer</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default ModalDeleteProfil;
