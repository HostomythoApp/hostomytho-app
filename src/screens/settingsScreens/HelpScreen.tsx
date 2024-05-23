import FunctionButton from "components/FunctionButton";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput } from 'react-native';
import { createMessageContact } from "services/api/messages";
import { useTailwind } from 'tailwind-rn';
import { useUser } from 'services/context/UserContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const HelpScreen = () => {
  const tw = useTailwind();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
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
          user_id: user?.id
        };
        await createMessageContact(messageData);
        setFeedbackMessage('Message envoyé avec succès.');
        setFeedbackMessageType('success');
        setEmail('');
        setSubject('');
        setMessage('');
      } catch (error) {
        setFeedbackMessage('Erreur lors de l\'envoi du message.');
        setFeedbackMessageType('error');
      }
    } else {
      setFeedbackMessage('Veuillez remplir tous les champs requis.');
      setFeedbackMessageType('error');
    }
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
            <KeyboardAwareScrollView>
              <View style={tw('w-10/12')}>

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

            <Text style={tw('text-xl font-bold mt-6 mb-4 font-primary text-center')}>
              Contact des administrateurs</Text>
            <View style={tw(' w-10/12')}>
              <Text style={tw('font-primary')}>
                Bertrand REMY - bertrand.remy@inria.fr
                {"\n"}Karën FORT - karen.fort@loria.fr
                {"\n"}Bruno GUILLAUME - bruno.guillaume@inria.fr
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HelpScreen;