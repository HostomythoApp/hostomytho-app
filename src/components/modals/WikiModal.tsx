import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Linking } from 'react-native';
import CustomModal from './CustomModal';
import { searchAndDisplayResult } from 'utils/wiki';
import { useTailwind } from "tailwind-rn";

const WikiModal = ({ isVisible, onClose, word }: { isVisible: boolean, onClose: any, word: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [definitions, setDefinitions] = useState([]);
    const [resultType, setResultType] = useState('');
    const tw = useTailwind();
    const window = Dimensions.get('window');

    useEffect(() => {
        if (word) {
            const fetchData = async () => {
                await searchAndDisplayResult(word, setIsLoading, setDefinitions, setResultType);
            };
            fetchData();
        }
    }, [word]);

    return (
        <CustomModal isVisible={isVisible} onClose={onClose}>
            <View style={[tw('flex-1 justify-center items-center px-4'), { maxHeight: window.height * 0.8 }]}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <ScrollView style={tw('max-h-[100%] w-full')}>
                        {definitions.length > 0 ? (
                            definitions.map((def, index) => (
                                <View key={index} style={tw('mb-4')}>
                                    <Text style={tw('font-primary text-xl mb-2')}>{def.title}</Text>
                                    <Text style={tw('font-primary text-lg')}>{def.definition}</Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(def.url)}>
                                        <Text style={[tw('font-primary text-base my-1'), { color: 'blue' }]}>Ouvrir la page Wikipedia associée</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : resultType === "failed" ? (

                            // TODO Mettre que pas de définition
                            <Text style={tw('font-primary text-lg text-center')}>Aucune définition n'a été trouvée.</Text>
                        ) : null}
                    </ScrollView>
                )}
            </View>
        </CustomModal>
    );
};

export default WikiModal;
