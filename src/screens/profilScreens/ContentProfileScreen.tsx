import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { getUserRankingRange, getUserRankingRangeInMonthly } from 'services/api/user';
import { getUserAchievements } from 'services/api/achievements';
import { Achievement } from 'models/Achievement';
import AchievementIcon from 'components/AchievementIcon';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from 'navigation/Types';
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';
import { characterImagesMapping } from 'utils/characterImagesMapping';

interface Rank {
    id: number;
    ranking: number;
    username: string;
    points: number;
}

const ContentProfileScreen = (props: any) => {
    const tw = useTailwind();
    const { user, equippedSkins } = useUser();
    const [ranking, setRanking] = useState<Rank[]>([]);
    const [rankingMonthly, setRankingMonthly] = useState<Rank[]>([]);
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();

    // @ts-ignore
    const characterImage = characterImagesMapping[user?.gender || 'homme'][user?.color_skin || 'clear'];

    const currentPoints = user?.points || 0;
    const nextRewardPoints = 100;
    const pointsForProgress = currentPoints % nextRewardPoints;
    const pointsPercentage = (pointsForProgress / nextRewardPoints) * 100;
    const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
    const window = Dimensions.get('window');
    const isMobile = window.width < 748;

    useEffect(() => {
        const fetchRanking = async () => {
            if (user?.id) {
                const result = await getUserRankingRange(user.id);
                const resultMonthly = await getUserRankingRangeInMonthly(user.id);
                const achievementsData = await getUserAchievements(user.id);
                setUserAchievements(achievementsData);
                const rankingUsers = result.data;
                const rankingRangeInMonthly = resultMonthly.data;
                setRanking(rankingUsers);
                setRankingMonthly(rankingRangeInMonthly);
            }
        };
        fetchRanking();
    }, []);

    return (
        <View style={[tw('w-full mt-4 px-2 max-w-5xl'), isMobile ? tw('pt-2') : tw('pt-6')]}>
            <View style={tw('flex-row justify-center')}>
                <View style={[tw(''), isMobile ? tw('w-4/5') : tw('w-3/5')]}>
                    <Text style={[tw('mb-6 text-center text-[whitesmoke] font-MochiyPopOne'), isMobile ? tw('text-3xl') : tw(' text-5xl leading-10 pt-8')]}>{user?.username}</Text>

                    <Text style={tw('text-lg mb-4 text-center text-white font-primary')}>Points: {user?.points}</Text>

                    <Text style={tw('text-xl mb-2 w-full text-white font-primary')}>
                        Progression avant la prochaine récompense
                    </Text>
                    <View style={tw('bg-gray-300 h-4 rounded ')}>
                        <View
                            style={[
                                tw('bg-secondary h-full rounded-l'),
                                { width: `${pointsPercentage}%` },
                            ]}
                        ></View>
                    </View>
                    <Text style={tw('text-xs mt-1 text-white font-primary')}>
                        {pointsForProgress} / {nextRewardPoints} points
                    </Text>
                </View>
            </View>

            {isMobile &&
                <View style={tw('w-full h-1/4 items-center justify-start')}>
                    <Image
                        source={characterImage}
                        style={tw('absolute w-full h-full ')}
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

            <View style={tw('flex-col')}>
                <View style={[tw('justify-between my-6 flex-wrap'), isMobile ? tw('flex-col mt-2') : tw('flex-row mt-8')]}>
                    <View style={[tw('mt-0'), isMobile ? tw('w-full mr-0 mb-4') : tw('w-2/4 mr-2')]}>
                        <Text style={tw('text-xl mb-2 pl-2 text-white font-primary')}>Classement général</Text>

                        <View style={tw('bg-white mb-2 py-4 rounded-lg')}>
                            {ranking[0]?.ranking > 1 && (
                                <Text style={tw('pl-2')}>. . .</Text>
                            )}
                            {ranking.map((rank: any) => (
                                <View
                                    key={rank.id}
                                    style={[
                                        tw('p-2 flex-row items-center justify-between'),
                                        rank.id === user?.id && tw('bg-blue-100'),
                                    ]}
                                >
                                    <Text style={tw('font-primary')}
                                    >
                                        {rank.ranking}. {rank.username}
                                    </Text>
                                    <Text style={tw('font-primary')}
                                    >{rank.points} points</Text>
                                </View>
                            ))}
                            {ranking[ranking.length - 1]?.id !== user?.id && (
                                <Text style={tw('pl-2')}>. . .</Text>
                            )}
                            <TouchableOpacity onPress={() => navigation.navigate('Classement')}>
                                <Text style={tw('text-blue-500 mt-2 text-center font-primary')}>Voir le classement complet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[tw('flex-1'), isMobile ? tw('') : tw('mr-2')]}>
                        <Text style={tw('text-xl mb-2 pl-2 text-white font-primary')}>Classement mensuel</Text>
                        <View style={tw('bg-white mb-2 py-4 rounded-lg')}>
                            {rankingMonthly[0]?.ranking > 1 && (
                                <Text style={tw('pl-2')}>. . .</Text>
                            )}

                            {rankingMonthly.map((rank: any) => (
                                <View
                                    key={rank.id}
                                    style={[
                                        tw('p-2 flex-row items-center justify-between'),
                                        rank.id === user?.id && tw('bg-blue-100'),
                                    ]}
                                >
                                    <Text style={tw('font-primary')}>
                                        {rank.ranking}. {rank.username}
                                    </Text>
                                    <Text style={tw('font-primary')}>
                                        {rank.monthly_points} points
                                    </Text>
                                </View>
                            ))}

                            {ranking[ranking.length - 1]?.id !== user?.id && (
                                <Text style={tw('pl-2')}>. . .</Text>
                            )}
                            <TouchableOpacity onPress={() => navigation.navigate('ClassementMensuel')}>
                                <Text style={tw('text-blue-500 mt-2 text-center font-primary')}>Voir le classement complet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[tw('justify-between my-6 flex-wrap'), isMobile ? tw('flex-col mt-2') : tw('flex-row mt-3')]}>
                    <View style={[tw('mt-0'), isMobile ? tw('w-full mr-0 mb-4') : tw('w-2/4 mr-2')]}>

                        <Text style={tw('text-xl mb-2 text-white font-primary')}>Statistiques</Text>
                        <View style={tw("flex-row flex-wrap")}>
                            {/* Ne se met à jour que quand on joue à 1 jeu. A voir si j'améliore ça */}
                            <View style={tw(`w-[48%] max-w-[200px] flex justify-around p-2 mr-2 rounded-lg border-l-4 border-blue-500 bg-white mb-2`)}>
                                <Text style={tw('font-primary text-black leading-7')}>Jours consécutifs joués :</Text>
                                <Text style={tw('font-primary text-black leading-7 font-extrabold')}>{user?.consecutiveDaysPlayed}</Text>
                            </View>
                            <View style={tw(`w-[48%] max-w-[200px] flex justify-around p-2 rounded-lg border-l-4 border-green-500 bg-white mb-2`)}>
                                <Text style={tw('font-primary text-black leading-7')}>Fiabilité :</Text>
                                <Text style={tw('font-primary text-black leading-7 font-extrabold')}>{user?.trust_index} %</Text>
                            </View>
                        </View>
                        <View style={tw('w-[48%] max-w-[200px] bg-white mb-2 py-1 rounded-lg')}>
                            <Text style={tw('ml-1 mt-1 text-center leading-7')}
                            >. . .</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Statistiques')}>
                                <Text style={tw('text-blue-500 my-1 text-center font-primary')}>Tout afficher</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={[tw('flex-1'), isMobile ? tw('') : tw('mr-2')]}>
                        <Text style={tw('text-xl mb-1 text-white font-primary')}>Hauts faits</Text>
                        {userAchievements.length > 0 ? (
                            <>
                                {userAchievements.slice(0, 2).map((achievement) => (
                                    <View style={tw("flex-row items-center p-4 mt-1 bg-white rounded-lg")} key={achievement.id}>
                                        <AchievementIcon achievement={achievement} />
                                        <View style={tw("ml-3")}>
                                            <Text style={tw("font-primary")}>
                                                {achievement.name}
                                            </Text>
                                            <Text style={tw("text-gray-600 text-xs font-primary")}>
                                                {achievement.description}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </>
                        ) : null}
                        <TouchableOpacity onPress={() => navigation.navigate('HautsFaits')} style={tw('p-2 pb-2 pt-1 mt-1 bg-white rounded-lg')}>
                            {userAchievements.length === 0 ? (
                                <Text style={tw('font-primary text-center mt-2')}>Aucun haut fait pour le moment</Text>

                            ) : null}
                            <Text style={tw('text-center text-lg')}
                            >. . .</Text>
                            <Text style={tw('text-blue-500 text-center font-primary')}>Afficher tous les hauts faits</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw(`${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center bg-white rounded-lg py-2 px-4 my-4`)}>
                    <TouchableOpacity
                        style={tw(`flex-row items-center justify-center ${isMobile ? 'w-full mb-2 mr-0' : 'w-[32%] mr-2'} bg-secondary py-2 rounded `)}
                        onPress={() => navigation.navigate('Contacts')}
                    >
                        <FontAwesome5 name='user-friends' size={24} color='white' />
                        <Text style={tw('text-white ml-2 font-primary')}>Mes contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw(`flex-row items-center justify-center ${isMobile ? 'w-full mb-2' : 'w-[32%]'} bg-[darkcyan] py-2 rounded mx-2`)}
                        onPress={() => navigation.navigate('Referral')}
                    >
                        <FontAwesome5 name='gift' size={24} color='white' />
                        <Text style={tw('text-white ml-2 font-primary')}>Parrainer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw(`flex-row items-center justify-center ${isMobile ? 'w-full ml-0' : 'w-[32%] ml-2'} bg-primary py-2 rounded`)}
                        onPress={() => navigation.navigate('ParametreProfil')}
                    >
                        <FontAwesome5 name='cog' size={24} color='white' />
                        <Text style={tw('text-white ml-2 font-primary')}>Paramètres du compte</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View >
    );
};

export default withAuth(ContentProfileScreen);