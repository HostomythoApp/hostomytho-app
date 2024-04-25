import React from "react";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { View, Text, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainTitle from "components/MainTitle";

const GameRulesScreen = ({ }) => {
    const tw = useTailwind();

    return (
        <ImageBackground source={require('images/bg_corridor.jpg')} style={tw('flex-1')}>
            <View style={tw("flex-1 items-center text-black")}>
                <ScrollView style={tw('w-full')}>
                    <CustomHeaderEmpty title="Règles du jeu et explications" backgroundColor="bg-whiteTransparent" />
                    <View style={tw('mx-auto pt-20 items-center pb-4')}>

                        <View style={{ ...tw('mb-2 p-6 mx-4 max-w-6xl rounded-lg'), backgroundColor: 'rgba(255, 255, 255, 0.83)' }}>
                            <Text style={tw('font-primary text-lg')}>
                                Vous voici dans la peau d'un enquêteur, mandaté pour démasquer des criminels cachés dans un hôpital. Votre mission : explorer l'hôpital à la recherche d'indices et de pistes. Attention, ces criminels sont rusés, se dissimulant parmi les médecins et les patients. En étudiant attentivement les dossiers des patients, vous pourrez déceler des anomalies ou des incohérences qui vous guideront sur la bonne voie. Une fois que vous avez rassemblé assez d'indices, vous aurez l'opportunité de procéder à l'arrestation des suspects.
                                {"\n"}
                                Durant les mini-jeux, les corrections aux questions ne vous seront fournies qu'occasionnellement. Qu'elles soient correctes ou non, toutes vos réponses comptent. Vous débutez avec un taux de fiabilité de 50%, qui évolue selon vos réponses. Ce taux est essentiel, car il détermine le nombre de points et de récompenses que vous obtenez.
                            </Text>
                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                Hauts Faits
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                HostoMytho vous propose une série de hauts faits à valider et à collectionner. Ils se manifestent sous divers objectifs, comme atteindre un certain nombre de points, ou jouer plusieurs jours d'affilée. Chaque haut fait accompli augmente votre coefficient multiplicateur, augmentant ainsi vos gains de points.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                Gain de Points
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                Les points sont le baromètre de votre performance en tant qu'enquêteur. Vous les accumulez en jouant aux mini-jeux. Plusieurs éléments peuvent booster votre gain de points, notamment un taux de fiabilité élevé. Vous possédez également un coefficient multiplicateur de points. Celui-ci commence à 1, et s'accroît avec chaque haut fait réalisé, ajoutant 0,1 à chaque fois. Ce multiplicateur est visible en jeu à côté de votre score, mais aussi dans la section Statistiques de votre profil. La longueur des textes est importante aussi. Plus le texte est long, plus il y a de points à gagner.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                Avancée de l'Enquête
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                En jouant et en répondant aux questions, vous augmentez votre taux de certitude d'attraper un criminel. Plus votre taux de fiabilité est élevé, plus rapidement ce taux augmente. Vous pouvez tenter une arrestation à tout moment, mais attention : un échec entraîne une perte de 15% de votre taux de certitude. En cas de succès, le criminel est capturé et vous passez à la traque d'un nouveau suspect.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                Skins
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                Vous avez également la possibilité de personnaliser votre avatar avec une variété de skins, incluant des accessoires, des coupes de cheveux ou encore des visages. Cette personnalisation est accessible depuis la page de profil, en cliquant sur "Changer d'apparence". Pour chaque 100 points gagnés, un skin aléatoire est débloqué, certains étant plus rares que d'autres.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                En Jeu
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                Lorsque vous jouez, vous effectuerez des sélections de mots. La couleur de ces sélections est uniquement décorative et change pour faciliter leur différenciation. Les corrections des questions ne sont pas toujours affichées, mais apparaissent de temps à autre pour vous orienter dans vos prochaines réponses.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                Compétition entre Joueurs
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                Vous n'êtes pas seul dans cette enquête. D'autres joueurs tentent également de se distinguer auprès de leur boss. Pour mesurer votre talent d'enquêteur face à cette concurrence, HostoMytho propose un classement des meilleurs détectives. De plus, un classement mensuel met en lumière les détectives les plus performants du moment. Les trois premiers de ce classement sont célébrés sur la page d'accueil pendant tout le mois suivant, offrant une reconnaissance méritée pour leurs prouesses exceptionnelles.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-6 mb-2 font-primary')}>
                                Gestion du Compte
                            </Text>
                            <Text style={tw('font-primary text-lg')}>
                                Vous pouvez modifier l'adresse email associée à votre compte dans les paramètres de votre profil. Soyez conscient que la suppression de votre compte est définitive, mais vos données de jeu seront conservées et mises à disposition de la communauté scientifique, sous la licence CC-by-NC 4.0.
                                {"\n\n"}

                                Nous vous souhaitons bonne chance dans vos enquêtes au sein de HostoMytho. Que vos investigations vous conduisent à la vérité et au sommet du classement !
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};
export default GameRulesScreen;
