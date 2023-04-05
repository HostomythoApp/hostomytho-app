import React, {useState} from "react";
import {Alert, Button, Text, TextInput, View} from "react-native";
import {useTailwind} from "tailwind-rn";
import MainInput from "../components/MainInput";
import FunctionButton from "../components/FunctionButton";

const LoginScreen = ({}) => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const submit = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Erreur, Veuillez remplir tous les champs');
        } else {
            alert(`Nom : ${username}\nPassword : ${password}`);
        }
    };

    return (
        <View style={tw("flex-1 justify-center items-center")}>

            <MainInput text={"Pseudo"} setter={setUsername} hide={false}/>

            <MainInput text={"Mot de passe"} setter={setPassword} hide={true}/>

            <FunctionButton text={"Connexion"} func={submit}/>
        </View>
    );
};

export default LoginScreen;
