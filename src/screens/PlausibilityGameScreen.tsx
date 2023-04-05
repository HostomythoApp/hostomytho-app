import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import Swiper from "react-native-deck-swiper";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const PlausibilityGameScreen = ({ }) => {
  const tw = useTailwind();
  const swipeRef = useRef<Swiper<any>>(null);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [swipedAll, setSwipedAll] = useState(false);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    setTexts(data.texts)
  });

  const toggleExpandCard = (index: number) => {
    console.log("toggleExpandCard");
    console.log("index ", index);
    console.log("expandedCard ", expandedCard);
    if (expandedCard) {
      setExpandedCard(null);
    } else {
      setExpandedCard(1);
    }
  };

  const onSwipedAll = () => {
    setSwipedAll(true);
  }

  const swipeLeft = async (cardIndex: number) => {
    if (!texts[cardIndex]) return;
    const textPlayed = texts[cardIndex];
    console.log(`Swiped pass on ${textPlayed.id}`);
  }

  const swipeRight = async (cardIndex: number) => {
    const textPlayed = texts[cardIndex];
    console.log(`Swiped pass on ${textPlayed.id}`);
  }


  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("flex-grow")}>

        {/* Cards */}
        <View style={tw("flex-1 -mt-6")}>
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={data.texts}
            onSwipedLeft={(cardIndex) => {
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              swipeRight(cardIndex);
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
                    textAlign: "bottom",
                    fontFamily: "Pally",
                  },
                },
              },
            }}
            renderCard={(card: any, index) => {
              const isExpanded = expandedCard === index;
              const limitedText = card.content.slice(0, 750) + (card.content.length > 750 ? "..." : ""); // Increased text length
              const displayText = isExpanded ? card.content : limitedText;

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
                    tw("text-2xl tracking-wider mb-2 m-7"),
                    {
                      // TODO Importer et altérner plusieurs fonts
                      fontFamily: "MarckScript",
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    },
                  ]}

                    selectionColor="transparent" >
                    {displayText}
                  </Text>
                  {card.content.length > 750 && (
                    <View style={tw("flex items-center")}>
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
              <Text style={tw('font-bold pb-5')} > Plus de texte. Reviens plus tard</Text>
            </View>
          )}
        </View>

      </ScrollView>

      {/* Boutons de plausibilité */}
      {!swipedAll && (
        <View style={tw('flex flex-row justify-evenly mb-4')}>
          <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}
            onPress={() => swipeRef.current?.swipeLeft()} >
            <Entypo name="cross" size={32} color="red" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-orange-100')}
            onPress={() => swipeRef.current?.swipeLeft()} >
            <Entypo name="flag" size={28} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-yellow-100')}
            onPress={() => swipeRef.current?.swipeTop()}  >
            <AntDesign name="question" size={30} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-50')}
            onPress={() => swipeRef.current?.swipeRight()}  >
            <Ionicons name="checkmark" size={24} color="#48d1cc" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}
            onPress={() => swipeRef.current?.swipeRight()}  >
            <Ionicons name="checkmark-done-sharp" size={24} color="green" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlausibilityGameScreen;
