import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import withAuth from "services/auth/withAuth";
import { useUser } from "../services/auth/UserContext";
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = (props) => {
    const tw = useTailwind();
    const { user } = useUser();

    const achievements = [
        { id: 1, title: "Premier texte validé" },
        { id: 2, title: "10 annotations créées" },
    ];

    const stats = [
        { id: 1, title: "Textes validés", count: 5 },
        { id: 2, title: "Annotations créées", count: 15 },
    ];

    const ranking = [
        { position: 31, username: "Utilisateur31", points: 540 },
        { position: 32, username: user?.username, points: 530 },
        { position: 33, username: "Utilisateur33", points: 520 },
    ];

    const { navigation } = props;

    return (
        <View style={tw("flex-1 justify-center items-center p-4")}>
            <Text style={tw("text-2xl font-bold mb-2")}>{user?.username}</Text>

            <Text style={tw("text-lg mb-4")}>Points: {user?.points}</Text>
            <Text style={tw(" text-base mb-1")}>
                {user?.email ? user.email : "Vous n'avez pas renseigné d'email"}
            </Text>
            <View>
                <Text style={tw("text-xl font-bold mb-2")}>Hauts faits</Text>
                {achievements.map((achievement) => (
                    <Text key={achievement.id}>{achievement.title}</Text>
                ))}
                <TouchableOpacity onPress={() => navigation.navigate("Achievements")}>
                    <Text style={tw("text-blue-500 mt-1")}>Tout afficher</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={tw("text-xl font-bold mt-4 mb-2")}>Statistiques</Text>
                {stats.map((stat) => (
                    <Text key={stat.id}>
                        {stat.title}: {stat.count}
                    </Text>
                ))}
                <TouchableOpacity onPress={() => navigation.navigate("Stats")}>
                    <Text style={tw("text-blue-500 mt-1")}>Tout afficher</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={tw("text-xl font-bold mt-4 mb-2")}>Classement</Text>
                {ranking.map((rank) => (
                    <Text key={rank.position}>
                        {rank.position}. {rank.username} - {rank.points} points
                    </Text>
                ))}
                <TouchableOpacity onPress={() => navigation.navigate("Rankings")}>
                    <Text style={tw("text-blue-500 mt-1")}>Voir le classement complet</Text>
                </TouchableOpacity>
            </View>

            <View style={tw("flex-row mt-4")}>
                <TouchableOpacity
                    style={tw("bg-blue-500 px-4 py-2 rounded mr-2")}
                    onPress={() => navigation.navigate("Contacts")}
                >
                    <Text style={tw("text-white")}>
                        <FontAwesome5 name="user-friends" size={24} color="black" />
                        Mes contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw("bg-green-500 px-4 py-2 rounded ml-2")}
                    onPress={() => navigation.navigate("Refer")}
                >
                    <Text style={tw("text-white")}>Parrainer quelqu'un</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default withAuth(ProfileScreen);
