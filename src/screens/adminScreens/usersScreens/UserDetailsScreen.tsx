import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, Button, Alert, TouchableOpacity, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserById, editUser, deleteUser } from "services/api/user";
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import CustomModal from "components/modals/CustomModal";
import FunctionButton from "components/FunctionButton";
import { RootStackNavigationProp } from "navigation/Types";

const UserDetailsScreen = () => {
  const tw = useTailwind();
  const [dataUser, setDataUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  // @ts-ignore
  const userId = route.params?.userId;
  const navigation = useNavigation<RootStackNavigationProp<"Menu">>();

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (id: number) => {
    try {
      const result = await getUserById(id);
      setDataUser(result);
      setFormData(result);
      console.log(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    // Validation de username
    if (!formData.username) {
      newErrors.username = "Le nom d'utilisateur ne peut pas être vide.";
      valid = false;
    }

    // Validation de status
    if (!["inconnu", "medecin", "autre"].includes(formData.status)) {
      newErrors.status = "Le statut doit être 'inconnu', 'medecin' ou 'autre'.";
      valid = false;
    }

    // Validation de points, monthly_points, nb_first_monthly, tutorial_progress, consecutiveDaysPlayed
    ["points", "monthly_points", "nb_first_monthly", "tutorial_progress", "consecutiveDaysPlayed"].forEach(field => {
      if (typeof formData[field] !== "number" || isNaN(formData[field])) {
        newErrors[field] = `Le champ ${field} doit être un nombre.`;
        valid = false;
      }
    });

    // Validation de trust_index
    if (typeof formData.trust_index !== "number" || formData.trust_index < 0 || formData.trust_index > 100) {
      newErrors.trust_index = "Doit être un nombre entre 0 et 100.";
      valid = false;
    }

    // Validation de catch_probability
    if (isNaN(parseFloat(formData.catch_probability)) || parseFloat(formData.catch_probability) < 0 || parseFloat(formData.catch_probability) > 100) {
      newErrors.catch_probability = "Chance d'attraper un criminel doit être un nombre entre 0 et 100.";
      valid = false;
    }

    // Validation de boolean fields
    ["moderator", "message_read"].forEach(field => {
      if (typeof formData[field] !== "boolean") {
        newErrors[field] = `Le champ ${field} doit être un booléen (true ou false).`;
        valid = false;
      }
    });

    // Validation de gender
    if (!["homme", "femme"].includes(formData.gender)) {
      newErrors.gender = "Le genre doit être 'homme' ou 'femme'.";
      valid = false;
    }

    // Validation de color_skin
    if (!["clear", "medium", "dark"].includes(formData.color_skin)) {
      newErrors.color_skin = "La couleur de peau doit être 'clear', 'medium' ou 'dark'.";
      valid = false;
    }

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
        const { created_at, ...dataToSend } = formData;
        if (dataToSend.email === "") {
          dataToSend.email = null;
        }

        await editUser(userId, dataToSend);
        setIsEditing(false);
        fetchUserData(userId);
        Alert.alert("Succès", "Mise à jour réussie.");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        Alert.alert("Erreur", "La mise à jour a échoué.");
      }
    } else {
      Alert.alert("Validation échouée", "Veuillez corriger les erreurs avant de soumettre.");
    }
  };

  if (!dataUser) {
    return (
      <View style={tw("flex-1 justify-center items-center")}>
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  const deleteAccount = async () => {
    try {
      await deleteUser(userId);
      setModalVisible(false);
      // @ts-ignore
      navigation.navigate("ManageUsers", { refresh: true });
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  }


  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Gestion des utilisateurs" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-4 items-center w-full')}>
          <View style={tw('mb-24 p-4 mt-16 rounded-lg bg-white w-4/5')}>
            {Object.keys(dataUser).map((key, index) => (
              <View key={key} style={[
                tw('py-2 px-4 flex-row items-center justify-between'),
                index % 2 === 0 ? tw('bg-blue-50') : tw('bg-white'),
              ]}>
                <View style={tw('w-2/4 mr-4')}>
                  <Text style={tw('text-lg font-bold')}>
                    {(() => {
                      switch (key) {
                        case "username": return "Pseudo";
                        case "status": return "Statut";
                        case "email": return "Email";
                        case "monthly_points": return "Points mensuels";
                        case "points": return "Points";
                        case "coeffMulti": return "Coefficient Multi";
                        case "trust_index": return "Trust index (sur 100)";
                        case "gender": return "Sexe de l'avatar";
                        case "color_skin": return "Couleur de peau de l'avatar";
                        case "catch_probability": return "Chance d'attraper un criminel (en %)";
                        case "consecutiveDaysPlayed": return "Jours joués consécutifs";
                        case "lastPlayedDate": return "Dernier jour joué";
                        case "created_at": return "Date de création du compte";
                        case "nb_first_monthly": return "Nombre de fois 1er au classement mensuel";
                        case "tutorial_progress": return "Progression du tuto principal";
                        case "message_read": return "A lu le message du menu principal";
                        case "moderator": return "Modérateur";
                        default: return key;
                      }
                    })()} :
                  </Text>
                </View>
                <View style={tw('w-2/4')}>
                  {isEditing ? (
                    key === "id" || key === "created_at" || key === "coeffMulti" ? (
                      <Text style={tw('text-base')}>{dataUser[key]?.toString()}</Text>
                    ) : key === "gender" ? (
                      <>
                        <Picker
                          selectedValue={formData.gender}
                          onValueChange={(value) => handleInputChange("gender", value)}
                          style={tw('border p-2 rounded-lg')}
                        >
                          <Picker.Item label="Homme" value="homme" />
                          <Picker.Item label="Femme" value="femme" />
                        </Picker>
                        {errors.gender && <Text style={tw('text-red-500')}>{errors.gender}</Text>}
                      </>
                    ) : key === "status" ? (
                      <>
                        <Picker
                          selectedValue={formData.status}
                          onValueChange={(value) => handleInputChange("status", value)}
                          style={tw('border p-2 rounded-lg')}
                        >
                          <Picker.Item label="Inconnu" value="inconnu" />
                          <Picker.Item label="Médecin" value="medecin" />
                          <Picker.Item label="Autre" value="autre" />
                        </Picker>
                        {errors.status && <Text style={tw('text-red-500')}>{errors.status}</Text>}
                      </>
                    ) : key === "color_skin" ? (
                      <>
                        <Picker
                          selectedValue={formData.color_skin}
                          onValueChange={(value) => handleInputChange("color_skin", value)}
                          style={tw('border p-2 rounded-lg')}
                        >
                          <Picker.Item label="Clear" value="clear" />
                          <Picker.Item label="Medium" value="medium" />
                          <Picker.Item label="Dark" value="dark" />
                        </Picker>
                        {errors.color_skin && <Text style={tw('text-red-500')}>{errors.color_skin}</Text>}
                      </>
                    ) : ["moderator", "message_read"].includes(key) ? (
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
                    ) : ["points", "monthly_points", "nb_first_monthly", "tutorial_progress", "consecutiveDaysPlayed", "trust_index"].includes(key) ? (
                      <>
                        <TextInput
                          style={tw('border p-2 rounded-lg')}
                          value={formData[key]?.toString()}
                          onChangeText={(value) => handleInputChange(key, parseInt(value))}
                          keyboardType="numeric"
                          placeholder="Entrez un nombre"
                        />
                        <Text style={tw('text-sm text-gray-500')}>{key === "trust_index" ? "Doit être entre 0 et 100" : "Doit être un nombre"}</Text>
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
                    <Text style={tw('text-base')}>{dataUser[key]?.toString()}</Text>
                  )}
                </View>
              </View>
            ))}
            <View style={tw(' justify-center items-center')}>
              <FunctionButton text={"Supprimer le compte"} func={() => setModalVisible(true)} />
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
        <Text style={tw('text-center mb-4 font-primary text-lg')}>Etes-vous sûr de vouloir supprimer le compte ?</Text>
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

export default UserDetailsScreen;
