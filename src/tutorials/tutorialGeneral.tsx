
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

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
                Démarrez par les jeux «Mytho Ou Pas» et «Mytho-Typo» en cliquant sur le tableau de bord.
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


export const getModalHelpContent = (tw: any) => {
    const ItalicPhrase = ({ children }: { children: any }) => {
        return <Text style={tw('italic')}>{children}</Text>;
    };

    const HighlightedText = ({ children }: { children: any }) => {
        return <Text style={tw('text-green-700 italic font-bold')}>{children}</Text>;
    };

    return (
        <TouchableWithoutFeedback>
            <Text style={tw('font-primary')}>
                Vous pouvez essayer ici de jouer aux tâches d'annotations, mais si vous souhaitez tenter d'arrêter les criminels et vous mesurer aux autres enquêteurs, créez un compte, ça ne prend que quelques secondes.
                {"\n\n"}

                {"\n"}
                Sélectionnez le bouton qui correspond au niveau de plausibilité que vous associez au texte. Vous aurez ensuite le choix de passer au texte suivant, ou de préciser où est l'erreur ou le doute que vous avez.
                Les erreurs et doutent peuvent être de type grammaticale, de cohérence médicale, de vocabulaire médicale, ou tout autres types. {"\n"}
                Si vous choisissez de préciser l'erreur, cliquez sur les mots ou phrases qui constituent l'erreur ou la zone de doute, et validez la sélection. Vous pouvez ainsi ajouter plusieurs erreurs. Vérifiez bien d'avoir validé votre dernière selection, et vous pouvez ensuite passer au texte suivant.

                {"\n\n"}
                Exemples d'erreurs dans des phrases :
                {"\n\n"}
                <ItalicPhrase>
                    "Lors de sa visite pour un vaccin contre la grippe, il a été annoncé au jeune garçon qu'il devait subir <HighlightedText> une radiographie du thorax pour examiner la santé de ses dents de sagesse</HighlightedText>."
                </ItalicPhrase>
                {"\n"}
                - Il faut spécifier : <HighlightedText>"une radiographie du thorax pour examiner la santé de ses dents de sagesse"</HighlightedText>
                {"\n\n"}


            </Text>
        </TouchableWithoutFeedback>
    );
}

