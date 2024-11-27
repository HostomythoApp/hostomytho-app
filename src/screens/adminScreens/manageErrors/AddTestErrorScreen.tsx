import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button, Switch, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { createText, getTextWithTokensById } from "services/api/texts";
import { createTestSpecification, deleteTestSpecificationsByTextId, getTestSpecificationsByTextId } from "services/api/testSpecifications";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { TextWithTokens } from "interfaces/TextWithTokens";
import { TestSpecification } from "models/TestSpecification";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import TimedCustomModal from "components/modals/TimedCustomModal";
import { Picker } from "@react-native-picker/picker";

export default function AddTestErrorScreen({ route }: { route: any }) {
    const { textId } = route.params;
    const [text, setText] = useState(null);

    const [loading, setLoading] = useState(false);
    const tw = useTailwind();
    const navigation = useNavigation();
    const [testSpecifications, setTestSpecifications] = useState<TestSpecification[]>([]);
    const [isSelectionStarted, setSelectionStarted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<any>({
        test_error_type: 4,
        reason_for_rate: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const textData = await getTextWithTokensById(textId);
            const negations = await getTestSpecificationsByTextId(textId, 'negation');
            setTestSpecifications(negations);
            // @ts-ignore
            setText(textData);
            setLoading(false);
        };

        fetchData();
    }, [textId]);

    useEffect(() => {
        if (!text) return;

        const allPositions = testSpecifications
            .flatMap(spec => spec.word_positions.split(',').map(pos => parseInt(pos.trim())));

        const uniquePositions = Array.from(new Set(allPositions));
        // @ts-ignore
        const newTokens = text.tokens.map((token: any) => {
            if (uniquePositions.includes(token.position)) {
                token.isSelected = true;
                token.color = 'bg-yellow-200';
            } else {
                token.isSelected = false;
                delete token.color;
            }
            return token;
        });

        // @ts-ignore
        setText({ ...text, tokens: newTokens });
    }, [testSpecifications]);

    const validateForm = () => {
        let valid = true;
        let newErrors: any = {};

        if (!formData.test_error_type) {
            newErrors.test_error_type = "Le numéro est requis.";
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

    const handleCreate = async () => {
        if (validateForm()) {
            try {
                setIsLoading(true);
                // await createText(formData);
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

    const onTokenPress = useCallback((index: number) => {
        setText((currentText: any) => {
            if (!currentText) return currentText;

            const newTokens = [...currentText.tokens];
            const token = newTokens[index];

            token.isCurrentSelection = !token.isCurrentSelection;

            if (token.isCurrentSelection) {
                token.color = 'bg-blue-200';
            } else {
                delete token.color;
            }

            const anyTokenSelected = newTokens.some(t => t.isCurrentSelection);
            setSelectionStarted(anyTokenSelected);

            return { ...currentText, tokens: newTokens };
        });
    }, []);

    const onSaveChanges = async () => {
        // setLoading(true);
        // try {
        //     await deleteTestSpecificationsByTextId(textId);

        //     const creations = testSpecifications.map(spec => ({
        //         text_id: textId,
        //         type: spec.type,
        //         content: spec.content,
        //         word_positions: spec.word_positions
        //     }));

        //     await createTestSpecification(creations);
        //     Alert.alert("Modifications enregistrées", "L'erreur de test a été créée.");
        //     setModalVisible(true);
        // } catch (error) {
        //     console.error("Erreur lors de la sauvegarde des modifications", error);
        //     Alert.alert("Erreur", "Une erreur est survenue lors de la sauvegarde des modifications.");
        // }

        setLoading(false);
    };


    if (loading) {
        return <View style={tw('flex-1 justify-center items-center')}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>;
    }

    if (!text) {
        return <View style={tw('flex-1 justify-center items-center')}>
            <Text>Aucun texte chargé</Text>
        </View>;
    }

    const renderText = (text: TextWithTokens) => {
        if (typeof text === "undefined") {
            return null;
        }
        return (
            <SafeAreaView style={tw("flex-1")}>
                <View
                    style={[
                        tw("bg-[#DAEBDC] rounded-xl justify-center mx-2 mt-4"),
                        {
                            backgroundColor: 'rgba(255, 222, 173, 0.92)',
                            minHeight: 150,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                    ]}
                >
                    <View style={tw("flex-row flex-wrap mb-2 m-7")}>
                        {text.tokens.map((token: any, idx: number) => {
                            const isPunctuation = token.is_punctuation;
                            const isNewLine = token.content.includes('\n');

                            if (isNewLine) {
                                return token.content.split('\n').map((_: any, lineIdx: any) => (
                                    <View key={`${idx}-${lineIdx}`} style={{ width: '100%', height: lineIdx === 0 ? 0 : 20 }} />
                                ));
                            } else if (isPunctuation) {
                                return (
                                    <Text
                                        key={idx}
                                        style={[
                                            tw("font-primary text-gray-800 text-lg"),
                                            token.color ? tw(token.color) : null
                                        ]}
                                    >
                                        {token.content}
                                    </Text>
                                );
                            } else {
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => onTokenPress(idx)}
                                        style={tw(
                                            `m-0 p-[1px] ${token.isCurrentSelection ? token.color : token.isSelected ? "bg-yellow-200" : "bg-transparent"}`
                                        )}
                                    >
                                        <Text
                                            style={[
                                                tw("font-primary text-gray-800 text-lg"),
                                                token.color ? tw(token.color) : null
                                            ]}
                                        >
                                            {token.content}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }
                        })}
                    </View>
                </View>
            </SafeAreaView>
        );
    };

    return (
        <View style={tw("flex-1 bg-gray-100")}>
            <CustomHeaderEmpty title="Ajout d'une erreur de test" backgroundColor="bg-whiteTransparent" />
            <ScrollView style={tw('p-5 mt-16')}>
                <View style={tw("mb-2 flex-1 justify-center items-center")}>
                    {text && renderText(text)}
                </View>

                <View style={tw('mx-auto pt-4 items-center w-full')}>

                    <View style={tw('mb-24 p-4 mt-16 rounded-lg bg-white w-4/5')}>
                        <View style={tw('py-2 px-4')}>
                            <Text style={tw('text-lg font-bold mb-2')}>Type de l'erreur :</Text>
                            <Picker
                                selectedValue={formData.test_error_type}
                                onValueChange={(value) => handleInputChange("origin", value)}
                                style={tw('border p-2 rounded-lg')}
                            >
                                {/* faire map avec les types récupérés  */}
                                <Picker.Item label="synthétique" value="synthétique" />
                                <Picker.Item label="réel - faux" value="réel - faux" />
                                <Picker.Item label="réel - vrai" value="réel - vrai" />
                            </Picker>
                            {errors.test_error_type && <Text style={tw('text-red-500')}>{errors.test_error_type}</Text>}
                        </View>

                        <View style={tw('py-2 px-4')}>
                            <Text style={tw('text-lg font-bold mb-2')}>Contenu :</Text>
                            <TextInput
                                style={tw('border p-2 rounded-lg h-32')}
                                multiline={true}
                                numberOfLines={5}
                                value={formData.reason_for_rate}
                                onChangeText={(value) => handleInputChange("reason_for_rate", value)}
                                placeholder="Entrez le contenu du texte"
                            />
                            {errors.reason_for_rate && <Text style={tw('text-red-500')}>{errors.reason_for_rate}</Text>}
                        </View>

                        <View style={tw('justify-center items-center mt-4')}>
                            <TouchableOpacity style={tw('bg-green-500 p-5 rounded-3xl flex-row items-center')} onPress={handleCreate}>
                                <Ionicons name="add" size={26} color="#fff" />
                                <Text style={tw('ml-1 text-white text-base font-bold')}>Créer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={tw("mx-4 pb-3 max-w-80 self-center")}>

                    <TouchableOpacity style={tw('bg-green-500 p-5 px-5 rounded-3xl text-center justify-center h-20 flex-row items-center')} onPress={onSaveChanges}>
                        <Ionicons name="checkmark" size={26} color="#fff" />
                        <Text style={tw('ml-1 text-white text-base font-bold')}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TimedCustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
                <Text style={tw('text-center font-primary text-xl text-green-900')}>
                    Modifications enregistrées</Text>
            </TimedCustomModal>
        </View>
    );

}
