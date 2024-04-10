import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

const NextButton = ({ func, isDisabled = false }: { func: any, isDisabled: boolean }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const isHoveredRef = useRef<boolean>(false);
    const tw = useTailwind();
    let hoverTimeout: any;

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
        hoverTimeout = setTimeout(() => {
            if (isHoveredRef.current) {
                setShowTooltip(true);
            }
        }, 600);
    };

    const handleMouseLeave = (): void => {
        isHoveredRef.current = false;
        setShowTooltip(false);
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, []);

    return (
        <View>
            <TouchableOpacity
                onPress={func}
                disabled={isDisabled}
                // @ts-ignore
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={[tw("h-9 mr-2 w-11 rounded-b-md items-center justify-center bg-opacity-75 "),
                {
                    backgroundColor: 'rgba(187, 247, 208, 0.92)',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }]}
            >
                {showTooltip && (
                    <View style={tw('absolute top-10 bg-black bg-opacity-75 rounded px-2 py-1')}>
                        <Text style={tw('text-white text-sm z-50 font-primary')}
                            numberOfLines={1}
                        >
                            Texte suivant
                        </Text>
                    </View>
                )}
                <MaterialIcons name="next-plan" size={22} color={isDisabled ? 'rgba(37, 53, 41, 0.5)' : '#253529'} />
            </TouchableOpacity>
        </View>
    );

};

export default NextButton;
