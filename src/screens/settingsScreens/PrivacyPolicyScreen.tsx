import React from "react";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { useTailwind } from "tailwind-rn";


const PrivacyPolicysScreen = ({ }) => {
    const tw = useTailwind();

    return (
        <ImageBackground source={require('images/bg_corridor_dark.webp')} style={tw('flex-1')}>
            <View style={tw("flex-1 items-center text-black")}>
                <ScrollView style={tw('w-full')}>
                    <CustomHeaderEmpty title="Charte d'Admission" backgroundColor="bg-whiteTransparent" />
                    <View style={tw('mx-auto pt-20 items-center')}>

                        <View style={{ ...tw('mb-2 p-6 mx-4 max-w-6xl rounded-lg'), backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <Text style={tw('font-primary text-lg')}>
                                HostoMytho est un jeu gratuit créé dans le cadre d'un projet de recherche par Karën Fort, Bruno Guillaume et Bertrand REMY au sein du LORIA, avec l'aide d'Aurélie Névéol et Nicolas Hiebel. L'objet de ce projet est la construction de corpus annotés de qualité, pour des applications de traitement automatique de la langue (TAL). Ces données sont le produit de l'activité des joueurs de HostoMytho.

                                Les données sont accessibles sous des licences libres variées (fonction de la licence de la ressource d'origine), qui sont précisées dans chaque ressource. Le code source de HostoMytho reste, lui, pour l'instant privateur et appartient en totalité à ses auteurs. Tout accès, utilisation, détournement, publication ou divulgation d'informations de tout ou partie de ce code sans le consentement écrit des auteurs sera passible de poursuites.

                                La présente charte a pour but de permettre aux joueurs de jouer dans l'environnement le plus agréable possible, s'ils respectent les quelques règles établies ci-dessous.

                                Tout manquement ou tout abus fera l'objet de sanctions pouvant aller jusqu'au banissement définitif du joueur. De manière générale, il est attendu de la part des joueurs un comportement fair-play visant à respecter l'amusement de tous.
                            </Text>
                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (1) Inscription
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                La participation au jeu est entièrement gratuite et l'inscription est ouverte à tous les internautes disposant d'un accès à Internet régulier et éventuellement d'une adresse mail personnelle et active (ce dernier point n'étant pas obligatoire). Des mails pourront être envoyés au joueur en fonctions des évolutions du jeu. Les corpus proposés dans HostoMytho peuvent contenir des textes ne convenant pas à des personnes de moins de 16 ans.

                            </Text>
                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (2) Données Personnelles
                            </Text>
                            <Text style={tw('font-primary text-lg')}>

                                Les informations recueillies font l’objet d’un traitement informatique destiné à assurer le bon fonctionnement du jeu. Certaines informations enregistrées dans notre base de données sont personnelles (mot de passe, adresse mail, etc.), d'autres sont amenées à être éventuellement fournies à d'autres personnes (réponses proposées par le joueur lors d'une partie, classement, etc.) dans le cadre du jeu. Aucune diffusion des Données Personnelles ne sera faite à aucun titre que ce soit en dehors des modalités prévues par le jeu (informations affichées dans le Classement, affichage du résultat d'une partie, etc.).

                                Les destinataires des données sont : tous les membres de l'équipe du jeu, sans restriction. L'équipe du jeu se réserve le droit d'exploiter à des fins de recherches les données langagières récoltées lors d'une partie (une fois celle-ci achevée). En aucun cas, ces données ne contiennent d'informations personnelles permettant de retrouver leur(s) auteur(s).

                                Le joueur peut à tout moment supprimer son compte ainsi que la totalité des informations le concernant dans la base de données. Cependant, les actions de jeu liées à ce joueur et qui sont utiles pour le construction de la ressource linguistiques seront conservées.

                                Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en vous adressant à :

                                Bruno Guillaume, LORIA UMR 7503 Campus Scientifique, BP 239 F-54506 Vandœuvre-lès-Nancy Cedex
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (3) Saisies
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                Certains termes, textes ou certaines questions proposés dans HostoMytho peuvent être considérés comme profanes, vulgaires ou offensants par certains joueurs. L'objet de HostoMytho étant de constituer des ressources langagières couvrant l'ensemble des faits ou opinions possibles, de telles informations ne seront a priori pas retirées du jeu. Toutefois, les joueurs sont encouragés à signaler tout contenu inapproprié.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (4) Vente de comptes
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                La vente pour de l'argent ou des biens matériels d'un compte et/ou d'éléments du jeu est formellement interdite.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (5) Automatisation
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                Un compte doit être contrôlé par un joueur : il est formellement interdit d'automatiser les actions par quelque moyen que ce soit (script, programme, site Web, etc.).
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (6) Bogues
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                HostoMytho n'est pas à l'abri de bogues et incohérences. Chaque joueur est tenu de rapporter (par mail ou par formulaire de contact) au plus vite tout problème décelé, et toute utilisation abusive ou volontaire d'un bogue ou d'une faille se verra sanctionnée et pourra se solder par la suppression du compte du joueur concerné. Des compensations pourront intervenir de la part des administrateurs, mais ils en seront seuls juges.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (7) Information relative aux "cookies" de navigation
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                Pour le bon fonctionnement du jeu, nous souhaitons implanter un cookie dans votre ordinateur. Un cookie ne nous permet pas de vous identifier ; en revanche, il enregistre des informations relatives à la navigation de votre ordinateur sur notre site (les pages que vous avez consultées, la date et l'heure de la consultation, etc.) que nous pourrons lire lors de vos visites ultérieures. La durée de conservation de ces informations dans votre ordinateur est de plusieurs mois. Vous pouvez vous opposer à l'enregistrement de cookies, toutefois HostoMytho ne pourra alors pas fonctionner normalement. Nous vous informons que vous pouvez vous opposer à l'enregistrement de cookies en configurant votre navigateur de la manière suivante : Pour Microsoft Internet Explorer 6.0 : 1. choisissez le menu "Outils" (ou "Tools"), puis "Options Internet" (ou "Internet Options"). 2. cliquez sur l'onglet "Confidentialité" (ou "Confidentiality") 3. sélectionnez le niveau souhaité à l'aide du curseur. Pour Firefox : 1. choisissez le menu "Outils" - "Options" ; 2. cliquez sur l'option "Vie privée"; 3. rubrique "Cookies". Pour Opéra 6.0 et au-delà : 1. choisissez le menu "Fichier" - "Préférences" ; 2. Vie Privée.
                            </Text>

                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (8) Addiction
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                Si vous observez des modifications notables dans votre vie quotidienne: syndromes de manque, perte de contrôle par rapport aux jeux, conflits avec vos proches, vous souffrez peut-être d'addiction aux jeux. Nous vous conseillons dans ce cas de contacter http://www.joueurs-info-service.fr/.
                            </Text>
                            <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                                (9) Charte d'admission
                            </Text>

                            <Text style={tw('font-primary text-lg')}>
                                La présente charte doit être lue et acceptée dans son intégralité pour pouvoir jouer à HostoMytho. Elle est susceptible d'être modifiée par les gestionnaires du jeu. Le cas échéant, il sera demandé aux joueurs d'accepter explicitement les modifications apportées pour pouvoir continuer à jouer. Bertrand Remy, Karën Fort et Bruno Guillaume - Administrateurs - Contact : bertrand point remy at inria point fr, karen point fort at loria point fr et bruno point guillaume at inria point fr | Sources de la charte JDM - SSO - MH - CNIL Dernière mise à jour : janvier 2024
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default PrivacyPolicysScreen;
