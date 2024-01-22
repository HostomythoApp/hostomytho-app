
import { MaterialIcons } from '@expo/vector-icons';

import { Text, TouchableWithoutFeedback } from 'react-native';

export const getTutorialContentForStep = (step: number, tw: any) => {

    switch (step) {
        case 1: return <Text style={tw('font-primary')}> 
            {"\n"}
            Bonjour enquêteur ! Blablabla, explication de l'univers, orientation vers un jeu en particulier
            Faire une popup a la création du compte pour expliquer le jeu. Dire qu'ils n'auront pas toujours la correction. 
        </Text>;

        case 2: return <Text style={tw('font-primary')}>
            Si l'erreur est de plusieurs types, selectionnez celui qui vous semble le plus important.
            {"\n\n"}
            Et si vous avez un doute et que ne souhaitez pas répondre, cliquez sur le bouton
            <MaterialIcons name="next-plan" size={24} color="black" />
            en haut à droite pour passer au prochain exemple. Vous pourrez l'utiliser dès la fin de ce tutoriel.
        </Text>;

        case 3: return <Text style={tw('font-primary')}>
            Nous avons fait le tour des explications.
            {"\n\n"}
            Traitez ces quelques textes supplémentaires, et si vous obtenez au moins 4 bonnes réponses, vous pourrez vous lancer à la recherche d'indices.
            {"\n\n"}
            Bon courage !
        </Text>;

        default: return null;
    }
};


