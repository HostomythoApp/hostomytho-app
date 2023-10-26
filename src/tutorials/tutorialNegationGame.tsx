
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
            Les deux négations à spécifier sont "sans récidive neurologique" et "ni métastases secondaires".
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

        case 5: return <Text style={tw('font-primary')}>
            Vous connaissez désormais les bases de l'annotation de négations. À vous de jouer.
            {"\n\n"}
            Le bouton d'aide avec le point d'interrogation en haut à droite vous permet d'accéder au rappel des consignes, et vous pourrez y relancer ce tuto si vous le souhaitez.
            {"\n\n"}
            Bon courage dans vos recherches !
        </Text>;

        default: return null;
    }
};