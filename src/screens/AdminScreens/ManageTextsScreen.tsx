import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTailwind } from 'tailwind-rn';
import { getAllTexts, deleteText, updateText, createText } from 'services/api/texts';
import { getAllThemes } from 'services/api/themes';
import { Text as TextModel } from 'models/Text';
import { Theme as ThemeModel } from 'models/Theme';
import { Ionicons } from '@expo/vector-icons';

export default function ManageTextsScreen() {
    const tw = useTailwind();
    const queryClient = useQueryClient();
    const { isLoading, error, data: texts } = useQuery('texts', getAllTexts);
    const { data: themes } = useQuery('themes', getAllThemes);
    const [selectedText, setSelectedText] = useState<TextModel | null>(null);
    const [content, setContent] = useState('');
    const [plausibility, setPlausibility] = useState<number | undefined>(undefined);
    const [origin, setOrigin] = useState('');
    const [id_theme, setId_theme] = useState<number | undefined>(undefined);
    const [isCreating, setIsCreating] = useState(false);


    // // // Création texte
    // TODO Problème à création
    const createMutation = useMutation(createText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
            setIsCreating(false);
            setContent('');
            setPlausibility(undefined);
            setOrigin('');
            setId_theme(undefined);
        },
    });

    const handleCreate = () => {
        setIsCreating(true);
        setContent('');
        setPlausibility(undefined);
        setOrigin('');
        setId_theme(undefined);
    };

    const handleCreateSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isCreating) {
            createMutation.mutate({
                content,
                id_theme,
                plausibility,
                origin,
            });
        }
    };

    // // // Suppression
    const deleteMutation = useMutation(deleteText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    // // // Modification
    const updateMutation = useMutation(updateText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
            setSelectedText(null);
            setContent('');
            setPlausibility(0);
            setOrigin('');
            setId_theme(0);
        },
    });

    const handleUpdate = (text: TextModel | null) => {
        if (text) {
            setSelectedText(text);
            setContent(text.content);
            setPlausibility(text.plausibility);
            setOrigin(text.origin);
            setId_theme(text.id_theme);
        } else {
            setContent('');
            setPlausibility(undefined);
            setOrigin('');
            setId_theme(undefined);
        }
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedText) {
            updateMutation.mutate({
                text: {
                    id: selectedText.id,
                    content,
                    plausibility,
                    origin,
                    id_theme,
                }
            });
        }
    };

    if (isLoading) return <View><Text>Chargement...</Text></View>;
    if (error) return <View><Text>Une erreur s'est produite.</Text></View>;


    return (
        <ScrollView style={tw('p-5')}>
            <TouchableOpacity
                onPress={handleCreate}
                style={tw('px-4 py-2 mb-5 bg-blue-500 text-white rounded-md flex-row items-center justify-center')}
            >
                <Ionicons name="add-outline" size={24} color="white" />
                <Text style={tw('text-white ml-2')}>Ajouter un nouveau texte</Text>
            </TouchableOpacity>
            {isCreating ? (
                <View style={tw('border p-4 mb-4 rounded')}>
                    <TextInput
                        multiline
                        numberOfLines={6}
                        style={tw('border p-2 mb-4')}
                        onChangeText={setContent}
                        value={content}
                        placeholder="Contenu"
                    />
                    <TextInput
                        style={tw('border p-2 mb-4')}
                        onChangeText={value => setPlausibility(Number(value))}
                        value={plausibility !== undefined ? String(plausibility) : ''}
                        placeholder="Plausibilité (0 par défaut)"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={tw('border p-2 mb-4')}
                        onChangeText={setOrigin}
                        value={origin}
                        placeholder='Origine'
                    />
                    {/* TODO mettre un select picker avec les différentes origines possibles */}
                    <Picker
                        selectedValue={id_theme}
                        onValueChange={(id_theme: number) => setId_theme(id_theme)}
                        style={tw('border p-2 mb-4')}
                    >
                        {themes && themes.map((theme: ThemeModel) => (
                            <Picker.Item key={theme.id} label={theme.name} value={theme.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity
                        // @ts-ignore
                        onPress={handleCreateSubmit}
                        style={tw('px-4 py-2 bg-blue-500 text-white rounded-md')}
                    >
                        <Text style={tw('text-white')}>Créer</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {/* @ts-ignore */}
            {texts && texts.map((text: TextModel) => (
                <View key={text.id} style={tw('border p-4 mb-4 rounded')}>
                    {selectedText && selectedText.id === text.id ? (
                        <View>
                            <TextInput
                                multiline
                                numberOfLines={6}
                                style={tw('border p-2 mb-4')}
                                onChangeText={setContent}
                                value={content}
                                placeholder="Contenu"
                            />
                            <TextInput
                                style={tw('border p-2 mb-4')}
                                onChangeText={value => setPlausibility(Number(value))}
                                value={String(plausibility)}
                                placeholder="Plausibilité"
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={tw('border p-2 mb-4')}
                                onChangeText={setOrigin}
                                value={origin}
                                placeholder="Origine"
                            />
                            {/* TODO mettre un select picker avec les différentes origines possibles */}

                            <Picker
                                selectedValue={id_theme}
                                onValueChange={(id_theme: number) => setId_theme(id_theme)}
                                style={tw('border p-2 mb-4')}
                            >
                                {themes && themes.map((theme: ThemeModel) => (
                                    <Picker.Item key={theme.id} label={theme.name} value={theme.id} />
                                ))}
                            </Picker>
                            <TouchableOpacity
                                // @ts-ignore
                                onPress={handleSubmit}
                                style={tw('px-4 py-2 bg-blue-500 text-white rounded-md')}
                            >
                                <Text style={tw('text-white')}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Texte id:</Text> {text.id}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Contenu:</Text> {text.content}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Plausibilité: </Text>{text.plausibility}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Origine:</Text> {text.origin}</Text>
                            <Text style={tw('mb-2')}><Text style={tw('font-bold')}>Theme:</Text> {themes && themes.find((theme: ThemeModel) => theme.id === text.id_theme)?.name}</Text>
                            <View style={tw('flex-row justify-between')}>
                                <Button
                                    onPress={() => handleUpdate(text)}
                                    title="Modifier"
                                    color="#007BFF"
                                />
                                <Button
                                    onPress={() => handleDelete(text.id)}
                                    title="Supprimer"
                                    color="#dc3545"
                                />
                            </View>
                        </>
                    )}
                </View>
            ))}
        </ScrollView>
    );
}
