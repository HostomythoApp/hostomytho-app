import { ErrorDetail } from "models/ErrorDetail";
import { TestPlausibilityError } from "models/TestPlausibilityError";
import { TestSpecification } from "models/TestSpecification";
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { getTestSpecificationsByTextId } from "services/api/testSpecifications";
import { getTestPlausibilityErrorByTextId, getCorrectPlausibilityByTextId } from "services/api/plausibility";
import { log } from "react-native-reanimated";

export const checkUserSelection = async (
    textId: number,
    userSentenceSpecifications: UserSentenceSpecification[],
    gameType: 'hypothesis' | 'condition' | 'negation',
    errorMargin: number = 1,
    tokenErrorMargin: number = 1,
): Promise<{ isValid: boolean, testSpecifications: TestSpecification[] }> => {
    try {
        const testSpecifications = await getTestSpecificationsByTextId(textId, gameType);
        if (userSentenceSpecifications.length !== testSpecifications.length) {
            console.log("Le nombre de spécifications ne correspond pas.");
            return { isValid: false, testSpecifications };
        }

        for (let userSentenceSpecification of userSentenceSpecifications) {
            const userWordPositions = userSentenceSpecification.word_positions.split(',').map(pos => parseInt(pos));
            const matchingTestSpec = testSpecifications.find(spec => {
                const testWordPositions = spec.word_positions.split(',').map(pos => parseInt(pos));
                const matchingPositions = testWordPositions.filter(testPos => {
                    return userWordPositions.some(userPos => Math.abs(userPos - testPos) <= errorMargin);
                });

                const tokenDifference = Math.abs(testWordPositions.length - userWordPositions.length);
                return matchingPositions.length > 0 && tokenDifference <= tokenErrorMargin;
            });

            if (!matchingTestSpec) {
                console.log('Sélection est incorrecte.');
                return { isValid: false, testSpecifications };
            } else {
                console.log("Bonne sélection");
            }
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
    errorMargin: number = 3,
    plausibilityMargin: number = 25,
    tokenErrorMargin: number = 3
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
        const isErrorDetailsCorrect = areUserErrorsCorrect(userErrorDetails, testPlausibilityError, errorMargin, tokenErrorMargin);

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
    testPlausibilityError: TestPlausibilityError[],
    errorMargin: number,
    tokenErrorMargin: number
): boolean => {
    return userErrorDetails.every(errorDetail => {
        const userWordPositions = errorDetail.word_positions.split(',').map(pos => parseInt(pos));
        const matchingTestSpec = testPlausibilityError.find(spec => {
            const testWordPositions = spec.word_positions.split(',').map(pos => parseInt(pos));
            return hasMatchingPositions(userWordPositions, testWordPositions, errorMargin, tokenErrorMargin);
        });
        return !!matchingTestSpec;
    });
};

const hasMatchingPositions = (
    userWordPositions: number[],
    testWordPositions: number[],
    errorMargin: number,
    tokenErrorMargin: number
): boolean => {
    const matchingPositions = testWordPositions.filter(testPos => {
        return userWordPositions.some(
            userPos => Math.abs(userPos - testPos) <= errorMargin
        );
    });
    const tokenDifference = Math.abs(testWordPositions.length - userWordPositions.length);
    return matchingPositions.length > 0 && tokenDifference <= tokenErrorMargin;
};
