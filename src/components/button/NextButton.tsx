import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NextButton = ({ func, bgColor = 'rgba(255, 255, 255, 1)', isDisabled = false}: { func: () => void, bgColor?: string, isDisabled?: boolean }) => {

    const buttonStyle = StyleSheet.create({
        button: {
            height: 36,
            marginRight: 8,
            width: 44,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            backgroundColor: isDisabled ? 'rgba(218, 235, 220, 0.5)' : bgColor,
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            color: isDisabled ? 'rgba(37, 53, 41, 0.5)' : '#253529',
            size: 22,
        },
    });

    return (
        <TouchableOpacity
            style={buttonStyle.button}
            onPress={func}
            disabled={isDisabled}
        >
            <MaterialIcons name="next-plan" size={buttonStyle.icon.size} color={buttonStyle.icon.color} />
        </TouchableOpacity>
    );
};

export default NextButton;