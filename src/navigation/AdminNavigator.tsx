import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "screens/adminScreens/AdminHomeScreen";

const Stack = createNativeStackNavigator();

function AdminNavigator() {
    return (
        <Stack.Navigator initialRouteName="AdminHome">
            <Stack.Screen name="AdminHome" component={AdminHomeScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default AdminNavigator;
