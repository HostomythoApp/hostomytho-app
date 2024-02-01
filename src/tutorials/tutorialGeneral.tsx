
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export const getTutorialContentForStep = (step: number, tw: any, navigation?: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}>
            Bienvenue, enquêteur. Vous avez été mandaté pour démasquer des criminels dissimulés dans notre hôpital. Votre mission consiste à explorer l'hôpital à la recherche d'indices et de pistes. Faites attention, ces criminels sont rusés et se cachent parmi les médecins et les patients.{"\n"}
            En examinant minutieusement les documents et les dossiers des patients, vous pourrez identifier des anomalies ou des incohérences qui vous mettront sur la bonne voie.
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Un bureau vous est dédié. Ici, vous accéderez aux classements des meilleurs enquêteurs, avec qui vous êtes en compétition. Résolvez des énigmes et attrapez des criminels pour prouver que vous êtes le meilleur.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Vous trouverez également ici les hauts faits, qui sont des tâches spécifiques à accomplir. En les réalisant, vous gagnerez de plus en plus de points, ce qui accélérera votre progression dans les enquêtes. Ne les négligez pas !
        </Text>;

        case 4: return <Text style={tw('font-primary')}>
            En cliquant en bas à gauche, vous accéderez à votre garde-robe. Vous pourrez y changer d'apparence et de style pour adopter un look distingué. Certains objets sont très rares et vous permettront de vous vanter auprès des autres.
            Pour gagner ces apparences, gagnez des récompenses en remplissant la barre de progression visible ici.
        </Text>;

        case 5: return <Text style={tw('font-primary')}>
            Assez parlé, et passons aux choses sérieuses. Allons voir votre tableau de bord, accessible via la flèche en haut à gauche.
        </Text>;

        case 6: return <Text style={tw('font-primary')}>
            Voici votre tableau de bord. Ici, vous pouvez lancer la recherche d'indices en accédant aux dossiers des patients. La plupart du temps, vous ne recevrez pas d'indication sur l'exactitude de vos réponses. Parfois, nous insérerons des textes pièges pour tester vos compétences et vérifier si vous êtes digne de confiance. L'hôpital regorge de menteurs, et il est difficile de savoir à qui se fier.
        </Text>;

        case 7: return <Text style={tw('font-primary')}>
            Lorsque vous pensez avoir identifié le criminel, vous pouvez tenter de l'arrêter dans la section "suspect". Soyez certain de votre choix, car une erreur pourrait sérieusement ralentir votre progression.
        </Text>;

        case 8: return <Text style={tw('font-primary')}>
            Consultez les règles complètes des enquêtes dans notre hôpital ici :
            {"\n"}
            <View style={tw('items-center w-full my-1')}>
                <TouchableOpacity onPress={() => navigation.navigate("ReglesDuJeu")} style={tw('bg-primary py-2 px-4 rounded self-center')}>
                    <Text style={tw('text-white font-bold text-center font-primary')}>Règles du Jeu</Text>
                </TouchableOpacity>
            </View>
            {"\n"}
            Vous pouvez également les retrouver en cliquant sur le bouton en haut à gauche.
            {"\n"}
            En cas de besoin, vous trouverez des boutons d'aide à divers endroits :
            <View style={tw('items-center w-full my-1')}>
                <TouchableOpacity style={tw('bg-[#BBF7D0] p-2 mr-2 text-center w-11 rounded-b-md')}>
                    <Entypo name="help" size={16} color="#253529" style={tw('self-center')} />
                </TouchableOpacity>
            </View>
        </Text>;

        case 9: return <Text style={tw('font-primary')}>
            {"Vous pouvez commencer par là où sont les icones de notifications  "}
            <View style={{
                borderRadius: 100,
                backgroundColor: "rgb(223, 94, 28)",
                alignItems: 'center',
                justifyContent: 'center',
                width: 17,
                height: 18
            }}>
                <FontAwesome name="exclamation" size={15} color="white" />
            </View>
            {"\n"}
            Un collègue médecin vous orientera et évaluera vos compétences d'enquêteur.
            {"\n"}
            Bonne chance dans vos enquêtes !
        </Text>;

        default: return null;
    }
};


