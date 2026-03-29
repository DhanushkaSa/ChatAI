import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import de from './de.json';
import si from './si.json';
import ta from './ta.json';
import ru from './ru.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STORE_LANGUAGE_KEY = "user-language";

const LANGUAGE = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
  si: {
    translation: si,
  },
  ta: {
    translation: ta,
  },
};


// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: async (callback: any) => {
//     try {
//       // 1. Check if a language is already saved in storage
//       const savedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
//       if (savedLanguage) {
//         return callback(savedLanguage);
//       }
//       // 2. If not, use a default (or detect from device)
//       callback('en');
//     } catch (error) {
//       console.log("Error fetching language", error);
//       callback('en');
//     }
//   },
//   init: () => { },
//   cacheUserLanguage: async (language: any) => {
//     // This saves the language to storage whenever it changes
//     try {
//       await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
//     } catch (error) {
//       console.log(error);

//     }
//   }
// };


i18n.use(initReactI18next).init({
  resources: LANGUAGE,
  fallbackLng: 'en',
  defaultNS: 'translation',
  ns: ['translation'],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
