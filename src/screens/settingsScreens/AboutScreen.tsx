import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity, Linking, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";

const AboutScreen = ({ }) => {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackNavigationProp<"ReglesDuJeu">>();

  return (
    <ImageBackground source={require('images/bg_corridor.jpg')} style={tw('absolute bottom-0 left-0 w-full h-full')}>

      <View style={tw("flex-1 items-center text-black")}>
        <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>

          <CustomHeaderEmpty title="À propos" backgroundColor="bg-whiteTransparent" />
          <View style={tw('mx-auto w-full max-w-[940px] pt-20 items-center')}>
            <View style={{ ...tw('mb-2 p-8 m-4 rounded-lg w-full'), backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Text style={tw('text-3xl font-bold mt-4 mb-2 font-primary')}>
                Quoi ?
              </Text>
              <Text style={tw('font-primary text-lg')}>
                HostoMytho est un "jeu ayant un but", développé dans le cadre du projet ANR CODEINE. Ce jeu a pour but de permettre à des utilisateurs d'annoter des compte-rendus médicaux synthétiques (générés automatiquement), à la fois pour qualifier leur plausibilité (qualité de la langue et réalisme médical) et pour les annoter en différentes couches (négation, hypothèse, temporalité, etc), et de récolter d'autres données langagières. Les données produites par les joueurs servent à la science.
                {"\n\n"}
                Des récompenses comme des objets d'apparence, des hauts faits, des points et des indices permettant d'avancer dans l'enquête, peuvent être gagnés, non seulement en annotant beaucoup de phrases, mais surtout en les annotant correctement.
                Pour lire le fonctionnement détaillé de ces récompenses, ou des autres fonctionnalités de l'application, lisez les<TouchableOpacity onPress={() => navigation.navigate('ReglesDuJeu')}><Text style={{ color: 'blue' }}> règles du jeu</Text>
                </TouchableOpacity>.
                {"\n\n"}
                Avant de jouer, lisez la <TouchableOpacity onPress={() => navigation.navigate('PolitiqueDeConfidentialite')}><Text style={{ color: 'blue' }}>charte d'HostoMytho</Text>
                </TouchableOpacity>.
              </Text>

              <Text style={tw('text-3xl font-bold mt-6 mb-2 font-primary')}>
                Qui ?
              </Text>
              <Text style={tw('font-primary text-lg')}>
                <Text style={{ color: 'blue' }}
                  onPress={() => Linking.openURL('https://members.loria.fr/KFort/')}>
                  Karën Fort
                </Text> : (Équipe Sémagramme, LORIA) conception et animation du jeu
                {"\n"}

                <Text style={{ color: 'blue' }}
                  onPress={() => Linking.openURL('https://members.loria.fr/BGuillaume/')}>
                  Bruno Guillaume
                </Text> : (Équipe Sémagramme, LORIA) conception et animation du jeu
                {"\n"}

                <Text style={{ color: 'blue' }}
                  onPress={() => Linking.openURL('https://www.linkedin.com/in/bertrand-remy-b3456674/')}>
                  Bertrand Remy
                </Text> : (Équipe Sémagramme, LORIA) conception et développement du jeu
                {"\n"}

                <Text style={{ color: 'blue' }}
                  onPress={() => Linking.openURL('https://www.babelio.com/auteur/Yan-Lindingre/55656')}>
                  Yan Lindingre
                </Text> : Dessins de l'application
              </Text>

              <Text style={tw('text-3xl font-bold mt-4 mb-2 font-primary')}>
                Soutiens
              </Text>

              <View style={tw('flex-row flex-wrap justify-around bg-white p-4 rounded-lg')}>

                <TouchableOpacity onPress={() => Linking.openURL('https://www.loria.fr/fr/')} style={tw('mr-2')}
                >
                  <Image source={require('images/logos/loria.jpg')} style={tw('w-32 h-20')} resizeMode="contain" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://www.inria.fr/fr')} style={tw('mr-2')}>
                  <Image source={require('images/logos/inria.jpg')} style={tw('w-32 h-20')} resizeMode="contain" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://www.univ-lorraine.fr/')} style={tw('mr-2')}>
                  <Image source={require('images/logos/ul.jpg')} style={tw('w-32 h-20')} resizeMode="contain" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://aclanthology.org/')} style={tw('mr-2')}>
                  <Image source={require('images/logos/acl.png')} style={tw('w-32 h-20')} resizeMode="contain" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://anr.fr/')} style={tw('')}>
                  <Image source={require('images/logos/anr.png')} style={tw('w-32 h-20')} resizeMode="contain" />
                </TouchableOpacity>
              </View>


              {/* <Text style={tw('text-2xl font-bold mt-4 mb-2 font-primary')}>
                Publication
              </Text> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AboutScreen;
