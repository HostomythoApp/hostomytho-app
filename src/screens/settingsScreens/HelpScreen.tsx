import FunctionButton from "components/FunctionButton";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput, Linking } from 'react-native';
import { createMessageContact } from "services/api/messages";
import { useTailwind } from 'tailwind-rn';
import { useUser } from 'services/context/UserContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome } from '@expo/vector-icons';

const HelpScreen = () => {
  const tw = useTailwind();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [required, setRequired] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackMessageType, setFeedbackMessageType] = useState('');
  const { user } = useUser();

  const submitContactForm = async () => {

    setEmailError(false);
    setSubjectError(false);
    setMessageError(false);
    setFeedbackMessage('');

    // HoneyPot
    if (required) return;

    let hasError = false;
    if (!subject.trim()) {
      setSubjectError(true);
      hasError = true;
    }
    if (!message.trim()) {
      setMessageError(true);
      hasError = true;
    }

    if (!hasError) {
      try {
        const messageData = {
          email,
          subject,
          message,
          user_id: user?.id,
          username: user?.username
        };
        await createMessageContact(messageData);
        setFeedbackMessage('Message envoyé avec succès.');
        setFeedbackMessageType('success');
        setEmail('');
        setSubject('');
        setMessage('');
        setRequired('');
      } catch (error) {
        setFeedbackMessage('Erreur lors de l\'envoi du message.');
        setFeedbackMessageType('error');
      }
    } else {
      setFeedbackMessage('Veuillez remplir tous les champs requis.');
      setFeedbackMessageType('error');
    }
  };

  const openEmail = (email: any) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ImageBackground source={require('images/bg_corridor.jpg')} style={tw('absolute bottom-0 left-0 w-full h-full')}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Aide et contact" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto w-full max-w-[640px] pt-20 items-center')}>
          <View style={{ ...tw('mb-2 py-6 px-2 m-4 rounded-lg items-center w-full'), backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Text style={tw('text-xl font-bold mt-4 mb-4 font-primary text-center')}>
              Formulaire de contact
            </Text>
            <KeyboardAwareScrollView style={tw('w-10/12')}>
              <View>

                <TextInput
                  style={tw('border-b border-gray-400 py-2 mt-4 font-primary')}
                  placeholder="Email (obligatoire seulement si vous souhaitez être contacté en retour)"
                  value={email}
                  onChangeText={setEmail}
                />
                {emailError && <Text style={tw("text-red-500 font-primary")}>Veuillez remplir ce champ.</Text>}
                <TextInput
                  style={tw('border-b border-gray-400 py-2 mt-4 font-primary')}
                  placeholder="Objet"
                  value={subject}
                  onChangeText={setSubject}
                />
                {subjectError && <Text style={tw("text-red-500 font-primary")}>Veuillez remplir ce champ.</Text>}
                <TextInput
                  style={tw('border-b border-gray-400 py-2 mt-4 font-primary h-24')}
                  placeholder="Votre message"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />
                {messageError && <Text style={tw("text-red-500 font-primary")}>Veuillez remplir ce champ.</Text>}
                <TextInput
                  style={tw('h-0')}
                  autoComplete="off"
                  value={required}
                  onChangeText={setRequired}
                />
              </View>
            </KeyboardAwareScrollView>


            <FunctionButton text={"Envoyer"} func={submitContactForm} />
            <Text>
              {feedbackMessage && (
                <Text style={tw(`text-center mt-4 text-lg font-primary ${feedbackMessageType === 'success' ? 'text-green-700' : 'text-red-500'}`)}>
                  {feedbackMessage}
                </Text>
              )}
            </Text>

            <View style={tw('w-full items-center')}>
              <Text style={tw('text-xl font-bold mt-6 mb-4 font-primary text-center')}>
                Contact des administrateurs
              </Text>
              <View style={tw('w-10/12')}>
                {[
                  { name: 'Bertrand REMY', email: 'remybertrand@hotmail.fr' },
                  { name: 'Karën FORT', email: 'karen.fort@loria.fr' },
                  { name: 'Bruno GUILLAUME', email: 'bruno.guillaume@inria.fr' },
                ].map((contact, index) => (
                  <View key={index} style={tw('flex-row items-center mb-1')}>
                    <Text style={tw('font-primary mr-1')}>{contact.name} - </Text>
                    <Text onPress={() => openEmail(contact.email)} style={tw('font-primary')}>
                      Contact
                      <FontAwesome name="envelope" size={18} color="black" style={tw('ml-1')} />
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HelpScreen;