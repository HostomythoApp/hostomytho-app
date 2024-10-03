import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button, Switch, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { getTextWithTokensById } from "services/api/texts";
import { createTestSpecification, deleteTestSpecificationsByTextId, getTestSpecificationsByTextId } from "services/api/testSpecifications";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { TextWithTokens } from "interfaces/TextWithTokens";
import { TestSpecification } from "models/TestSpecification";

export default function ManageTextsScreen({ route }: { route: any }) {
    const { textId } = route.params;
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(false);
    const tw = useTailwind();
    const navigation = useNavigation();
    const [testSpecifications, setTestSpecifications] = useState<TestSpecification[]>([]);
    const [isSelectionStarted, setSelectionStarted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const textData = await getTextWithTokensById(textId);
            console.log(textData);

            const negations = await getTestSpecificationsByTextId(textId, 'negation');
            setTestSpecifications(negations);
            setText(textData);
            setLoading(false);
        };

        fetchData();
    }, [textId]);

    const onTokenPress = useCallback((index: number) => {
        setText(currentText => {
            if (!currentText) return currentText;

            const newTokens = [...currentText.tokens];
            const token = newTokens[index];

            token.isCurrentSelection = !token.isCurrentSelection; // Basculer la sélection provisoire

            // Appliquer ou retirer la couleur en fonction de la sélection
            if (token.isCurrentSelection) {
                token.color = 'bg-blue-200'; // Colorier en bleu clair si sélectionné
            } else {
                delete token.color; // Retirer la couleur si déselectionné
            }

            // Vérifier si des tokens sont sélectionnés pour activer d'autres actions
            const anyTokenSelected = newTokens.some(t => t.isCurrentSelection);
            setSelectionStarted(anyTokenSelected);

            return { ...currentText, tokens: newTokens };
        });
    }, []);


    const addNegation = () => {
        if (!text) return;

        const selectedTokens = text.tokens.filter(token => token.isCurrentSelection);

        if (selectedTokens.length === 0) {
            Alert.alert("Erreur", "Aucun mot sélectionné");
            return;
        }

        // Créer une nouvelle spécification avec les mots sélectionnés
        const wordPositions = selectedTokens.map(token => token.position).join(', '); // Utilisation de `token.position` plutôt que `token.index`

        const newSpec = {
            id: Date.now(), // Utiliser un identifiant temporaire
            textId: textId,
            word_positions: wordPositions,
            description: selectedTokens.map(token => token.content).join(' ') || "Négation ajoutée localement"
        };

        // Ajouter la nouvelle spécification à la liste locale
        setTestSpecifications(prevSpecs => [...prevSpecs, newSpec]);

        // Réinitialiser la sélection provisoire
        setText(currentText => {
            if (!currentText) return currentText;

            const newTokens = [...currentText.tokens];
            newTokens.forEach(token => {
                if (token.isCurrentSelection) {
                    token.isCurrentSelection = false;
                    delete token.color; // Supprimer la couleur après ajout
                }
            });

            return { ...currentText, tokens: newTokens };
        });

        Alert.alert("Succès", "Négation ajoutée localement");
    };

    const renderTestSpecification = (testSpecification: TestSpecification) => {
        return (
            <View key={testSpecification.id} style={tw("flex-row justify-between items-center p-2 bg-white rounded-md shadow-md mb-2")}>
                <Text style={tw("flex-1 text-lg")}>
                    {testSpecification.content || `Positions: ${testSpecification.word_positions}`}
                </Text>
                <TouchableOpacity onPress={() => handleDeleteSpecification(testSpecification.id)}>
                    <Text style={tw("text-red-500 p-2")}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const handleDeleteSpecification = (specId: number) => {
        setTestSpecifications(specs => specs.filter(spec => spec.id !== specId));
    };

    const onSaveChanges = async () => {
        setLoading(true);

        try {
            // Supprimer toutes les spécifications pour le texte
            await deleteTestSpecificationsByTextId(textId);

            // La suppression se fait. Regarder maintenant la création
            console.log(testSpecifications);

            const creations = testSpecifications.map(spec =>
                createTestSpecification({ textId: spec.textId, word_positions: spec.word_positions })
            );
            await Promise.all(creations);

            Alert.alert("Modifications enregistrées", "Les négations ont été mises à jour.");
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des modifications", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la sauvegarde des modifications.");
        }

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
                                            `m-0 p-[1px] ${token.isCurrentSelection ? token.color : token.isSelected ? "bg-blue-400" : "bg-transparent"}`
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
            <CustomHeaderEmpty title="Gestion des textes" backgroundColor="bg-whiteTransparent" />
            <ScrollView style={tw('p-5 mt-16')}>
                <View style={tw("mb-2 flex-1 justify-center items-center")}>
                    {text && renderText(text)}
                </View>

                <View style={tw("mx-4 pb-3 max-w-80 self-center")}>
                    <Button title="Ajouter la négation" onPress={addNegation} />
                </View>

                <View style={tw("mx-4 pb-3")}>
                    {testSpecifications.map(testSpecification => renderTestSpecification(testSpecification))}
                </View>
                <View style={tw("mx-4 pb-3 max-w-80 self-center")}>
                    <Button title="Sauvegarder les modifications" onPress={onSaveChanges} />
                </View>
            </ScrollView>
        </View>
    );

}
