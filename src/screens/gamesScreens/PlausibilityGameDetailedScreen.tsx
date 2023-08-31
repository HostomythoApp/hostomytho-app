import React, { useCallback, useEffect, useRef, useState, FC } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign, Entypo, Ionicons, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { useUser } from 'services/context/UserContext';
import { Word } from "models/Word";
import Modal from 'react-native-modal';
import CustomHeaderInGame from 'components/header/CustomHeaderInGame';
import { ErrorDetail } from "models/ErrorDetail";
import { getTextWithTokens } from "services/api/texts";
import { TextWithTokens } from "interfaces/TextWithTokens";

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-pink-300",
];
export interface SplitText {
  id: number;
  content: Word[];
}

// Pour mon jeu de plausibilité, 
interface ModalPlausibilityGameDetailedProps {
  isVisible: boolean;
  closeModal: () => void;
  setIsModalVisible: (isVisible: boolean) => void;
  setHighlightEnabled: (highlight: boolean) => void;
}


const PlausibilityGameDetailedScreen = () => {
  const tw = useTailwind();
  const [texts, setTexts] = useState<SplitText[]>([]);
  const { incrementPoints } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  const [errorSpecifying, setErrorSpecifying] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSelectionStarted, setSelectionStarted] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ErrorDetail[]>([]);
  const [nextId, setNextId] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const window = Dimensions.get('window');
  const isMobile = window.width < 795;
  const { user } = useUser();
  const [text, setText] = useState<TextWithTokens>();
  const [selectedWords, setSelectedWords] = useState<number[]>([]);


  useEffect(() => {
    if (!text && user) {
      const fetchText = async () => {
        try {
          const response = await getTextWithTokens(user.id, 'plausibility');
          setText(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchText();
    }
  }, [text, user]);

  const HighlightedWord = ({ word, index }: { word: Word; index: number }) => {
    const isSelected = selectedWords.includes(index);
    return (
      <TouchableOpacity
        onPress={() => onTokenPress(index)}
        style={tw(
          `m-0 p-[2px] ${word.isCurrentSelection ? word.color : word.isSelected ? getSentenceColor(word.sentenceId) : "bg-transparent"}`
        )}
      >
        <Text style={tw("text-2xl font-secondary")}>{word.content + " "}</Text>
      </TouchableOpacity>
    );
  };

  const addErrorDetail = () => {
    setSelectionStarted(false);
    if (!text) return;

    const selectedTokens = text.tokens.filter(token => token.isCurrentSelection);
    selectedTokens.forEach(token => {
      token.sentenceId = nextId;
      token.isSelected = true;
      token.isCurrentSelection = false;
      delete token.color;
    });

    const wordPositions = selectedTokens.map(token => token.position).join(', ');
    setErrorDetails([...errorDetails, {
      id: nextId,
      user_text_rating_id: 1,
      content: selectedTokens.map(token => token.content).join(' '),
      word_positions: wordPositions,
      color: colors[colorIndex]
    }]);

    setNextId(nextId + 1);
    setColorIndex((colorIndex + 1) % colors.length);
  };


  const getSentenceColor = (sentenceId: number | null) => {
    if (sentenceId === null) {
      return "bg-transparent";
    }
    const sentence = errorDetails.find(spec => spec.id === sentenceId);
    return sentence ? sentence.color : "bg-transparent";
  };

  const onTokenPress = (wordIndex: number) => {
    if (!highlightEnabled) return;
    setText(currentText => {
      if (!currentText) return currentText;

      const newTokens = [...currentText.tokens];
      const token = newTokens[wordIndex];
      token.isCurrentSelection = !token.isCurrentSelection;

      if (token.isCurrentSelection) {
        token.color = 'bg-blue-200';
      } else {
        delete token.color;
      }

      const anyTokenSelected = newTokens.some(t => t.isCurrentSelection);
      setSelectionStarted(anyTokenSelected);
      console.log(newTokens);

      return { ...currentText, tokens: newTokens };
    });
  };

  //Modal
  const ModalPlausibilityGameDetailed: FC<ModalPlausibilityGameDetailedProps> = ({ isVisible, closeModal, setIsModalVisible, setHighlightEnabled }) => {
    const tw = useTailwind();
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        backdropColor="transparent"
        style={tw("items-center justify-center")}
      >
        <View style={[tw("bg-white rounded-lg p-4 flex-row mb-14"), {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        }]}>
          <>
            <TouchableOpacity
              style={tw("bg-orange-100 p-3 mr-3 rounded-lg")}
              onPress={() => {
                setIsModalVisible(false);
                setHighlightEnabled(true);
                setErrorSpecifying(true);
                closeModal();
              }}
            >
              <Text style={tw(" text-orange-500 font-semibold")}>Source du doute</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw("bg-green-200 p-3 rounded-lg")}
              onPress={() => {
                setIsModalVisible(false);
                if (currentIndex + 1 < texts.length) {
                  setCurrentIndex(currentIndex + 1);
                  incrementPoints(5)
                  scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                } else {
                  // TODO afficher qu'il n'y a plus de texte
                }
                closeModal();
              }}
            >
              <Text style={tw("text-green-700 font-semibold")}>Aller au texte suivant</Text>
            </TouchableOpacity>
          </>
        </View>
      </Modal>
    );
  };
  //finmodal

  const renderErrorDetail = (errorDetail: ErrorDetail) => (
    <View key={errorDetail.id} style={tw(`flex-row items-center m-1 max-w-[400px] ml-9`)}>
      {errorDetail.content ? (
        <View style={tw("flex-shrink")}>
          <Text style={tw(`text-lg mr-2 ${errorDetail.color ? errorDetail.color : ''} font-primary`)}>{errorDetail.content}</Text>
        </View>
      ) : (
        <Text style={tw("text-lg mr-2")}>Contenu vide</Text>
      )}
      <TouchableOpacity onPress={() => removeErrorDetail(errorDetail.id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const removeErrorDetail = (errorDetailId: number) => {
    setErrorDetails(errorDetails.filter(errorDetail => errorDetail.id !== errorDetailId));

    const newTexts = texts.map(text => {
      const newWords = text.content.map(word => {
        if (word.sentenceId === errorDetailId) {
          return { ...word, isSelected: false, isCurrentSelection: false };
        }
        return word;
      });
      return { ...text, content: newWords };
    });
    setTexts(newTexts);
  };

  // TODO Séparer dans d'autres fichiers pour plus de visibilité
  const RenderText = React.memo(({ text }) => {
    if (!text) return null;
    console.log("renderText");

    return (
      <SafeAreaView style={tw("flex-1 bg-white")}>

        <View
          style={[
            tw("bg-[#FFFEE0] rounded-xl justify-center mx-2 mt-4 lg:mt-8 xl:mt-12"),
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
            {text.tokens.map((word: Word, idx: number) => (
              <HighlightedWord word={word} index={idx} key={idx} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }, (prevProps, nextProps) => {
    return prevProps.text === nextProps.text;
  });

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView ref={scrollViewRef}>
        <CustomHeaderInGame title="Plausibilité de textes" />
        {/* Cards */}
        <View style={tw("flex-1 mb-2")}>
          {text && <RenderText text={text} />}
        </View>
        <View style={tw("mx-4 mt-2 mb-2")}>
          {errorDetails.map(errorDetail => renderErrorDetail(errorDetail)

          )}
        </View>
      </ScrollView>

      <ModalPlausibilityGameDetailed
        isVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        setIsModalVisible={setIsModalVisible}
        setHighlightEnabled={setHighlightEnabled}
      />

      {errorSpecifying ? (
        <SafeAreaView>
          <View style={tw('absolute bottom-3 left-4 flex-col')}>
            {errorDetails.length > 0 && (
              <TouchableOpacity
                style={[
                  tw('w-8  bg-blue-500 rounded-full justify-center items-center'),
                ]}
                onPress={() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
              >
                <MaterialIcons name="arrow-downward" size={25} color="white" />
              </TouchableOpacity>
            )}
          </View>

          <View style={tw('absolute bottom-3 right-4 flex-col w-52')}>
            {isSelectionStarted &&
              <TouchableOpacity
                key={"add"}
                style={tw(`px-2 items-center flex-row justify-center rounded-full h-12 mx-2 mb-1 ${isSelectionStarted ? 'bg-blue-500' : 'bg-blue-50'}`)}
                onPress={() => {
                  addErrorDetail();
                }}
                disabled={!isSelectionStarted}
              >
                <MaterialIcons name="add" size={22} color="white" />
                <Text style={tw("text-white font-primary text-lg")}>Valider la sélection</Text>
              </TouchableOpacity>
            }

            <TouchableOpacity
              key={"next"}
              style={tw(`px-2 items-center flex-row justify-center rounded-full h-12 mx-2 ${errorDetails.length > 0 ? 'bg-primary' : 'bg-green-200'}`)}
              onPress={async () => {
                if (errorDetails.length > 0) {
                  if (currentIndex + 1 < texts.length) {
                    setCurrentIndex(currentIndex + 1);
                    incrementPoints(10)
                    setHighlightEnabled(false)
                    setErrorSpecifying(false)
                    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
                    // Réinitialisation de l'état
                    const newTexts = texts.map((text, idx) => {
                      if (idx === currentIndex) {
                        const newWords = text.content.map(word => {
                          return { ...word, isSelected: false };
                        });
                        return { ...text, content: newWords };
                      }
                      return text;
                    });
                    setTexts(newTexts);
                    setErrorDetails([]);
                    setSelectionStarted(false);
                  } else {
                    // TODO afficher qu'il n'y a plus de texte
                  }
                }
              }}
              disabled={errorDetails.length === 0}
            >
              <Text style={tw("text-white font-primary text-lg")}>Phrase suivante</Text>

              <View style={tw(`rounded-full h-6 w-6 flex items-center justify-center ml-2 ${errorDetails.length > 0 ? 'bg-primaryLighter' : 'bg-green-100'}`)}>
                <Text style={tw('text-white font-bold')}>{errorDetails.length}</Text>
              </View>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      ) : (
        // Boutons de plausibilité  
        < View style={tw('flex flex-row justify-evenly my-1 md:my-3')}>
          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-red-200')}
            onPress={async () => {
              setIsModalVisible(true);
            }} >
            <Entypo name="cross" size={32} color="red" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-orange-100')}
            onPress={async () => {
              setIsModalVisible(true);
            }} >
            <Entypo name="flag" size={28} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-yellow-100')}
            onPress={() => {
              setIsModalVisible(true);
            }}  >
            <AntDesign name="question" size={30} color="orange" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-green-50')}
            onPress={async () => {
              setIsModalVisible(true);
            }} >
            <Ionicons name="checkmark" size={24} color="#48d1cc" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw('items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 my-auto bg-green-200')}
            onPress={async () => {
              if (currentIndex + 1 < texts.length) {
                setCurrentIndex(currentIndex + 1);
                incrementPoints(5);
                scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
              } else {
                // TODO afficher qu'il n'y a plus de texte
              }
            }}
          >
            <Ionicons name="checkmark-done-sharp" size={24} color="green" />
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView >
  );
};

export default PlausibilityGameDetailedScreen;