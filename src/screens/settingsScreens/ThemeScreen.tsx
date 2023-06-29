import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import ColorCircles from "components/ColorCircles";
import MainTitle from "components/MainTitle";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const ThemeScreen = ({ }) => {
    const tw = useTailwind();
    const [backgroundColor, setBackgroundColor] = useState('white');

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const colors = ['red', 'blue', 'green', 'yellow', 'white', 'purple', 'orange', 'pink'];

    // return (
    //     <View style={[tw('flex-1 justify-center items-center'), { backgroundColor }]}>
    //         <MainTitle title={"Thème"} />
    //         {/* @ts-ignore */}
    //         <ColorCircles colors={colors} func={handleBackgroundColorChange} />
    //     </View>
    // );

    return (
        <View style={tw("flex-1 items-center")}>
          <ScrollView style={tw('w-full')}>
            <CustomHeaderEmpty title="Paramètres" />
            <Text>En dev</Text>
    
          </ScrollView>
        </View>);
};

export default ThemeScreen;
