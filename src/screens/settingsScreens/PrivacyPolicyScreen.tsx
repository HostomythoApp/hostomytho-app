import React from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import MainTitle from "components/MainTitle";

const PrivacyPolicysScreen = ({}) => {
    const tw = useTailwind();

    return (
        <View style={tw('text-black')}
        >
            <MainTitle title={"Politique de confidentialité"}/>
        </View>
    );
};

export default PrivacyPolicysScreen;
