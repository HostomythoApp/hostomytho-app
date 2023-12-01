import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { catchCriminal } from 'services/api/criminals';
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import PrimaryButton from "components/PrimaryButton";
import CustomModal from "components/modals/CustomModal";


export interface Criminal {
    name: string;
    description: string;
    imageId: number;
}

const InvestigationScreen = () => {
    const tw = useTailwind();
    const { user, incrementCatchProbability, resetCatchProbability,updateUserStats } = useUser();
    const [investigationProgress, setInvestigationProgress] = useState<number>(0);
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [arrestSuccess, setArrestSuccess] = useState<boolean | null>(null);
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
    const [modalVisible, setModalVisible] = useState(false);
    const [arrestDescription, setArrestDescription] = useState<string>('');

    useEffect(() => {
        if (user) {
            setInvestigationProgress(user.catch_probability);
            // setInvestigationProgress(100);
        }
    }, [user?.catch_probability]);


    const handleArrestAttempt = async () => {
        const randomNumber = Math.floor(Math.random() * 101);
        if (randomNumber <= investigationProgress) {
            setArrestSuccess(true);
            if (user) {
                resetCatchProbability(user.id);
                const catchResult = await catchCriminal(user.id);
                if (catchResult.success) {
                    setArrestDescription(catchResult.catchEntry.descriptionArrest);
                    if (catchResult.catchEntry.allCriminalsCaught) {
                        setArrestDescription("Tous les criminels ont été arrêtés. Vous gagnez 5 points supplémentaires.");
                        updateUserStats(5, 0, 0);
                    }
                } else {
                    console.error('Failed to catch the criminal:', catchResult.error);
                }
            }
        } else {
            setArrestSuccess(false);
            incrementCatchProbability(-15);
        }
        setModalVisible(false);
        setResultModalVisible(true);
    };

    const NoConnectedView = () => (
        <View style={tw('flex-1 justify-center items-center p-6 pt-0')}>
            <Text style={tw('text-xl text-white text-center mb-4 font-primary')}>
                Créez un compte pour commencer l'enquête
            </Text>
            <View style={tw('w-80')}>
                <PrimaryButton title="Créer un compte" destination="Login" />
            </View>
        </View>
    );

    return (
        <View style={tw('flex-1')}>
            <ImageBackground source={require('images/dark-background.webp')} style={tw('flex-1')} resizeMode="cover">
                <SafeAreaView style={tw('flex-1')}>
                    <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')} >
                        <CustomHeaderEmpty title="Enquête en cours" backgroundColor="bg-whiteTransparent" />

                        <View style={tw('flex-1 p-2 pt-14 justify-center items-center')}>
                            <Image
                                source={require('images/unknown3.jpeg')}
                                style={tw('w-64 h-64 -mb-4')}
                                resizeMode="contain"
                            />
                            {user ? (
                                <View>
                                    <Text style={tw('text-center font-bold font-primary text-lg text-white')}>Taux de certitude par rapport au criminel: {investigationProgress}%</Text>
                                    <View style={tw('bg-gray-300 h-4 rounded mt-2 w-96')}>
                                        <View
                                            style={[
                                                tw('bg-primary h-full rounded-l'),
                                                { width: `${investigationProgress}%` },
                                            ]}
                                        ></View>
                                    </View>

                                    <TouchableOpacity
                                        style={tw('bg-primary py-3 px-6 rounded mt-4')}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Text style={tw('text-white font-bold text-center font-primary')}>Tenter l'arrestation</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <NoConnectedView />
                            )}

                        </View>

                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
            <CustomModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <View >
                    <Text style={tw('text-lg font-primary')}>Etes-vous sûr de vouloir tenter l'arrestation?</Text>
                    <Text style={tw('text-lg font-primary')}>Si celle-ci échoue, votre taux de certitude baissera de 15%.</Text>
                    <TouchableOpacity onPress={handleArrestAttempt} style={tw('mt-5 bg-primary py-3 px-6 rounded self-center')}>
                        <Text style={tw('text-white font-bold text-center font-primary')}>Je suis sûr de moi, je me lance</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>

            <CustomModal isVisible={resultModalVisible} onClose={() => setResultModalVisible(false)}>
                {arrestSuccess === true ? (
                    <>
                        <Text style={tw('font-primary text-lg')}>
                            {arrestDescription}
                            {"\n\n"}
                            Félicitations, vous avez eu du flair et votre enquête a mené à la bonne piste !
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setResultModalVisible(false);
                                setTimeout(() => {
                                    navigation.navigate('Criminels');
                                }, 300);
                            }}
                            style={tw('mt-5 bg-primary py-3 px-6 rounded self-center')}
                        >
                            <Text style={tw('text-white font-bold text-center')}>Voir le criminel</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={tw('font-primary text-lg')}>
                            Il semblerait que la personne que vous avez arrêtée n'était pas la bonne. C'était une fausse piste, mais votre enquête continue !
                        </Text>
                        {/* TODO Mettre des histoires différentes dans la bdd */}
                        {/* <Text style={tw('font-primary text-lg')}>
                            La personne que vous arrêtez s'appelle Kévin Bontrain. Il est menuisier, construit de belles armoires, et ne ferait pas de mal à une mouche. Ce n'est donc malheureusement pas le criminel.
                            {"\n\n"}
                            Votre enquête continue !
                        </Text> */}
                    </>
                )}
            </CustomModal>
        </View>
    );
};

export default InvestigationScreen;
