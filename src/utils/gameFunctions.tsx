import { ErrorDetail } from "models/ErrorDetail";
import { TestPlausibilityError } from "models/TestPlausibilityError";
import { TestSpecification } from "models/TestSpecification";
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { getTestSpecificationsByTextId } from "services/api/testSpecifications";
import { getTestPlausibilityErrorByTextId, getCorrectPlausibilityByTextId } from "services/api/plausibility";

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


export const checkUserSelectionPlausibility = async (
    textId: number,
    userErrorDetails: ErrorDetail[],
    userRateSelected: number,
    errorMargin: number = 10,
    plausibilityMargin: number = 25,
    tokenErrorMargin: number = 10
): Promise<{
    isValid: boolean,
    testPlausibilityError: TestPlausibilityError[],
    correctPlausibility?: number,
    testPlausibilityPassed?: boolean,
    isErrorDetailsCorrect?: boolean,
}> => {
    try {
        const testPlausibilityError = await getTestPlausibilityErrorByTextId(textId);
        const textPlausibility = await getCorrectPlausibilityByTextId(textId);
        const isPlausibilityCorrect = Math.abs(userRateSelected - textPlausibility) <= plausibilityMargin;

        // Cas 1: L'utilisateur n'a pas spécifié d'erreurs
        if (userErrorDetails.length === 0) {
            return {
                isValid: isPlausibilityCorrect,
                testPlausibilityError: [],
                correctPlausibility: textPlausibility,
                testPlausibilityPassed: isPlausibilityCorrect,
            };
        }

        // Cas 2: Le texte a une correction de plausibilité mais pas d'erreurs de correction
        if (testPlausibilityError.length === 0) {
            return {
                isValid: isPlausibilityCorrect,
                testPlausibilityError: [],
                correctPlausibility: textPlausibility,
                testPlausibilityPassed: isPlausibilityCorrect,
            };
        }

        // Cas 3: L'utilisateur a spécifié des erreurs
        const isErrorDetailsCorrect = areUserErrorsCorrect(userErrorDetails, testPlausibilityError);

        const testPlausibilityPassed = isErrorDetailsCorrect && isPlausibilityCorrect;

        return {
            isValid: isPlausibilityCorrect && isErrorDetailsCorrect,
            testPlausibilityError,
            correctPlausibility: textPlausibility,
            testPlausibilityPassed: isPlausibilityCorrect,
            isErrorDetailsCorrect
        };


    } catch (error) {
        console.error(error);
        console.log('Une erreur est survenue lors de la vérification de votre sélection.');
        return {
            isValid: false,
            testPlausibilityError: [],
        };
    }
};

const areUserErrorsCorrect = (
    userErrorDetails: ErrorDetail[],
    testPlausibilityError: TestPlausibilityError[]
): boolean => {
    // Convertir toutes les positions des erreurs de la base de données en un seul tableau
    const allTestErrorPositions = testPlausibilityError.flatMap(spec =>
        spec.word_positions.split(',').map(pos => parseInt(pos))
    );

    // Vérifier si au moins une position des erreurs sélectionnées par l'utilisateur
    // correspond à une position dans les erreurs de la base de données
    return userErrorDetails.some(errorDetail => {
        const userWordPositions = errorDetail.word_positions.split(',').map(pos => parseInt(pos));
 
        return userWordPositions.some(userPos => allTestErrorPositions.includes(userPos));
    });
};
