import { TestSpecification } from "models/TestSpecification";
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { getTestSpecificationsByTextId } from "services/api/testSpecifications";

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

