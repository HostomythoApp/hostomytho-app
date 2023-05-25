import CustomHeader from "components/header/CustomHeader";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "screens/AdminScreens/AdminHomeScreen";

const Stack = createNativeStackNavigator();

function AdminNavigator() {
    return (
        <Stack.Navigator initialRouteName="AdminHome">
            <Stack.Screen name="AdminHome" component={AdminHomeScreen}
                options={({ navigation }) => ({
                    header: () => <CustomHeader title="Menu principal" navigation={navigation} />,
                })}
            />
        </Stack.Navigator>
    );
}

export default AdminNavigator;
