import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Modal from 'react-native-modal';

interface ModalPlausibilityGameProps {
    isVisible: boolean;
    swipeType: 'right' | 'left' | null;
    closeModal: () => void;
    setIsModalVisible: (isVisible: boolean) => void;
}

const ModalPlausibilityGame: FC<ModalPlausibilityGameProps> = ({ isVisible, swipeType, closeModal, setIsModalVisible }) => {
    const tw = useTailwind();

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsModalVisible(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, setIsModalVisible]);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            backdropColor="transparent"
            style={tw("items-center justify-end")}
        >
            <View style={[tw("bg-white rounded-lg p-4 flex-row mb-14"), {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
            }]}>
                {swipeType === 'right' ? (
                    <>
                        <TouchableOpacity
                            style={tw("bg-green-50 p-3 mr-3 rounded-lg")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text style={tw("text-[#48d1cc] font-semibold")}>Plausible</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw("bg-green-200 p-3 rounded-lg")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text style={tw("text-[#008000] font-semibold")}>Certain</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={tw("bg-red-200 p-3 mr-3 rounded-lg")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text style={tw(" text-red-500 font-semibold")}>Complétement faux</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw("bg-orange-100 p-3 rounded-lg")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text style={tw(" text-[#FFA500] font-semibold")}>Douteux</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </Modal>
    );
};

export default ModalPlausibilityGame;