import React, { useCallback, useEffect, useState, useRef } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import { getMessageMenu } from "services/api/utils";
import { MessageMenu } from 'models/MessageMenu';
import IconNotification from "components/IconNotification";
import { FontAwesome } from '@expo/vector-icons';
import ModalBossExplanation from "components/modals/ModalBossExplanation ";
import Loader from "components/Loader";
import { getMessageReadByUserId, getTopMonthlyWinners, updateMessageReadByUserId } from "services/api/user";
import { getTutorialContentForStep } from "tutorials/tutorialGeneral";
import { responsiveFontSize } from "utils/functions";
import CharacterPortrait from "components/CharacterPortrait";
import { loadMonthlyWinners, saveMonthlyWinners } from "utils/storage";

const MainBoardScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user, updateStorageUserFromAPI, equippedSkins, tutorialsCompleted } = useUser();
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
    const windowWidth = Dimensions.get('window').width;
    const [menuMessage, setMenuMessage] = useState<MessageMenu | null>(null);
    const [menuMessageRead, setMenuMessageRead] = useState(false);
    const [messageExpanded, setMessageExpanded] = useState(false);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
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
    const rotation = useRef(new Animated.Value(0)).current;
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        const fetchMonthlyWinners = async () => {
            setIsLoading(true);
            let winners = await loadMonthlyWinners();
            if (!winners) {
                try {
                    const response = await getTopMonthlyWinners();
                    winners = response.data;
                    saveMonthlyWinners(winners);
                } catch (error) {
                    console.error('Erreur lors de la récupération des gagnants mensuels', error);
                    setIsLoading(false);
                    return;
                }
            }
            setMonthlyWinners(winners);
            setIsLoading(false);
        };
        fetchMonthlyWinners();
    }, []);


    const updateOrientation = () => {
        const { width, height } = Dimensions.get('screen');
        if (width < height) {
            setOrientation('portrait');
        } else {
            setOrientation('landscape');
        }
    };

    useEffect(() => {
        updateOrientation();
        const subscription = Dimensions.addEventListener('change', updateOrientation);

        return () => subscription.remove(); // Nettoye l'écouteur lors du démontage
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

    useEffect(() => {
        const messageType = authState.isAuthenticated ? 'home_connected' : 'home_not_connected';
    
        const fetchMessage = async () => {
            try {
                const message = await getMessageMenu(messageType);
                setMenuMessage(message);
    
                // Définir si le message est lu ou non
                if (user?.id) {
                    const messageReadStatus = await getMessageReadByUserId(user.id);
                    setMenuMessageRead(messageReadStatus.hasBeenRead);
                } else {
                    setMenuMessageRead(false);
                }
    
                // Définir messageExpanded en fonction du statut de connexion
                setMessageExpanded(!authState.isAuthenticated); // Message expanded si non connecté
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchMessage();
    }, [authState.isAuthenticated, user?.id, setMessageExpanded]);
    

    useEffect(() => {
        let timerId: any;

        const animate = () => {
            Animated.sequence([
                Animated.timing(rotation, { toValue: 1.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: -1.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 0.7, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: -0.7, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 0.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 0.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 1.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: -1.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 1.0, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: -0.7, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 0.7, duration: 100, useNativeDriver: true }),
                Animated.timing(rotation, { toValue: 0.0, duration: 100, useNativeDriver: true })
            ]).start(() => {
                if (menuMessage && menuMessage.active) {
                    timerId = setTimeout(animate, 3000);
                }
            });
        };

        if (menuMessage && menuMessage.active) {
            timerId = setTimeout(animate, 500);
        }

        return () => clearTimeout(timerId);
    }, [rotation, menuMessage]);


    const loaderClose = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    // *********** Gestion Tuto *******************
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

    const showModal = (content: any) => {
        setModalContent(content);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // *****************************************************

    const toggleMessage = async () => {
        if (!messageExpanded && menuMessage?.active) {
            setMessageExpanded(true);
            if (user) {
                await updateMessageReadByUserId(user?.id, true);
            }
            setMenuMessageRead(true);
        } else {
            setMessageExpanded(false);
            setMenuMessageRead(true);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <Loader />}
            <ImageBackground
                source={require('images/bg_desk_smaller.jpg')}
                // onLoadEnd={loaderClose}
                style={[tw('flex-1 relative'), StyleSheet.absoluteFill]}
            >

                {orientation === 'portrait' ? (
                    <View style={[StyleSheet.absoluteFill, tw('bg-black bg-opacity-75 flex justify-center items-center')]}>
                        <Text style={tw('text-white text-center p-4 font-primary text-xl')}>
                            Ce jeu a été conçu pour être utilisé au format paysage. Veuillez pivoter votre appareil.
                        </Text>
                    </View>
                ) : (

                    <View style={tw("flex-1 items-center")}>
                        {
                            menuMessage && menuMessage.active && (
                                <TouchableOpacity onPress={toggleMessage}
                                    style={[
                                        tw("absolute top-0 right-0 p-4 rounded-lg items-end z-30"),
                                        messageExpanded ? tw("w-[85%] h-auto max-w-4xl") : tw("w-[10%] h-[20%] min-w-28 min-h-28")
                                    ]}
                                >
                                    {!messageExpanded ? (
                                        <Animated.View
                                            style={[
                                                {
                                                    transform: menuMessageRead === false || menuMessageRead === null ?
                                                        [{ rotate: rotation.interpolate({ inputRange: [-1, 1], outputRange: ['-0.1rad', '0.1rad'] }) }] :
                                                        [{ rotate: '0deg' }]
                                                },
                                                messageExpanded ? tw('w-[12%] h-[54%] max-h-40 max-w-40') : tw('w-full h-full')
                                            ]}
                                        >

                                            <Image
                                                resizeMode="contain"
                                                source={menuMessageRead === false || menuMessageRead === null ?
                                                    require('images/enveloppe_text.png') :
                                                    require('images/envelope.png')
                                                }
                                                style={tw("w-full h-full")}
                                            />

                                        </Animated.View>

                                    ) : (
                                        <View style={[tw("bg-white rounded-xl p-4 border border-gray-200 w-full justify-center"),
                                        {
                                            position: 'relative',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.45,
                                            shadowRadius: 5,
                                            elevation: 10,
                                        }]
                                        }>
                                            <Text style={tw("text-black text-lg font-primary")}>{menuMessage.title}</Text>
                                            <Text style={tw("text-black font-primary lg:text-lg")}>{menuMessage.message}</Text>
                                            <Text style={tw("text-black text-center text-sm mt-2 italic font-primary")}>Cliquez sur le message pour le réduire</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            )
                        }


                        <View style={StyleSheet.absoluteFill}>
                            <View style={StyleSheet.absoluteFill}>

                                <TouchableOpacity onPress={() => navigation.navigate("Investigation")}
                                    style={{
                                        position: 'absolute',
                                        top: windowWidth > 748 ? '54%' : '54%',
                                        left: windowWidth > 748 ? '21%' : '21%',
                                    }}>
                                    <Image source={require('images/polaroid_inconnu_shadow.png')}
                                        // onLoadEnd={loaderClose}
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
                                        // onLoadEnd={loaderClose}
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

                                <TouchableOpacity
                                    onPress={tutorialsCompleted && tutorialsCompleted["MythoOuPas"] ? () => navigation.navigate("MythoTypo") : undefined}
                                    style={{
                                        position: 'absolute',
                                        top: windowWidth > 748 ? '20%' : '20%',
                                        left: windowWidth > 748 ? '43%' : '43%',
                                        opacity: tutorialsCompleted && tutorialsCompleted["MythoOuPas"] ? 1 : 0.6
                                    }}>
                                    <View style={{ position: 'relative' }}>
                                        <Image
                                            resizeMode="contain"
                                            source={require('images/postit_yellow.png')}
                                            style={{
                                                width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,
                                            }}
                                        />
                                        {tutorialsCompleted && tutorialsCompleted["MythoOuPas"] && !tutorialsCompleted["MythoTypo"] &&
                                            <IconNotification
                                                size={iconSize}
                                                top="2%"
                                                right="2%"
                                            />
                                        }
                                        {!tutorialsCompleted || !tutorialsCompleted["MythoOuPas"] &&
                                            // TODO responsive lock
                                            <FontAwesome name="lock" size={44} color="slategray" style={{ position: 'absolute', top: '40%', left: '50%', marginTop: -12, marginLeft: -12 }} />
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
                                    {tutorialsCompleted && !tutorialsCompleted["MythoOuPas"] &&
                                        <IconNotification
                                            size={iconSize}
                                            top="1%"
                                            right="0%"
                                        />
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={tutorialsCompleted && tutorialsCompleted["MythoTypo"] ? () => navigation.navigate("MythoNo") : undefined}
                                    style={{
                                        position: 'absolute',
                                        top: windowWidth > 748 ? '56%' : '56%',
                                        left: windowWidth > 748 ? '68%' : '68%',
                                        transform: [{ rotate: '-8deg' }],
                                        opacity: tutorialsCompleted && tutorialsCompleted["MythoTypo"] ? 1 : 0.6
                                    }}>
                                    <Image source={require('images/postit_pink.png')} style={{
                                        width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,
                                    }} />
                                    {tutorialsCompleted && tutorialsCompleted["MythoTypo"] && !tutorialsCompleted["MythoNo"] &&
                                        <IconNotification
                                            size={iconSize}
                                            top="-5%"
                                            right="0%"
                                        />
                                    }
                                    {tutorialsCompleted && !tutorialsCompleted["MythoTypo"] && // Modification ici pour afficher le cadenas seulement si le tuto n'est pas complété
                                        <FontAwesome name="lock" size={44} color="slategray" style={{ position: 'absolute', top: '40%', left: '50%', marginTop: -12, marginLeft: -12 }} />
                                    }
                                </TouchableOpacity>


                                {/* Tableau des gagnants mensuels */}
                                <View style={{
                                    position: 'relative',
                                    top: '17.5%',
                                    left: windowWidth > 748 ? '60%' : '60%',
                                    width: windowWidth * 0.25,
                                    height: windowWidth * 0.16,
                                }}>
                                    <Image source={require('images/tabs_winners.png')} style={{
                                        width: windowWidth * 0.25,
                                        height: windowWidth * 0.175,
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

                                    {/* Zone du Joueur 2 */}
                                    <View style={[tw('absolute top-[41%] left-[9%] bg-white border border-gray-500 rounded min-w-[25%]'), { height: windowWidth * 0.07 }]}>
                                        <TouchableOpacity
                                            style={tw('text-center z-10')}
                                            onPress={() => navigation.navigate("ProfilJoueur", { userId: monthlyWinners[1]?.user_id })}
                                        >

                                            <View style={[tw('overflow-hidden relative'), { height: windowWidth * 0.068 }]}>
                                                <Text style={{
                                                    ...tw('font-secondary text-center'),
                                                    fontSize: responsiveFontSize(14),
                                                }}>
                                                    {monthlyWinners[1]?.username}
                                                </Text>

                                                {monthlyWinners[1] && (
                                                    <CharacterPortrait
                                                        key={monthlyWinners[1].user_id}
                                                        gender={monthlyWinners[1].user?.gender}
                                                        color_skin={monthlyWinners[1].user?.color_skin}
                                                        skins={monthlyWinners[1].equippedSkins || []}
                                                    />
                                                )}
                                            </View>

                                            <Image source={require('images/ranking_2.png')} style={{
                                                position: 'absolute',
                                                bottom: -14,
                                                right: -5,
                                                width: windowWidth * 0.03,
                                                height: windowWidth * 0.03,
                                                resizeMode: 'contain',
                                            }} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Zone du Joueur 3 */}
                                    <View style={[tw('absolute top-[48%] right-[10%] bg-white border border-gray-500 rounded min-w-[25%]'), { height: windowWidth * 0.07 }]}>

                                        <TouchableOpacity
                                            style={tw('text-center z-10')}
                                            onPress={() => navigation.navigate("ProfilJoueur", { userId: monthlyWinners[2]?.user_id })}
                                        >
                                            <View style={[tw('overflow-hidden relative'), { height: windowWidth * 0.068 }]}>
                                                <Text style={{
                                                    ...tw('font-secondary text-center'),
                                                    fontSize: responsiveFontSize(14),
                                                }}>
                                                    {monthlyWinners[2]?.username}
                                                </Text>
                                                {monthlyWinners[2] && (
                                                    <CharacterPortrait
                                                        key={monthlyWinners[2].user_id}
                                                        gender={monthlyWinners[2].user?.gender}
                                                        color_skin={monthlyWinners[2].user?.color_skin}
                                                        skins={monthlyWinners[2].equippedSkins || []}
                                                    />
                                                )}
                                            </View>
                                            <Image source={require('images/ranking_3.png')} style={{
                                                position: 'absolute',
                                                bottom: -14,
                                                right: -5,
                                                width: windowWidth * 0.03,
                                                height: windowWidth * 0.03,
                                                resizeMode: 'contain',
                                            }} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Zone du Joueur 1 */}
                                    <View style={[tw('absolute top-[24%] items-center self-center  bg-white border border-gray-500 rounded min-w-[25%]'), { height: windowWidth * 0.07 }]}>

                                        <TouchableOpacity style={tw('text-center z-10')}
                                            onPress={() => navigation.navigate("ProfilJoueur", { userId: monthlyWinners[0]?.user_id })}
                                        >
                                            <View style={[tw('overflow-hidden relative'), { height: windowWidth * 0.068 }]}>
                                                <Text style={{
                                                    ...tw('font-secondary text-center'),
                                                    fontSize: responsiveFontSize(14),
                                                }}>
                                                    {monthlyWinners[0]?.username}
                                                </Text>
                                                {monthlyWinners[0] && (
                                                    <CharacterPortrait
                                                        key={monthlyWinners[0].user_id}
                                                        gender={monthlyWinners[0].user?.gender}
                                                        color_skin={monthlyWinners[0].user?.color_skin}
                                                        skins={monthlyWinners[0].equippedSkins || []}
                                                    />
                                                )}
                                            </View>
                                            <Image source={require('images/ranking_1.png')} style={{
                                                position: 'absolute',
                                                bottom: -14,
                                                right: -5,
                                                width: windowWidth * 0.035,
                                                height: windowWidth * 0.035,
                                                resizeMode: 'contain',
                                            }} />

                                        </TouchableOpacity>
                                    </View>


                                    <View style={tw('font-secondary absolute text-center self-end bottom-0 w-full')}>
                                        <TouchableOpacity onPress={() => navigation.navigate('ClassementMensuel')}>
                                            <Text style={{
                                                ...tw('text-[#5583CB] mt-2 text-center font-primary'),
                                                fontSize: responsiveFontSize(10),
                                            }}>Classement mensuel en cours</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate("Criminels")}
                                    style={{
                                        position: 'absolute',
                                        top: '17.2%',
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
                                style={{ position: 'absolute', bottom: 0, right: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10, minWidth: 100, minHeight: 100, overflow: 'hidden' }}>
                                <View style={{
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    borderTopLeftRadius: 30,
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <CharacterPortrait gender={user?.gender} color_skin={user?.color_skin} skins={equippedSkins} ></CharacterPortrait>
                                </View>
                            </TouchableOpacity>
                        }
                    </View >
                )}
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
