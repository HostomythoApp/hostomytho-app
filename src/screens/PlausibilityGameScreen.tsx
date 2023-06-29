import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import Swiper from "react-native-deck-swiper";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import ModalPlausibilityGame from 'components/ModalPlausibilityGame';
import { Text as TextType } from "models/Text";
import { useUser } from 'services/context/UserContext';
import CustomHeaderInGame from "components/header/CustomHeaderInGame";

const PlausibilityGameScreen = ({ }) => {
  const tw = useTailwind();
  const swipeRef = useRef<Swiper<any>>(null);
  const [swipedAll, setSwipedAll] = useState(false);
  const [texts, setTexts] = useState<TextType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [swipeType, setSwipeType] = useState<'right' | 'left' | null>(null);
  const [activeModal, setActiveModal] = useState(false);
  const [expandedCards, setExpandedCards] = useState<boolean[]>(data.texts.map(() => false));
  const [displayedTexts, setDisplayedTexts] = useState<string[]>(data.texts.map(text => text.content.slice(0, 750) + (text.content.length > 750 ? "..." : "")));
  const [swiperKey, setSwiperKey] = useState(0);
  const { incrementPoints } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTexts(data.texts)
  });


  // Toggle de longueur des textes
  useEffect(() => {
    const updatedDisplayedTexts = data.texts.map((text: any, index: any) => {
      if (expandedCards[index]) {
        return text.content;
      } else {
        return text.content.slice(0, 750) + (text.content.length > 750 ? "..." : "");
      }
    });
    setDisplayedTexts(updatedDisplayedTexts);
    setSwiperKey(prevSwiperKey => prevSwiperKey + 1);
  }, [expandedCards]);

  const updateSwipeFromButton = async (type: 'right' | 'left' | null) => {
    return new Promise((resolve) => {
      setSwipeType(type);
      setActiveModal(true);
      resolve(true);
    });
  };

  const toggleExpandCard = useCallback((index: number) => {
    const updatedExpandedCards = [...expandedCards];
    updatedExpandedCards[index] = !updatedExpandedCards[index];
    setExpandedCards(updatedExpandedCards);
  }, [expandedCards]);

  const handleSwipe = (type: 'right' | 'left') => {
    if (!activeModal) {
      setSwipeType(type);
      setIsModalVisible(true);
    }
  };

  // Fin des cartes
  const onSwipedAll = () => {
    setSwipedAll(true);
  }

  const swipeLeft = useCallback(async (cardIndex: number) => {
    if (!texts[cardIndex]) return;
    const textPlayed = texts[cardIndex];
    setActiveModal(false);
    incrementPoints(10);
  }, [texts]);

  const swipeRight = useCallback(async (cardIndex: number) => {
    const textPlayed = texts[cardIndex];
    setActiveModal(false);
  }, [texts]);


  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("flex-grow")}>
        <CustomHeaderInGame title="Plausibilité de textes" />

        {/* Cards */}
        <View style={tw("flex-1 -mt-6")}>
          <Swiper

            key={swiperKey}
            ref={swipeRef}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={data.texts}
            onSwipedLeft={(cardIndex) => {
              handleSwipe('left');
              swipeLeft(cardIndex);
              incrementPoints(10);
            }}
            onSwipedRight={(cardIndex) => {
              handleSwipe('right');
              swipeRight(cardIndex);
              incrementPoints(10);
            }}
            onSwipedAll={() => {
              onSwipedAll();
            }}
            cardIndex={0}
            backgroundColor={"#4FD0E9"}
            stackSize={5}
            disableBottomSwipe={true}
            overlayLabels={{
              left: {
                title: "Suspect",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                    fontFamily: "Pally",
                  },
                },
              },
              right: {
                title: "Valide",
                style: {
                  label: {
                    color: "#81dba0",
                    fontFamily: "Pally",
                  },
                },
              },
              top: {
                title: "Doute",
                style: {
                  label: {
                    color: "yellow",
                    fontFamily: "Pally",
                  },
                },
              },
            }}
            renderCard={(card: any, index) => {
              const isExpanded = expandedCards[index];
              return (
                <View style={[
                  tw("bg-[#FFFEE0] rounded-xl justify-center"),
                  {
                    minHeight: 400, // Increased card size
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    cursor: 'grab'
                  }
                ]}>
                  <Text style={[
                    tw("text-2xl tracking-wider mb-2 m-7 font-secondary"),
                    {
                      // TODO Importer et altérner plusieurs fonts
                      // WebkitUserSelect: 'none',
                      // userSelect: 'none'
                    },
                  ]}>
                    {displayedTexts[index]}
                  </Text>
                  {card.content.length > 750 && (
                    <View style={tw("flex items-center mb-2")}>
                      <TouchableOpacity onPress={() => toggleExpandCard(index)} >
                        {isExpanded ? (
                          <AntDesign name="up" size={24} color="black" />
                        ) : (
                          <AntDesign name="down" size={24} color="black" />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
          ></Swiper>
          {swipedAll && (
            <View style={tw('relative  h-3/4 rounded-xl justify-center items-center')}>
              <Text style={tw('font-bold pb-5')} > Plus de texte pour le moment. Reviens plus tard</Text>
            </View>
          )}
        </View>
      </ScrollView>


      <ModalPlausibilityGame
        isVisible={isModalVisible}
        swipeType={swipeType}
        closeModal={() => setIsModalVisible(false)}
        setIsModalVisible={setIsModalVisible}
      />

      {/* Boutons de plausibilité */}
      {!swipedAll && (
        < View style={tw('flex flex-row justify-evenly my-1 md:my-3')}>
          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-red-200')}
            onPress={async () => {
              await updateSwipeFromButton('left');
              swipeRef.current?.swipeLeft();
            }} >
            <Entypo name="cross" size={32} color="red" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-orange-100')}
            onPress={async () => {
              await updateSwipeFromButton('left');
              swipeRef.current?.swipeLeft();
            }} >
            <Entypo name="flag" size={28} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-yellow-100')}
            onPress={() => swipeRef.current?.swipeTop()}  >
            <AntDesign name="question" size={30} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-green-50')}
            onPress={async () => {
              await updateSwipeFromButton('right');
              swipeRef.current?.swipeRight();
            }} >
            <Ionicons name="checkmark" size={24} color="#48d1cc" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-green-200')}
            onPress={async () => {
              await updateSwipeFromButton('right');
              swipeRef.current?.swipeRight();
            }} >
            <Ionicons name="checkmark-done-sharp" size={24} color="green" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlausibilityGameScreen;
