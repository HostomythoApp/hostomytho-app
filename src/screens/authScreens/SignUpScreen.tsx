import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import RadioButton from 'components/RadioButton';
import { signUpUser } from "services/api/user";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "services/context/AuthContext";
import { RootStackNavigationProp } from "navigation/Types";
import { User } from "models/User";
import { useUser } from "services/context/UserContext";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const SignUpScreen = () => {

    const [selectedValue, setSelectedValue] = useState('option1');
// TODO Ajouter select du sexe
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
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation<RootStackNavigationProp<"MainBoard">>();
    const { storeToken } = useAuth();
    const { setUser } = useUser();

    const screenWidth = Dimensions.get('window').width;
    const isMobile = screenWidth < 768;

    const inputWidth = isMobile ? '100%' : '70%';
    const buttonWidth = isMobile ? '100%' : '60%';

    const submit = () => {
        setUsernameError(false);
        setPasswordError(false);
        setPassword2Error(false);
        setErrorMessage('');

        if (username.trim() === "" || password.trim() === "" || password2.trim() === "") {
            if (username.trim() === "") setUsernameError(true);
            if (password.trim() === "") setPasswordError(true);
            if (password2.trim() === "") setPassword2Error(true);
            setErrorMessage("Veuillez remplir tous les champs");
        } else {
            if (password !== password2) {
                setPasswordError(true);
                setPassword2Error(true);
                setErrorMessage("Les mots de passe ne correspondent pas");
            } else {
                if (password.length < 6) {
                    setPasswordError(true);
                    setErrorMessage("Mot de passe trop court. Celui-ci doit contenir 6 caractères minimum.");
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
                                    navigation.navigate("MainBoard");
                                };
                                const token = response.data.token;
                                setUser(response.data.user);
                                await handleSuccess(token);
                            } else {
                                console.log(`Erreur lors de l'inscription : ${response.statusText}`);
                            }
                        })
                        .catch((error: any) => {
                            if (error.response && error.response.status === 409) {
                                setErrorMessage("Ce nom d'utilisateur est déjà pris.");
                            } else {
                                console.log(`Erreur lors de l'inscription : ${error.message}`);
                            }
                        });
                }
            }
        }
    };

    const generatePseudo = () => {
        const detectiveNamesMale = ["Sherbloque", "Hermule", "Thilip", "Fancy", "Colombe", "Adrianne",
            "Maison", "Gris", "Chapardé", "Banor", "Masloy", "Médith", "Feur", "Broutarde",
            "Prevenche", "Violette", "Olive", "Rose", "Lupin", "Marlo", "Poirot",
            "Gadjo", "Magret", "Columbo", "Spade", "Holmes", "Lestrade", "Marple", "Wolfe",
            "Vance", "Hercule"];

        const detectiveNamesFemale = ["Sherlocke", "Hermula", "Philippa", "Fancy", "Colomba", "Adrianne",
            "Maisie", "Griselda", "Chaparde", "Banora", "Masloy", "Meredith", "Fleur", "Broutarde",
            "Prevenche", "Violette", "Oliva", "Rosa", "Noire", "Lupina", "Marla", "Poirot",
            "Gadja", "Magret", "Columba", "Spade", "Holmes", "Lestrade", "Marple", "Wolfe",
            "Vance", "Hercula"];

        const keywordsMale = ["le vaillant", "l'intrépide", "l'observeur", "le minutieux", "le pro",
            "le fou", "le poète", "le maladroit", "l'hyperactif", "l'énigmatique", "le perspicace",
            "le sagace", "l'astucieux", "l'intelligent", "le rusé", "le téméraire", "le courageux",
            "l'imperturbable", "le ténébreux", "le déducteur", "l'insaisissable", "l'ombrageux",
            "l'incorruptible", "le résolu", "le déterminé", "l'implacable", "le tenace", "le patient",
            "le subtil", "l'infaillible", "le retors", "le vigilant", "le pénétrant", "l'audacieux"];

        const keywordsFemale = ["la vaillante", "l'intrépide", "l'observeuse", "la minutieuse", "la pro",
            "la folle", "la poétesse", "la maladroite", "l'hyperactive", "l'énigmatique", "la perspicace",
            "la sagace", "l'astucieuse", "l'intelligente", "la rusée", "la téméraire", "la courageuse",
            "l'imperturbable", "la ténébreuse", "la déductrice", "l'insaisissable", "l'ombrageuse",
            "l'incorruptible", "la résolue", "la déterminée", "l'implacable", "la tenace", "la patiente",
            "la subtile", "l'infaillible", "la retorse", "la vigilante", "la pénétrante", "l'audacieuse"];
        // TODO liste de noms débiles
        const gender = Math.random() > 0.5 ? 'male' : 'female';

        const name = (gender === 'male')
            ? detectiveNamesMale[Math.floor(Math.random() * detectiveNamesMale.length)]
            : detectiveNamesFemale[Math.floor(Math.random() * detectiveNamesFemale.length)];

        const keyword = (gender === 'male')
            ? keywordsMale[Math.floor(Math.random() * keywordsMale.length)]
            : keywordsFemale[Math.floor(Math.random() * keywordsFemale.length)];

        setUsername(`${name} ${keyword}`);
    }

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Inscription" />
                <View style={tw('w-full pt-20 px-2 max-w-5xl justify-center items-center')}>
                    <MainInput
                        text={'Pseudo'}
                        value={username}
                        setter={setUsername}
                        hide={false}
                        onSubmitEditing={submit}
                        isError={usernameError}
                        width={inputWidth}
                        minWidth={300}
                        maxWidth={600}
                    />
                    {usernameError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}
                    {/* <FunctionButton text={"Générer un pseudo"} func={generatePseudo} width={inputWidth} /> */}

                    <FunctionButton
                        text={"Générer un pseudo"}
                        func={generatePseudo}
                    />

                    <MainInput text={"Mot de passe"} value={password} setter={setPassword} hide={true} onSubmitEditing={submit} isError={passwordError} width={inputWidth} maxWidth={600} />
                    {passwordError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}

                    <MainInput text={"Retaper votre mot de passe"} value={password2} setter={setPassword2} hide={true} onSubmitEditing={submit} isError={password2Error} width={inputWidth} maxWidth={600} />
                    {password2Error && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}

                    <MainInput text={"email (facultatif)"} value={email} setter={setEmail} hide={false} onSubmitEditing={submit} width={inputWidth} maxWidth={600} />

                    <View style={tw('p-4 w-auto')}>
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
                    <Text>
                        {errorMessage && <Text style={tw("text-red-500")}>{errorMessage}</Text>}
                    </Text>
                    <FunctionButton text={"Inscription"} func={submit}  />
                </View>
            </ScrollView>
        </View>
    );
};

export default SignUpScreen;