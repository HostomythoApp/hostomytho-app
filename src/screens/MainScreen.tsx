import React, {useState} from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import data from "data/fakeUserData.js";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";

const MainScreen = ({}) => {
    const tw = useTailwind();

    //sera a -1 lorsque la connexion marchera et que l'utilisateur sera connecté
    const [idMember, setIdMember] = useState(1);

    const login = (userDate:number) => {
        setIdMember(userDate);
    }


    if (idMember === -1) {
    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Bienvenu sur HostoMytho"}/>
            <View>
                <PrimaryButton title="Jouer" destination="PausibilityGame"/>
                <PrimaryButton title="Connexion" destination="Login" onLogin={login}/>
                <PrimaryButton title="Inscription" destination="SignIn"/>
            </View>
        </View>);
    } else {
        return (
            <View style={tw("flex-1 justify-center items-center")}>
                <MainTitle title={"Bonjour " + data.member[idMember].login}/>
                <View>
                    <PrimaryButton title="Jouer" destination="PausibilityGame"/>
                    <PrimaryButton title="Profil" destination="Profile"/>
                    <PrimaryButton title="Paramètre" destination="Settings"/>
                </View>
            </View>);
    }
};

export default MainScreen;
