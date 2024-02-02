import { Dimensions } from "react-native";

export function shuffleArray(array: any) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function splitText(text: any): any {
  const words = text.content.split(/(\p{L}+[']?|['']\p{L}+|\s+)/gui)
    // @ts-ignore
    .filter(word => word.trim().length > 0)
    .map((word: string, idx: number) => {
      if (word.includes("\n")) {
        return [
          { text: word.replace("\n", " "), isSelected: false, sentenceId: null, isCurrentSelection: false, position: idx },
        ];
      } else {
        return { text: word, isSelected: false, sentenceId: null, isCurrentSelection: false, position: idx };
      }
    }).flat();
  return { ...text, content: words };
};

// Taille de font en fonction de la largeur d'écran
export const responsiveFontSize = (fontSize: number) => {
  const { width } = Dimensions.get('window');
  const standardScreenWidth = 1200;
  const WidthCoefficient = width / standardScreenWidth;
  const size = fontSize * WidthCoefficient;

  return size > 10 ? size : 10;
};