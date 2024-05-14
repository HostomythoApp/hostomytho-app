import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';

interface WikiButtonProps {
    func: () => void;
}

const WikiButton: React.FC<WikiButtonProps> = ({ func }) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const isHoveredRef = useRef<boolean>(false);
    const tw = useTailwind();
    let hoverTimeout: NodeJS.Timeout | null = null;

    const handleMouseEnter = (): void => {
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
                    elevation: 3
                }]}
            >
                {showTooltip && (
                    <View style={tw('absolute top-10 left-1/2 bg-black bg-opacity-75 rounded px-2 py-1')}>
                        <Text style={tw('text-white text-sm font-primary')}
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
