import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

const HelpButton = ({ onHelpPress }: { onHelpPress: any }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tw = useTailwind();
    let hoverTimeout: any;


    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => {
            setShowTooltip(true);
        }, 600);
    };

    const handleMouseLeave = () => {
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
                onPress={onHelpPress}
                // @ts-ignore
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={[tw("p-2 mr-2 text-center w-11 rounded-b-md bg-opacity-75"),
                {
                    backgroundColor: 'rgba(187, 247, 208, 0.92)',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }]}
            >
                {showTooltip && (
                    <View style={tw('absolute top-10 right-1/2 bg-black bg-opacity-75 rounded px-2 py-1 z-50')}>
                        <Text style={tw('text-white text-xs z-50 font-primary')}
                            numberOfLines={1}
                        >
                            Besoin d'aide ?
                        </Text>
                    </View>
                )}
                <Entypo name="help" size={16} color="#253529" style={tw('self-center')} />
            </TouchableOpacity>
        </View>
    );
};

export default HelpButton;
