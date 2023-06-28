import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "screens/AdminScreens/AdminHomeScreen";

const Stack = createNativeStackNavigator();

function AdminNavigator() {
    return (
        <Stack.Navigator initialRouteName="AdminHome">
            <Stack.Screen name="AdminHome" component={AdminHomeScreen}
                options={({ navigation }) => ({
                    header: () => <CustomHeaderEmpty title="Menu principal" navigation={navigation} />,
                })}
            />
        </Stack.Navigator>
    );
}

export default AdminNavigator;
