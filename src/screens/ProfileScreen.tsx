import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "../data/fakeUserData";
import user from "../globalState";
import { getUsers } from "../services/api/user";
import withAuth from "services/auth/withAuth";


const ProfileScreen = (props) => {
    const tw = useTailwind();

    const [xp, setXp] = useState(data.member[user.idUser].xp);
    const xpToLevelUp = 50;
    const level = Math.floor(xp / xpToLevelUp) + 1;
    const xpPercentage = ((xp % xpToLevelUp) / xpToLevelUp) * 100;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUsers();
            setUsers(response.data);
        };
        fetchData();
    }, []);

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <Text style={tw("text-2xl font-bold")} >{data.member[0].login}</Text>
            <Image source={{ uri: data.member[user.idUser].avatarUrl }}
                style={{ width: 100, height: 100 }} />
            <View style={tw("justify-center items-center bg-black h-1 w-full")}>
                <View style={[tw("bg-lime-700 h-full"), { width: `${xpPercentage}%` }]}></View>
            </View>
            <Text style={tw("mt-1 text-xs h-1")}>{`${xpPercentage.toFixed(1)}% XP (${level})`}</Text>
        </View>
    );
};


export default withAuth(ProfileScreen);