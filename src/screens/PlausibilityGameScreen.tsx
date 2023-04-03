import React, { useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainTitle from "components/MainTitle";
import PrimaryButton from "components/PrimaryButton";
import data from "data/fakeUserData.js";
import Swiper from "react-native-deck-swiper";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const PlausibilityGameScreen = ({ }) => {
  const tw = useTailwind();
  const [listTexts, setListTexts] = useState<any>(null);
  const swipeRef = useRef(null);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpandCard = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    <SafeAreaView style={tw("flex-1")}>
      <ScrollView contentContainerStyle={tw("flex-grow")}>

        {/* Cards */}
        <View style={tw("flex-1 -mt-6")}>
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={data.texts}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
            }}
            onSwipedAll={() => {
              console.log("onSwipedAll");
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
                  },
                },
              },
              right: {
                title: "Valide",
                style: {
                  label: {
                    color: "#81dba0",
                  },
                },
              },
              top: {
                title: "Doute",
                style: {
                  label: {
                    color: "yellow",
                  },
                },
              },
            }}
            renderCard={(card, index) => {
              const isExpanded = expandedCard === index;
              const limitedText = card.content.slice(0, 750) + (card.content.length > 750 ? "..." : ""); // Increased text length
              const displayText = isExpanded ? card.content : limitedText;

              return (
                <View style={[
                  tw("bg-white rounded-xl justify-center"),
                  {
                    minHeight: 400, // Increased card size
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }
                ]}>
                  <Text style={[
                    tw("text-xl tracking-wider mb-2 m-7"),
                    {
                      fontFamily: "Pally",
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    },
                  ]}

                    selectionColor="transparent" >
                    {/* TODO: Désactiver le surlignage */}
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
        </View>

      </ScrollView>

      {/* Boutons de plausibilité */}
      <View style={tw('flex flex-row justify-evenly mb-4')}>
        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}
          onPress={() => swipeRef.current.swipeLeft()} >
          <Entypo name="cross" size={32} color="red" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-orange-100')}
          onPress={() => swipeRef.current.swipeLeft()} >
          <Entypo name="flag" size={28} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-yellow-100')}
          onPress={() => swipeRef.current.swipeTop()}  >
          <AntDesign name="question" size={30} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-50')}
          onPress={() => swipeRef.current.swipeRight()}  >
          <Ionicons name="checkmark" size={24} color="#48d1cc" />
        </TouchableOpacity>

        <TouchableOpacity style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}
          onPress={() => swipeRef.current.swipeRight()}  >
          <Ionicons name="checkmark-done-sharp" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlausibilityGameScreen;
