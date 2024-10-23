import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, ScrollView, Pressable } from "react-native";
import { deleteMessage, getMessages } from "services/api/messages";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from '@expo/vector-icons'; // Pour une icône de poubelle
import CustomModal from "components/modals/CustomModal";

const UserMessagingScreen = () => {
  const tw = useTailwind();
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageIdSelected, setMessageIdSelected] = useState(0);

  const loadMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les messages.");
    }
  };


  const askDelete = async (messageId: number) => {
    setModalVisible(true);
    setMessageIdSelected(messageId);
  };

  const handleDeleteMessage = async () => {
    try {
      await deleteMessage(messageIdSelected);
      setModalVisible(false);
      loadMessages();
    } catch (error) {
      console.log("Erreur", "Impossible de supprimer le message.");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const renderMessage = ({ item }: { item: any }) => (
    <View style={tw("p-4 border-b border-gray-300 flex-row justify-between items-center")}>
      <View style={tw("flex-1")}>
        {item.user_id && <Text style={tw("text-sm text-gray-500")}>User ID: {String(item.user_id)}</Text>}
        {item.email !== "" && <Text style={tw("text-sm text-gray-500")}>Email: {item.email}</Text>}
        {item.username && <Text style={tw("text-sm text-gray-500")}>Pseudo: {item.username}</Text>}
        {item.subject && <Text style={tw("text-lg font-semibold")}>{item.subject}</Text>}
        {item.message && <Text style={tw("text-base text-gray-700")}>{item.message}</Text>}
      </View>

      <TouchableOpacity
        style={tw("ml-4 bg-red-500 p-2 rounded-full")}
        onPress={() => askDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Messages des utilisateurs" backgroundColor="bg-whiteTransparent" />

        <View style={tw("flex-1 p-4 mt-16 min-w-96")}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMessage}
            ListEmptyComponent={<Text style={tw('text-center text-lg font-bold mt-32')}
            >Aucun message pour le moment.</Text>}
          />
        </View>
      </ScrollView>

      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={tw('text-center mb-4 font-primary text-lg')}>Etes-vous sûr de vouloir supprimer le texte ?</Text>
        <Pressable
          style={[tw('bg-red-600 px-4 py-2 rounded'), { alignSelf: 'center' }]}
          onPress={handleDeleteMessage}
        >
          <Text style={tw('text-white font-primary text-lg')}>Confirmer la suppression</Text>
        </Pressable>
      </CustomModal>
    </View>
  );
};

export default UserMessagingScreen;
