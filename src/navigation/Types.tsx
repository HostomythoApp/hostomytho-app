import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Menu: undefined;
    Profil: undefined;
    MythoTempo: undefined;
    Plausibilites: undefined;
    TemporalEntityScreen: undefined;
    Connected: undefined;
    Connexion: undefined;
    Login: undefined;
    Parametres: undefined;
    Notif: undefined;
    Aide: undefined;
    PolitiqueDeConfidentialite: undefined;
    Theme: undefined;
    Classement: undefined;
    ClassementMensuel: undefined;
    AdminHome: undefined;
    MotDePasseOublie: undefined;
    TableauDeBord: undefined;
    HypoMytho: undefined;
    MythoTypo: undefined;
    TemporalEntity: undefined;
    MythoOuPas: undefined;
    CondiMytho: undefined;
    Criminels: undefined;
    MythoNo: undefined;
    HautsFaits: undefined;
    Statistiques: undefined;
    Contacts: undefined;
    Referral: undefined;
    ParametreProfil: undefined;
    Investigation: undefined;
    Modal: undefined;
    Objectifs: undefined;
    ReglesDuJeu: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
    RootStackParamList,
    T
>;

export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
