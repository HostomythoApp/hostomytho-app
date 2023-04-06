import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import Modal from 'react-native-modal';

interface ModalPlausibilityGameProps {
  isVisible: boolean;
  swipeType: 'left' | 'right';
  closeModal: () => void;
  setIsModalVisible: (isVisible: boolean) => void; 
}

const ModalPlausibilityGame: FC<ModalPlausibilityGameProps> = ({ isVisible, swipeType, closeModal, setIsModalVisible }) => {
  const tw = useTailwind();

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            style={tw("items-center justify-center")}
        >
            <View style={tw("bg-white rounded-lg p-5")}>
                {swipeType === 'right' ? (
                    <>
                        <TouchableOpacity
                            style={tw("bg-green-200 p-2 mb-4 rounded")}
                            onPress={() => {
                                setIsModalVisible(false); // Utilisez la prop ici
                                closeModal();
                            }}
                        >
                            <Text>Plutôt plausible</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw("bg-green-200 p-2 rounded")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text>Certain</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={tw("bg-red-200 p-2 mb-4 rounded")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text>Faux</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw("bg-red-200 p-2 rounded")}
                            onPress={() => {
                                setIsModalVisible(false);
                                closeModal();
                            }}
                        >
                            <Text>Douteux</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </Modal>
    );
};

export default ModalPlausibilityGame;