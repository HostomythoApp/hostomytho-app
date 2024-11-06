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
import { Achievement } from "models/Achievement";
import HelpButton from "components/button/HelpButton";

export interface Criminal {
    name: string;
    description: string;
    imageId: number;
}

const InvestigationScreen = () => {
    const tw = useTailwind();
    const { user, resetCatchProbability, unlockAchievementModal } = useUser();
    const [investigationProgress, setInvestigationProgress] = useState<number>(0);
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [arrestSuccess, setArrestSuccess] = useState<boolean | null>(null);
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
    const [modalVisible, setModalVisible] = useState(false);
    const [arrestDescription, setArrestDescription] = useState<string>('');
    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
    const [isTrustModalVisible, setIsTrustModalVisible] = useState(false);
    const window = Dimensions.get('window');
    const isMobile = window.width < 960;
    const [isLoading, setIsLoading] = useState(true);
    const [userNeedsUpdate, setUserNeedsUpdate] = useState(true);
    const { incrementTutorialProgress } = useUser();

    useEffect(() => {
        if (user) {
            const catchProbability = parseFloat(user.catch_probability);

            if (!isNaN(catchProbability)) {
                const roundedCatchProbability = catchProbability.toFixed(0);

                setInvestigationProgress(parseFloat(roundedCatchProbability));
            } else {
                console.error("catch_probability n'est pas un nombre valide :", user.catch_probability);
            }
        }
    }, [user?.catch_probability]);

    useEffect(() => {

        if (user?.tutorial_progress == 10) {
            setIsHelpModalVisible(true);
            // @ts-ignore
        } else if (user?.trust_index <= 30) {
            setIsTrustModalVisible(true);
        }
    }, []);

    const handleCloseModal = () => {
        if (user?.tutorial_progress == 10) {
            incrementTutorialProgress();
        }
        setIsHelpModalVisible(false)
    };

    const handleCloseTrustModal = () => {
        if (user?.tutorial_progress == 10) {
            incrementTutorialProgress();
        }
        setIsTrustModalVisible(false)
    };

    const handleArrestAttempt = async () => {
        if (user) {
            const catchResult = await catchCriminal(user.id);

            if (catchResult.catchEntry.success) {
                setArrestSuccess(true);
                resetCatchProbability(user.id);

                // Mettre à jour la probabilité d'arrestation affichée à 0
                setInvestigationProgress(catchResult.catchEntry.newCatchProbability);
                if (catchResult.catchEntry.allCriminalsCaught) {
                    setArrestDescription("Tous les criminels ont été arrêtés pour le moment. Vous gagnez " + catchResult.catchEntry.pointsAdded + " points supplémentaires.");

                } else {
                    // Affiche popup haut-faits s'il y en a de nouveaux
                    if (catchResult.catchEntry.newAchievements && catchResult.catchEntry.newAchievements.length > 0) {
                        catchResult.catchEntry.newAchievements.forEach((achievement: Achievement) => {
                            setTimeout(() => {
                                unlockAchievementModal(achievement);
                            }, 1000);
                        });
                    }

                    setArrestDescription(catchResult.catchEntry.descriptionArrest);

                }

            } else {
                setArrestSuccess(false);
                setInvestigationProgress(catchResult.catchEntry.newCatchProbability);
                setArrestDescription(catchResult.catchEntry.message);
            }

            setModalVisible(false);
            setResultModalVisible(true);
        }
    };


    const showHelpModal = () => {
        setIsHelpModalVisible(true)
    };

    const NoConnectedView = () => (
        <View>
            <View style={tw('flex-1 justify-center items-center p-6 pt-0')}>
                <Text style={tw('text-xl lg:text-2xl text-white text-center mb-4 font-primary')}>
                    Créez un compte pour commencer l'enquête
                </Text>
                <View style={tw('w-80')}>
                    <PrimaryButton title="Créer un compte" destination="Login" />
                    <PrimaryButton title="Se connecter" backgroundColor="bg-secondary" destination="Connexion" />
                </View>
            </View>
        </View>
    );

    return (
        <ImageBackground source={require('images/bg_corridor_dark.jpg')} style={tw('flex-1')} resizeMode="cover">
            <SafeAreaView style={tw('flex-1')}>
                <SafeAreaView style={tw('flex-1')}>
                    <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')} >
                        <CustomHeaderEmpty title="Enquête en cours" backgroundColor="bg-whiteTransparent" />
                        <View style={[tw('flex-row justify-end w-full'), isMobile ? tw('mt-[56px]') : tw('mt-[68px]')]}>
                            <HelpButton onHelpPress={showHelpModal} />
                        </View>
                        <View style={[tw('flex-1 p-2 justify-center items-center -mt-8 h-28')]}>

                            {user ? (
                                <View style={tw('w-full items-center')}
                                >
                                    <Image
                                        source={require('images/unknown3.jpeg')}
                                        style={[tw('w-64 h-44')]}
                                        resizeMode="contain"
                                    />
                                    <Text style={tw('text-center font-primary text-lg text-white')}>Taux de certitude par rapport au criminel: {investigationProgress}%</Text>
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
                                        <Text style={tw('text-white text-center font-primary md:text-lg')}>Tenter l'arrestation</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <NoConnectedView />
                            )}

                        </View>

                    </ScrollView>
                </SafeAreaView>
                <CustomModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                >
                    <View >
                        <Text style={tw('text-lg font-primary text-center ')}>Etes-vous sûr de vouloir tenter l'arrestation?</Text>
                        <Text style={tw('text-lg font-primary text-center ')}>Si celle-ci échoue, votre taux de certitude baissera de 15%.</Text>
                        <TouchableOpacity onPress={handleArrestAttempt} style={tw('mt-5 bg-primary py-3 px-6 rounded self-center')}>
                            <Text style={tw('text-white font-bold text-center font-primary md:text-lg')}>Je suis sûr de moi, je me lance</Text>
                        </TouchableOpacity>
                    </View>
                </CustomModal>

                <CustomModal isVisible={resultModalVisible} onClose={() => setResultModalVisible(false)}>
                    {arrestSuccess === true ? (
                        <>
                            <Text style={tw('font-primary text-lg')}>
                                {arrestDescription}
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
                                <Text style={tw('text-white font-primary text-lg text-center')}>Voir le criminel</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={tw('font-primary text-lg')}>
                                Il semblerait que la personne que vous avez arrêtée n'était pas la bonne. C'était une fausse piste, mais votre enquête continue !
                            </Text>
                        </>
                    )}
                </CustomModal>

                <CustomModal
                    isVisible={isHelpModalVisible}
                    onClose={() => handleCloseModal()}
                >
                    <View style={tw('h-56')}>
                        <ScrollView style={[tw('flex-1'), { maxHeight: window.height * 0.8 }]}>
                            <View style={tw('p-3')}>
                                <Text style={tw('font-primary text-base md:text-lg')}>
                                    Ici, vous pouvez tenter d'arrêter des criminels.  {"\n"}
                                    Le taux de certitude correspond au pourcentage de chance de réussir. Il augmente en traitant des textes dans les mini-jeux.
                                    {"\n\n"}
                                    Si vous tentez l'arrestation mais que celle-ci échoue, votre taux de certitude baissera de 15. Si elle réussit, vous pourrez retrouver le criminel arrêté dans la page correspondante, et votre votre taux de certitude retombera à 0.
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </CustomModal>

                <CustomModal
                    isVisible={isTrustModalVisible}
                    onClose={() => handleCloseTrustModal()}
                >
                    <View style={tw('')}>
                        <ScrollView style={[tw('flex-1'), { maxHeight: window.height * 0.8 }]}>
                            <View style={tw('p-3')}>
                                <Text style={tw('font-primary md:text-lg')}>
                                    Votre taux de fiabilité est trop bas, vous semblez vous perdre dans vos indices. Faites un peu plus attention en jouant pour repasser votre fiabilité au dessus de 30, et votre enquête recommencera à avancer.
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </CustomModal>
            </SafeAreaView>
        </ImageBackground>
    );
};
export default InvestigationScreen;