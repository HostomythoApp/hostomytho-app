
import PlausibilityButton from 'components/button/PlausibilityButton';
import { ButtonConfig } from 'interfaces/ButtonConfig';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { plausibilityConfigs } from 'utils/plausibilityConfigs';

const getPlausibilityConfig = (plausibility?: number) => {
    if (plausibility === undefined) {
        return plausibilityConfigs[plausibilityConfigs.length - 1];
    }
    return plausibilityConfigs.find(config => plausibility <= config.maxThreshold) || plausibilityConfigs[plausibilityConfigs.length - 1];
};

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text allowFontScaling={false} style={tw('font-primary')}> Le but du jeu est d'évaluer la crédibilité d'un texte en lui attribuant un niveau de plausibilité. Pour ce faire, vous disposez de cinq boutons, chacun représentant un niveau de plausibilité différent :
            {"\n\n"}
            <PlausibilityButton config={getPlausibilityConfig(0).buttonConfig as ButtonConfig} /> Très peu plausible
            <PlausibilityButton config={getPlausibilityConfig(25).buttonConfig as ButtonConfig} /> Peu plausible
            <PlausibilityButton config={getPlausibilityConfig(50).buttonConfig as ButtonConfig} /> Moyennement plausible
            <PlausibilityButton config={getPlausibilityConfig(75).buttonConfig as ButtonConfig} /> Plutôt plausible
            <PlausibilityButton config={getPlausibilityConfig(100).buttonConfig as ButtonConfig} /> Complètement plausible
            {"\n\n"}
            Lisez le texte, et attribuez-lui une plausibilité. Vous commencerez à gagner des points à la fin de ce tuto.
        </Text>;

        case 2: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Si vous pensez qu'un texte contient des erreurs, vous pouvez spécifier où elles sont, quel que soit leur type : erreur grammaticale, de cohérence, un passage biaisé ou offensant, ...
            {"\n"} Pour ce faire, sélectionnez la plausibilité comme prédédemment, cliquez sur
            <View
                style={[
                    tw("px-1 py-1 mx-1 rounded-lg bg-orange-200 opacity-100"),
                ]}
            >
                <Text style={tw("font-semibold text-orange-500 text-sm")}
                >Source du doute</Text>
            </View>puis cliquez sur les mots qui composent cette erreur.
            {"\n\n"}
            Vous n'êtes pas obligés de le faire, mais cela vous fera gagner plus de points.

        </Text>;

        case 3: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Certains textes contiennent des mots techniques compliqués, mais pas d'inquiétude, de nombreuses erreurs sont identifiables sans compétences en médecine particulière.
            Si toutefois vous souhaitez avoir la définition d'un mot, cliquez sur le bouton W en haut à gauche, puis sur le mot dont vous souhaitez la définition. Cela vous dirigera vers une page Wikipédia associée.
            {"\n\n"}
            Essayez de traiter ce texte.
        </Text>;

        case 4: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Il arrive régulièrement que l'erreur soit une répétition de mots ou de phrases. Portez une attention particulière à cela.
        </Text>;

        case 5: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Traitez ces quelques textes supplémentaires, et si vous obtenez au moins 4 bonnes réponses sur l'ensemble de la formation, vous pourrez vous lancer à la recherche d'indices.
            {"\n\n"}
            Bon courage !
        </Text>;

        case 98: return <Text allowFontScaling={false} style={tw('font-primary')}>
            Vous savez désormais spécifier la plausilité des textes. Vos réponses vont maintenant vous rapporter des points et faire avancer votre recherche de criminel.
            {"\n\n"}
            Le bouton avec le point d'interrogation en haut à droite vous permet d'accéder au rappel des consignes, et vous pourrez y relancer ce tutoriel si vous le souhaitez.
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
                Le but du jeu est d'évaluer la crédibilité d'un texte en lui attribuant un niveau de plausibilité. Pour ce faire, vous disposez de cinq boutons, chacun représentant un niveau de plausibilité différent :
                {"\n\n"}
                <Text style={tw('flex-row items-center justify-center m-1')}>
                    <PlausibilityButton config={getPlausibilityConfig(0).buttonConfig as ButtonConfig} /> Très peu plausible
                </Text>
                {"\n"}
                <Text style={tw('flex-row items-center justify-center m-1')}>
                    <PlausibilityButton config={getPlausibilityConfig(25).buttonConfig as ButtonConfig} /> Peu plausible
                </Text>
                {"\n"}
                <Text style={tw('flex-row items-center justify-center m-1')}>
                    <PlausibilityButton config={getPlausibilityConfig(50).buttonConfig as ButtonConfig} /> Moyennement plausible
                </Text>
                {"\n"}
                <Text style={tw('flex-row items-center justify-center m-1')}>
                    <PlausibilityButton config={getPlausibilityConfig(75).buttonConfig as ButtonConfig} /> Plutôt plausible
                </Text>
                {"\n"}
                <Text style={tw('flex-row items-center justify-center m-1')}>
                    <PlausibilityButton config={getPlausibilityConfig(100).buttonConfig as ButtonConfig} /> Complètement plausible
                </Text>
                {"\n"}
                Vous aurez ensuite le choix de passer au texte suivant, ou de préciser où est l'erreur ou le doute que vous avez.
                Les erreurs et doutes peuvent être de type grammatical, de cohérence médicale, de vocabulaire médical, ou tout autre type. {"\n"}
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
            </Text>
        </TouchableWithoutFeedback>
    );
}