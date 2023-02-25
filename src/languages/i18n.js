import i18next from 'i18next';
import English from './English';
import French from './French';
import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: English,
    fr: French,
  },
  react: {
    useSuspense: true,
  },
});

export default i18next;
