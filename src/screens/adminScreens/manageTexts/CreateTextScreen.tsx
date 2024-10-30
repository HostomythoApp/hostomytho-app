import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackNavigationProp } from "navigation/Types";
import { createText } from "services/api/texts";

const CreateTextScreen = () => {
  const tw = useTailwind();
  const [formData, setFormData] = useState<any>({
    num: "",
    content: "",
    origin: "synthétique",
    test_plausibility: 0,
    is_plausibility_test: false,
    is_negation_specification_test: false,
    reason_for_rate: null,
    is_active: true,
  });
  const [errors, setErrors] = useState<any>({});
  const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    if (!formData.num) {
      newErrors.num = "Le numéro est requis.";
      valid = false;
    }

    if (!formData.content) {
      newErrors.content = "Le contenu du texte est requis.";
      valid = false;
    }

    if (!["synthétique", "réel - faux", "réel - vrai"].includes(formData.origin)) {
      newErrors.origin = "Le statut doit être 'synthétique', 'réel - faux', ou 'réel - vrai'.";
      valid = false;
    }

    if (parseFloat(formData.test_plausibility) < 0 || parseFloat(formData.test_plausibility) > 100) {
      newErrors.test_plausibility = "La plausibilité doit être un nombre entre 0 et 100.";
      valid = false;
    }

    ["is_plausibility_test", "is_negation_specification_test", "is_active"].forEach(field => {
      if (typeof formData[field] !== "boolean") {
        newErrors[field] = `Le champ ${field} doit être un booléen (true ou false).`;
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        await createText(formData);
        setIsLoading(false);
        Alert.alert("Succès", "Création réussie.");
        navigation.goBack();
      } catch (error) {
        setIsLoading(false);
        console.error("Erreur lors de la création du texte", error);
        Alert.alert("Erreur", "La création a échoué.");
      }
    } else {
      Alert.alert("Création échouée", "Veuillez corriger les erreurs avant de soumettre.");
    }
  };

  if (isLoading) {
    return (
      <View style={tw('flex-1 justify-center items-center')}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Créer un texte" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-4 items-center w-full')}>
          <View style={tw('mb-24 p-4 mt-16 rounded-lg bg-white w-4/5')}>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Numéro :</Text>
              <TextInput
                style={tw('border p-2 rounded-lg')}
                value={formData.num}
                onChangeText={(value) => handleInputChange("num", value)}
                keyboardType="numeric"
                placeholder="Entrez le numéro du texte"
              />
              {errors.num && <Text style={tw('text-red-500')}>{errors.num}</Text>}
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Contenu :</Text>
              <TextInput
                style={tw('border p-2 rounded-lg h-32')}
                multiline={true}
                numberOfLines={5}
                value={formData.content}
                onChangeText={(value) => handleInputChange("content", value)}
                placeholder="Entrez le contenu du texte"
              />
              {errors.content && <Text style={tw('text-red-500')}>{errors.content}</Text>}
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Origine :</Text>
              <Picker
                selectedValue={formData.origin}
                onValueChange={(value) => handleInputChange("origin", value)}
                style={tw('border p-2 rounded-lg')}
              >
                <Picker.Item label="synthétique" value="synthétique" />
                <Picker.Item label="réel - faux" value="réel - faux" />
                <Picker.Item label="réel - vrai" value="réel - vrai" />
              </Picker>
              {errors.origin && <Text style={tw('text-red-500')}>{errors.origin}</Text>}
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Texte de contrôle pour MythoOuPas :</Text>
              <Picker
                selectedValue={formData.is_plausibility_test}
                onValueChange={(value) => handleInputChange("is_plausibility_test", value === 'true')}
                style={tw('border p-2 rounded-lg')}
              >
                <Picker.Item label="Oui" value="true" />
                <Picker.Item label="Non" value="false" />
              </Picker>
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Taux de plausibilité de test (pour si c'est un texte de contrôle :</Text>
              <TextInput
                style={tw('border p-2 rounded-lg')}
                value={formData.test_plausibility}
                onChangeText={(value) => handleInputChange("test_plausibility", value)}
                keyboardType="numeric"
                placeholder="Entrez un nombre entre 0 et 100"
              />
              {errors.test_plausibility && <Text style={tw('text-red-500')}>{errors.test_plausibility}</Text>}
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Texte de contrôle pour MythoNo :</Text>
              <Picker
                selectedValue={formData.is_negation_specification_test}
                onValueChange={(value) => handleInputChange("is_negation_specification_test", value === 'true')}
                style={tw('border p-2 rounded-lg')}
              >
                <Picker.Item label="Oui" value="true" />
                <Picker.Item label="Non" value="false" />
              </Picker>
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Raison de la note :</Text>
              <TextInput
                style={tw('border p-2 rounded-lg h-32')}
                multiline={true}
                numberOfLines={5}
                value={formData.reason_for_rate}
                onChangeText={(value) => handleInputChange("reason_for_rate", value)}
                placeholder="Entrez la raison de la note"
              />
            </View>

            <View style={tw('py-2 px-4')}>
              <Text style={tw('text-lg font-bold mb-2')}>Actif :</Text>
              <Picker
                selectedValue={formData.is_active}
                onValueChange={(value) => handleInputChange("is_active", value === 'true')}
                style={tw('border p-2 rounded-lg')}
              >
                <Picker.Item label="Oui" value="true" />
                <Picker.Item label="Non" value="false" />
              </Picker>
            </View>

            <View style={tw('justify-center items-center mt-4')}>
              <TouchableOpacity style={tw('bg-green-500 p-5 rounded-3xl flex-row items-center')} onPress={handleCreate}>
                <FontAwesome6 name="add" size={26} color="#fff" />
                <Text style={tw('ml-1 text-white text-base font-bold')}>Créer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateTextScreen;
