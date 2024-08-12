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

    const countTokens = (definitions: any) => {
        return definitions.reduce((total: any, def: any) => {
            // Check if definition exists and is not empty before splitting
            return total + (def.definition ? def.definition.split(/\s+/).length : 0);
        }, 0);
    };

    useEffect(() => {
        if (word) {
            const fetchData = async () => {
                await searchAndDisplayResult(word, setIsLoading, setDefinitions, setResultType);
            };
            fetchData();
        }
    }, [word]);

    const totalTokens = countTokens(definitions);
    const shouldUseScrollView = totalTokens > 75;



    return (
        <CustomModal isVisible={isVisible} onClose={onClose}>
            <View style={[tw('justify-center px-4 h-auto'), { maxHeight: Dimensions.get('window').height * 0.8 }]}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#2E8B57" />
                ) : definitions.length > 0 ? (
                    shouldUseScrollView ? (
                        <ScrollView style={tw('w-full')}>
                            {renderDefinitions(definitions, tw)}
                        </ScrollView>
                    ) : (
                        renderDefinitions(definitions, tw)
                    )
                ) : (
                    <Text style={tw('font-primary text-lg text-center')}>Aucune définition n'a été trouvée.</Text>
                )}
            </View>
        </CustomModal>
    );
};

const renderDefinitions = (definitions: any, tw: any) => {
    return definitions.map((def: any, index: any) => {
        const isLastElement = index === definitions.length - 1;
        const viewStyle = isLastElement ? tw('justify-center') : tw('mb-4 justify-center');
        return (
            <View key={index} style={viewStyle}>
                <Text style={tw('font-primary text-xl mb-2')}>{def.title}</Text>
                {def.definition && (
                    <>
                        <Text style={tw('font-primary text-lg')}>{def.definition}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(def.url)}>
                            <Text style={[tw('font-primary text-base my-1 text-blue-700')]}>Ouvrir la page Wikipedia associée</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    });
};

export default WikiModal;
