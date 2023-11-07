
import { Text, TouchableWithoutFeedback } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}> Voici des dossiers patients que vous pouvez inspecter. Peut-être qu'en spécifiant des éléments du texte, vous trouverez des indices. Ici, vous pouvez essayer de trouver les négations dans le texte, ou les absences de.
            {"\n"}
            Par exemple, si le texte contient "Le bilan d'extension du patient malade est sans particularité.", il faudra sélectionner les mots "sans particularité".
            Pour ce faire, cliquez sur les mots qui, selon vous, composent la négation. Une fois tous les mots sélectionnés, validez la sélection.
            {"\n\n"}
            A vous d'essayer sur ce texte :
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

            <HighlightedText>"Cohérence médicale" </HighlightedText> pour les erreurs grammaticales ou de français en général.
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