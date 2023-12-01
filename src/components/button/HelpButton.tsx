import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

const HelpButton = ({ onHelpPress }: { onHelpPress: any }) => {
    const tw = useTailwind();

    return (
        <TouchableOpacity
            style={tw('bg-[#BBF7D0] p-2 mr-2 text-center w-11 rounded-b-md')}
            onPress={onHelpPress}
        >
            <Entypo name="help" size={16} color="#253529" style={tw('self-center')}
            />
        </TouchableOpacity>
    );
};

export default HelpButton;
