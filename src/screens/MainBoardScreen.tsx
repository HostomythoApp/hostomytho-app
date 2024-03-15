import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions, Touchable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import { getMessageMenu } from "services/api/utils";
import { MessageMenu } from 'models/MessageMenu';
import { FontAwesome } from '@expo/vector-icons';
import { getCompletedTutorials } from "services/api/games";
import IconNotification from "components/IconNotification";
import ModalBossExplanation from "components/modals/ModalBossExplanation ";
import Loader from "components/Loader";
import { getTopMonthlyWinners } from "services/api/user";
import { MonthlyWinner } from "models/MonthlyWinner";
import { getTutorialContentForStep } from "tutorials/tutorialGeneral";
import { responsiveFontSize } from "utils/functions";

interface TutorialsCompleted {
    [key: string]: boolean;
}

const MainBoardScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user, updateStorageUserFromAPI } = useUser();
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
    const windowWidth = Dimensions.get('window').width;
    const [menuMessage, setMenuMessage] = useState<MessageMenu | null>(null);
    const [messageExpanded, setMessageExpanded] = useState(false);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [tutorialsCompleted, setTutorialsCompleted] = useState<TutorialsCompleted | null>(null);
    const iconSize = windowWidth * 0.015;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isBossVisible, setIsBossVisible] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [tutorialProgress, setTutorialProgress] = useState(0);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [loadedStates, setLoadedStates] = useState(Array(8).fill(false));
    const [userNeedsUpdate, setUserNeedsUpdate] = useState(true);
    const [monthlyWinners, setMonthlyWinners] = useState<any>([]);


    useEffect(() => {
        const fetchMonthlyWinners = async () => {
            try {
                const response = await getTopMonthlyWinners();
                setMonthlyWinners(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des gagnants mensuels', error);
            }
        };

        fetchMonthlyWinners();
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
                    if (user.tutorial_progress <= 5) {
                        navigation.navigate("Profil");
                    }
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
            setTutorialProgress(tutorialProgress);
            if (tutorialProgress > 5 && tutorialProgress < 10) {
                setIsBossVisible(true);
                const tutorialContent = getTutorialContentForStep(tutorialProgress, tw, navigation);
                setModalContent(tutorialContent);
            } else {
                setIsBossVisible(false);
            }
        } else {
            setIsBossVisible(false);
            setTutorialProgress(0);
        }
    }, [user, userNeedsUpdate]);


    useEffect(() => {
        const fetchTutorials = async () => {
            if (user && !userNeedsUpdate) {
                try {
                    const completedTutorials = await getCompletedTutorials(user.id);
                    const tutorialsState = completedTutorials.reduce((acc, game) => {
                        // @ts-ignore
                        acc[game.name] = true;
                        return acc;
                    }, {});
                    setTutorialsCompleted(tutorialsState);

                } catch (error) {
                    console.error('Error fetching tutorials', error);
                }
            } else {
                setTutorialsCompleted(null);
            }
        };

        fetchTutorials();
    }, [user, userNeedsUpdate]);


    // useEffect(() => {
    //     console.log(authState.isAuthenticated);
    //     // TODO récupérer un message différent si on est connecté ou pas
    //     getMessageMenu()
    //         .then((message) => {
    //             setMenuMessage(message);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    useEffect(() => {
        // console.log(authState.isAuthenticated);
    
        const messageType = authState.isAuthenticated ? 'home_connected' : 'home_not_connected';
    
        getMessageMenu(messageType)
            .then((message) => {
                setMenuMessage(message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [authState.isAuthenticated]); 
    

    const toggleMessage = () => {
        setMessageExpanded(!messageExpanded);
    }

    const loaderClose = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);


    // *********** Gestion Tuto *******************
    const showModal = (content: any) => {
        setModalContent(content);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // *****************************************************

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader />}

            <ImageBackground
                source={require('images/bg_desk_smaller.webp')}
                onLoadEnd={loaderClose}
                style={[tw('flex-1 relative'), StyleSheet.absoluteFill]}
            >
                <View style={tw("flex-1 items-center")}>
                    {menuMessage && menuMessage.active &&
                        <TouchableOpacity onPress={toggleMessage} style={[tw("absolute top-0 right-0 p-4 bg-blue-500 bg-opacity-80 rounded-xl max-w-3xl"), { zIndex: 1 }]}>
                            {messageExpanded ? (
                                <>
                                    <Text style={tw("text-white text-lg font-primary")}>{menuMessage.title}</Text>
                                    <Text style={tw("text-white font-primary text-lg")}>{menuMessage.message}</Text>
                                    <Text style={tw("text-white text-center text-sm mt-2 italic font-primary")}>Cliquez sur le message pour le réduire</Text>
                                </>
                            ) : (
                                <Text style={tw("text-white text-lg font-primary")}>Cliquez ici</Text>
                            )}
                        </TouchableOpacity>
                    }


                    <View style={StyleSheet.absoluteFill}>
                        <View style={StyleSheet.absoluteFill}>

                            <TouchableOpacity onPress={() => navigation.navigate("Investigation")}
                                style={{
                                    position: 'absolute',
                                    // TODO vérifier si écran horizontal, et si c'est le cas, adapter
                                    top: windowWidth > 748 ? '54%' : '54%',
                                    left: windowWidth > 748 ? '21%' : '21%',
                                }}>
                                <Image source={require('images/polaroid_inconnu_shadow.png')}
                                    onLoadEnd={loaderClose}
                                    style={{
                                        width: windowWidth * 0.1, height: windowWidth * 0.1, minWidth: 70, minHeight: 70,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text style={{
                                    ...tw('absolute bottom-[10%] w-full text-center font-secondary'),
                                    fontSize: responsiveFontSize(17)
                                }}>Suspect</Text>
                            </TouchableOpacity>



                            <TouchableOpacity onPress={() => navigation.navigate("Classement")}
                                style={{
                                    position: 'absolute',
                                    top: windowWidth > 748 ? '52%' : '52%',
                                    left: windowWidth > 748 ? '46%' : '46%',
                                }}>
                                <Image source={require('images/ranking.png')}
                                    onLoadEnd={loaderClose}
                                    style={[{
                                        width: windowWidth * 0.16, height: windowWidth * 0.16, minWidth: 70, minHeight: 70,
                                        shadowColor: 'black',
                                        shadowOffset: { width: -1, height: 2 },
                                        shadowOpacity: 0.4,
                                        shadowRadius: 1,
                                    },
                                    ]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("MythoTypo")}
                                style={{
                                    position: 'absolute',
                                    top: windowWidth > 748 ? '20%' : '20%',
                                    left: windowWidth > 748 ? '43%' : '43%',
                                }}>
                                <View style={{ position: 'relative' }}>
                                    <Image
                                        resizeMode="contain"
                                        source={require('images/postit_yellow.png')}
                                        style={{
                                            width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,
                                        }}
                                    />
                                    <Text style={[tw('font-secondary absolute bottom-[37%] w-full text-center text-[#236087]'),
                                    {
                                        fontSize: responsiveFontSize(17)
                                    }
                                    ]}>
                                        Mytho-Typo
                                    </Text>
                                    {tutorialsCompleted && !tutorialsCompleted["MythoTypo"] &&
                                        <IconNotification
                                            size={iconSize}
                                            top="2%"
                                            right="2%"
                                        />
                                    }
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => navigation.navigate("MythoOuPas")}
                                style={{
                                    position: 'absolute',
                                    top: windowWidth > 748 ? '40%' : '40%',
                                    left: windowWidth > 748 ? '33%' : '33%',
                                    transform: [{ rotate: '4deg' }]
                                }}>
                                <Image source={require('images/postit_green.png')}
                                    style={{
                                        width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,
                                    }}
                                    resizeMode="contain"
                                />
                                <Text style={{
                                    ...tw('absolute bottom-[14%] left-[1px] w-full text-center font-secondary text-[#416B36]'),
                                    fontSize: responsiveFontSize(20)
                                }}>Mytho Ou {"\n"}
                                    Pas</Text>
                                {tutorialsCompleted && !tutorialsCompleted["MythoOuPas"] &&
                                    <IconNotification
                                        size={iconSize}
                                        top="1%"
                                        right="0%"
                                    />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("MythoNo")}
                                style={{
                                    position: 'absolute',
                                    top: windowWidth > 748 ? '56%' : '56%',
                                    left: windowWidth > 748 ? '68%' : '68%',
                                    transform: [{ rotate: '-8deg' }]
                                }}>
                                <Image source={require('images/postit_pink.png')} style={{
                                    width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,

                                }} />
                                <Text style={{
                                    ...tw('absolute bottom-[37%] w-full text-center font-secondary text-[#236087]'),
                                    fontSize: responsiveFontSize(19)
                                }}>Mytho-No</Text>
                                {tutorialsCompleted && !tutorialsCompleted["MythoNo"] &&
                                    <IconNotification
                                        size={iconSize}
                                        top="-5%"
                                        right="0%"
                                    />
                                }
                            </TouchableOpacity>

                            {/* Tableau des gagnants mensuels */}
                            <View style={{
                                position: 'relative',
                                top: '16.5%',
                                left: windowWidth > 748 ? '60%' : '60%',
                                width: windowWidth * 0.25,
                                height: windowWidth * 0.16,
                            }}>
                                <Image source={require('images/tabs_winners.webp')} style={{
                                    width: windowWidth * 0.25,
                                    height: windowWidth * 0.16,
                                    resizeMode: 'contain',
                                }} />

                                {/* Titre */}
                                <Text style={[tw('font-secondary absolute text-center text-gray-800'),
                                {
                                    top: '10%',
                                    width: '100%',
                                    fontSize: responsiveFontSize(16),
                                }]}>
                                    Enquêteurs du mois précédent
                                </Text>

                                <View style={tw('absolute top-[42%] left-[9%] p-1 bg-white border border-gray-500 rounded min-w-[25%]')}>
                                    <TouchableOpacity style={tw('text-center z-10')}
                                        onPress={() => navigation.navigate("ProfilJoueur", { userId: monthlyWinners[1]?.user_id })}
                                    >
                                        <Image source={require('images/ranking_2.png')} style={{
                                            width: windowWidth * 0.03,
                                            height: windowWidth * 0.03,
                                            resizeMode: 'contain',
                                            alignSelf: 'center'
                                        }} />
                                        <Text style={{
                                            ...tw('font-secondary text-center'),
                                            fontSize: responsiveFontSize(14),
                                        }}>
                                            {monthlyWinners[1]?.username}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Zone du Joueur 3 */}
                                <View style={tw('absolute top-[50%] right-[10%] p-1 pb-0 bg-white border border-gray-500 rounded min-w-[25%]')}>

                                    <TouchableOpacity
                                        style={tw('text-center z-10')}
                                        onPress={() => navigation.navigate("ProfilJoueur", { userId: monthlyWinners[2]?.user_id })}
                                    >

                                        <Image source={require('images/ranking_3.png')} style={{
                                            width: windowWidth * 0.03,
                                            height: windowWidth * 0.03,
                                            resizeMode: 'contain',
                                            alignSelf: 'center'
                                        }} />
                                        <Text style={{
                                            ...tw('font-secondary text-center'),
                                            fontSize: responsiveFontSize(14),
                                        }}>
                                            {monthlyWinners[2]?.username}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Zone du Joueur 1 */}
                                <View style={tw('absolute w-full top-[25%] items-center')}
                                >
                                    <View style={tw('p-1 bg-white border border-gray-500 rounded min-w-[25%] self-center')}>

                                        <TouchableOpacity style={tw('text-center z-10')}
                                            onPress={() => navigation.navigate("ProfilJoueur", { userId: monthlyWinners[0]?.user_id })}
                                        >

                                            <Image source={require('images/ranking_1.png')} style={{
                                                width: windowWidth * 0.03,
                                                height: windowWidth * 0.03,
                                                resizeMode: 'contain',
                                                alignSelf: 'center'
                                            }} />
                                            <Text style={{
                                                ...tw('font-secondary text-center'),
                                                fontSize: responsiveFontSize(14),
                                            }}>
                                                {monthlyWinners[0]?.username}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate("Criminels")}
                                style={{
                                    position: 'absolute',
                                    top: '16.2%',
                                    left: '20%',
                                    flexDirection: 'row',

                                }}>
                                {/* Baisser taille image */}
                                <Image source={require('images/pocket_with_photo.png')} style={{
                                    width: windowWidth * 0.13, height: windowWidth * 0.13, minWidth: 65, minHeight: 65,
                                    shadowColor: 'black',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 1,
                                    resizeMode: 'contain',
                                }} />
                            </TouchableOpacity>

                        </View>

                    </View>
                    {/* {
                        user && user.tutorial_progress > 7 ? ( */}

                            <TouchableOpacity onPress={() => navigation.navigate("Parametres")}
                                style={{ position: 'absolute', top: 0, left: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10, minWidth: 100, minHeight: 100 }}>
                                <View style={{
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    borderBottomRightRadius: 30,
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Image source={require('images/settings1.png')} resizeMode="contain"
                                        style={{ width: windowWidth * 0.05, height: windowWidth * 0.1, minWidth: 50, minHeight: 100 }} />
                                </View>
                            </TouchableOpacity>
                        {/* ) : null
                    } */}

                    {
                        !authState.isAuthenticated &&
                        <View style={[tw("absolute bottom-2 right-2")]}>
                            <TouchableOpacity onPress={() => navigation.navigate("Connexion")}
                                style={tw("mb-2 py-2 px-4 bg-blue-500 bg-opacity-70 rounded-xl")}>
                                <Text style={tw("text-center text-white text-lg")}>Se connecter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}
                                style={tw("py-2 px-4 bg-green-500 bg-opacity-70 rounded-xl")}>
                                <Text style={tw("text-center text-white text-lg")}>Créer un compte</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        authState.isAuthenticated &&
                        <TouchableOpacity onPress={() => navigation.navigate("Profil")}
                            style={{ position: 'absolute', bottom: 0, right: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10, minWidth: 100, minHeight: 100 }}>
                            <View style={{
                                backgroundColor: "rgba(0,0,0,0.5)",
                                borderTopLeftRadius: 30,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image source={require('images/icon_profil.png')} resizeMode="contain"
                                    style={{ width: windowWidth * 0.06, height: windowWidth * 0.06, minWidth: 60, minHeight: 60 }} />
                            </View>
                        </TouchableOpacity>
                    }
                </View >

                {
                    isBossVisible && (
                        <ModalBossExplanation
                            isVisible={isBossVisible}
                            onClose={handleCloseModal}
                            tutorial_progress={tutorialProgress}
                        >
                            {modalContent}
                        </ModalBossExplanation>
                    )
                }
            </ImageBackground >

        </View >
    );
};

export default MainBoardScreen;
