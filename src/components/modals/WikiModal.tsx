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
            searchAndDisplayResult(word, setIsLoading, setDefinitions, setResultType);
        }
    }, [word]);

    return (
        <CustomModal isVisible={isVisible} onClose={onClose}>
            <View style={[tw(' px-4'), { maxHeight: window.height * 0.8 }]}>

                {isLoading ? (
                    <ActivityIndicator size="large" color="seagreen" />
                ) : (
                    <View style={[tw('px-4 max-h-[100%]')]}>
                            {definitions.length > 0 ? (
                                definitions.map((def, index) => (
                                    <View key={index} style={tw('mb-4')}>
                                        {/* @ts-ignore */}
                                        <Text style={tw('font-primary text-xl md:text-lg mb-2')}>{def.title}</Text>
                                        {/* @ts-ignore */}
                                        <Text style={tw('font-primary text-lg md:text-base')}>{def.definition}</Text>
                                        {/* @ts-ignore */}
                                        <TouchableOpacity onPress={() => Linking.openURL(def.url)}><Text style={[tw(`font-primary text-base my-1`), { color: 'blue' }]}>Ouvrir la page Wikipedia associée</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : resultType === "failed" ? (
                                <Text style={tw('font-primary text-lg text-center')}>Aucune définition n'a été trouvée.</Text>
                            ) : null}
                    </View>
                )}
            </View>
        </CustomModal>
    );
};

export default WikiModal;
