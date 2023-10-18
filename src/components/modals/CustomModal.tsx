import React, { useRef, useEffect } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { AntDesign } from '@expo/vector-icons';



const CustomModal = ({ isVisible, onClose, children }: { isVisible: boolean, onClose: any, children: any }) => {
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
        <TouchableOpacity
            style={tw('absolute inset-0 justify-center items-center w-full h-full')}
            activeOpacity={1}
            onPress={onClose}
        >
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    maxWidth: '700px',
                    margin: '20px'
                }}>
                <TouchableOpacity
                    onPress={onClose}
                    style={[tw('absolute top-0 right-0 z-10 rounded-full h-[29px] w-[29px]'), {
                        backgroundColor: 'white',
                        transform: [{ translateX: 10 }, { translateY: -13 }]
                    }]}
                >
                    <AntDesign name="closecircle" size={32} color="seagreen"
                        style={{
                            transform: [{ translateY: -3 }]
                        }}
                    />
                </TouchableOpacity>
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

export default CustomModal;
