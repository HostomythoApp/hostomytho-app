import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import Swiper from "react-native-deck-swiper";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useUser } from 'services/auth/UserContext';
import { Word } from "models/Word";
import { TemporalEntity } from "models/TemporalEntity";
import { getAllTexts } from "services/api/texts";

export interface SplitText {
  id: number;
  content: Word[];
  selectedType: string | null;
}

const PlausibilityGameDetailedScreen = ({ }) => {
  const tw = useTailwind();
  const swipeRef = useRef<Swiper<any>>(null);
  const [texts, setTexts] = useState<SplitText[]>([]);
  const [activeModal, setActiveModal] = useState(false);
  const { incrementPoints } = useUser();
  const [startWordIndex, setStartWordIndex] = useState<number | null>(null); // Nouvel état pour le début de la sélection
  const [endWordIndex, setEndWordIndex] = useState<number | null>(null); // Nouvel état pour la fin de la sélection
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temporalEntities, setTemporalEntities] = useState<TemporalEntity[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await getAllTexts();
        const shuffledTexts = shuffleArray(response);
        const newtexts = shuffledTexts.slice(0, 10).map((text) => {
          const words = text.content.split(' ').map((word: Word) => ({ text: word, isSelected: false, entityId: null }));
          return { ...text, content: words };
        });

        setTexts(newtexts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTexts();
  }, []);

  function shuffleArray(array: any) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const updateSwipeFromButton = async (type: 'right' | 'left' | null) => {
    return new Promise((resolve) => {
      setActiveModal(true);
      resolve(true);
    });
  };

  const onWordPress = (wordIndex: number, textIndex: number) => {
    const newTexts = texts.map((text, idx) => {
      if (idx === textIndex) {
        const newWords = text.content.map((word: Word, idx: number) => {
          if (startWordIndex === null) { // Si c'est le premier clic
            if (idx === wordIndex) {
              return { ...word, isSelected: true, entityId: word.isSelected ? null : temporalEntities.length };
            }
          } else if (startWordIndex !== null && endWordIndex === null) { // Si c'est le deuxième clic
            if (idx >= Math.min(startWordIndex, wordIndex) && idx <= Math.max(startWordIndex, wordIndex)) {
              return { ...word, isSelected: true, entityId: word.isSelected ? null : temporalEntities.length };
            }
          } else { // Si on a déjà sélectionné une plage de mots
            if (idx === wordIndex) { // Si c'est le début d'une nouvelle sélection
              return { ...word, isSelected: true, entityId: null };
            } else { // Si c'est un mot précédemment sélectionné
              return { ...word, isSelected: false, entityId: null };
            }
          }
          return word;
        });

        // Réinitialiser les indices de début et de fin lorsqu'un mot est sélectionné après une plage de mots
        if (startWordIndex !== null && endWordIndex !== null) {
          setStartWordIndex(wordIndex);
          setEndWordIndex(null);
        } else if (startWordIndex !== null && endWordIndex === null) { // Après le deuxième clic
          setEndWordIndex(wordIndex);
        } else { // Après le premier clic
          setStartWordIndex(wordIndex);
        }

        return { ...text, content: newWords };
      }
      return text;
    });
    setTexts(newTexts);
  };


  const renderText = (text: SplitText, index: number) => {
    if (typeof text === "undefined") {
      return null;
    }
    return (
      <SafeAreaView style={tw("flex-1 bg-white")}>

        <View
          style={[
            tw("bg-[#FFFEE0] rounded-xl justify-center mx-2 mt-12"),
            {
              minHeight: 300,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <View style={tw("flex-row flex-wrap mb-2 m-7")}>
            {text.content.map((word: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onWordPress(idx, index)}
                style={tw(
                  `m-0 p-[2px] ${word.isSelected ? "bg-yellow-300" : "bg-transparent"}`
                )}
              >
                <Text style={tw("text-2xl font-HandleeRegular")}>{word.text + " "}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("flex-grow")}>

        {/* Cards */}
        <View style={tw("flex-1 -mt-6")}>
          {renderText(texts[currentIndex], currentIndex)}
        </View>
      </ScrollView>

      {/* Boutons de plausibilité */}
      <View style={tw('flex flex-row justify-evenly mb-4')}>
        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}
          onPress={async () => {
            setShowModal(true);
          }} >
          <Entypo name="cross" size={32} color="red" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-orange-100')}
          onPress={async () => {
            setShowModal(true);
          }} >
          <Entypo name="flag" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-yellow-100')}
          onPress={() => {
            setShowModal(true);
          }}  >
          <AntDesign name="question" size={30} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-50')}
          onPress={async () => {
            setShowModal(true);
          }} >
          <Ionicons name="checkmark" size={24} color="#48d1cc" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}
          onPress={async () => {
            setShowModal(true);
          }} >
          <Ionicons name="checkmark-done-sharp" size={24} color="green" />
        </TouchableOpacity>
      </View>

      {
        showModal &&
        <View style={tw("absolute inset-0 flex items-center justify-center bg-black bg-opacity-50")}>
        <View style={tw("bg-white rounded-xl p-8")}>
          <Text style={tw("text-2xl mb-4")}>Voulez-vous préciser où est la faute ?</Text>
          <View style={tw("flex flex-row justify-evenly")}>
            <TouchableOpacity
              style={tw("bg-blue-500 p-2 rounded-md")}
              onPress={() => {
                // ici, vous pouvez ajouter la logique pour aller au texte suivant
                setShowModal(false);
              }}
            >
              <Text style={tw("text-white")}>Aller au texte suivant</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw("bg-green-500 p-2 rounded-md")}
              onPress={() => {
                // ici, vous pouvez ajouter la logique pour préciser où est la faute
                setShowModal(false);
              }}
            >
              <Text style={tw("text-white")}>Préciser la faute</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    }

  </SafeAreaView>
);
};

export default PlausibilityGameDetailedScreen;