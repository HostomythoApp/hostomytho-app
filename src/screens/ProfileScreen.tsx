import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import PrimaryButton from "components/PrimaryButton";
import { getUserRankingRange } from 'services/api/user';
import { getUserAchievements } from 'services/api/achievements';
import { Achievement } from 'models/Achievement';
// import AchievementItem from "components/AchievementItem";
import AchievementIcon from 'components/AchievementIcon';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';

interface Rank {
    id: number;
    ranking: number;
    username: string;
    points: number;
}

const ProfileScreen = (props: any) => {
    const tw = useTailwind();
    const { user } = useUser();
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
    }, [user]);

    return (
        <ImageBackground
            source={require('images/bg_desk.png')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            <View style={tw("absolute inset-0 bg-black opacity-50")}></View>

            <CustomHeaderEmpty backgroundColor='bg-transparent' textColor='white' />
            <View style={tw('flex-1 flex-row items-start justify-start relative')}>
                <View style={tw('w-1/4 h-full items-end justify-center')}>
                    <Image
                        source={require('images/character.png')}
                        style={tw('w-full h-4/5 mb-0 ml-0 mr-auto mt-auto')}
                        resizeMode="contain"
                    />
                </View>
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center z-20")} style={[tw('w-3/5 h-full'), { marginright: '5%' }]}>
                    <View style={tw('w-full pt-14 px-2 max-w-5xl')}>
                        <Text style={tw('text-2xl font-bold mb-2 text-center text-white')}>{user?.username}</Text>

                        <Text style={tw('text-lg mb-4 text-center text-white')}>Points: {user?.points}</Text>

                        <View style={tw('w-full mt-4')}>
                            <Text style={tw('text-lg font-bold mb-2 w-full text-white')}>
                                Progression avant la prochaine récompense
                            </Text>
                            <View style={tw('bg-gray-300 h-4 rounded ')}>
                                <View
                                    style={[
                                        tw('bg-blue-500 h-full rounded-l'),
                                        { width: `${pointsPercentage}%` },
                                    ]}
                                ></View>
                            </View>
                            <Text style={tw('text-xs mt-1 text-white')}>
                                {pointsForProgress} / {nextRewardPoints} points
                            </Text>
                        </View>

                        <Text style={tw('text-xl font-bold mt-8 mb-2 pl-2 text-white')}>Classement</Text>
                        <View style={tw('bg-white mb-2 py-2')}>
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
                                    <Text>
                                        {rank.ranking}. {rank.username}
                                    </Text>
                                    <Text>{rank.points} points</Text>
                                </View>
                            ))}
                            {ranking[ranking.length - 1]?.id !== user?.id && (
                                <Text style={tw('pl-2')}>. . .</Text>
                            )}
                            <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
                                <Text style={tw('text-blue-500 mt-2 text-center')}>Voir le classement complet</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[tw('justify-between my-6 flex-wrap'), isMobile ? tw('flex-col') : tw('flex-row')]}>
                            <View style={[tw('flex-1'), isMobile ? tw('mr-0 mb-4') : tw('mr-2')]}>
                                <Text style={tw('text-lg font-bold mb-2 text-white')}>Hauts faits</Text>
                                {userAchievements.length > 0 ? (
                                    <>
                                        {userAchievements.slice(0, 2).map((achievement) => (
                                            <View style={tw("flex-row items-center p-4 bg-white rounded-lg")} key={achievement.id}>
                                                <AchievementIcon achievement={achievement} />
                                                <View style={tw("ml-3")}>
                                                    <Text style={tw("font-bold text-lg")}>
                                                        {achievement.name}
                                                    </Text>
                                                    <Text style={tw("text-gray-600 text-xs")}>
                                                        {achievement.description}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                        <Text style={tw('text-center text-lg')}
                                        >. . .</Text>
                                    </>
                                ) : (
                                    <Text style={tw('text-gray-600')}>Aucun haut fait pour le moment</Text>
                                )}
                                <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
                                    <Text style={tw('text-blue-500 mt-3 text-center')}>Afficher tous les hauts faits</Text>
                                </TouchableOpacity>
                            </View>

                            {!isMobile && <View style={tw('border-r border-gray-300 h-full mx-2')} />}
                            <View style={tw('flex-1')}>
                                <Text style={tw('text-xl font-bold mb-2 text-white')}>Statistiques</Text>
                                <View style={tw(" p-4 bg-white rounded-lg")}>
                                    {stats.map((stat) => (
                                        <Text style={tw('my-2')}
                                            key={stat.id}>
                                            {stat.title}: {stat.count}
                                        </Text>
                                    ))}
                                    <Text style={tw('ml-1 mt-1')}
                                    >. . .</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                                        <Text style={tw('text-blue-500 mt-2 text-center')}>Tout afficher</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>


                        <View style={tw('flex-row items-center justify-center my-4')}>
                            <TouchableOpacity
                                style={tw('bg-blue-500 px-4 py-2 rounded mr-2')}
                                onPress={() => navigation.navigate('Contacts')}
                            >
                                <Text style={tw('text-white flex')}>
                                    <FontAwesome5 style={tw('mr-2')} name='user-friends' size={24} color='white' />
                                    Mes contacts
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tw('bg-green-500 px-4 py-2 rounded ml-2')}
                                onPress={() => navigation.navigate('Referral')}
                            >
                                <Text style={tw('text-white flex')}>
                                    Parrainer quelqu'un
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={tw('mb-4')}
                        >
                            <PrimaryButton title="Paramètres du profil" destination="ProfileSettings" />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default withAuth(ProfileScreen);