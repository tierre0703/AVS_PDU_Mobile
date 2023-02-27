import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

const KEYS = {
    LANGUAGE: 'LANGUAGE',
};


export const setLanguage = async (language) => {
    try {
    await AsyncStorage.setItem(KEYS.LANGUAGE, JSON.stringify(language));
    await i18next.changeLanguage(language);
    } catch (err) {
    return null;
    }
};

export const getLanguage = async () => {
    try {
    const response = await AsyncStorage.getItem(KEYS.LANGUAGE);
    if (response) {
        return JSON.parse(response);
    }
    return 'en';
    } catch (err) {
    return 'en';
    }
};
