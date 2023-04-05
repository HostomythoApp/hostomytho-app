import React, {useState} from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import MainInput from "../components/MainInput";
import data from "data/fakeUserData.js";
import FunctionButton from "../components/FunctionButton";
import {useNavigation} from "@react-navigation/native";

const LoginScreen = (props: any) => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const recherche = (login: string, mdp: string) => {
        for (let i = 0; i < data.member.length; i++) {
            if (data.member[i].login.toLowerCase() === login.toLowerCase() && data.member[i].password === mdp) {
                return data.member[i].id;
            }
        }
        return -1;
    }
    const submit = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Erreur, Veuillez remplir tous les champs');
        } else {
            let idlog = recherche(username,password);
            alert(idlog)
            if (idlog === -1) {
                alert('Erreur, Veuillez vérifier vos identifiants');
            } else {
                alert("ok")
                props.onLogin(0);
                const navigation = useNavigation();
                navigation.goBack();
            }
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
