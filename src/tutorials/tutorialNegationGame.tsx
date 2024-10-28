import { MaterialIcons } from '@expo/vector-icons';

import { Text, TouchableWithoutFeedback, View } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {
    const HighlightedText = ({ children }: { children: any }) => {
        return <Text style={tw('text-[#5077BE] font-bold')}>{children}</Text>;
    };

    switch (step) {
        case 1: return <Text allowFontScaling={false} style={tw('font-primary')}> Voici des dossiers patients. Sélectionnez les absences de symptômes et les tests ayant des résultats négatifs.
            {"\n"}
            Par exemple, si le texte contient <HighlightedText>"Le bilan d'extension du patient malade est sans particularité" </HighlightedText>, il faut identifier <HighlightedText>"particularité". </HighlightedText>
            {"\n"}
            Cliquez sur le mot pour le sélectionner, puis validez.
        </Text>;

        case 2: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Vous pouvez ajouter de nouvelles absences de symptômes ou résultats négatifs en cliquant sur les mots correspondants.
            {"\n"}Vos sélections sont affichées sous le texte. Vous pouvez les supprimer en cliquant sur la croix rouge.
            {"\n"}
            Attention, certains textes peuvent ne contenir aucune absence de symptômes ou résultats négatifs  !
            {"\n\n"}
            Quand vous pensez avoir fini, appuyez sur le bouton "Texte suivant".
        </Text>;

        case 3: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Un autre exemple : <HighlightedText> Le test PCR s'est révélé négatif..</HighlightedText>
            {"\n"}
            L'absence à spécifier est <HighlightedText>"test PCR".</HighlightedText>
        </Text>;

        case 4: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Certains cas peuvent contenir plusieurs absences de symptômes dans une même phrase.
            {"\n"}
            Par exemple : <HighlightedText>L'échographie était demandée par la patiente qui ne présentait pas d'autres métrorragies ou autres pathologies gynécologiques.</HighlightedText>
            {"\n"}
            Sélectionnez individuellement <HighlightedText>"métrorragies"</HighlightedText> et <HighlightedText>"pathologies gynécologiques".</HighlightedText>
        </Text>;

        case 5: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Sélectionnez uniquement les éléments observés.
            {"\n"}
            Par exemple, si la phrase dit : <HighlightedText>L'absence de traitement influence le pronostic.</HighlightedText>
            {"\n"}
            Ne sélectionnez rien si cela décrit une situation générale ou hypothétique. Dans le cas où cela s'applique au patient présent, sélectionnez <HighlightedText>"traitement".</HighlightedText>
        </Text>;

        case 6: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Vous maîtrisez maintenant les bases de l'annotation des absences de symptômes et résultats négatifs.
            {"\n\n"}
            Traitez ces quelques textes supplémentaires, et si vous obtenez au moins 4 bonnes réponses, vous pourrez vous lancer à la recherche d'indices.
            {"\n\n"}
            Bon courage !
        </Text>;

        case 98: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Vous connaissez désormais les bases de l'annotation de négations. Vous allez pouvoir gagner des points et avancer dans l'enquête. Pensez à aller voir son avancée en cliquant sur l'icône "Suspect" sur le tableau de bord.
            {"\n\n"}
            Bon courage dans vos recherches !
        </Text>;

        case 99: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Vous avez fait un peu trop d'erreurs. Il est plus prudent de refaire l'exercice, sinon vous risquez de partir sur de mauvaises pistes.
            {"\n\n"}
            Du coup, recommençons..
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
                Le but du jeu est de sélectionner les mots ou expressions qui indiquent des absences de symptômes ou des résultats négatifs dans le texte.
                Lorsque vous pensez avoir trouvé toutes les absences, vérifiez bien votre dernière sélection avant de passer au texte suivant.
                {"\n"}
                Quelques exemples :
                {"\n\n"}

                <ItalicPhrase>
                    "Le bilan d'extension du patient était sans <HighlightedText>particularité.</HighlightedText>"
                </ItalicPhrase>
                {"\n"}
                Ici, il faut sélectionner : <HighlightedText>"particularité"</HighlightedText>
                {"\n\n"}

                <ItalicPhrase>
                    "Le <HighlightedText>test PCR</HighlightedText> s'est révélé négatif."
                </ItalicPhrase>
                {"\n"}
                Sélectionnez : <HighlightedText>"test PCR"</HighlightedText>
                {"\n\n"}

                <ItalicPhrase>
                    "L'échographie abdomino-pelvienne a été demandée car la patiente ne présentait pas d'<HighlightedText>autres métrorragies</HighlightedText> ou <HighlightedText>autres pathologies gynécologiques.</HighlightedText>"
                </ItalicPhrase>
                {"\n"}
                Sélectionnez : <HighlightedText>"métrorragies"</HighlightedText> et <HighlightedText>"pathologies gynécologiques"</HighlightedText>
                {"\n\n"}

                Assurez-vous de ne sélectionnez uniquement les éléments observés et vérifiés, et non les situations générales et hypothétiques :
                {"\n"}
                <ItalicPhrase>"L'absence de traitement influence le pronostic."</ItalicPhrase>
                {"\n"}
                Ne sélectionnez rien si cela décrit une situation hypothétique. Si cela s'applique au patient, sélectionnez <HighlightedText>"traitement".</HighlightedText>
            </Text>
        </TouchableWithoutFeedback>

    );
}