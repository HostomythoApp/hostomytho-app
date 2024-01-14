import { MaterialIcons } from '@expo/vector-icons';

import { Text, TouchableWithoutFeedback, View } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}> Voici des dossiers patients. Sélectionnez les absences de quelque chose dans le texte ; cela vous permettra de trouver des indices. 
            {"\n"}
            Par exemple, si le texte contient "Le bilan d'extension du patient malade est sans particularité.", il faut identifier les mots "sans particularité".
            Pour ce faire, cliquez sur les mots et validez la sélection.
            {"\n\n"}
            A vous d'essayer sur ce texte :
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Vous pouvez ensuite ajouter de nouvelles négations si vous en trouvez dans le texte, en procédant de la même manière.
            {"\n"}Vos sélections sont affichées sous le texte. Vous pouvez les supprimer en cliquant sur la croix rouge.
            {"\n"}
            Attention, certains textes peuvent aussi ne contenir aucune négation !
            {"\n\n"}
            Quand vous pensez avoir fini, appuyez sur le bouton "Texte suivant". Celui-ci affiche le nombre de sélections actuelles. N'oubliez pas de valider la sélection courante, sinon elle ne sera pas prise en compte.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Certains cas peuvent être imbriqués, et un mot peut servir dans plusieurs négations.
            {"\n"}
            Dans cet exemple : Les suites opératoires étaient simples sans récidive neurologique ni métastases secondaires.
            {"\n"}
            Les deux négations à spécifier sont "sans récidive neurologique" et "sans métastases secondaires".
            {"\n\n"}
            À vous d'essayer avec cet exemple :
        </Text>;

        case 4: return <Text style={tw('font-primary')}>
            Il faut réussir à bien identifier l'assertion négative.
            {"\n"}
            Dans cet exemple : L'échographie était demandée par la patiente qui ne présentait pas d'autres métrorragies ou autres pathologies gynécologiques..
            {"\n"}
            Les deux négations à spécifier sont "pas d'métrorragies" et "pas d'pathologies gynécologiques".
            {"\n\n"}
            À vous d'essayer avec cet exemple :
        </Text>;

        case 5: return <Text style={tw('font-primary')}>
            Vous connaissez désormais les bases de l'annotation de négations.
            {"\n\n"}
            Traitez ces quelques textes supplémentaires, et si vous obtenez au moins 4 bonnes réponses, vous pourrez vous lancer à la recherche d'indices.
            {"\n\n"}
            Bon courage !
        </Text>;

        case 98: return <Text style={tw('font-primary')}>
            Vous connaissez désormais les bases de l'annotation de négations. À vous de jouer.
            {"\n\n"}
            Le bouton avec le point d'interrogation en haut à droite vous permet d'accéder au rappel des consignes, et vous pourrez y relancer ce tutoriel si vous le souhaitez.
            Si vous avez un doute et que vous souhaitez ne pas traiter un texte, cliquez sur le bouton
            <MaterialIcons name="next-plan" size={24} color="black" />
            en haut à droite pour passer au prochain.
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
        return <Text style={tw('text-green-700 italic font-bold')}>{children}</Text>;
    };


    return (
        <TouchableWithoutFeedback>
            <Text style={tw('font-primary')}>
                Le but du jeu est de cliquer sur les mots qui, selon vous, composent une négation ou une absence.
                Une fois les mots sélectionnés, validez la sélection. Quand vous pensez avoir trouvé toutes les négations, vérifiez bien d'avoir validé votre dernière selection, et vous pouvez ensuite passer au texte suivant.
                {"\n"}
                Quelques exemples de négations dans des phrases :
                {"\n\n"}
                <ItalicPhrase>
                    "Le bilan d'extension du patient malade est <HighlightedText>sans particularité.</HighlightedText>"
                </ItalicPhrase>
                {"\n"}
                Il faut spécifier la négation : <HighlightedText>"sans particularité"</HighlightedText>
                {"\n\n"}

                <ItalicPhrase>
                    "Les suites opératoires étaient simples <HighlightedText>sans récidive neurologique</HighlightedText> ni <HighlightedText>métastases secondaires.</HighlightedText>"
                </ItalicPhrase>
                {"\n"}
                Les négations à spécifier sont : <HighlightedText>"sans récidive neurologique" </HighlightedText> et <HighlightedText>"sans métastase secondaires"</HighlightedText>
                {"\n\n"}

                <ItalicPhrase>
                    "l'échographie abdomino-pelvienne était demandée par la patiente qui ne présentait <HighlightedText>pas d'</HighlightedText>autres <HighlightedText> métrorragies</HighlightedText> ou autres <HighlightedText> pathologies gynécologiques.</HighlightedText>"
                </ItalicPhrase>
                {"\n"}
                Les négations à spécifier sont : <HighlightedText>"pas d' métrorragies" </HighlightedText> et <HighlightedText>"pas d' pathologies gynécologiques"</HighlightedText>
                {"\n\n"}
            </Text>
        </TouchableWithoutFeedback>
    );
}