import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Main: undefined;
    Profile: undefined;
    TemporalLinkGameScreen: undefined;
    PlausibilityGame: undefined;
    TemporalEntityScreen: undefined;
    Home: undefined;
    Connected: undefined;
    Login: undefined;
    SignUpScreen: undefined;
    Settings: undefined;
    Notif: undefined;
    Help: undefined;
    PrivacyPolicy: undefined;
    Theme: undefined;
    Ranking: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
    RootStackParamList,
    T
>;

export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
