
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const getTutorialContentForStep = (step: number, tw: any, navigation?: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}>
            Bienvenue, enquêteur. Vous avez été mandaté pour démasquer des criminels dissimulés dans notre hôpital, se faisant passer pour des médecins et des patients. 
            Votre mission consiste à examiner des dossiers patients, et d'identifier des anomalies ou des incohérences, afin de débusquer les faux médecins et les faux malades.
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Un bureau vous est dédié. Ici, vous accéderez aux classements des meilleurs enquêteurs, avec qui vous êtes en compétition. Résolvez des énigmes et attrapez des criminels pour prouver que vous êtes le meilleur.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Vous trouverez également ici les hauts faits, qui sont des tâches spécifiques à accomplir. En les réalisant, vous accélérerez votre progression dans les enquêtes et votre gain de points. Ne les négligez pas !
        </Text>;

        case 4: return <Text style={tw('font-primary')}>
            En cliquant en bas à gauche, vous accéderez à votre garde-robe. Vous pourrez y changer d'apparence et de style pour adopter un look distingué.
            Pour gagner ces apparences, gagnez des récompenses en remplissant la barre de progression visible ici.
        </Text>;

        case 5: return <Text style={tw('font-primary')}>
            Assez parlé, et passons aux choses sérieuses. Allons voir votre tableau de bord, accessible via la flèche en haut à gauche.
        </Text>;

        case 6: return <Text style={tw('font-primary')}>
            Voici votre tableau de bord. Ici, vous avez accès à différents mini-jeux qui vous permettront de gagner des points et avancer dans l'enquête. 
        </Text>;

        case 7: return <Text style={tw('font-primary')}>
            Lorsque vous pensez avoir identifié le criminel, vous pouvez tenter de l'arrêter dans la section "suspect".
        </Text>;

        case 8:
            return (
                <Text style={tw('font-primary')}>
                    Consultez les règles complètes des enquêtes dans notre hôpital ici :
                    {"\n\n"}
                    <TouchableOpacity onPress={() => navigation.navigate("ReglesDuJeu")} style={tw('bg-primary py-2 px-4 rounded self-center')}>
                        <Text style={tw('text-white font-bold text-center font-primary')}>Règles du Jeu</Text>
                    </TouchableOpacity>
                    {"\n"}
                    Vous pouvez les retrouver en cliquant sur le bouton en haut à gauche.
                </Text>
            );

        case 9: return (
            <Text style={tw('font-primary text-base')}>
                Commencez par le jeu «Mytho Ou Pas».
                Un collègue médecin vous orientera et évaluera vos compétences d'enquêteur.
                {"\n"}
                En cas de besoin, vous trouverez des boutons d'aide à divers endroits :
                <View style={tw('bg-[#BBF7D0] p-2 mr-2 text-center w-11 rounded-b-md')}>
                    <Entypo name="help" size={16} color="#253529" style={tw('self-center')} />
                </View>
                {"\n"}
                Bonne chance dans vos enquêtes !
            </Text>
        );

        default: return null;
    }
};


export const getMessageMainBoardContent = (tw: any) => {
    return (
        <TouchableWithoutFeedback>
            <Text style={tw('font-primary')}>
                Bienvenue sur HostoMytho
                Ici, vous pouvez essayer de jouer aux différents jeux d'annotations, mais si vous souhaitez tenter d'arrêter les criminels et vous mesurer aux autres enquêteurs, créez un compte, ça ne prend que quelques secondes !
                Les données d'annotations que vous produirez en étant connecté et en jouant, seront récupérées et serviront à la science.
            </Text>
        </TouchableWithoutFeedback>
    );
}

