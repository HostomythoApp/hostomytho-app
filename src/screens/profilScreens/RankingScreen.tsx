import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { getUsersOrderedByPoints } from 'services/api/user';
import { User } from "models/User";
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackNavigationProp } from "navigation/Types";

const RankingScreen = ({ }) => {
    const tw = useTailwind();
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const { user } = useUser();
    const currentUserId = user?.id;
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        getUsersOrderedByPoints(page)
            .then((result: any) => {
                setUsers(result.data);

                if (result.data.length < limit) {
                    setHasMoreUsers(false);
                } else {
                    setHasMoreUsers(true);
                }
            });

    };
    const renderItem = ({ item, index }: { item: User, index: number }) => (
        <View
            key={item.id}
            style={[
                tw('py-2 px-4 flex-row items-center justify-between'),
                item.id === currentUserId ? tw('bg-blue-300') :
                    index % 2 === 0 ? tw('bg-blue-100') : tw('bg-white'),
            ]}>
            <TouchableOpacity style={tw('flex-row')}
                onPress={() => navigation.navigate("ProfilJoueur", { userId: item.id })}><Text style={tw('font-primary mr-1')}>
                    {item.ranking}. {item.username}
                </Text>
                {Array.from({ length: item.nb_first_monthly || 0 }).map((_, index) => (

                    <Image source={require('images/ranking_1.png')} style={tw('w-5 h-6')} resizeMode="contain" />
                ))}
            </TouchableOpacity>
            <Text style={tw('font-primary')}>{item.points} points</Text>
        </View>
    );

    return (
        <ImageBackground
            source={require('images/bg_office.jpg')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            <View style={tw("flex-1 items-center text-black")}>
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                    <CustomHeaderEmpty title="Classement général" backgroundColor="bg-whiteTransparent" />

                    <View style={tw("flex-1 p-4 mx-auto min-w-[540px] pt-20 justify-center")}>
                        <TouchableOpacity style={tw(`flex-row items-center px-4  w-1/2 mb-5 bg-secondary py-2 rounded self-end`)}
                            onPress={() => navigation.navigate('ClassementMensuel')}>
                            <Text style={tw('font-primary text-white mr-2')}>Voir le classement mensuel</Text>
                            <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
                        </TouchableOpacity>

                        {users.map((item, index) => renderItem({ item, index }))}
                        <View style={tw('flex-row mt-2 justify-between')}>
                            {page > 1 ? (
                                <TouchableOpacity style={tw('py-2 px-3 rounded-xl bg-white')}
                                    onPress={() => setPage(page - 1)}>
                                    <Text style={tw('text-black font-primary')}>Page précédente</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={tw('flex-1')} />
                            )}

                            {hasMoreUsers ? (
                                <TouchableOpacity style={tw('py-2 px-3 rounded-xl bg-white')}
                                    onPress={() => setPage(page + 1)}>
                                    <Text style={tw('text-black font-primary')}>Page suivante</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={tw('flex-1')} />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground >
    );
};

export default RankingScreen;
