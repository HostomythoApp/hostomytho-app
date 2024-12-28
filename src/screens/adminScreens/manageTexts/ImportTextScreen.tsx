import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useState } from "react";
import { ScrollView, View, Text, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStackNavigationProp } from "navigation/Types";
import { createSeveralTexts } from "services/api/texts";

const ImportTextScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);


  type File = {
    uri: string;
    name: string;
  };

  // Gestion de la sélection de fichier
  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // Prendre le premier fichier
        setFile({
          uri: file.uri,
          name: file.name,
        });
        Alert.alert("Fichier sélectionné", `Fichier : ${file.name}`);
      } else {
        Alert.alert("Annulé", "Aucun fichier sélectionné");
      }
    } catch (error) {
      console.error("Erreur lors de la sélection du fichier", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la sélection du fichier.");
    }
  };

  const handleCreate = async () => {
    if (!file) {
      Alert.alert("Erreur", "Veuillez sélectionner un fichier avant d'importer.");
      return;
    }

    try {
      setIsLoading(true);

      // Lire le contenu du fichier
      const fileContent = await fetch(file.uri).then((res) => res.text());
      const texts = JSON.parse(fileContent);

      // Appeler l'API pour importer les textes
      await createSeveralTexts(texts);

      setIsLoading(false);
      Alert.alert("Succès", "Import réussi.");
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors de l'import des textes", error);
      Alert.alert("Erreur", "L'import a échoué. Veuillez vérifier votre fichier.");
    }
  };


  if (isLoading) {
    return (
      <View style={tw("flex-1 justify-center items-center")}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw("w-full")}>
        <CustomHeaderEmpty title="Import de textes" backgroundColor="bg-whiteTransparent" />
        <View style={tw("mx-auto pt-4 items-center w-full")}>
          <View style={tw("mb-24 p-4 mt-16 rounded-lg bg-white w-4/5")}>

            <View style={tw("mb-6 p-4 rounded-lg bg-gray-50 w-full")}>
              <Text style={tw("text-lg font-bold text-gray-800 mb-2")}>
                Format attendu du fichier JSON :
              </Text>
              <Text style={tw("text-gray-700 mb-2")}>
                Le fichier doit contenir une liste de textes au format suivant :
              </Text>
              <View style={tw("bg-gray-200 p-4 rounded-lg")}>
                <Text style={tw("text-xs font-mono text-gray-900")}>
                  {`[
  {
    "num": "s_12345678_example",
    "content": "Exemple de contenu de texte.",
    "origin": "synthétique" OU "réel - vrai" OU "réel - faux",
    "is_plausibility_test": 0,
    "is_negation_specification_test": 0,
    "is_active": "1",
    "reason_for_rate": "Facultatif",
    "test_plausibility": "50"
  }
]`}
                </Text>
              </View>
              <Text style={tw("text-gray-700 mt-4")}>
                Champs facultatifs :
              </Text>
              <Text style={tw("text-gray-700")}>
                - <Text style={tw("font-bold")}>reason_for_rate</Text> : Facultatif.{"\n"}
                - <Text style={tw("font-bold")}>test_plausibility</Text> : Par défaut, 0 si non spécifié.{"\n"}
                - <Text style={tw("font-bold")}>is_plausibility_test</Text> : Par défaut, 0 si non spécifié.{"\n"}
                - <Text style={tw("font-bold")}>is_negation_specification_test</Text> : Par défaut, 0 si non spécifié.{"\n"}
                - <Text style={tw("font-bold")}>is_active</Text> : Par défaut, 1 (actif) si non spécifié.
              </Text>
            </View>



            <View style={tw("justify-center items-center mt-6")}>
            <TouchableOpacity
              style={tw("bg-blue-500 p-5 rounded-3xl flex-row items-center mb-4 w-24")}
              onPress={handlePickFile}
            >
              <Ionicons name="document" size={26} color="#fff" />
              <Text style={tw("ml-1 text-white text-base font-bold")}>Choisir un fichier JSON</Text>
            </TouchableOpacity>
            </View>

            {file && (
              <View style={tw("mt-2 items-center")}>
                <Text style={tw("text-gray-700")}>Fichier sélectionné : {file.name}</Text>
              </View>
            )}

            <View style={tw("justify-center items-center mt-6")}>
              <TouchableOpacity
                style={tw("bg-green-500 p-5 rounded-3xl flex-row items-center")}
                onPress={handleCreate}
              >
                <Ionicons name="cloud-upload" size={26} color="#fff" />
                <Text style={tw("ml-1 text-white text-base font-bold")}>Importer les textes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ImportTextScreen;
