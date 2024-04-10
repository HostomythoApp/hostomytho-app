import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Entypo, Ionicons } from '@expo/vector-icons';

interface RatingButtonProps {
  onPress: () => void;
  iconName: string;
  iconColor: string;
  bgColor: string;
  tooltipText: string;
  iconSize: number;
  iconLibrary: 'Entypo' | 'Ionicons';
}

const RatingButton: React.FC<RatingButtonProps> = ({
  onPress,
  iconName,
  iconColor,
  bgColor,
  tooltipText,
  iconSize,
  iconLibrary
}) => {
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

  const IconComponent = iconLibrary === 'Entypo' ? Entypo : Ionicons;

  return (
    // @ts-ignore
    <View onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <TouchableOpacity
        onPress={onPress}
        style={tw(`items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 my-auto ${bgColor}`)}
      >
        {/* @ts-ignore */}
        <IconComponent name={iconName} size={iconSize} color={iconColor} />
        {showTooltip && (
          <View style={tw('absolute -top-8 bg-black bg-opacity-75 rounded px-2 py-1')}>
            <Text style={tw('text-white text-sm z-50 font-primary')}
              numberOfLines={1}
            >
              {tooltipText}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RatingButton;
