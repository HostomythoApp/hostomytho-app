import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, ImageBackground } from "react-native";
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
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Image, TouchableOpacity } from 'react-native';
import { detectiveNamesMale, detectiveNamesFemale, keywordsMale, keywordsFemale } from 'utils/nameLists';

const SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Ce champ est obligatoire.'),
    password: Yup.string().min(6, 'Mot de passe trop court. Celui-ci doit contenir 6 caractères minimum.').required('Ce champ est obligatoire.'),
    // @ts-ignore
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas').required('Ce champ est obligatoire.'),
    email: Yup.string().email('Email non valide'),
});
const SignUpScreen = () => {

    const options = [
        { key: 'option1', label: 'Je suis médecin ou étudiant en médecine', value: 'medecin' },
        { key: 'option2', label: 'Je ne suis ni l\'un ni l\'autre', value: 'autre' },
        { key: 'option3', label: 'Je ne souhaite pas répondre', value: 'inconnu' },
    ];

    const [gender, setGender] = useState('homme');

    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation<RootStackNavigationProp<"TableauDeBord">>();
    const { storeToken } = useAuth();
    const { setUser } = useUser();

    const screenWidth = Dimensions.get('window').width;
    const isMobile = screenWidth < 748;

    const inputWidth = isMobile ? '100%' : '80%';
    const man_1 = require('images/character/man_1.png');
    const man_2 = require('images/character/man_2.png');
    const man_3 = require('images/character/man_3.png');
    const woman_1 = require('images/character/woman_1.png');
    const woman_2 = require('images/character/woman_2.png');
    const woman_3 = require('images/character/woman_3.png');
    const [currentIndex, setCurrentIndex] = useState(0);

    const charactersArray = [man_1, woman_2, man_2, woman_3, woman_1, man_3];

    const submit = (values: Partial<User>) => {
        setErrorMessage('');
        const { gender, color_skin } = determineCharacterDetails(currentIndex);

        const newUser: Partial<User> = {
            username: values.username,
            password: values.password,
            email: values.email,
            status: values.status,
            gender: gender,
            color_skin: color_skin
        };

        signUpUser(newUser)
            .then(async (response: any) => {
                if (response.status === 200 || response.status === 201) {
                    const handleSuccess = async (token: string) => {
                        await storeToken(token);
                        navigation.navigate("Profil");
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
    };

    const changeCharacter = (direction: string) => {
        let newIndex = currentIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % charactersArray.length;
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + charactersArray.length) % charactersArray.length;
        }

        setCurrentIndex(newIndex);
    };

    const determineCharacterDetails = (index: number) => {
        let gender = '';
        let color_skin = '';

        switch (index) {
            case 0:
                gender = 'homme';
                color_skin = 'medium';
                break;
            case 1:
                gender = 'femme';
                color_skin = 'dark';
                break;
            case 2:
                gender = 'homme';
                color_skin = 'dark';
                break;
            case 3:
                gender = 'femme';
                color_skin = 'clear';
                break;
            case 4:
                gender = 'femme';
                color_skin = 'medium';
                break;
            case 5:
                gender = 'homme';
                color_skin = 'clear';
                break;
            default:
                break;
        }

        return { gender, color_skin };
    };


    const generatePseudo = (setFieldValue: any) => {
        const genderType = gender === 'homme' ? 'male' : 'female';
        const name = (genderType === 'male')
            ? detectiveNamesMale[Math.floor(Math.random() * detectiveNamesMale.length)]
            : detectiveNamesFemale[Math.floor(Math.random() * detectiveNamesFemale.length)];

        const keyword = (genderType === 'male')
            ? keywordsMale[Math.floor(Math.random() * keywordsMale.length)]
            : keywordsFemale[Math.floor(Math.random() * keywordsFemale.length)];

        setUsername(`${name} ${keyword}`);
        setFieldValue('username', `${name} ${keyword}`);
    }


    return (
        <ImageBackground source={require('images/bg_bureau.webp')} style={tw('absolute bottom-0 left-0 w-full h-full')}>
            <View style={tw("flex-1 items-center")}>
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                    <CustomHeaderEmpty title="Inscription" backgroundColor="bg-whiteTransparent" />
                    <View style={tw('mx-auto w-full max-w-[740px] px-4 pt-20 items-center')}>
                        <View style={{ ...tw('mb-2 p-8 m-4 items-center rounded-lg w-full'), backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                            <Formik
                                initialValues={{ username: '', password: '', password2: '', email: '', status: 'medecin', gender: 'homme' }}
                                validationSchema={SignUpSchema}
                                onSubmit={(values) => {
                                    submit(values)
                                }}
                            >
                                {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (

                                    <View style={tw('w-full px-2 max-w-5xl justify-center items-center')}>

                                        <Text> {errorMessage && <Text style={tw("text-red-500")}>{errorMessage}</Text>}</Text>

                                        <MainInput
                                            text={'Pseudo'}
                                            value={values.username}
                                            setter={handleChange('username')}
                                            hide={false}
                                            onSubmitEditing={handleSubmit}
                                            isError={touched.username && !!errors.username}
                                            width={inputWidth}
                                            minWidth={300}
                                            maxWidth={600}
                                        />
                                        {touched.username && errors.username && <Text style={tw("text-red-500")}>{errors.username}</Text>}

                                        <FunctionButton
                                            text={"Générer un pseudo"}
                                            func={() => generatePseudo(setFieldValue)}
                                        />

                                        <View style={tw('p-4 w-auto')}>

                                            <Text style={tw('text-lg mb-2 font-primary')}>Choisissez votre personnage</Text>

                                            <View style={tw('flex-row items-center self-center')}>
                                                <TouchableOpacity onPress={() => changeCharacter('prev')}>
                                                    <Text style={tw('text-2xl')}>←</Text>
                                                </TouchableOpacity>

                                                <Image source={charactersArray[currentIndex]} resizeMode="contain" style={tw('w-36 h-52')} />

                                                <TouchableOpacity onPress={() => changeCharacter('next')}>
                                                    <Text style={tw('text-2xl')}>→</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>

                                        <MainInput
                                            text={"Mot de passe"}
                                            value={values.password}
                                            setter={handleChange('password')}
                                            onSubmitEditing={handleSubmit}
                                            isError={touched.password && !!errors.password}
                                            width={inputWidth}
                                            maxWidth={600}
                                            hide={true}
                                        />
                                        {touched.password && errors.password && <Text style={tw("text-red-500")}>{errors.password}</Text>}

                                        <MainInput
                                            text={"Retaper votre mot de passe"}
                                            value={values.password2}
                                            setter={handleChange('password2')}
                                            onSubmitEditing={handleSubmit}
                                            isError={touched.password2 && !!errors.password2}
                                            width={inputWidth}
                                            maxWidth={600}
                                            hide={true}
                                        />
                                        {touched.password2 && errors.password2 && <Text style={tw("text-red-500")}>{errors.password2}</Text>}
                                        <MainInput
                                            text={"email (facultatif)"}
                                            value={values.email}
                                            setter={handleChange('email')}
                                            onSubmitEditing={handleSubmit}
                                            width={inputWidth}
                                            maxWidth={600}
                                            hide={false}
                                        />
                                        <Text style={tw('font-primary max-w-[540px] text-gray-700 mt-2 text-center')}>
                                            Si votre adresse e-mail n'est pas valide ou si vous n'en mettez pas, nous ne serons pas en mesure de prendre contact avec vous, ni de réinitialiser votre mot de passe. Nous ne la transmettrons pas (à des fins commerciales ou autre) et ne l'utiliserons que pour le jeu.
                                        </Text>
                                        <View style={tw('p-4 mt-2 w-auto')}>
                                            {options.map((option) => (
                                                <RadioButton
                                                    key={option.key}
                                                    label={option.label}
                                                    selected={values.status === option.value}
                                                    onPress={() => handleChange('status')(option.value)}
                                                />
                                            ))}
                                        </View>
                                        <FunctionButton text={"Inscription"} func={handleSubmit} />
                                    </View>
                                )}

                            </Formik>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default SignUpScreen;