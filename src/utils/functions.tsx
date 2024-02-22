import { Dimensions } from "react-native";
const { width } = Dimensions.get('window');
const standardScreenWidth = 1200;
const widthCoefficient = width / standardScreenWidth;

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
  let size = fontSize * widthCoefficient;
  size = Math.max(size, 10);
  size = Math.min(size, 24);

  return size;
};

export const responsiveTitle = (fontSize: number) => {
  let size = fontSize * widthCoefficient;
  size = Math.max(size, 15);
  size = Math.min(size, 44);

  return size;
};