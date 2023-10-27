
import { Text } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}> Voici des dossiers patients que vous pouvez inspecter. Peut-être qu'en spécifiant des éléments du texte, vous trouverez des indices. Ici, vous pouvez essayer de trouver les négations dans le texte, ou les absences de.
            {"\n"}
            Par exemple, si le texte contient "Le bilan d'extension du patient malade est sans particularité.", il faudra sélectionner les mots "sans particularité".
            Pour ce faire, cliquez sur les mots qui, selon vous, composent la négation. Une fois tous les mots sélectionnés, validez la sélection.
            {"\n\n"}
            A vous d'essayer sur ce texte :
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Vous pouvez ensuite ajouter de nouvelles négations si vous en trouvez dans le texte, en procédant de la même manière.
            {"\n"}Vos sélections sont affichées sous le texte, et vous pouvez les supprimer si vous souhaitez revenir sur votre choix.
            {"\n"}
            Quand vous pensez avoir fini, appuyez sur le bouton "Texte suivant". Celui-ci affiche le nombre de sélections. N'oubliez pas de valider la sélection courante, sinon elle ne sera pas prise en compte.
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
            Vous connaissez désormais les bases de l'annotation de négations. À vous de jouer.
            {"\n\n"}
            Le bouton avec le point d'interrogation en haut à droite vous permet d'accéder au rappel des consignes, et vous pourrez y relancer ce tutoriel si vous le souhaitez.
            {"\n\n"}
            Bon courage dans vos recherches !
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

    return <Text style={tw('font-primary')}>
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
    </Text>;
}