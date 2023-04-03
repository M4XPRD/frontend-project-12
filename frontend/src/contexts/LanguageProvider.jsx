import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import LangContext from './LanguageContext';

const LangProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(i18n.language);

  const setActiveLang = useCallback(() => {
    const currentLanguage = i18n.language;
    const updatedLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    setActiveLanguage(updatedLanguage);
  }, [i18n]);

  const getLocalLanguage = useCallback(() => {
    JSON.parse(localStorage.getItem('currentLanguage'));
  }, []);

  const setLocalLanguage = useCallback(() => {
    localStorage.setItem('currentLanguage', JSON.stringify(activeLanguage));
    i18n.changeLanguage(activeLanguage);
  }, [i18n, activeLanguage]);

  const providedData = useMemo(() => ({
    getLocalLanguage,
    setActiveLang,
    setLocalLanguage,
    activeLanguage,
  }), [getLocalLanguage, setActiveLang, setLocalLanguage, activeLanguage]);

  return (
    <LangContext.Provider value={providedData}>
      {children}
    </LangContext.Provider>
  );
};

export default LangProvider;
