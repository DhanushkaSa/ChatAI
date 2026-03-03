import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import de from './de.json';
import si from './si.json';
import ta from './ta.json';
import ru from './ru.json';

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
