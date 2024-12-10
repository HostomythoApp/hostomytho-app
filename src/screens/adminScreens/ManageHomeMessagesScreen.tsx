import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import CustomModal from 'components/modals/CustomModal';
import TimedCustomModal from 'components/modals/TimedCustomModal';
import { getMessagesMenu, updateMessageMenuByType, notifyAllUsers } from 'services/api/messages';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: number;
  message_type: 'home_not_connected' | 'home_connected';
  message: string;
  title: string | null;
  active: boolean;
}

const ManageHomeMessagesScreen = () => {
  const tw = useTailwind();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [timedModalVisible, setTimedModalVisible] = useState(false);

  const [messageHeight, setMessageHeight] = useState(40);
  const [titleHeight, setTitleHeight] = useState(40);

  const loadMessages = async () => {
    try {
      const response = await getMessagesMenu();
      setMessages(response);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les messages.');
    }
  };

  const askNotif = () => {
    setNotificationModalVisible(true);
  };

  const handleEditMessage = (message: Message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

  const handleSaveMessage = async () => {
    if (!selectedMessage) return;

    try {
      await updateMessageMenuByType(selectedMessage.message_type, {
        title: selectedMessage.title === '' ? null : selectedMessage.title,
        message: selectedMessage.message,
        active: selectedMessage.active,
      });
      loadMessages();
      setSelectedMessage(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Erreur', 'Impossible de modifier le message.');
    }
  };

  const handleNotifyUsers = async () => {
    try {
      await notifyAllUsers();
      setNotificationModalVisible(false);
      setTimedModalVisible(true);
    } catch (error) {
      console.log('Erreur', 'Impossible de notifier les utilisateurs.');
    }
  };

  const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>, type: 'message' | 'title') => {
    const { height } = event.nativeEvent.contentSize;
    if (type === 'message') {
      setMessageHeight(Math.max(40, height));
    } else if (type === 'title') {
      setTitleHeight(Math.max(40, height));
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <View style={tw('flex-1 bg-gray-100')}>
      <ScrollView contentContainerStyle={tw('flex-grow justify-center items-center')} style={tw('w-full')}>
        <CustomHeaderEmpty title="Gestion des messages d'accueil" backgroundColor="bg-whiteTransparent" />

        <View style={tw('flex-1 p-4 mt-16 min-w-96')}>
          {messages.map((message: any) => (
            <View key={message.id} style={tw('p-4 border-b border-gray-300')}>
              <Text style={tw('text-xl font-bold mb-4')}>
                {message.message_type === 'home_not_connected'
                  ? 'Message pour les joueurs non connectés'
                  : 'Message pour les joueurs connectés'}
              </Text>

              <Text style={tw('text-base text-gray-700')}>
                <Text style={tw('font-bold')}>Contenu principal :</Text> {message.message}
              </Text>
              <Text style={tw('text-lg text-blue-800 mt-4')}>
                <Text style={tw('font-bold')}>Actualité :</Text> {message.title || 'Pas d\'actualité pour le moment'}
              </Text>

              <TouchableOpacity onPress={() => handleEditMessage(message)} style={tw('mt-2 bg-blue-500 p-2 rounded w-40 self-center')}>
                <Text style={tw('text-white text-center')}>Modifier</Text>
              </TouchableOpacity>

            </View>
          ))}
          <View style={tw('mt-2')}
          >
            <Text style={tw('text-xl font-bold self-center')}
            >Rendre active l'animation de l'enveloppe pour tous les utilisateurs :</Text>
            <TouchableOpacity onPress={() => askNotif()} style={tw('mt-2 bg-yellow-500 p-2 rounded w-40 self-center items-center justify-center')}>
              <View style={tw('flex-row items-center justify-center')}>
                <Ionicons name="mail-outline" size={24} color="white" style={tw('mr-2')} />
                <Text style={tw('text-white text-center font-bold')}>Activer l'enveloppe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Modal de modification */}
      {selectedMessage && (
        <CustomModal isVisible={modalVisible} onClose={() => setSelectedMessage(null)}>
          <Text style={tw('text-center mb-4 font-primary text-lg min-w-96')}>Modifier le message</Text>

          <TextInput
            style={[tw('border p-2 mb-2 w-full'), { height: messageHeight }]}
            placeholder="Message"
            value={selectedMessage.message}
            onChangeText={(text: any) => setSelectedMessage({ ...selectedMessage, message: text })}
            multiline
            onContentSizeChange={(event: any) => handleContentSizeChange(event, 'message')}
          />

          <TextInput
            style={[tw('border p-2 mb-2 w-full'), { height: titleHeight }]}
            placeholder="Actualité"
            value={selectedMessage.title || ''}
            onChangeText={(text: any) => setSelectedMessage({ ...selectedMessage, title: text })}
            multiline
            onContentSizeChange={(event: any) => handleContentSizeChange(event, 'title')}
          />

          <TouchableOpacity style={tw('bg-green-600 px-4 py-2 rounded')} onPress={handleSaveMessage}>
            <Text style={tw('text-white text-center')}>Sauvegarder</Text>
          </TouchableOpacity>
        </CustomModal>
      )}

      {/* Modal de confirmation pour la notification */}
      {notificationModalVisible && (
        <CustomModal isVisible={notificationModalVisible} onClose={() => setNotificationModalVisible(false)}>
          <Text style={tw('text-center mb-4 font-primary text-lg')}>Êtes-vous sûr de vouloir notifier tous les utilisateurs ?</Text>
          <TouchableOpacity style={tw('bg-green-600 px-4 py-2 rounded')} onPress={handleNotifyUsers}>
            <Text style={tw('text-white text-center')}>Confirmer</Text>
          </TouchableOpacity>
        </CustomModal>
      )}

      <TimedCustomModal isVisible={timedModalVisible} onClose={() => setTimedModalVisible(false)}>
        <Text style={tw('text-center font-primary text-xl text-green-900')}>Enveloppe activée avec succès.</Text>
      </TimedCustomModal>
    </View>
  );
};

export default ManageHomeMessagesScreen;
