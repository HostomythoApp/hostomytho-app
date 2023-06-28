import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
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
        <ScrollView style={tw('flex-1 p-4')}>
            <View style={tw('mx-auto min-w-[540px]')}>
                <Text style={tw('text-2xl font-bold mb-2 text-center')}>{user?.username}</Text>
                {/* TODO Vérifier la synchronisation des points avec la bdd */}
                <Text style={tw('text-lg mb-4 text-center')}>Points: {user?.points}</Text>

                <View style={tw('w-full mt-4')}>
                    <Text style={tw('text-lg font-bold mb-2 w-full')}>
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
                    <Text style={tw('text-xs mt-1')}>
                        {pointsForProgress} / {nextRewardPoints} points
                    </Text>
                </View>

                <Text style={tw('text-xl font-bold mt-8 mb-2 pl-2')}>Classement</Text>
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

                <View style={tw('flex-row justify-between my-6')}>

                    <View style={tw('flex-1 mr-2')}>
                        <Text style={tw('text-lg font-bold mb-2')}>Hauts faits</Text>
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

                    <View style={tw('border-r border-gray-300 h-full mx-2')} />
                    <View style={tw('flex-1 ml-2')}>
                        <Text style={tw('text-xl font-bold mb-2')}>Statistiques</Text>
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
    );
};

export default withAuth(ProfileScreen);
