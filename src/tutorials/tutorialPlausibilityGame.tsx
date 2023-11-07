
import PlausibilityButton from 'components/button/PlausibilityButton';
import { ButtonConfig } from 'interfaces/ButtonConfig';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { plausibilityConfigs } from 'utils/plausibilityConfigs';

const getPlausibilityConfig = (plausibility?: number) => {
    if (plausibility === undefined) {
        return plausibilityConfigs[plausibilityConfigs.length - 1];
    }
    return plausibilityConfigs.find(config => plausibility <= config.maxThreshold) || plausibilityConfigs[plausibilityConfigs.length - 1];
};

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
        return <Text style={tw('text-green-700 italic font-bold')}>{children}</Text>;
    };

    return (
        <TouchableWithoutFeedback>
            <Text style={tw('font-primary')}>
                Le but du jeu est d'évaluer la crédibilité d'un texte en lui attribuant un taux de plausibilité. Pour ce faire, vous disposez de cinq boutons, chacun représentant un niveau de plausibilité différent :
                {"\n\n"}
                <PlausibilityButton config={getPlausibilityConfig(0).buttonConfig as ButtonConfig} /> Très peu plausible (0% de plausibilité)
                {"\n"}
                <PlausibilityButton config={getPlausibilityConfig(25).buttonConfig as ButtonConfig} /> Peu plausible (25% de plausibilité)
                {"\n"}
                <PlausibilityButton config={getPlausibilityConfig(50).buttonConfig as ButtonConfig} /> Moyennement plausible (50% de plausibilité)
                {"\n"}
                <PlausibilityButton config={getPlausibilityConfig(75).buttonConfig as ButtonConfig} /> Plutôt plausible (75% de plausibilité)
                {"\n"}
                <PlausibilityButton config={getPlausibilityConfig(100).buttonConfig as ButtonConfig} /> Complétement plausible (100% de plausibilité)
                {"\n\n"}
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

                <ItalicPhrase>
                    "L'évolution était favorable avec une régression <HighlightedText> ascension </HighlightedText>du syndrome hémorragique."
                </ItalicPhrase>
                {"\n"}
                - L'erreur à trouver est : <HighlightedText>"ascension" </HighlightedText> car le mot n'a aucune raison d'être là.
                {"\n\n"}

                <ItalicPhrase>
                    "On note également une déviation de la tige pituitaire à gauche <HighlightedText>pituitère</HighlightedText>."
                </ItalicPhrase>
                {"\n"}
                - Le mot s'écrit "pituitaire"
                {"\n\n"}
            </Text>
        </TouchableWithoutFeedback>
    );
}