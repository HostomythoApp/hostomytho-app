import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTailwind} from "tailwind-rn";

const ColorCircles =
    ({
         colors, func,
     }: {
        colors: [], func: (color: string) => void,
    }) => {
        {
            const tw = useTailwind();

            return (
                <View style={tw('flex flex-row justify-center items-center mt-2')}>
                    {colors.map((color: string, index: number) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => func(color)}
                            style={[tw('w-10 h-10 rounded m-1 border border-1'), {backgroundColor: color}]}
                        />
                    ))}
                </View>
            );
        }

    };

export default ColorCircles;
