"use client"; // Required for Next.js App Router

import { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en"); // Default language
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "en";
    setLocale(savedLocale);
    loadTranslations(savedLocale);
  }, []);

  useEffect(() => {
    document.body.className = `${locale}`; 
  }, [locale]);

  const loadTranslations = async (lang) => {
    try {
      const data = await import(`../../locales/${lang}.json`);
      setTranslations(data.default);
    } catch (error) {
      console.error("Error loading translations:", error);
    }
  };

  const changeLanguage = (lang) => {
    setLocale(lang);
    localStorage.setItem("locale", lang);
    loadTranslations(lang);
  };

  return (
    <LanguageContext.Provider value={{ locale, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
