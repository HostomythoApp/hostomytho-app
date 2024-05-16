import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { useUser } from 'services/context/UserContext';

const ModalStates = {
    APPEAR: 'appear',
    STAY: 'stay',
    DISAPPEAR: 'disappear',
};

const ModalBossExplanation = ({ isVisible, onClose, children, tutorial_progress }: { isVisible: boolean, onClose: any, children: any, tutorial_progress?: number }) => {
    const translateX = useRef(new Animated.Value(1000)).current;
    const bubbleOpacity = useRef(new Animated.Value(0)).current;
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const [modalState, setModalState] = useState(ModalStates.APPEAR);
    const { incrementTutorialProgress } = useUser();
    const tw = useTailwind();
    const screenWidth = Dimensions.get('window').width;
    let imageSize, bubbleHeight;

    if (screenWidth <= 748) { // Tablettes petites
        imageSize = { width: 120, height: 230 };
        bubbleHeight = { paddingBottom: 110 };
    } else if (screenWidth <= 1024) { // Tablettes grandes
        imageSize = { width: 160, height: 300 };
        bubbleHeight = { paddingBottom: 150 };
    } else { // Ordinateurs
        imageSize = { width: 220, height: 370 };
        bubbleHeight = { paddingBottom: 220 };
    }
    useEffect(() => {
        if (isVisible) {
            setModalState(ModalStates.APPEAR);
        } else if (!isVisible && modalState !== ModalStates.DISAPPEAR) {
            setModalState(ModalStates.DISAPPEAR);
        }
    }, [isVisible]);

    useEffect(() => {
        switch (modalState) {
            case ModalStates.APPEAR:
                if (isVisible && modalState === ModalStates.APPEAR) {
                    // Début de l'animation pour faire apparaître le personnage
                    Animated.timing(translateX, {
                        toValue: 0,
                        duration: 400,
                        useNativeDriver: true,
                    }).start(() => {
                        // Retarder l'apparition de la bulle
                        setTimeout(() => {
                            setBubbleVisible(true);
                            // Animation pour faire apparaître la bulle
                            Animated.timing(bubbleOpacity, {
                                toValue: 1,
                                duration: 130,
                                useNativeDriver: true,
                            }).start();
                        }, 1000); // Délai augmenté à 1 seconde
                    });
                } else if (!isVisible && modalState !== ModalStates.DISAPPEAR) {
                    setModalState(ModalStates.DISAPPEAR);
                }
                break;
            case ModalStates.STAY:
                break;
            case ModalStates.DISAPPEAR:
                Animated.timing(translateX, {
                    toValue: 1000,
                    duration: 400,
                    useNativeDriver: true,
                }).start(() => {
                    setBubbleVisible(false);
                    bubbleOpacity.setValue(0);
                });
                break;
            default:
                break;
        }
    }, [isVisible, modalState, translateX, bubbleOpacity]);

    const handleClose = () => {
        setModalState(ModalStates.DISAPPEAR);
        setTimeout(onClose, 500);
    };
    const handleModalClick = async () => {
        // Faire disparaître la bulle
        Animated.timing(bubbleOpacity, {
            toValue: 0,
            duration: 130,
            useNativeDriver: true,
        }).start(async () => {
            await incrementTutorialProgress();
            if (tutorial_progress === 5 || tutorial_progress === 9) {
                // Si à l'étape 5, déclencher l'état DISAPPEAR
                setModalState(ModalStates.DISAPPEAR);
            } else {
                // Sinon, faire réapparaître la bulle après un délai
                setTimeout(() => {
                    Animated.timing(bubbleOpacity, {
                        toValue: 1,
                        duration: 130,
                        useNativeDriver: true,
                    }).start();
                }, 400);
            }
        });
    };


    if (!isVisible) {
        return null;
    }
    return (
        <View style={[tw('absolute inset-0 w-full h-full z-20 overflow-hidden'), {
            backgroundColor: 'rgba(60, 60, 60, 0.5)'
        }]}>
            <Animated.View
                style={{
                    transform: [{ translateX }],
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignItems: "flex-end",
                }}
            >
                {bubbleVisible && (
                    <Animated.View
                        style={[{ paddingLeft: 10, opacity: bubbleOpacity, maxWidth: 500 }, bubbleHeight]}
                    >
                        <View style={[tw('p-3 rounded-lg bg-white'), {
                            position: 'relative',
                            // Shadows for iOS
                            shadowColor: "#000",
                            shadowOffset: {
                                width: -3,
                                height: 1,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 6.84,
                            // Shadow for Android
                            elevation: 10,
                        }]}>
                            <Text style={tw('text-black text-base')}>{children}</Text>
                            <View style={{
                                width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderLeftWidth: 18, borderBottomWidth: 32, borderLeftColor: 'transparent',
                                borderBottomColor: 'white', transform: [{ rotate: '85deg' }, { translateX: -10 }, { translateY: -14 }], position: 'absolute', bottom: 0, right: 0
                            }} />
                        </View>
                        <TouchableOpacity
                            onPress={handleModalClick}
                            style={[tw('bg-primary py-2 px-4 rounded self-center mt-4'),
                            {
                                shadowColor: 'black',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                elevation: 3
                            }]}
                        >
                            <Text style={tw('text-white font-bold text-center font-primary')}>J'ai compris</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
                <Image
                    source={require('images/boss.png')}
                    style={[{ alignSelf: 'flex-end' }, imageSize]}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );

};

export default ModalBossExplanation;