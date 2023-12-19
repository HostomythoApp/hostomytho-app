import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import { getUsersOrderedByPointsInMonthly } from 'services/api/user';
import { User } from "models/User";
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const RankingMonthScreen = ({ }) => {
    const tw = useTailwind();
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const { user } = useUser();
    const currentUserId = user?.id;

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        getUsersOrderedByPointsInMonthly(page)
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
                tw('p-2 flex-row items-center justify-between'),
                item.id === currentUserId ? tw('bg-blue-300') :
                    index % 2 === 0 ? tw('bg-blue-100') : tw('bg-white'),
            ]}
        >
            <Text>
                {item.ranking}. {item.username}
            </Text>
            <Text>{item.monthly_points} points</Text>
        </View>
    );

    return (
        <ScrollView style={tw('')}>
            <CustomHeaderEmpty title="Classement du mois en cours" backgroundColor="bg-white" />
            <View style={tw("flex-1 p-4 mx-auto min-w-[540px] pt-20")}>
                {users.map((item, index) => renderItem({ item, index }))}
                <View style={tw('flex-row mt-2 justify-between')}>
                    {page > 1 ? (
                        <TouchableOpacity onPress={() => setPage(page - 1)}>
                            <Text style={tw('text-blue-500')}>Page précédente</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={tw('flex-1')} />
                    )}

                    {hasMoreUsers ? (
                        <TouchableOpacity onPress={() => setPage(page + 1)}>
                            <Text style={tw('text-blue-500')}>Page suivante</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={tw('flex-1')} />
                    )}
                </View>
            </View>
        </ScrollView>
    );

};

export default RankingMonthScreen;
