import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/auth/withAuth';
import { useUser } from 'services/auth/UserContext';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import PrimaryButton from "components/PrimaryButton";
import { getUserRankingRange } from 'services/api/user';

const ProfileScreen = (props: any) => {
    const tw = useTailwind();
    const { user } = useUser();

    const [ranking, setRanking] = useState([]);

    const achievements = [
        { id: 1, title: 'Compléter 10 parties.', picto: <MaterialCommunityIcons name="numeric-10-box-multiple" size={24} color="mediumseagreen" /> },
        { id: 2, title: 'Atteindre 100 points de réputation.', picto: <SimpleLineIcons name="badge" size={24} color="#CD7F32" /> },
    ];

    const stats = [
        { id: 1, title: 'Textes validés', count: 5 },
        { id: 2, title: 'Annotations créées', count: 15 },
    ];

    const { navigation } = props;

    const currentPoints = user?.points || 0;
    const nextRewardPoints = 1000;
    const pointsForProgress = currentPoints % nextRewardPoints;
    const pointsPercentage = (pointsForProgress / nextRewardPoints) * 100;

    useEffect(() => {
        const fetchRanking = async () => {
            if (user?.id) {
                const result = await getUserRankingRange(user.id);
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

                <Text style={tw('text-lg mb-4 text-center')}>Points: {user?.points}</Text>

                <View style={tw('w-full mt-4')}>
                    <Text style={tw('text-lg font-bold mb-2')}>
                        Progression avant la prochaine récompense
                    </Text>
                    <View style={tw('bg-gray-300 h-4 rounded')}>
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

                <View style={tw(' bg-white mt-8 mb-2 py-2')}>
                    <Text style={tw('text-xl font-bold mb-2 pl-2')}>Classement</Text>
                    <Text style={tw('pl-2')}
                    >. . .</Text>
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

                    <Text style={tw('pl-2')}
                    >. . .</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
                        <Text style={tw('text-blue-500 mt-2')}>Voir le classement complet</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw('flex-row justify-between my-6')}>
                    <View style={tw('flex-1 mr-2')}>
                        <Text style={tw('text-xl font-bold mb-2')}>Hauts faits</Text>
                        {achievements.map((achievement) => (
                            <Text style={tw('flex my-1')}
                                key={achievement.id}>{achievement.picto}  {achievement.title}</Text>
                        ))}
                        <Text>. . .</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
                            <Text style={tw('text-blue-500 mt-1')}>Tout afficher</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw('border-r border-gray-300 h-full mx-2')} />
                    <View style={tw('flex-1 ml-2')}>
                        <Text style={tw('text-xl font-bold mb-2')}>Statistiques</Text>
                        {stats.map((stat) => (
                            <Text style={tw('my-1')}
                                key={stat.id}>
                                {stat.title}: {stat.count}
                            </Text>
                        ))}
                        <Text>. . .</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                            <Text style={tw('text-blue-500 mt-1')}>Tout afficher</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={tw('flex-row items-center justify-center mt-4')}>
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

                <PrimaryButton title="Paramètres du profil" destination="ProfileSettings" />
            </View>
        </ScrollView>
    );
};

export default withAuth(ProfileScreen);
