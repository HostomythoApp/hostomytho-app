import React, { useRef, useEffect } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { AntDesign } from '@expo/vector-icons';

const CustomModalBackOffice = ({ isVisible, onClose, children }: { isVisible: boolean, onClose?: any, children: any }) => {
    const tw = useTailwind();

    if (!isVisible) {
        return null;
    }

    return (
        <View
            style={[
                tw('fixed inset-0 flex justify-center z-10 bg-black bg-opacity-50 '),
                { width: '100%', height: '100%' }
            ]}
        >
            <TouchableOpacity
                style={tw('absolute justify-center inset-0')}
                activeOpacity={1}
                onPress={onClose}
            >
                <View
                    style={{
                        maxWidth: 700,
                        margin: 20,
                        alignSelf: 'center',
                    }}
                >
                    {onClose && (
                        <TouchableOpacity
                            onPress={onClose}
                            style={[tw('absolute top-0 right-0 z-10 rounded-full h-8 w-8 justify-center items-center'), {
                                transform: [{ translateX: 13 }, { translateY: -12 }],
                                backgroundColor: 'transparent'
                            }]}
                        >
                            <View style={[tw('absolute rounded-full'), {
                                height: 26,
                                width: 26,
                                backgroundColor: 'white',
                                zIndex: 1
                            }]} />

                            <AntDesign name="closecircle" size={31} color="royalblue" style={{ zIndex: 2 }} />
                        </TouchableOpacity>
                    )}
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
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CustomModalBackOffice;
