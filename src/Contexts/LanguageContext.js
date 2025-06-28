"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { fetchingContext } from "@/Contexts/fetchingContext";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { userData } = useContext(fetchingContext);
  const [locale, setLocale] = useState("en"); // fallback default
  const [translations, setTranslations] = useState({});

  // Set locale from user settings when userData is available
  useEffect(() => {
    if (userData?.Settings?.lang) {
      const lang = userData.Settings.lang;
      setLocale(lang);
      loadTranslations(lang);
    }
  }, [userData]);

  // Update <body> class based on current locale (for direction or theme needs)
  useEffect(() => {
    document.body.className = `${locale}`;
  }, [locale]);

  // Dynamically load translations
  const loadTranslations = async (lang) => {
    try {
      const data = await import(`@/locales/${lang}.json`);
      setTranslations(data.default);
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
