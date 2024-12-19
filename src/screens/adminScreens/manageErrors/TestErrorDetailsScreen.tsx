import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { getErrorTestById, updateErrorTestById } from "services/api/testError";
import { getTextWithTokensById } from "services/api/texts";
import { getTypesError } from "services/api/errors";

const TestErrorDetailsScreen = () => {
    const tw = useTailwind();
    const route = useRoute();
    const { errorId } = route.params as { errorId: number };
    const navigation = useNavigation();

    const [text, setText] = useState<any>(null);
    const [errorDetails, setErrorDetails] = useState<any>(null);
    const [errorTypes, setErrorTypes] = useState<any[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        test_error_type_id: 1,
        reason_for_type: "",
    });
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const errorData = await getErrorTestById(errorId);
                const textData = await getTextWithTokensById(errorData.text_id);
                const types = await getTypesError();

                setErrorDetails(errorData);
                setText(textData);
                setErrorTypes(types);
                setFormData({
                    // @ts-ignore
                    test_error_type_id: errorData.test_error_type_id,
                    reason_for_type: errorData.reason_for_type || "",
                });
                setSelectedPositions(errorData.word_positions.split(",").map(Number));
            } catch (error) {
                Alert.alert("Erreur", "Impossible de charger les données.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [errorId]);

    const onTokenPress = useCallback((index: number) => {
        if (!text) return;

        const token = text.tokens[index];
        const position = token.position;

        setSelectedPositions((prev) => {
            if (prev.includes(position)) {
                return prev.filter((pos) => pos !== position);
            } else {
                return [...prev, position];
            }
        });
    }, [text]);


    const validateForm = () => {
        let valid = true;
        const newErrors: any = {};
        if (!formData.test_error_type_id) {
            newErrors.test_error_type_id = "Le type d'erreur est requis.";
            valid = false;
        }
        if (!selectedPositions.length) {
            newErrors.word_positions = "Veuillez sélectionner des mots.";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        try {
            setIsLoading(true);
            const content = text.tokens
                .filter((token: any) => selectedPositions.includes(token.position))
                .map((token: any) => token.content)
                .join("");
            const updatedError = {
                word_positions: selectedPositions.join(", "),
                content,
                test_error_type_id: formData.test_error_type_id,
                reason_for_type: formData.reason_for_type,
            };
            await updateErrorTestById(errorId, updatedError);
            Alert.alert("Succès", "Erreur mise à jour.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erreur", "La mise à jour a échoué.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderText = (text: any) => (
        <SafeAreaView style={tw("flex-1 mt-20")}>
            <View style={tw("bg-[#DAEBDC] rounded-xl mx-4 p-4 shadow-lg")}>
                <View style={tw("flex-row flex-wrap")}>
                    {text.tokens.map((token: any, idx: number) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => onTokenPress(idx)}
                            style={tw(
                                `px-0 ${selectedPositions.includes(token.position)
                                    ? "bg-blue-200"
                                    : "bg-transparent"
                                }`
                            )}
                        >
                            <Text style={tw("text-lg text-gray-800")}>{token.content}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );

    if (isLoading) {
        return (
            <View style={tw("flex-1 justify-center items-center")}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!text || !errorDetails) {
        return (
            <View style={tw("flex-1 justify-center items-center")}>
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        <View style={tw("flex-1 bg-gray-100")}>
            <CustomHeaderEmpty title="Détails de l'erreur de test" backgroundColor="bg-whiteTransparent" />
            <ScrollView contentContainerStyle={tw("p-5")}>
                {text && renderText(text)}

                <View style={tw("mt-4 bg-white p-7")}>
                    <Text style={tw("font-bold mb-2 text-lg")}>Modifier l'erreur</Text>

                    <Text style={tw("font-bold mb-2")}>Type de l'erreur :</Text>
                    <Picker
                        selectedValue={formData.test_error_type_id}
                        onValueChange={(value) => setFormData({ ...formData, test_error_type_id: value })}
                        style={tw("border p-2")}
                    >
                        {errorTypes.map((type) => (
                            <Picker.Item key={type.id} label={type.name} value={type.id} />
                        ))}
                    </Picker>
                    {errors.test_error_type_id && <Text style={tw("text-red-500")}>{errors.test_error_type_id}</Text>}

                    <Text style={tw("font-bold mt-4 mb-2")}>Raison du typage :</Text>
                    <TextInput
                        style={tw("border p-2 rounded-lg h-24")}
                        multiline
                        value={formData.reason_for_type}
                        onChangeText={(value) => setFormData({ ...formData, reason_for_type: value })}
                    />
                </View>

                <TouchableOpacity onPress={handleSave} style={tw("bg-green-500 p-4 mt-4 rounded-lg w-96 self-center")}>
                    <Text style={tw("text-center text-white font-bold")}>Enregistrer les modifications</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default TestErrorDetailsScreen;
