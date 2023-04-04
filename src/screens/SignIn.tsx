import React, {useState} from "react";
import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useTailwind} from "tailwind-rn";
import MainInput from "../components/MainInput";
import FunctionButton from "../components/FunctionButton";


function RadioButton(props: { value: string }) {
    return null;
}

const SignIn = ({}) => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [doctor, setDoctor] = useState(false);
    const submit = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Erreur, Veuillez remplir tous les champs');
        } else {
            if (password !== password2) {
                alert('Mots de passe différents');
            }else {
                if (password.length < 6) {
                    alert('Mot de passe trop court');
                }else {
                    alert(`Nom : ${username}\nPassword : ${password}`);
                }
            }
        }
    };

    const generatePseudo = () => {
        const pseudo = "Pseudo";
        setUsername(pseudo);
    }

    return (
        <View style={tw("flex-1 justify-center items-center")}>

            <MainInput text={"Pseudo"} value={username} setter={setUsername} hide={false}/>

            <FunctionButton text={"Générer un pseudo"} func={generatePseudo}/>

            <MainInput text={"Mot de passe"} value={password} setter={setPassword} hide={true}/>

            <MainInput text={"Retaper votre mot de passe"} value={password2} setter={setPassword2} hide={true}/>

            <MainInput text={"email (facultatif)"} value={email} setter={setEmail} hide={false}/>

            <FunctionButton text={"Inscription"} func={submit}/>
        </View>
    );
};

export default SignIn;
