import { ErrorDetail } from "models/ErrorDetail";
import { TestPlausibilityError } from "models/TestPlausibilityError";
import { TestSpecification } from "models/TestSpecification";
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { getTestSpecificationsByTextId } from "services/api/testSpecifications";

export const checkUserSelection = async (
    textId: number,
    userSentenceSpecifications: UserSentenceSpecification[],
    gameType: 'hypothesis' | 'condition' | 'negation',
    positionErrorMargin: number = 3, // Marge d'erreur pour la position des mots
    negationErrorMargin: number = 1, // Marge d'erreur pour le compte des négations
): Promise<{ isValid: boolean, testSpecifications: TestSpecification[] }> => {

    try {
        const testSpecifications = await getTestSpecificationsByTextId(textId, gameType);
        // Condition pour gérer le cas où il n'y a aucune négation dans la BDD
        if (testSpecifications.length === 0 && userSentenceSpecifications.length > 0) {
            return { isValid: false, testSpecifications };
        }

        // Ajustements pour le nombre de sélections en tenant compte de la tolérance
        if (testSpecifications.length === 1 && userSentenceSpecifications.length > testSpecifications.length + negationErrorMargin) {
            return { isValid: false, testSpecifications };
        } else if (testSpecifications.length > 1 && Math.abs(userSentenceSpecifications.length - testSpecifications.length) > negationErrorMargin) {
            return { isValid: false, testSpecifications };
        }

        let matchedNegationsCount = 0;

        // Vérification de la correspondance des positions de mots pour chaque négation
        testSpecifications.forEach(testSpec => {
            const testWordPositions = testSpec.word_positions.split(',').map(pos => parseInt(pos));

            const isMatched = userSentenceSpecifications.some(userSpec => {
                const userWordPositions = userSpec.word_positions.split(',').map(pos => parseInt(pos));
                return testWordPositions.some(testPos => 
                    userWordPositions.some(userPos => Math.abs(userPos - testPos) <= positionErrorMargin));
            });

            if (isMatched) {
                matchedNegationsCount++;
            }
        });

        // Toutes les négations doivent avoir au moins une position correspondante parmi les sélections de l'utilisateur
        if (matchedNegationsCount < testSpecifications.length) {
            return { isValid: false, testSpecifications };
        }

        return { isValid: true, testSpecifications };
    } catch (error) {
        console.error(error);
        console.log('Une erreur est survenue lors de la vérification de votre sélection.');
        return { isValid: false, testSpecifications: [] };
    }
};
