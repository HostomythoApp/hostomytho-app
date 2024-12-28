export const plausibilityConfigs = [
    {
        maxThreshold: 12.50,
        description: "très peu plausible",
        buttonConfig: { backgroundColor: 'bg-red-300', iconName: 'cross', iconColor: 'red', iconSet: 'Entypo' }
    },
    {
        maxThreshold: 37.50,
        description: "peu plausible",
        buttonConfig: { backgroundColor: 'bg-orange-100', iconName: 'flag', iconColor: 'orange', iconSet: 'Entypo' }
    },
    {
        maxThreshold: 62.50,
        description: "moyennement plausible",
        buttonConfig: { backgroundColor: 'bg-yellow-100', iconName: 'minus', iconColor: 'orange', iconSet: 'Entypo' }
    },
    {
        maxThreshold: 87.50,
        description: "assez plausible",
        buttonConfig: { backgroundColor: 'bg-green-50', iconName: 'checkmark', iconColor: '#48d1cc', iconSet: 'Ionicons' }
    },
    {
        maxThreshold: 100,
        description: "complètement plausible",
        buttonConfig: { backgroundColor: 'bg-green-200', iconName: 'checkmark-done-sharp', iconColor: 'green', iconSet: 'Ionicons' }
    },
];