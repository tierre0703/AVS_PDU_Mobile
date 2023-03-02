import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

const KEYS = {
    LANGUAGE: 'LANGUAGE',
    PDU_LIST: 'PDU_LIST',
    SETTINGS: 'SETTINGS',
};

/**
pdu_list: [{
    IP: '192.168.1.100',
    Port: 8982,
    ID: 1,
    PDUName: '',
    Autoload: false,
}]
 */
export const setPDUList = async (pdu_list) => {
    try {
        await AsyncStorage.setItem(KEYS.PDU_LIST, JSON.stringify(pdu_list));
    }catch(err){
    }
}

export const getPDUList = async () => {
    try {
        const response = await AsyncStorage.getItem(KEYS.PDU_LIST);
        if(response){
            return JSON.parse(response);
        }
    }catch(err){

    }

    return null;
}

export const setSettings = async (settings) => {
    try {
        await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    }catch(err) {
        return null;
    }
}

export const getSettings = async () => {
    try {
        const response = await AsyncStorage.getItem(KEYS.LANGUAGE);
        if(response){
            return JSON.parse(response);
        }
        
    }catch(err){

    }

    return null;
}

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
