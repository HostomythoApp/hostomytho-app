import React, { useRef, useEffect, useContext } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import { useTailwind } from "tailwind-rn";
import ModalContext from "services/context/ModalContext";

const TimedModalContext = () => {
    const tw = useTailwind();
    const { isModalVisible, hideModal, content } = useContext(ModalContext);
    const translateY = useRef(new Animated.Value(300)).current;
    const timerRef = useRef<any>(null);

    useEffect(() => {
        if (isModalVisible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                stiffness: 400,
                damping: 30,
                mass: 1
            }).start();
            timerRef.current = setTimeout(() => {
                hideModal();
            }, 5000);
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
    }, [isModalVisible]);

    return (
        isModalVisible ? (
            <TouchableOpacity
                style={tw('absolute inset-0 justify-center items-center w-full h-full')}
                activeOpacity={1}
                onPress={hideModal}
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
                        style={[tw('p-1 bg-white rounded-lg items-center'), {
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 3,
                        }]}
                    >
                        {content}
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        ) : null
    );
};

export default TimedModalContext;
