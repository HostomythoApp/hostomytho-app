import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, SafeAreaView, Pressable } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { getTextWithTokensById } from "services/api/texts";
import { createErrorTest, deleteErrorTestById, getErrorTestsByTextId } from "services/api/testError";
import { getTypesError } from "services/api/errors";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import CustomModal from "components/modals/CustomModal";
import { Picker } from "@react-native-picker/picker";
import TimedCustomModal from "components/modals/TimedCustomModal";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

export default function AddTestErrorScreen({ route }: { route: any }) {
    const { textId } = route.params;
    const tw = useTailwind();
    const [text, setText] = useState<any>(null);
    const [errorsTest, setErrorsTest] = useState<any[]>([]);
    const [errorTypes, setErrorTypes] = useState<any[]>([]);
    const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [timedModalVisible, setTimedModalVisible] = useState(false);
    const navigation = useNavigation();
    const [errorIdToDelete, setErrorIdToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        test_error_type_id: 1,
        reason_for_type: "",
        text_id: textId,
        word_positions: "",
        content: "",
    });
    const [errors, setErrors] = useState<any>({});

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const textData = await getTextWithTokensById(textId);
                    const errorTests = await getErrorTestsByTextId(textId);
                    const types = await getTypesError();
                    setText(textData);
                    setErrorsTest(errorTests);
                    setErrorTypes(types);
                } catch (error) {
                    Alert.alert("Erreur", "Impossible de charger les données.");
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchData();
        }, [textId])
    );

    const onTokenPress = useCallback((index: number) => {
        if (!text) return;
        const token = text.tokens[index];
        token.isSelected = !token.isSelected;
        if (token.isSelected) {
            setSelectedPositions((prev) => [...prev, token.position]);
        } else {
            setSelectedPositions((prev) => prev.filter((pos) => pos !== token.position));
        }
        setText({ ...text });
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

    const handleCreate = async () => {
        if (!validateForm()) return;
        try {
            setIsLoading(true);
            const content = text.tokens
                .filter((token: any) => selectedPositions.includes(token.position))
                .map((token: any) => token.content)
                .join("");
            const newError = {
                text_id: textId,
                word_positions: selectedPositions.join(","),
                content,
                test_error_type_id: formData.test_error_type_id,
                reason_for_type: formData.reason_for_type,
            };
            await createErrorTest(newError);
            Alert.alert("Succès", "Erreur de test créée.");

            setSelectedPositions([]);
            setFormData({ ...formData, reason_for_type: "", test_error_type_id: 1 });

            setText((currentText: any) => {
                const updatedTokens = currentText.tokens.map((token: any) => ({
                    ...token,
                    isSelected: false,
                }));
                return { ...currentText, tokens: updatedTokens };
            });

            const updatedErrors = await getErrorTestsByTextId(textId);
            setErrorsTest(updatedErrors);
            setTimedModalVisible(true);
        } catch (error) {
            Alert.alert("Erreur", "La création a échoué.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteError = async () => {
        if (!errorIdToDelete) return;
        try {
            setIsLoading(true);
            await deleteErrorTestById(errorIdToDelete);
            setModalVisible(false);
            const updatedErrors = await getErrorTestsByTextId(textId);
            setErrorsTest(updatedErrors);
            Alert.alert("Succès", "Erreur supprimée.");
        } catch (error) {
            Alert.alert("Erreur", "La suppression a échoué.");
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
                                `px-0 ${token.isSelected ? "bg-blue-200" : "bg-transparent"}`
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

    return (
        <View style={tw("flex-1 bg-gray-100")}>
            <CustomHeaderEmpty title="Gestion des erreurs de contrôle" backgroundColor="bg-whiteTransparent" />
            <ScrollView contentContainerStyle={tw("p-5")}>
                {text && renderText(text)}

                <View style={tw("mx-4 pb-3")}>
                    {errorsTest.map((error) => (
                        <View key={error.id} style={tw("flex-row justify-between items-center p-2 mt-2 bg-white rounded-md")}>
                            <View style={tw("flex-1")}>
                                <Text style={tw("text-lg font-bold")}>{error.content}</Text>
                                <Text style={tw("text-sm text-gray-600")}>
                                    Type : {errorTypes.find((type) => type.id === error.test_error_type_id)?.name || "Inconnu"}
                                </Text>
                                {error.reason_for_type && (
                                    <Text style={tw("text-sm text-gray-600")}>Raison du typage : {error.reason_for_type}</Text>
                                )}
                            </View>
                            <View style={tw("flex-row")}>
                                <TouchableOpacity
                                // @ts-ignore
                                    onPress={() => navigation.navigate("TestErrorDetails", { errorId: error.id })}
                                    style={tw("mr-3")}
                                >
                                    <Text style={tw("text-blue-500")}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setErrorIdToDelete(error.id); setModalVisible(true); }}>
                                    <Text style={tw("text-red-500")}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>


                <View style={tw("mt-4 bg-white p-7")}>
                    <Text style={tw("font-bold mb-2 text-lg")}>Créer une erreur</Text>
                    <Text style={tw("mb-4")}>Pour créer une erreur, cliquez sur les mots correspondant à l'erreur dans le text au dessus, puis choisissez son type, et la raison du typage si vous souhaitez la préciser.</Text>

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
                    <Text style={tw("font-bold mt-4 mb-2")}>Raison du typage (facultatif, et sera affiché quand un joueur donnera le mauvais typage):</Text>
                    <TextInput
                        style={tw("border p-2 rounded-lg h-24")}
                        multiline
                        value={formData.reason_for_type}
                        onChangeText={(value) => setFormData({ ...formData, reason_for_type: value })}
                    />
                </View>

                <TouchableOpacity onPress={handleCreate} style={tw("bg-green-500 p-4 mt-4 rounded-lg w-96 self-center")}>
                    <Text style={tw("text-center text-white font-bold")}>Créer l'erreur de test</Text>
                </TouchableOpacity>
            </ScrollView>

            <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
                <Text style={tw("mb-4 text-center font-primary")}>Êtes-vous sûr de vouloir supprimer cette erreur ?</Text>
                <TouchableOpacity onPress={handleDeleteError} style={tw("bg-red-500 p-4 rounded-lg")}>
                    <Text style={tw("text-center text-white font-bold")}>Confirmer</Text>
                </TouchableOpacity>
            </CustomModal>

            <TimedCustomModal isVisible={timedModalVisible} onClose={() => setTimedModalVisible(false)}>
                <Text style={tw('text-center font-primary text-xl text-green-900')}>
                    Erreur créée</Text>
            </TimedCustomModal>
        </View>
    );
}
