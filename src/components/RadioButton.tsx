import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const RadioButton = ({ label, selected, onPress }: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) => {
    const tw = useTailwind();

    return (
        <TouchableOpacity
            style={[tw('flex-row'), { alignItems: 'center' }]}
            onPress={onPress} >
            <View
                style={[
                    tw('w-5 h-5 border-2 rounded-full'),
                    selected ? tw('border-blue-500') : tw('border-gray-500'),
                ]}>
                {selected && (
                    <View
                        style={tw('w-3 h-3 bg-blue-500 rounded-full m-0.5')}></View>
                )}
            </View>
            <Text style={tw('text-lg ml-2 mt-1')}>{label}</Text>
        </TouchableOpacity>
    );
};

export default RadioButton;