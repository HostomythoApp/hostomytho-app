import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "../components/MainInput";
import FunctionButton from "../components/FunctionButton";
import RadioButton from 'components/RadioButton';



// function RadioButton(props: { value: string }) {
//     return null;
// }

const SignIn = () => {

    const [selectedValue, setSelectedValue] = useState('option1');

    const options = [
        { key:'option1',label: 'Je suis médecin ou étudiant', value: true },
        { key:'option2',label: 'Je ne suis ni médecin ni étudiant', value: false },
        { key:'option3',label: 'Je ne souhaite pas répondre', value: false },
    ];

    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [doctor, setDoctor] = useState(true);
    const submit = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Erreur, Veuillez remplir tous les champs');
        } else {
            if (password !== password2) {
                alert('Mots de passe différents');
            } else {
                if (password.length < 6) {
                    alert('Mot de passe trop court');
                } else {
                    alert(`Nom : ${username}\nPassword : ${password}\nDoctor : ${doctor}`);
                }
            }
        }
    };

    const generatePseudo = () => {
        const detectiveNames = ["Sherbloque", "Hermule", "Thilip", "Fancy", "Colombe", "Adrianne",
            "Maison", "Gris", "Chapardé", "Banor", "Masloy", "Médith", "Feur",];

        const keywords = ["le vaillant", "l'intrépide", "l'observeur", "le minutieux", "le pro", "le fou", "le poète"];

        const name = detectiveNames[Math.floor(Math.random() * detectiveNames.length)];

        const keyword = keywords[Math.floor(Math.random() * keywords.length)];

        setUsername(`${name} ${keyword}`);

    }

    return (
        <View style={tw("flex-1 justify-center items-center")}>

            <MainInput text={'Pseudo'} value={username} setter={setUsername} hide={false} />

            <FunctionButton text={"Générer un pseudo"} func={generatePseudo} />

            <MainInput text={"Mot de passe"} value={password} setter={setPassword} hide={true} />

            <MainInput text={"Retaper votre mot de passe"} value={password2} setter={setPassword2} hide={true} />

            <MainInput text={"email (facultatif)"} value={email} setter={setEmail} hide={false} />

            <View style={tw('inline-block p-4')}>
                {options.map((option) => (
                    <RadioButton
                        key={option.key}
                        label={option.label}
                        selected={selectedValue === option.key}
                        onPress={() => {setSelectedValue(option.key)
                                setDoctor(option.value)
                        }
                    }
                    />
                ))}
            </View>

            <FunctionButton text={"Inscription"} func={submit} />
        </View>
    );
};

export default SignIn;
