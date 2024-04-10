import { Dimensions } from "react-native";
import { Linking } from 'react-native';
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


// Ouverture d'un lien wikipedia proche du terme selectionné 
export const openWikipediaPageForWord = (word: string) => {
  // Suppression des terminaisons communes (très simpliste, à adapter)
  let searchWord = word.replace(/(s|es|ent|e)$/i, '');

  const directUrl = `https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchWord)}&format=json&origin=*`;

  fetch(directUrl)
    .then(response => response.json())
    .then(data => {
      const page = data.query.pages;
      const pageId = Object.keys(page)[0];
      if (pageId !== "-1") {
        // Si une page existe, ouvrez-la
        const url = `https://fr.wikipedia.org/wiki/${encodeURIComponent(searchWord)}`;
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
      } else {
        // Pas de page exacte trouvée, tentative avec la recherche plein texte améliorée
        const searchText = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchWord)}&format=json&origin=*`;
        return fetch(searchText);
      }
    })
    .then(response => response ? response.json() : null)
    .then(data => {
      if (data && data.query.search.length > 0) {
        const title = data.query.search[0].title;
        const url = `https://fr.wikipedia.org/wiki/${encodeURIComponent(title)}`;
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
      } else {
        console.log("Aucun résultat trouvé pour ce mot.");
      }
    })
    .catch(err => console.error("Erreur lors de la recherche Wikipedia", err));
};
