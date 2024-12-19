import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import CustomModal from "components/modals/CustomModal";
import FunctionButton from "components/FunctionButton";
import { RootStackNavigationProp } from "navigation/Types";
import { deleteText, getTextById, updateText } from "services/api/texts";

const ErrorDetailsScreen = () => {
  const tw = useTailwind();
  const [dataText, setText] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  // @ts-ignore
  const textId = route.params?.textId;
  const navigation = useNavigation<RootStackNavigationProp<"Menu">>();

  useEffect(() => {
    if (textId) {
      fetchTextData(textId);
    }
  }, [textId]);

  const fetchTextData = async (id: number) => {
    try {
      const result = await getTextById(id);
      setText(result);
      setFormData(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    // Validation de origin
    if (!["synthétique", "réel - faux", "réel - vrai"].includes(formData.origin)) {
      newErrors.origin = "Le statut doit être 'synthétique', 'réel - faux', ou 'réel - vrai'.";
      valid = false;
    }

    // Validation de test_plausibility
    if (isNaN(parseFloat(formData.test_plausibility)) || parseFloat(formData.test_plausibility) < 0 || parseFloat(formData.test_plausibility) > 100) {
      newErrors.test_plausibility = "La plausibilité doit être un nombre entre 0 et 100.";
      valid = false;
    }

    // Validation de boolean fields
    ["is_plausibility_test", "is_plausibility_test", "is_negation_specification_test"].forEach(field => {
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

  const handleSave = async () => {
    if (validateForm()) {
      try {

        const { nb_of_treatments, content, length, ...dataToSend } = formData;
        await updateText(textId, dataToSend);
        setIsEditing(false);
        fetchTextData(textId);
        Alert.alert("Succès", "Mise à jour réussie.");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du texte", error);
        Alert.alert("Erreur", "La mise à jour a échoué.");
      }
    } else {
      Alert.alert("Validation échouée", "Veuillez corriger les erreurs avant de soumettre.");
    }
  };

  if (!dataText) {
    return (
      <View style={tw("flex-1 justify-center items-center")}>
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  const deleteAccount = async () => {
    try {
      await deleteText(textId);
      setModalVisible(false);
      // @ts-ignore
      navigation.navigate("ManageTexts", { refresh: true });
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }


  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Gestion des textes" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-4 items-center w-full')}>
          <View style={tw('mb-24 p-4 mt-16 rounded-lg bg-white w-4/5')}>
            {Object.keys(dataText).map((key, index) => (
              <View key={key} style={[
                tw('py-2 px-4 flex-row items-center justify-between'),
                index % 2 === 0 ? tw('bg-blue-50') : tw('bg-white'),
              ]}>
                <View style={tw('w-2/4 mr-4')}>
                  <Text style={tw('text-lg font-bold')}>
                    {(() => {
                      switch (key) {
                        case "num": return "Numéro";
                        case "content": return "Contenu";
                        case "origin": return "Origine";
                        case "is_plausibility_test": return "Est un texte de contrôle pour MythoOuPas";
                        case "test_plausibility": return "Taux de plausibilité de test (nécessaire si c'est un texte de contrôle dans MythoOupas)";
                        case "is_negation_specification_test": return "Est un texte de contrôle pour MythoNo";
                        case "nb_of_treatments": return "Nombre de fois joué (dans MythoOuPas)";
                        case "reason_for_rate": return "Raison de la note";
                        case "is_active": return "Actif";
                        default: return key;
                      }
                    })()} :
                  </Text>
                </View>
                <View style={tw('w-2/4')}>
                  {isEditing ? (
                    key === "id" || key === "nb_of_treatments" || key === "length" || key === "content" ? (
                      <Text style={tw('text-base')}>{dataText[key]?.toString()}</Text>
                    ) : key === "origin" ? (
                      <>
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
                      </>
                    ) : ["test_plausibility"].includes(key) ? (
                      <>
                        <TextInput
                          style={tw('border p-2 rounded-lg')}
                          value={formData[key]?.toString()}
                          onChangeText={(value) => handleInputChange(key, parseInt(value))}
                          keyboardType="numeric"
                          placeholder="Entrez un nombre"
                        />
                        <Text style={tw('text-sm text-gray-500')}>{key === "test_plausibility" ? "Doit être entre 0 et 100" : "Doit être un nombre"}</Text>
                        {errors[key] && <Text style={tw('text-red-500')}>{errors[key]}</Text>}
                      </>
                    ) : ["reason_for_rate"].includes(key) ? (
                      <>
                        <TextInput
                          style={tw('border p-2 rounded-lg h-32')}
                          multiline={true}
                          numberOfLines={5}
                          value={formData[key]?.toString()}
                          onChangeText={(value) => handleInputChange(key, value)}
                          placeholder="Entrez la raison de la note"
                        />
                        {errors[key] && <Text style={tw('text-red-500')}>{errors[key]}</Text>}
                      </>
                    )
                      : ["is_plausibility_test", "is_active"].includes(key) ? (
                        <>
                          <Picker
                            selectedValue={formData[key]}
                            onValueChange={(value) => handleInputChange(key, value === 'true')}
                            style={tw('border p-2 rounded-lg')}
                          >
                            <Picker.Item label="Oui" value="true" />
                            <Picker.Item label="Non" value="false" />
                          </Picker>
                          {errors[key] && <Text style={tw('text-red-500')}>{errors[key]}</Text>}
                        </>
                      ) : ["is_negation_specification_test"].includes(key) ? (
                        <>
                          <Picker
                            selectedValue={formData[key]}
                            onValueChange={(value) => handleInputChange(key, value === 'true')}
                            style={tw('border p-2 rounded-lg w-full')}
                          >
                            <Picker.Item label="Oui" value="true" />
                            <Picker.Item label="Non" value="false" />
                          </Picker>
                          <TouchableOpacity
                            style={tw('px-4 py-2 bg-blue-500 text-white rounded-md w-1/2 mr-4 mt-2')}
                            onPress={() => navigation.navigate("ManageTestNegation", { textId: textId })}
                          >
                            <Text style={tw('text-white text-center font-bold')}>
                              Gérer les négations de contrôle
                            </Text>
                          </TouchableOpacity>
                          {errors[key] && <Text style={tw('text-red-500')}>{errors[key]}</Text>}
                        </>
                      ) : (
                        <TextInput
                          style={tw('border p-2 rounded-lg')}
                          value={formData[key]?.toString()}
                          onChangeText={(value) => handleInputChange(key, value)}
                        />
                      )
                  ) : (
                    <Text style={tw('text-base')}>{dataText[key]?.toString()}</Text>
                  )}
                </View>
              </View>
            ))}
            <View style={tw(' justify-center items-center')}>
              <FunctionButton text={"Supprimer le texte"} func={() => setModalVisible(true)} />
            </View>
          </View>
        </View>
      </ScrollView>

      {!isEditing && (
        <View style={tw('absolute bottom-2 flex-row justify-end bg-transparent p-4 w-full right-8')}>
          <TouchableOpacity
            style={tw('bg-blue-500 p-5 px-6 rounded-3xl text-center justify-center h-20')}
            onPress={() => setIsEditing(true)}
          >
            <Text style={tw('text-white text-lg font-bold')}
            >Modifier</Text>
            <AntDesign style={tw('text-center')}
              name="edit" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      {isEditing && (
        <View style={tw('absolute bottom-0 left-0 right-0 flex-row justify-around bg-transparent p-4')}>
          <TouchableOpacity style={tw('bg-red-500 p-5 px-5 rounded-3xl text-center justify-center h-20 flex-row items-center')} onPress={() => setIsEditing(false)}>
            <Entypo name="cross" size={26} color="#fff" />
            <Text style={tw('ml-1 text-white text-base font-bold')}>Annuler</Text>
          </TouchableOpacity>


          <TouchableOpacity style={tw('bg-green-500 p-5 px-5 rounded-3xl text-center justify-center h-20 flex-row items-center')} onPress={handleSave}>
            <Ionicons name="checkmark" size={26} color="#fff" />
            <Text style={tw('ml-1 text-white text-base font-bold')}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      )}
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={tw('text-center mb-4 font-primary text-lg')}>Etes-vous sûr de vouloir supprimer le texte ?</Text>
        <Pressable
          style={[tw('bg-red-600 px-4 py-2 rounded'), { alignSelf: 'center' }]}
          onPress={deleteAccount}
        >
          <Text style={tw('text-white font-primary text-lg')}>Confirmer la suppression</Text>
        </Pressable>
      </CustomModal>
    </View>
  );
};

export default ErrorDetailsScreen;
