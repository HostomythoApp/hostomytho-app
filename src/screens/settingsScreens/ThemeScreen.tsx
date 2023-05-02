import React, {useState} from "react";
import {Text, View} from "react-native";
import {useTailwind} from "tailwind-rn";
import ColorCircles from "components/ColorCircles";
import MainTitle from "components/MainTitle";

const ThemeScreen = ({}) => {
    const tw = useTailwind();
    const [backgroundColor, setBackgroundColor] = useState('white');

    const handleBackgroundColorChange = (color:string) => {
        setBackgroundColor(color);
    };

    const colors = ['red', 'blue', 'green', 'yellow','white', 'purple', 'orange', 'pink'];

    return (
        <View style={[tw('flex-1 justify-center items-center'), { backgroundColor }]}>
            <MainTitle title={"Thème"} />
            <ColorCircles colors={colors} func={handleBackgroundColorChange} />
        </View>
    );
};

export default ThemeScreen;
