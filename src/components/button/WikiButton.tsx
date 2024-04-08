import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';

const WikiButton = ({ func, bgColor = 'rgba(255, 255, 255, 1)' }: { func: any, bgColor: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const tw = useTailwind();
    let hoverTimeout: any;

    const handleMouseEnter = () => {
        setIsHovered(true);
        hoverTimeout = setTimeout(() => {
            setShowTooltip(true);
        }, 600);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setShowTooltip(false);
        clearTimeout(hoverTimeout);
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
                // @ts-ignore
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={[tw("h-9 ml-2 w-11 rounded-b-md items-center justify-center bg-opacity-75 "),
                {
                    backgroundColor: 'rgba(187, 247, 208, 0.92)',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }]}
            >
                {showTooltip && (
                    <View style={tw('absolute top-10 left-1/2 bg-black bg-opacity-75 rounded px-2 py-1')}>
                        <Text style={tw('text-white text-xs font-primary')}
                            numberOfLines={1}
                        >
                            Définition de mot
                        </Text>
                    </View>
                )}
                <FontAwesome name="wikipedia-w" size={16} color="black" />
            </TouchableOpacity>
        </View>
    );

};

export default WikiButton;
