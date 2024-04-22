import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    MONTHLY_WINNERS: 'monthlyWinners',
};


export const saveMonthlyWinners = async (winners: any) => {
    const dataToStore = {
        timestamp: new Date().getTime(),
        data: winners
    };
    try {
        await AsyncStorage.setItem('monthlyWinners', JSON.stringify(dataToStore));
    } catch (e) {
        console.error('Saving monthly winners failed', e);
    }
};

export const loadMonthlyWinners = async () => {
    try {
        const storedData = await AsyncStorage.getItem('monthlyWinners');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const currentTime = new Date().getTime();
            const interval = 30 * 60 * 1000;

            if (currentTime - parsedData.timestamp > interval) {
                return null;
            }
            return parsedData.data;
        }
    } catch (e) {
        console.error('Loading monthly winners failed', e);
    }
    return null;
};
