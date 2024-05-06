
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image, Linking } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ContentProfileScreen from 'screens/profilScreens/ContentProfileScreen';
import SkinsManagementScreen from 'screens/profilScreens/SkinsManagementScreen';
import { characterImagesMapping } from 'utils/characterImagesMapping';
import { getTutorialContentForStep } from 'tutorials/tutorialGeneral';
import ModalBossExplanation from 'components/modals/ModalBossExplanation ';
import Loader from 'components/Loader';
import CustomModal from 'components/modals/CustomModal';
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";

const ProfileScreen = (props: any) => {
    const tw = useTailwind();
    const { user, updateStorageUserFromAPI, equippedSkins, incrementTutorialProgress } = useUser();

    const window = Dimensions.get('window');
    const isMobile = window.width < 670;
    const [viewMode, setViewMode] = useState<'profile' | 'skinsManagement'>('profile');
    const [userNeedsUpdate, setUserNeedsUpdate] = useState(true);
    const [isBossVisible, setIsBossVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
    const contentProfileScreenRef = useRef(null);
    const navigation = useNavigation<RootStackNavigationProp<"PolitiqueDeConfidentialite">>();
    // @ts-ignore
    const characterImage = characterImagesMapping[user?.gender || 'homme'][user?.color_skin || 'clear'];

    useEffect(() => {
        if (user?.id) {
            updateStorageUserFromAPI(user.id);
        }
    }, []);


    useEffect(() => {
        const updateUserData = async () => {
            if (userNeedsUpdate && user) {
                setIsLoading(true);
                try {
                    await updateStorageUserFromAPI(user.id);
                } catch (error) {
                    console.error('Error updating user data', error);
                } finally {
                    setIsLoading(false);
                    setUserNeedsUpdate(false);
                }
            }
        };

        updateUserData();
    }, [user, userNeedsUpdate]);

    // Gestion tuto général
    useEffect(() => {
        if (user && !userNeedsUpdate) {
            const tutorialProgress = user.tutorial_progress;

            if (tutorialProgress == 0) {
                setIsHelpModalVisible(true);
                setIsBossVisible(false);
            } else if (tutorialProgress > 0 && tutorialProgress < 6) {
                setIsBossVisible(true);
                const tutorialContent = getTutorialContentForStep(tutorialProgress, tw);
                setModalContent(tutorialContent);
            } else {
                setTimeout(() => {
                    setIsBossVisible(false);
                }, 500);
            }
        }
    }, [user, userNeedsUpdate]);

    const toggleViewMode = () => {
        setViewMode(viewMode === 'profile' ? 'skinsManagement' : 'profile');
    };

    const acceptPrivacyPolicy = () => {
        incrementTutorialProgress();
    };

    const handleCloseModal = () => {
    };

    return (
        <ImageBackground
            source={require('images/bg_office.jpg')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            {isLoading && <Loader />}
            {user && user.tutorial_progress > 4 && (
                <CustomHeaderEmpty backgroundColor='bg-transparent' textColor='white' backToMain={true} />
            )}
            <View style={tw('flex-1 flex-row items-start justify-start relative')}>
                {!isMobile &&
                    <View style={tw('w-1/4 h-3/4 mb-10 ml-0 mr-auto mt-auto items-end justify-center')}>
                        <Image
                            source={characterImage}
                            style={tw('absolute w-full h-full')}
                            resizeMode="contain"
                        />

                        {Object.values(equippedSkins).map((skin: Skin) => (
                            <Image
                                key={`imageSkin-${skin.id}`}
                                // @ts-ignore
                                source={skinImages[skin.image_url]}
                                style={tw('absolute w-full h-full')}
                                resizeMode="contain"
                            />
                        ))}
                    </View>
                }
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center z-20")} style={[tw('w-3/5 h-full'), { marginright: '5%' }]}>
                    {user && user.tutorial_progress > 1 ? (
                        viewMode === 'profile' ?
                            <ContentProfileScreen user={user} />
                            :
                            <SkinsManagementScreen user={user} />
                    ) : null}
                </ScrollView>

                <TouchableOpacity
                    onPress={toggleViewMode} // Bascule entre les modes
                    style={tw('absolute bottom-0 left-0 min-w-[50px] min-h-[50px] max-h-[100px] justify-end')}
                >
                    {user && user.tutorial_progress > 3 ? (
                        viewMode === 'profile' ?
                            <View style={tw('bg-black bg-opacity-50 rounded-tr-lg w-full h-full justify-center items-center flex-row')}>
                                <AntDesign name="skin" size={30} color="#ffffff" style={tw('m-1')} />
                                <Text style={tw('text-white font-primary ml-1 mr-3 text-lg')}
                                >Changer d'apparence</Text>
                            </View>
                            :
                            <View style={tw('bg-black bg-opacity-50 rounded-tr-lg w-full h-full justify-center items-center flex-row')}>
                                <Ionicons name="chevron-back" size={34} color="#ffffff" />

                                <Text style={tw('text-white font-primary ml-1 mr-3 text-lg')}
                                >Retour au profil</Text>
                            </View>
                    ) : null}
                </TouchableOpacity>
            </View>

            {
                isBossVisible && (
                    <ModalBossExplanation
                        isVisible={isBossVisible}
                        onClose={handleCloseModal}
                        tutorial_progress={user?.tutorial_progress}
                    >
                        {modalContent}
                    </ModalBossExplanation>
                )
            }

            <CustomModal
                isVisible={isHelpModalVisible}
            >
                <View style={[tw('flex-1, max-w-lg'), { maxHeight: window.height * 0.9 }]}>
                    <Text style={tw('text-center text-lg font-primary mb-4')}>
                        À lire attentivement</Text>

                    <Text style={tw('font-primary mb-4 text-center')}>
                        HostoMytho est un jeu ayant un but. Les données que vous produisez en jouant seront données à la science et seront sous licence
                        <Text style={tw('text-blue-500')} onPress={() => Linking.openURL('https://coop-ist.cirad.fr/etre-auteur/utiliser-les-licences-creative-commons/4-les-6-licences-cc')}>
                            {" CC-by-NC 4.0"}.
                        </Text>
                    </Text>

                    <Text style={tw('font-primary mb-4 text-center')}>
                        Pour jouer au jeu, vous devez accepter notre politique de confidentialité.{"\n"} Pour la lire, veuillez cliquer sur le bouton suivant :
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("PolitiqueDeConfidentialite")} style={tw('bg-primary py-2 px-4 rounded self-center mb-4')}>
                        <Text style={tw('text-white font-bold text-center font-primary')}>Politique de confidentialité</Text>
                    </TouchableOpacity>

                    <Text style={tw('font-primary mb-4 text-center')}>
                        Touchez le bouton Ok pour l'accepter.
                    </Text>

                    <TouchableOpacity onPress={() => {
                        acceptPrivacyPolicy();
                        setIsHelpModalVisible(false);
                    }} style={tw('bg-primary py-2 px-8 rounded self-center')}>
                        <Text style={tw('text-white font-bold text-center font-primary')}>Ok</Text>
                    </TouchableOpacity>
                </View>

            </CustomModal>
        </ImageBackground>
    );
};

export default withAuth(ProfileScreen);