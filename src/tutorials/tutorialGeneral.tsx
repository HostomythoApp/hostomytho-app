
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from 'navigation/Types';
// const navigation = useNavigation<RootStackNavigationProp<"ReglesDuJeu">>();

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}>
            Bienvenue enquêteur. Vous avez été mandaté pour démasquer des criminels cachés dans notre hôpital. Votre mission : explorer l'hôpital à la recherche d'indices et de pistes.
            Attention, ces criminels sont rusés et se dissimulent parmi les médecins et les patients.{"\n"}
            En étudiant attentivement des documents et des dossiers des patients, vous pourrez déceler des anomalies ou des incohérences qui vous guideront sur la bonne voie.
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Nous vous avons mis à votre disposition un bureau. Ici, vous avez accès aux classements des meilleurs enquêteurs qui essaieront vous passer devant.
            Menez l'enquête et attrapez des criminels pour montrer que vous êtes le meilleur.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Vous retrouvez aussi ici les hauts faits. Ce sont des tâches particulières à accomplir. Les accumuler vous permettra de gagner plus de points et d'avancer plus rapidement dans vos enquêtes. Ne les négligez donc pas !
        </Text>;

        case 4: return <Text style={tw('font-primary')}>
            En cliquant en bas à gauche, vous accéder à votre buanderie. Vous pourrez y changer d'apparence et de style si vous souhaitez devenir le plus classe. Certains objets sont très rares, et vous pourrez, avec, frimer devant tous les autres.
        </Text>;

        case 5: return <Text style={tw('font-primary')}>
            Assez parlé, commencez l'enquête en allant voir votre tableau de bord en cliquant sur la flêche en haut à gauche.
        </Text>;

        case 6: return <Text style={tw('font-primary')}>
            Voici votre tableau de bord. Ici, vous pouvez vous lancer dans la recherche d'indices. Vous avec, pour ce faire, accès à des dossiers patients.
            Dans vos analyses de documents, vous n'aurez, la plupart du temps, pas d'indication de si votre réponse est bonne ou fausse.
            Sauf quelques fois, où nous mettrons nous-même des textes piègés, afin de voir vos compétences et savoir si nous pouvons vous faire confiance.
            L'hôpital est rempli de menteurs, et nous ne savons plus à qui faire confiance..
        </Text>;

        case 7: return <Text style={tw('font-primary')}>
            Quand vous pensez savoir qui est le criminel, vous pouvez tenter de l'arrêter dans la partie "suspect".
        </Text>;

        case 8: return <Text style={tw('font-primary')}>
            Si vous êtes perdus, vous avez à plusieurs endroits des boutons d'aide.
            Vous pouvez également consulter les règles complètes des enquêtes dans notre hôpital ici :
            {/* <TouchableOpacity onPress={() => navigation.navigate("ReglesDuJeu")} style={tw('bg-primary py-2 px-4 rounded self-center mb-4')}>
                <Text style={tw('text-white font-bold text-center font-primary')}>Règles Du Jeu</Text>
            </TouchableOpacity> */}
        </Text>;

        case 9: return <Text style={tw('font-primary')}>
            Pour commencer, aller là où sont les icones de notifications. Un collègue vous aiguillera et jugera vos compétences d'enquêteurs.
            Bonne chance dans vos enquêtes !
        </Text>;


        default: return null;
    }
};


