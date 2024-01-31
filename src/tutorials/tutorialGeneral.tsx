
import { Text } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}>

            Bienvenue enquêteur. Vous avez été mandaté pour démasquer des criminels cachés dans notre hôpital. Votre mission : explorer l'hôpital à la recherche d'indices et de pistes.
            Attention, ces criminels sont rusés et se dissimulent parmi les médecins et les patients.{"\n"}
            En étudiant attentivement des documents et des dossiers des patients, vous pourrez déceler des anomalies ou des incohérences qui vous guideront sur la bonne voie.

        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Explication des jeux.{"\n"}
            Dire qu'ils n'auront pas toujours la correction.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Description tableau de bord, avec notif tuto
        </Text>;

        case 4: return <Text style={tw('font-primary')}>
            Dire que bouton d'aide sur les pages, et page des règles entières
        </Text>;

        case 5: return <Text style={tw('font-primary')}>
            Cliquez sur bouton en bas à droite pour visiter le reste du bureau
        </Text>;

        case 6: return <Text style={tw('font-primary')}>
            Ici se trouve d'avantage d'informations vous concernant, vous et votre avancée dans votre travail. Je vous récompense si vous effectuez du bon travail. La jauge en haut montre mon envie de vous en offrir.
        </Text>;

        case 7: return <Text style={tw('font-primary')}>
            Les classements et statistiques vous permette de faire le point sur vos compétences et vos exploits dans cet hopital. Les hauts faits sont des tâches particulières à accomplir. Les collectionner vous permettra de gagner plus de points et d'avancer plus rapidement dans vos enquêtes. Ne les négligez donc pas !
        </Text>;

        case 8: return <Text style={tw('font-primary')}>
            Enfin, vous pouvez changer d'apparence et de style si vous souhaitez devenir l'enquêteur le plus classe du milieu. Certains objets sont très rares, et vous pourrez, avec, frimer devant tous les autres.
        </Text>;

        case 9: return <Text style={tw('font-primary')}>
            Fin et dire que tutos dans jeu.
        </Text>;


        default: return null;
    }
};


