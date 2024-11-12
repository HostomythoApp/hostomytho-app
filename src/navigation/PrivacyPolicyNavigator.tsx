import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrivacyPolicyScreen from "screens/settingsScreens/PrivacyPolicyScreen";

const Stack = createNativeStackNavigator();

function PrivacyPolicyNavigator() {
    return (
        <Stack.Navigator initialRouteName="PolitiqueDeConfidentialite">
            <Stack.Screen name="PolitiqueDeConfidentialite" component={PrivacyPolicyScreen}

                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default PrivacyPolicyNavigator;
