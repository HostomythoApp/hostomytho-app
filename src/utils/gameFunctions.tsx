import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { getTestSpecificationsByTextId } from "services/api/testSpecifications";

export const checkUserSelection = async (
    textId: number,
    userSentenceSpecifications: UserSentenceSpecification[],
    gameType: 'hypothesis' | 'condition' | 'negation',
    errorMargin: number = 1,
    tokenErrorMargin: number = 1,
): Promise<boolean> => {
    try {
        const testSpecifications = await getTestSpecificationsByTextId(textId, gameType);

        if (userSentenceSpecifications.length !== testSpecifications.length) {
            alert("Le nombre de spécifications ne correspond pas. Veuillez réessayer.");
            return false;
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
                alert('Votre sélection est incorrecte. Veuillez réessayer.');
                return false;
            } else {
                alert("Bonne selection");
            }
        }

        return true;
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de la vérification de votre sélection.');
        return false;
    }
};
