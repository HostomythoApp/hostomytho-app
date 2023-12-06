
import { MaterialIcons } from '@expo/vector-icons';

import { Text, TouchableWithoutFeedback } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}> Certains passages de textes ont spécialement attiré votre attention. Il faudrait les ordonner un peu pour éclaircir les pistes. Spécifier donc quel est le type des erreurs de ces textes.
            {"\n"}
            Il peut y avoir plusieurs types d'erreurs : les erreurs de français pour les erreurs grammaticales, ou de français en général. Les erreurs de vocabulaire médicale pour les erreurs de termes médicaux,
            et les erreurs de cohérence médicale pour les incohérences et erreurs médicales. Si vous pensez que l'erreur est d'un autre type, choisissez le bouton "Autre".
            Enfin, si vous trouvez que ce n'est pas une erreur, cliquez sur "Pas d'erreur".
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Si l'erreur est de plusieurs types, selectionnez le type qui vous semble le plus important.
            {"\n\n"}
            Et si vous avez un doute et que vous souhaitez ne pas répondre, cliquez sur le bouton
            <MaterialIcons name="next-plan" size={24} color="black" />
            en haut à droite pour passer au prochain exemple. Vous pourrez l'utiliser dès la fin du tutoriel.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Nous avons fait le tour des explications.
            {"\n\n"}
            Essayez de traiter ces quelques textes supplémentaires, et si vous obtenez au moins 4 bonnes réponses, vous pourrez vous lancer à la recherche d'indice.
            {"\n\n"}
            Bon courage !
        </Text>;

        case 98: return <Text style={tw('font-primary')}>
            Vous savez désormais spécifier les types d'erreur. À vous de jouer.
            {"\n\n"}
            Le bouton avec le point d'interrogation en haut à droite vous permet d'accéder au rappel des consignes, et vous pourrez y relancer ce tutoriel si vous le souhaitez.
            {"\n\n"}
            Bon courage dans vos recherches !
        </Text>;

        case 99: return <Text style={tw('font-primary')}>
            Vous avez fait un peu trop d'erreurs. Il est plus prudent de refaire l'exercice, sinon vous risquez de partir sur de mauvaises pistes.
            {"\n\n"}
            Du coup, recommençons depuis le début..
        </Text>;

        default: return null;
    }
};


export const getModalHelpContent = (tw: any) => {
    const ItalicPhrase = ({ children }: { children: any }) => {
        return <Text style={tw('italic')}>{children}</Text>;
    };

    const HighlightedText = ({ children }: { children: any }) => {
        return <Text style={tw('text-[#5077BE] font-bold')}>{children}</Text>;
    };

    return <TouchableWithoutFeedback>
        <Text style={tw('font-primary')}>
            Le but du jeu est de spécifier le ou les types de l'erreur surlignée.
            Vous devez selectionner au moins un type, et plusieurs sont possibles.
            {"\n\n"}
            Les différents types d'erreurs sont :
            {"\n\n"}
            <HighlightedText>"Français" </HighlightedText> pour les erreurs grammaticales ou de français en général.
            {"\n"}
            <ItalicPhrase>
                - "Les symptôme du patient sont très variés et <HighlightedText>inclut </HighlightedText>des maux de tête."
            </ItalicPhrase>
            {"\n"}
            Il y a un problème de conjugaison avec le verbe inclure qui devraient être au pluriel."
            {"\n\n"}

            <HighlightedText>"Vocabulaire médicale" </HighlightedText> pour les erreurs de termes médicaux.
            {"\n"}
            <ItalicPhrase>
                - "On note également une déviation de la tige pituitaire à gauche <HighlightedText>pituitère</HighlightedText>."
            </ItalicPhrase>
            {"\n"}
            Le mot s'écrit "pituitaire"
            {"\n\n"}

            <HighlightedText>"Cohérence médicale" </HighlightedText> pour les incohérences et erreurs médicales.
            {"\n"}
            <ItalicPhrase>
                - "Lors de sa visite pour un vaccin contre la grippe, il a été annoncé au jeune garçon qu'il devait subir <HighlightedText> une radiographie du thorax pour examiner la santé de ses dents de sagesse</HighlightedText>."
            </ItalicPhrase>
            {"\n"}
            L'erreur vient de l'incohérence de l'information.'
            {"\n\n"}
        </Text>
    </TouchableWithoutFeedback>;
}