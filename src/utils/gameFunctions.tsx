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
    errorMargin: number = 1,
    tokenErrorMargin: number = 1,
): Promise<{ isValid: boolean, testSpecifications: TestSpecification[] }> => {

    try {
        const testSpecifications = await getTestSpecificationsByTextId(textId, gameType);
        if (userSentenceSpecifications.length !== testSpecifications.length) {
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
                return { isValid: false, testSpecifications };
            } else {
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
console.log("allTestErrorPositions");
console.log(allTestErrorPositions);


    // Vérifier si au moins une position des erreurs sélectionnées par l'utilisateur
    // correspond à une position dans les erreurs de la base de données
    return userErrorDetails.some(errorDetail => {
        const userWordPositions = errorDetail.word_positions.split(',').map(pos => parseInt(pos));
        console.log("userWordPositions");
        console.log(userWordPositions);
        
        

        return userWordPositions.some(userPos => allTestErrorPositions.includes(userPos));
    });
};
