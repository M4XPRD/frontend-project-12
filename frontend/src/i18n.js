import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';

const defaultLanguage = JSON.parse(localStorage.getItem('currentLanguage')) || 'ru';

i18next
  .use(initReactI18next)
  .init({
    debug: false,
    lng: defaultLanguage,
    fallbackLng: 'ru',
    resources,
  });

export default i18next;
