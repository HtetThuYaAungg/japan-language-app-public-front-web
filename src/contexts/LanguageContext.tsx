"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { getFromLocalStorage, saveToLocalStorage } from "@/helpers/storage";
import { saveToCookie } from "@/helpers/action";
import { LAN_ENUM } from "@/lib/constants";
import i18n from "@/i18n";

type Language = "en_us" | "my_mm";

const LANG_KEY = process.env.NEXT_PUBLIC_LANG_KEY as string;

type LanguageContextType = {
  language: Language;
  toggleLanguage: (newLanguage: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(LAN_ENUM.EN);
  const [languageLoading, setLanguageLoading] = useState(true);



  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = (await getFromLocalStorage(LANG_KEY)) as string;
        if (savedLanguage) {
          saveToCookie(LANG_KEY, savedLanguage);
          setLanguage(savedLanguage as Language);
          await i18n.changeLanguage(savedLanguage)
        } else {
          await saveToLocalStorage(LANG_KEY, LAN_ENUM.EN);
          saveToCookie(LANG_KEY, LAN_ENUM.EN);
          await i18n.changeLanguage(LAN_ENUM.EN);

        }
      } catch (error) {
        console.error("Error loading language:", error);
      } finally {
        setLanguageLoading(false);
      }
    };

    loadLanguage();
  }, []);

  const toggleLanguage = useCallback(async (newLanguage: Language) => {

    console.log("new language", newLanguage)
    setLanguage(newLanguage);

    try {
      await i18n.changeLanguage(newLanguage);
      await saveToLocalStorage(LANG_KEY, newLanguage);
      saveToCookie(LANG_KEY, newLanguage);
    } catch (error) {
      console.error("Error toggling language:", error);
    }
  }, []);

  const value = useMemo(
    () => ({ language, toggleLanguage }),
    [language, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      { !languageLoading && children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
