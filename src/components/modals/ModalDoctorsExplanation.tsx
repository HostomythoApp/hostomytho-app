import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, Image } from 'react-native';
import { useTailwind } from "tailwind-rn";

const ModalDoctorsExplanation = ({ isVisible, onClose, children }: { isVisible: boolean, onClose: any, children: any }) => {
    const translateX = useRef(new Animated.Value(-1000)).current;
    const bubbleOpacity = useRef(new Animated.Value(0)).current;
    const [bubbleVisible, setBubbleVisible] = useState(false);

    const tw = useTailwind();

    useEffect(() => {
        if (isVisible) {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start(() => {
                setTimeout(() => {
                    setBubbleVisible(true);
                    Animated.timing(bubbleOpacity, {
                        toValue: 1,
                        duration: 130,
                        useNativeDriver: true
                    }).start();
                }, 500);
            });
        } else {
            translateX.setValue(-1000);
            bubbleOpacity.setValue(0);
            setBubbleVisible(false);
        }
    }, [isVisible, translateX, bubbleOpacity]);


    if (!isVisible) {
        return null;
    }
    return (
        <TouchableOpacity style={[tw('absolute w-full h-full z-20 overflow-hidden'),
        {
            backgroundColor: 'rgba(60, 60, 60, 0.5)'
        }]}
            activeOpacity={1} onPress={onClose}>


            <Animated.View
                style={{
                    transform: [{ translateX }],
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    flexDirection: 'row',
                }}
            >
                <Image
                    source={require('images/doctor.png')}
                    style={{ width: 150, height: 270, alignSelf: 'flex-end' }}
                    resizeMode="contain"
                />
                {bubbleVisible && (
                    <Animated.View style={{ paddingLeft: 10, opacity: bubbleOpacity, maxWidth: 530, marginBottom: 15 }}>

                        <View style={[tw('p-3 rounded-lg bg-white'),
                        {
                            position: 'relative',
                            // Ombres pour iOS
                            shadowColor: "#000",
                            shadowOffset: {
                                width: -3,
                                height: 1,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 6.84,
                            // Ombre pour Android
                            elevation: 10,
                        }
                        ]}>
                            <Text style={tw('text-black text-base')}>{children}</Text>
                            <View style={{ width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 15, borderBottomWidth: 15, borderLeftColor: 'transparent', borderBottomColor: 'white', transform: [{ rotate: '14deg' }, { translateX: -9 }, { translateY: 12 }], position: 'absolute', top: 10, left: 0 }} />
                        </View>
                    </Animated.View>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default ModalDoctorsExplanation;