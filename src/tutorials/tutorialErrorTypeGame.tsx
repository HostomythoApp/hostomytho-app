
import { MaterialIcons } from '@expo/vector-icons';

import { Text, TouchableWithoutFeedback } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {
    const HighlightedText = ({ children }: { children: any }) => {
        return <Text style={tw('text-[#5077BE] font-bold')}>{children}</Text>;
    };

    switch (step) {
        case 1: return <Text style={tw('font-primary')}> Le but du jeu ici est de spécifier le type de l'erreur surlignée en rose.
            Si l'erreur est de plusieurs types, selectionnez celui qui vous semble le plus important.
            {"\n\n"}
            Et si vous avez un doute et que ne souhaitez pas répondre, cliquez sur le bouton
            <MaterialIcons name="next-plan" size={24} color="black" />
            en haut à droite pour passer au prochain exemple. Vous pourrez l'utiliser dès la fin de ce tutoriel.
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Sélectionnez <HighlightedText>"Français" </HighlightedText>pour les erreurs grammaticales ou de français en général :
            {"\n"}
            - "Les symptôme du patient sont très variés et <HighlightedText>inclut </HighlightedText>des maux de tête."
            {"\n\n"}

            <HighlightedText>"Médical" </HighlightedText>concerne les erreurs de cohérences médicales :
            {"\n"}
            - "Lors de sa visite pour un vaccin contre la grippe, il a été annoncé au patient qu'il devait subir <HighlightedText> une radiographie du thorax pour examiner la santé de ses dents de sagesse</HighlightedText>."
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Sélectionnez <HighlightedText>"Répétition" </HighlightedText>si le texte contient des répétitions.
            {"\n"}
            - "<HighlightedText>La biopsie rénale a montré une glomérulonéphrite extramembraneuse. La biopsie rénale a montré une glomérulonéphrite extramembraneuse. La biopsie rénale a montré une glomérulonéphrite...</HighlightedText>"
            {"\n\n"}
            Cliquez  <HighlightedText>"Autre" </HighlightedText> si l'erreur n'est pas classable dans les catégories précédentes, ou contient des problèmes éthiques, des propos racistes, ou toute autre déviance
            {"\n\n"}
            Ou <HighlightedText>"Pas d'erreur" </HighlightedText> si le texte surligné est bon.
        </Text>;

        case 4: return <Text style={tw('font-primary')}>
            Quand un texte est très long, vous n'avez pas forcément besoin de lire le texte en entier. Regardez en priorité l'endroit où est surlignée l'erreur ; la plupart du temps, cela vous suffira à trouver son type.
        </Text>;

        case 5: return <Text style={tw('font-primary')}>
            Nous avons fait le tour des explications.
            {"\n\n"}
            Traitez ces quelques textes supplémentaires, et si vous obtenez au moins 5 bonnes réponses, vous pourrez vous lancer à la recherche d'indices.
            {"\n\n"}
            Bon courage !
        </Text>;

        case 98: return <Text style={tw('font-primary')}>
            Vous savez désormais spécifier les types d'erreur. À vous de jouer.
            {"\n\n"}
            N'oubliez pas que plus vous donnez de bonnes réponses, plus votre taux de fiabilité sera élevé, et plus vous gagnerez de points. Vous pouvez aussi augmenter votre coefficient multiplicateur en remportant des hauts-faits, visibles sur votre page de profil.
            {"\n"}
            Bon courage dans vos recherches !
        </Text>;

        case 99: return <Text style={tw('font-primary')}>
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
        return <Text style={tw('text-[#5077BE] font-bold')}>{children}</Text>;
    };

    return <TouchableWithoutFeedback>
        <Text style={tw('font-primary')}>
            Le but du jeu est de spécifier le type de l'erreur surlignée.
            {"\n\n"}
            Les différents types d'erreurs sont :
            {"\n\n"}
            <HighlightedText>"Français" </HighlightedText> pour les erreurs grammaticales ou de français en général.
            {"\n"}
            <ItalicPhrase>
                - "Les symptôme du patient sont très variés et <HighlightedText>inclut </HighlightedText>des maux de tête."
            </ItalicPhrase>
            {"\n"}
            Il y a un problème de conjugaison avec le verbe inclure qui devrait être au pluriel.
            {"\n\n"}

            <HighlightedText>"Médicale" </HighlightedText> pour les incohérences et erreurs médicales.
            {"\n"}
            <ItalicPhrase>
                - "Lors de sa visite pour un vaccin contre la grippe, il a été annoncé au jeune garçon qu'il devait subir <HighlightedText> une radiographie du thorax pour examiner la santé de ses dents de sagesse</HighlightedText>."
            </ItalicPhrase>
            {"\n"}
            L'erreur vient de l'incohérence de l'information.
            {"\n\n"}

            <HighlightedText>"Répétition" </HighlightedText> si le texte contient des répétitions.
            {"\n"}
            <ItalicPhrase>
                - "<HighlightedText>La biopsie rénale a montré une glomérulonéphrite extramembraneuse. La biopsie rénale a montré une glomérulonéphrite extramembraneuse. La biopsie rénale a montré une glomérulonéphrite extramembraneuse.</HighlightedText>"
            </ItalicPhrase>
            {"\n"}
            L'erreur est la répétition de la phrase.
            {"\n\n"}

            <HighlightedText>"Autre" </HighlightedText> si l'erreur n'est pas classable dans les catégories précédentes, ou contient des problèmes éthiques, racistes, ou toute autre déviance

            Cliquez <HighlightedText>"Pas d'erreur" </HighlightedText> si le texte surligné est bon.
            {"\n\n"}

        </Text>
    </TouchableWithoutFeedback>;
}