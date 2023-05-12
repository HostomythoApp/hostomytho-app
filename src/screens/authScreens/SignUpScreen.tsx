import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import RadioButton from 'components/RadioButton';
import { signUpUser } from "services/api/user";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "services/auth/AuthContext";
import { RootStackNavigationProp } from "navigation/Types";
import { User } from "models/User";
import { useUser } from "services/auth/UserContext";

const SignUpScreen = () => {

    const [selectedValue, setSelectedValue] = useState('option1');

    const options = [
        { key: 'option1', label: 'Je suis médecin ou étudiant', value: 'medecin' },
        { key: 'option2', label: 'Je ne suis ni médecin ni étudiant', value: 'autre' },
        { key: 'option3', label: 'Je ne souhaite pas répondre', value: 'etudiant' },
    ];

    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [doctor, setDoctor] = useState('medecin');
    const navigation = useNavigation<RootStackNavigationProp<"Main">>();
    const { storeToken } = useAuth();
    const { setUser } = useUser();

    const submit = () => {
        if (username.trim() === "" || password.trim() === "") {
            alert("Erreur, Veuillez remplir tous les champs");
        } else {
            if (password !== password2) {
                alert("Mots de passe différents");
            } else {
                if (password.length < 6) {
                    alert("Mot de passe trop court");
                } else {
                    const newUser: Partial<User> = {
                        username,
                        password,
                        email,
                        status: doctor,
                    };
                    signUpUser(newUser)
                        .then(async (response: any) => {
                            if (response.status === 200 || response.status === 201) {
                                alert("Inscription réussie !");
                                const handleSuccess = async (token: string) => {
                                    await storeToken(token);
                                    navigation.navigate("Main");
                                };
                                const token = response.data.token;
                                setUser(response.data.user);
                                await handleSuccess(token);
                            } else {
                                console.log(`Erreur lors de l'inscription : ${response.statusText}`);
                            }
                        })
                        .catch((error: any) => {
                            console.log(`Erreur lors de l'inscription : ${error.message}`);
                        });
                }
            }
        }
    };

    const generatePseudo = () => {
        const detectiveNames = ["Sherbloque", "Hermule", "Thilip", "Fancy", "Colombe", "Adrianne",
            "Maison", "Gris", "Chapardé", "Banor", "Masloy", "Médith", "Feur", "Broutarde", "Prevenche", "Violette", "Olive", "Rose"];

        const keywords = ["le vaillant", "l'intrépide", "l'observeur", "le minutieux", "le pro", "le fou", "le poète", "le maladroit", "l'hyperactif"];

        const name = detectiveNames[Math.floor(Math.random() * detectiveNames.length)];

        const keyword = keywords[Math.floor(Math.random() * keywords.length)];

        setUsername(`${name} ${keyword}`);

    }

    return (
        <View style={tw("flex-1 justify-center items-center")}>

            <MainInput text={'Pseudo'} value={username} setter={setUsername} hide={false} onSubmitEditing={submit} />

            <FunctionButton text={"Générer un pseudo"} func={generatePseudo} />

            <MainInput text={"Mot de passe"} value={password} setter={setPassword} hide={true} onSubmitEditing={submit} />

            <MainInput text={"Retaper votre mot de passe"} value={password2} setter={setPassword2} hide={true} onSubmitEditing={submit} />

            <MainInput text={"email (facultatif)"} value={email} setter={setEmail} hide={false} onSubmitEditing={submit} />

            <View style={tw('inline-block p-4')}>
                {options.map((option) => (
                    <RadioButton
                        key={option.key}
                        label={option.label}
                        selected={selectedValue === option.key}
                        onPress={() => {
                            setSelectedValue(option.key)
                            setDoctor(option.value)
                        }}
                    />
                ))}
            </View>

            <FunctionButton text={"Inscription"} func={submit} />
        </View>
    );
};

export default SignUpScreen;