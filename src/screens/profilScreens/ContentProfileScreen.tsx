import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { getUserRankingRange } from 'services/api/user';
import { getUserAchievements } from 'services/api/achievements';
import { Achievement } from 'models/Achievement';
import AchievementIcon from 'components/AchievementIcon';
interface Rank {
    id: number;
    ranking: number;
    username: string;
    points: number;
}

const ContentProfileScreen = (props: any) => {
    const tw = useTailwind();
    const { user, updateStorageUserFromAPI } = useUser();
    const [ranking, setRanking] = useState<Rank[]>([]);
    const stats = [
        { id: 1, title: 'Textes validés', count: 5 },
        { id: 2, title: 'Annotations créées', count: 15 },
    ];

    const { navigation } = props;
    const currentPoints = user?.points || 0;
    const nextRewardPoints = 1000;
    const pointsForProgress = currentPoints % nextRewardPoints;
    const pointsPercentage = (pointsForProgress / nextRewardPoints) * 100;
    const [userAchievements, setUserAchievements] = useState<Achievement[]>([]);
    const window = Dimensions.get('window');
    const isMobile = window.width < 768;

    useEffect(() => {
        console.log("USEeFFECT");

        if (user?.id) {
            updateStorageUserFromAPI(user.id);
        }
        const fetchRanking = async () => {
            if (user?.id) {
                const result = await getUserRankingRange(user.id);
                const achievementsData = await getUserAchievements(user.id);
                setUserAchievements(achievementsData);
                const allUsers = result.data;
                setRanking(allUsers);

            }
        };
        fetchRanking();
    }, []);

    return (
        <View style={[tw('w-full mt-4 px-2 max-w-5xl'), isMobile ? tw('pt-2') : tw('pt-6')]}>
            <View style={tw('flex-row justify-center')}>
                <View style={[tw('mt-4'), isMobile ? tw('w-4/5') : tw('w-3/5')]}>
                    <Text style={[tw('font-bold mb-6 text-center text-[whitesmoke] font-MochiyPopOne'), isMobile ? tw('text-3xl') : tw(' text-5xl leading-10')]}>{user?.username}</Text>

                    <Text style={tw('text-lg mb-4 text-center text-white font-primary')}>Points: {user?.points}</Text>

                    <Text style={tw('text-lg font-bold mb-2 w-full text-white font-primary')}>
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
                        source={require('images/character/man.png')}
                        style={tw('w-2/3 h-full mb-0 ml-auto mr-auto mt-0')}
                        resizeMode="contain"
                    />
                </View>
            }

            <View style={tw('flex-col')}>
                <View style={[tw('justify-between my-6 flex-wrap  '), isMobile ? tw('flex-col mt-2') : tw('flex-row mt-8')]}>
                    <View style={[tw('mt-0'), isMobile ? tw('w-full mr-0 mb-4') : tw('w-2/4 mr-2')]}>
                        <Text style={tw('text-xl font-bold mb-2 pl-2 text-white font-primary')}>Classement</Text>

                        <View style={tw('bg-white mb-2 py-4 rounded-lg')}>
                            {ranking[0]?.id !== user?.id && (
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
                            <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
                                <Text style={tw('text-blue-500 mt-2 text-center font-primary')}>Voir le classement complet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[tw('flex-1'), isMobile ? tw('') : tw('mr-2')]}>
                        <Text style={tw('text-xl font-bold mb-1 text-white font-primary')}>Hauts faits</Text>
                        {userAchievements.length > 0 ? (
                            <>
                                {userAchievements.slice(0, 2).map((achievement) => (
                                    <View style={tw("flex-row items-center p-4 mt-1 bg-white rounded-lg")} key={achievement.id}>
                                        <AchievementIcon achievement={achievement} />
                                        <View style={tw("ml-3")}>
                                            <Text style={tw("font-bold text-lg font-primary")}>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Achievements')} style={tw('p-2 pb-2 pt-1 mt-1 bg-white rounded-lg')}>
                            {userAchievements.length === 0 ? (
                                <Text style={tw('font-primary')}>Aucun haut fait pour le moment</Text>

                            ) : null}
                            <Text style={tw('text-center text-lg')}
                            >. . .</Text>
                            <Text style={tw('text-blue-500 text-center font-primary')}>Afficher tous les hauts faits</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[tw('justify-between my-6 flex-wrap'), isMobile ? tw('flex-col') : tw('flex-row')]}>
                    <View style={[tw('mt-0'), isMobile ? tw('w-full mr-0 mb-4') : tw('w-2/4 mr-2')]}>

                        <Text style={tw('text-xl font-bold mb-2 text-white font-primary')}>Statistiques</Text>
                        <View style={tw("p-4 bg-white rounded-lg")}>
                            {stats.map((stat) => (
                                <Text style={tw('my-2 font-primary')}
                                    key={stat.id}>
                                    {stat.title}: {stat.count}
                                </Text>
                            ))}
                            <Text style={tw('ml-1 mt-1')}
                            >. . .</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                                <Text style={tw('text-blue-500 mt-1 text-center font-primary')}>Tout afficher</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={tw(`${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center bg-white rounded-lg py-2 px-4 my-4`)}>
                    <TouchableOpacity
                        style={tw(`flex-row items-center justify-center ${isMobile ? 'w-full mb-2 mr-0' : 'w-[32%] mr-2'} bg-secondary py-2 rounded `)}
                        onPress={() => navigation.navigate('Contacts')}
                    >
                        <FontAwesome5 name='user-friends' size={24} color='white' />
                        <Text style={tw('text-white ml-2')}>Mes contacts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw(`flex-row items-center justify-center ${isMobile ? 'w-full mb-2' : 'w-[32%]'} bg-[darkcyan] py-2 rounded mx-2`)}
                        onPress={() => navigation.navigate('Referral')}
                    >
                        <FontAwesome5 name='gift' size={24} color='white' />
                        <Text style={tw('text-white ml-2')}>Parrainer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw(`flex-row items-center justify-center ${isMobile ? 'w-full ml-0' : 'w-[32%] ml-2'} bg-primary py-2 rounded`)}
                        onPress={() => navigation.navigate('ProfileSettings')}
                    >
                        <FontAwesome5 name='cog' size={24} color='white' />
                        <Text style={tw('text-white ml-2')}>Paramètres du compte</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default withAuth(ContentProfileScreen);