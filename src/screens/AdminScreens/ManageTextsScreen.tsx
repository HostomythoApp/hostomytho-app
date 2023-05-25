import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { getAllTexts, deleteText, updateText, createText } from 'services/api/texts';
import { getAllThemes } from 'services/api/themes';
import { Text as TextModel } from 'models/Text';
import { Theme as ThemeModel } from 'models/Theme';

export default function ManageTextsScreen() {
    const tw = useTailwind();
    const queryClient = useQueryClient();
    const { isLoading, error, data: texts } = useQuery('texts', getAllTexts);
    const { data: themes } = useQuery('themes', getAllThemes);
    const [selectedText, setSelectedText] = useState<TextModel | null>(null);
    const [content, setContent] = useState('');
    const [plausibility, setPlausibility] = useState(0);
    const [origin, setOrigin] = useState('');
    const [id_theme, setId_theme] = useState(0);

    const deleteMutation = useMutation(deleteText, {
        onSuccess: () => {
            queryClient.invalidateQueries('texts');
        },
    });

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

    const handleUpdate = (text: TextModel) => {
        setSelectedText(text);
        setContent(text.content);
        setPlausibility(text.plausibility);
        setOrigin(text.origin);
        setId_theme(text.id_theme);
    };

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
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
    if (error) return <View><Text>Une erreur s'est produite: {error.message}</Text></View>;


    return (
        <ScrollView style={tw('p-5')}>
            <TouchableOpacity
                onPress={() => handleUpdate(null)}
                style={tw('px-4 py-2 mb-5 bg-blue-500 text-white rounded-md')}
            >
                <Text style={tw('text-white')}>Ajouter un nouveau texte</Text>
            </TouchableOpacity>

            {texts && texts.data.map((text: TextModel) => (
                <View key={text.id} style={tw('border p-4 mb-4 rounded')}>
                    {selectedText && selectedText.id === text.id ? (
                        <View>
                            <TextInput
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
                            <Picker
                                selectedValue={id_theme}
                                onValueChange={(id_theme: number) => setId_theme(id_theme)}
                                style={tw('border p-2 mb-4')}
                            >
                                {themes && themes.data.map((theme: ThemeModel) => (
                                    <Picker.Item key={theme.id} label={theme.name} value={theme.id} />
                                ))}
                            </Picker>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={tw('px-4 py-2 bg-blue-500 text-white rounded-md')}
                            >
                                <Text style={tw('text-white')}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <Text style={tw('mb-2')}>Contenu: {text.content}</Text>
                            <Text style={tw('mb-2')}>Plausibilité: {text.plausibility}</Text>
                            <Text style={tw('mb-2')}>Origine: {text.origin}</Text>
                            <Text style={tw('mb-2')}>Theme: {themes && themes.data.find((theme: ThemeModel) => theme.id === text.id_theme)?.name}</Text>
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
